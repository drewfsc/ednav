"use client";
import React, { useEffect, useState } from "react";
import { useClients } from "@/contexts/ClientsContext";

export default function ClientTable({ clients, searchTerm, searchFields, setEditing }) {
    const [isMounted, setIsMounted] = useState(false);
    const { selectedClient, setSelectedClient } = useClients(null);
    const [userClients, setUserClients] = useState(clients);

    const getBadgeColor = (status) => {
        switch (status) {
            case "Active":
                return "badge badge-primary";
            case "Inactive":
                return "badge badge-secondary";
            case "In Progress":
                return "badge badge-warning";
            case "Graduated":
                return "badge badge-success";
            default:
                return "badge badge-primary";
        }
    }

    const handleClientClick = () => {
        setEditing(true);
    };

    // ✅ Function to filter clients based on search term
    const filterClients = (term) => {
        if (!term) return clients; // Show all clients if no search term
        return clients.filter((client) =>
            searchFields.some(
                (field) =>
                    client[field] &&
                    typeof client[field] === "string" &&
                    client[field].toLowerCase().includes(term.toLowerCase())
            )
        );
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setUserClients(filterClients(searchTerm)); // ✅ Update filtered clients when search term changes
    }, [searchTerm, clients, searchFields]);

    // ✅ Prevent hydration mismatch by rendering only after mount
    if (!isMounted) return null;

    return (
        <div className="flex-1">
            <div className="mt-2 overflow-y-scroll">
                <div className="h-auto">
                    <div className="inline-block min-w-full py-0 align-middle ">
                        <table className="min-w-full divide-y divide-base-300">
                            <tbody className="divide-y divide-base-300">
                            {userClients.length > 0 ? (
                                userClients.map((person, i) => (
                                    <tr key={person.email + i}  onClick={() => {
                                        if (selectedClient?._id === person._id) {
                                            setSelectedClient(null);
                                            setEditing(null);
                                        } else {
                                            setSelectedClient(person);
                                        }
                                        // console.log(person);
                                        handleClientClick()
                                    }} className={`hover:bg-accent hover:text-accent-content cursor-pointer ${selectedClient?._id === person._id ? 'bg-accent text-accent-content' : ''}`}>
                                        <td className="whitespace-nowrap text-sm font-medium">
                                            <span className={`ml-4`}>{person.name}</span>
                                        </td>
                                        {/*<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">*/}
                                        {/*    {person.title}*/}
                                        {/*</td>*/}
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <div className={`badge ${getBadgeColor(person.clientStatus)}`}>{person.clientStatus}</div>
                                        </td>
                                        {/*<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">*/}
                                        {/*    {person.email}*/}
                                        {/*</td>*/}
                                        {/*<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">*/}
                                        {/*    {person.role}*/}
                                        {/*</td>*/}
                                        {/*<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">*/}
                                        {/*    <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleClientClick(person)}>*/}
                                        {/*        Edit<span className="sr-only">, {person.name}</span>*/}
                                        {/*    </button>*/}
                                        {/*</td>*/}
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
    );
}
