import React, {useEffect, useState} from 'react';
import {newQuestions} from "/lib/response";
import { Card, CardContent } from '@/components/ui/card';
import DatePicker from 'react-datepicker';

const saveSelectionToMongoDB = async (data) => {
    await fetch('/api/activities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

const DynamicSelect = ({ client }) => {
    const [selectedPath, setSelectedPath] = useState([]);
    const [currentOptions, setCurrentOptions] = useState(Object.keys(newQuestions));
    const [currentObject, setCurrentObject] = useState(newQuestions);
    const [finalSelection, setFinalSelection] = useState(null);
    const [multiSelectOptions, setMultiSelectOptions] = useState(null);
    const [multiSelectValues, setMultiSelectValues] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        if (client?.group) {
            const autoSelection = client.group.toLowerCase();
            if (newQuestions[autoSelection]) {
                setSelectedPath([autoSelection]);
                setCurrentObject(newQuestions[autoSelection]);
                setCurrentOptions(Object.keys(newQuestions[autoSelection]));
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
        setSelectedValue(null);

        const newObject = newPath.reduce((acc, key) => (acc && acc[key] ? acc[key] : null), newQuestions);
        setCurrentObject(newObject);

        if (newObject && typeof newObject === 'object' && !Array.isArray(newObject)) {
            setFinalSelection(null);

            if (Object.hasOwn(newObject, 'completed')) {
                setMultiSelectOptions(newObject.completed);
                setCurrentOptions([]);
            } else {
                setMultiSelectOptions(null);
                setCurrentOptions(Object.keys(newObject));
            }
        } else {
            setCurrentOptions([]);
            setFinalSelection(selectedValue);

            await saveSelectionToMongoDB({
                path: newPath,
                selection: selectedValue,
                clientId: client._id,
                clientEmail: client.email,
                clientName: client.name,
                fep: client.fep,
                selectedDate: selectedDate,  // Include date selection
                timestamp: new Date(),
            });
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
        <Card className="w-full max-w-md p-4 m-auto mt-5">
            <CardContent>
                <h2 className="text-xl font-bold mb-4">Select Options</h2>

                {selectedPath.length > 0 && (
                    <div className="mb-4 text-sm text-gray-500">
                        <strong>Path:</strong> {selectedPath.join(' > ')}
                    </div>
                )}

                {showDatePicker && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Select Date</h3>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="p-2 border rounded"
                        />
                    </div>
                )}

                {currentOptions.length > 0 && (
                    <div className="grid grid-cols-1 gap-2 mt-4">
                        {currentOptions.map((option) => (
                            <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="option"
                                    value={option}
                                    checked={selectedValue === option}
                                    onChange={() => handleSelectChange(option)}
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                        <button
                            className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
                            onClick={handleAdvance}
                            disabled={!selectedValue}
                        >
                            Continue
                        </button>
                    </div>
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
                    <div className="mt-4 p-2 text-green-700">
                        <strong>Final Selection:</strong> {finalSelection}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DynamicSelect;
