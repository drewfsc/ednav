"use client";
import React, { useEffect, useState } from "react";
import { useNavigators } from "@/contexts/NavigatorsContext";

export default function ClientTable({clients}) {
    // const [clients, setClients] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    let selectedNavigator;
    try {
        const navigatorContext = useNavigators();
        selectedNavigator = navigatorContext?.selectedNavigator || "";
    } catch (error) {
        console.warn("useNavigators must be used inside a NavigatorsProvider.");
        selectedNavigator = ""; // Fallback to prevent crashing
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const fetchClients = async () => {
            if (!selectedNavigator) return;

            try {
                console.log(`Fetching clients for navigator: ${selectedNavigator}`);

                const response = await fetch(`/api/clients?navigator=${selectedNavigator}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const text = await response.text();
                console.log("Raw API Response:", text);

                if (!text) {
                    throw new Error("Empty response from server.");
                }

                const data = JSON.parse(text);
                console.log("Parsed API Response:", data);

                if (Array.isArray(data)) {
                    setClients(data);
                } else {
                    console.error("API did not return an array:", data);
                    setClients([]); // Prevent UI errors
                }
            } catch (error) {
                console.error("Failed to fetch clients:", error);
                setClients([]);
            }
        };

        fetchClients();
    }, [selectedNavigator]);

    // ✅ Prevent hydration mismatch by rendering only after mount
    if (!isMounted) return null;

    return (
        <div>
            <div className={`bg-primary/60 py-6 shadow-lg h-30`}></div>
            <div className={`h-10 bg-primary/80`}></div>
            <div className="px-4 sm:px-6 lg:px-8 mt-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold text-gray-900">Users</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all the users in your account including their name, title, email, and role.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add user
                        </button>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Title
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Role
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {clients.length > 0 ? (
                                        clients.map((person) => (
                                            <tr key={person.email}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                    {person.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {person.title}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {person.email}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {person.role}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                        Edit<span className="sr-only">, {person.name}</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4 text-sm text-gray-500">
                                                No clients found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
