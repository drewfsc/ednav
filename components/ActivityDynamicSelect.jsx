import React, { useEffect, useState } from 'react';
import { useClients } from '../contexts/ClientsContext';
import { useActivities } from '../contexts/ActivityContext';
import { generateSentence } from '../utils/generateSentence.tsx';
import Combobox from './Combobox';
import { youthSchools } from '../lib/schools';

const ActivityDynamicSelect = ({ setOpen, questions }) => {
  const [selectedPath, setSelectedPath] = useState([]);
  const [currentOptions, setCurrentOptions] = useState(Object.keys(questions));
  const [, setCurrentObject] = useState(questions);
  const [finalSelection, setFinalSelection] = useState(null);
  const [multiSelectOptions, setMultiSelectOptions] = useState(null);
  const [multiSelectValues, setMultiSelectValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [trackable, setTrackable] = useState(null);
  const {selectedActivity, setSelectedActivity} = useActivities()
  const {selectedClient, setSelectedClient} = useClients();

  const saveSelectionToMongoDB = async (newPath, multi) => {
    setOpen(false);

    const data = {
      clientEmail: selectedClient.email,
      clientId: selectedClient._id,
      clientName: selectedClient.name || selectedClient.first_name + ' ' + selectedClient.last_name,
      fep: selectedClient.fep,
      navigator: selectedClient.navigator,
      selectedDate: selectedDate,
      selection: selectedValue,
      timestamp: new Date(),
      trackable: trackable,
      selections: multi ? multiSelectValues : null
    };
    if (multi) {
      data.path = selectedPath;
      data.statement = generateSentence(selectedClient?.navigator, selectedClient?.name || selectedClient?.first_name + ' ' + selectedClient?.last_name, multiSelectValues, selectedPath);
    } else {
      data.path = newPath;
      data.statement = generateSentence(selectedClient?.navigator, selectedClient?.name || selectedClient?.first_name + ' ' + selectedClient?.last_name, null, newPath);
    }

    return await fetch('/api/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(
      async (result) => {
        await setSelectedClient(result.wholeUser);
        await setSelectedActivity(prev => ({
          ...prev,
          activities: result['actionRes']
        }));
      },
      (error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (selectedClient?.group) {
      const autoSelection = selectedClient.group.toLowerCase();
      if (questions[autoSelection]) {
        setSelectedPath([autoSelection]);
        setCurrentObject(questions[autoSelection]);
        let options = Object.keys(questions[autoSelection]);
        if (selectedClient?.trackable?.type === 'GED' || selectedClient?.trackable?.type === 'HSED') {
          options = options.filter(opt => opt !== 'GED' && opt !== 'HSED');
        }
        setCurrentOptions(options);
      }
    }
  }, [selectedClient]);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const handleAdvance = async () => {
    if (!selectedValue) return;
    let newArray = [...selectedPath];
    if (selectedClient.trackable?.type === 'GED' || selectedClient.trackable?.type === 'HSED') {
      console.log('GED!!');
      const itemsToRemove = ['GED', 'HSED'];
      newArray = selectedPath.filter(item => !itemsToRemove.includes(item));
    }
    console.log(selectedValue, selectedPath)
    const newPath = [...newArray, selectedValue];
    setSelectedPath(newPath);
    setSelectedValue('');
    const newObject = newPath.reduce((acc, key) => (acc && acc[key] ? acc[key] : null), questions);
    setCurrentObject(newObject);

    if (selectedValue === 'GED' || selectedValue === 'HSED') {
      const nextLevel = Object.values(newObject); // go one level deeper
      let items = [];
      if (Array.isArray(nextLevel) && nextLevel.length > 0) {
        items = nextLevel.map(item => ({
          name: item,
          completed: false
        }));
      }
      setTrackable({ type: selectedValue, length: items.length, items: items });
    }

    if (newObject && Object.keys(newObject).length === 0) {

      setCurrentOptions([]);
      setFinalSelection(selectedValue);

      await saveSelectionToMongoDB(newPath, false);
      return;
    }
    if (newObject && typeof newObject === 'object') {
      console.log(newObject);
      setFinalSelection(null);
      if (Array.isArray(newObject)) {
        setMultiSelectOptions(newObject);
        setCurrentOptions([]);
      } else {
        setMultiSelectOptions(null);
        let options = Object.keys(newObject);
        if (selectedClient?.trackable?.type === 'GED' || selectedClient?.trackable?.type === 'HSED') {
          options = options.filter(opt => opt !== 'GED' && opt !== 'HSED');
        }
        setCurrentOptions(options);
      }
    } else if (Array.isArray(newObject)) {
      setMultiSelectOptions(newObject.completed);
      setCurrentOptions([]);
    } else {
      setCurrentOptions([]);
      setFinalSelection(selectedValue);

      const action = await saveSelectionToMongoDB(newPath, false);
      const savedAction = await action.json();
      await setSelectedActivity([...selectedActivity.activities, savedAction]);
    }
  };

  const handleMultiSelectChange = (option, index) => {
    console.log(option, index);
    setMultiSelectValues((prev) => {
      if (prev.includes(option)) {
        if (trackable && trackable.items.length > 0) {
          trackable.items[index].completed = !trackable.items[index].completed;
        }
        return prev.filter(item => item !== option);
      } else {
        if (!trackable || !trackable?.items) {
          if (trackable && trackable.items) {
            trackable.items[index].completed = false;
          }
        }
        return [...prev, option];
      }
    });
    if (trackable && trackable?.items.length > 0 && trackable?.type !== 'GED' || trackable?.type !== 'HSED') {
      setTrackable(prev => {
        if (!prev?.items) return prev;

        const updatedItems = [...prev.items];
        updatedItems[index] = { ...updatedItems[index], completed: !updatedItems[index].completed };

        return {
          ...prev,
          items: updatedItems
        };
      });
    }
  };

  const handleMultiSelectAdvance = async () => {
    await saveSelectionToMongoDB(null, true);
    setMultiSelectOptions(null);
    setCurrentOptions([]);
    setFinalSelection('Completed Multi-Select');
  };

  const showDatePicker = selectedPath.length === 1; // Show DatePicker only at the beginning

  return (
    <div className="px-0 py-4 max-w-60 mx-auto overflow-y-visible">
      {showDatePicker && (
        <label className="flex flex-col space-y-2 text-sm font-light">Date of activity:
          <input
            type="date"
            name="date"
            className="w-full mt-2 border border-base-content text-base-content placeholder:text-base-content rounded py-1 px-3"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))} />
        </label>
      )}

      {currentOptions.length > 0 && (
        <label className="flex flex-col space-y-2 text-sm font-light mt-6 capitalize">
          {currentOptions.includes("Whitnall High School") ? (
            <Combobox
              placeholder="Select a school"
              value={selectedValue}
              setValue={setSelectedValue}
              name={youthSchools[0]}
              label="Attended High School"
              options={youthSchools}
              onChange={(e) => handleSelectChange(e.target.value)}
            />
          ) : (
            <select
              name={currentOptions[0]}
              className={`w-full mt-2 border border-base-content text-base-content placeholder:text-base-content rounded py-1 px-3`}
              value={selectedValue}
              onChange={(e) => handleSelectChange(e.target.value)}
            >
              <option value="">Select an activity</option>
              {
                currentOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))
              }
            </select>
          )}

          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
            onClick={handleAdvance}
            disabled={!selectedValue}
          >
            Continue
          </button>
        </label>
      )}

      {multiSelectOptions && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Select Multiple Options</h3>
          <div className="grid grid-cols-1 gap-2">
            {multiSelectOptions.map((option, index) => (
              <label key={`${option}-${index}`} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={option}
                  checked={multiSelectValues.includes(option)}
                  onChange={() => handleMultiSelectChange(option, index)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <button
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
            onClick={handleMultiSelectAdvance}
            disabled={multiSelectValues.length === 0}
          >
            Next
          </button>
        </div>
      )}

      {finalSelection && (
        <div className="mt-4 text-green-700">
          Your activity was saved successfully.
        </div>
      )}</div>
  );
};

export default ActivityDynamicSelect;
