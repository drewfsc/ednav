import React, {useEffect, useState} from 'react';

const saveSelectionToMongoDB = async (data) => {
    await fetch('/api/activities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

const ActivityDynamicSelect = ({client, setActions, questions}) => {
    const [selectedPath, setSelectedPath] = useState([]);
    const [currentOptions, setCurrentOptions] = useState(Object.keys(questions));
    const [, setCurrentObject] = useState(questions);
    const [finalSelection, setFinalSelection] = useState(null);
    const [multiSelectOptions, setMultiSelectOptions] = useState(null);
    const [multiSelectValues, setMultiSelectValues] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        if (client?.group) {
            const autoSelection = client.group.toLowerCase();
            if (questions[autoSelection]) {
                setSelectedPath([autoSelection]);
                setCurrentObject(questions[autoSelection]);
                setCurrentOptions(Object.keys(questions[autoSelection]));
            }
        }
    }, [client]);

    const handleSelectChange = (value) => {
        setSelectedValue(value);
    };

    const handleAdvance = async () => {
        if (!selectedValue) return;

        const newPath = [...selectedPath, selectedValue];
        setSelectedPath(newPath);
        setSelectedValue("");

        const newObject = newPath.reduce((acc, key) => (acc && acc[key] ? acc[key] : null), questions);
        setCurrentObject(newObject);

        if (newObject && typeof newObject === 'object') {
            console.log("1", Array.isArray(newObject), newObject);
            setFinalSelection(null);
            if (Array.isArray(newObject)) {
                console.log("2", Array.isArray(newObject), newObject);
                setMultiSelectOptions(newObject);
                setCurrentOptions([]);
            } else {
                setMultiSelectOptions(null);
                setCurrentOptions(Object.keys(newObject));
            }
        } else if(Array.isArray(newObject)) {
            setMultiSelectOptions(newObject.completed);
            setCurrentOptions([]);
        } else {
            setCurrentOptions([]);
            setFinalSelection(selectedValue);

            const action = await saveSelectionToMongoDB({
                path: newPath,
                selection: selectedValue,
                clientId: client._id,
                clientEmail: client.email,
                clientName: client.name,
                fep: client.fep,
                selectedDate: selectedDate,  // Include date selection
                timestamp: new Date(),
            });
            const savedAction = await action.json();
            await setActions([...setActions, savedAction]);
        }
    };

    const handleMultiSelectChange = (option) => {
        setMultiSelectValues((prev) => {
            if (prev.includes(option)) {
                return prev.filter(item => item !== option);
            } else {
                return [...prev, option];
            }
        });
    };

    const handleMultiSelectAdvance = async () => {
        const dataToSave = {
            path: selectedPath,
            selections: multiSelectValues,
            clientId: client._id,
            clientEmail: client.email,
            clientName: client.name,
            fep: client.fep,
            selectedDate: selectedDate,  // Include date selection
            timestamp: new Date(),
        };

        await saveSelectionToMongoDB(dataToSave);

        setMultiSelectOptions(null);
        setCurrentOptions([]);
        setFinalSelection('Completed Multi-Select');
    }
    const showDatePicker = selectedPath.length === 1; // Show DatePicker only at the beginning
    return (
        <div className="px-0 py-4 max-w-60 mx-auto">

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
                <label className="flex flex-col space-y-2 text-sm font-light mt-6">Type of activity:
                    <select
                      name={currentOptions[0]}
                      className={`w-full mt-2 border border-base-content text-base-content placeholder:text-base-content rounded py-1 px-3`}
                            value={selectedValue}
                      onChange={(e) => handleSelectChange(e.target.value)}>
                        <option value="">Select an activity</option>
                        {
                            currentOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))
                        }
                    </select>
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
                                    onChange={() => handleMultiSelectChange(option)}
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
