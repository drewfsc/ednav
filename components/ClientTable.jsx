"use client";
import React, { useEffect, useState } from "react";
import { useClients } from "@/contexts/ClientsContext";

export default function ClientTable({ setEditing, userClients }) {
    const [isMounted, setIsMounted] = useState(false);
    const {selectedClient, setSelectedClient} = useClients(null);
    const [selectedNavigator, setSelectedNavigator] = useState("");

    useEffect(() => {
        setIsMounted(true); // ✅ Mark component as mounted before interacting with localStorage
        if (typeof window !== "undefined") {
            const storedNavigator = localStorage.getItem("navigatorName") || "";
            setSelectedNavigator(storedNavigator);
            // console.log(client)
            // getNotes().then()
        }
    }, [selectedNavigator]);

    const getBadgeColor = (status) => {
        switch (status) {
            case "Active":
                return "badge badge-error";
            case "Inactive":
                return "badge badge-warning";
            case "In Progress":
                return "badge badge-success";
            case "Graduated":
                return "badge badge-info";
            default:
                return "badge badge-primary";
        }
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // ✅ Prevent hydration mismatch by rendering only after mount
    if (!isMounted) return null;

    return (
        <div className="flex-1">
            <div className="mt-0 overflow-y-scroll no-scrollbar">
                <div className="h-auto">
                    <div className="inline-block min-w-full py-0 h-full align-middle relative">
                        <div className="h-16 font-extralight text-xl fixed top-0 bg-secondary text-secondary-content flex items-center pl-6 w-full shadow-lg">
                            Add a new client
                        </div>
                        <table className="min-w-full divide-y divide-base-300 mt-16">
                            <tbody className="divide-y divide-base-300">
                            {userClients?.length > 0 ? (
                                userClients?.filter(client => client.navigator === selectedNavigator).map((person, i) => (
                                    <tr key={person.email + i}  onClick={() => {
                                        if (selectedClient?._id === person._id) {
                                            setSelectedClient(null);
                                            setEditing(null);
                                        } else {
                                            setSelectedClient(person);
                                            setEditing(true);
                                        }
                                    }} className={`hover:bg-accent hover:text-accent-content cursor-pointer ${selectedClient?._id === person._id ? 'bg-accent text-accent-content' : ''}`}>
                                        <td className="whitespace-nowrap text-sm font-medium">
                                            <span className={`ml-4`}>{person.name}</span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">
                                            <div className={`badge ${getBadgeColor(person.clientStatus)}`}>{person.clientStatus}</div>
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
    );
}
