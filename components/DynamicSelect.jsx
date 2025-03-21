import React, { useState } from 'react';
import {newQuestions} from "/lib/response";
import { Card, CardContent } from '@/components/ui/card';

const DynamicSelect = () => {
    const [selectedPath, setSelectedPath] = useState([]);
    const [currentOptions, setCurrentOptions] = useState(Object.keys(newQuestions));
    const [currentObject, setCurrentObject] = useState(newQuestions);
    const [finalSelection, setFinalSelection] = useState(null);
    const [multiSelectOptions, setMultiSelectOptions] = useState(null);
    const [multiSelectValues, setMultiSelectValues] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);

    // const saveSelectionToMongoDB = async (data) => {
    //     const { MongoClient } = require('mongodb');
    //
    //     const uri = "mongodb://localhost:27017"; // Update with your MongoDB connection string
    //     const client = new MongoClient(uri);
    //
    //     try {
    //         await client.connect();
    //         const database = client.db('yourDatabaseName'); // Replace with your DB name
    //         const collection = database.collection('yourCollectionName'); // Replace with your collection name
    //
    //         const result = await collection.insertOne(data);
    //         console.log(`Data saved with ID: ${result.insertedId}`);
    //     } catch (error) {
    //         console.error('Failed to save data:', error);
    //     } finally {
    //         await client.close();
    //     }
    // };

    const saveSelectionToMongoDB = async (data) => {
        await fetch('/api/activities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    const handleSelectChange = (value) => {
        setSelectedValue(value);
    };

    const handleAdvance = async () => {
        if (!selectedValue) return;

        const newPath = [...selectedPath, selectedValue];
        setSelectedPath(newPath);
        setSelectedValue(null);  // Reset selected value for next step

        const newObject = newPath.reduce((acc, key) => (acc && acc[key] ? acc[key] : null), newQuestions);
        setCurrentObject(newObject);

        if (newObject && typeof newObject === 'object' && !Array.isArray(newObject)) {
            setFinalSelection(null);

            if (Object.hasOwn(newObject, 'completed')) {
                setMultiSelectOptions(newObject.completed);
                setCurrentOptions([]); // Hide radios, show checkboxes instead
            } else {
                setMultiSelectOptions(null);
                setCurrentOptions(Object.keys(newObject));
            }
        } else {
            setCurrentOptions([]);
            setFinalSelection(selectedValue);

            // Save single selection to the database
            await saveSelectionToMongoDB({
                path: newPath,
                selection: selectedValue,
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
            timestamp: new Date(),
        };

        await saveSelectionToMongoDB(dataToSave);

        setMultiSelectOptions(null); // Clear checkboxes
        setCurrentOptions([]); // Hide options after multi-select
        setFinalSelection('Completed Multi-Select');
    }
    return (
        <Card className="w-full max-w-md p-4 m-auto mt-5">
            <CardContent>
                <h2 className="text-xl font-bold mb-4">Select Options</h2>

                {selectedPath.length > 0 && (
                    <div className="mb-4 text-sm text-gray-500">
                        <strong>Path:</strong> {selectedPath.join(' > ')}
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
