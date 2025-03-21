"use client";
import React, { useEffect, useState } from "react";
import { useClients } from "@/contexts/ClientsContext";

export default function ClientTable({ setEditing, userClients }) {
    const [isMounted, setIsMounted] = useState(false);
    const { selectedClient, setSelectedClient } = useClients(null);
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

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // ✅ Prevent hydration mismatch by rendering only after mount
    if (!isMounted) return null;

    return (
        <div className="flex-1">
            <div className="mt-2 overflow-y-scroll">
                <div className="h-auto">
                    <div className="inline-block min-w-full py-0 align-middle ">
                        <table className="min-w-full divide-y divide-base-300">
                            <tbody className="divide-y divide-base-300">
                            {userClients?.length > 0 ? (
                                userClients?.filter(client => client.navigator === selectedNavigator).map((person, i) => (
                                    <tr key={person.email + i}  onClick={() => {
                                        if (selectedClient?._id === person._id) {
                                            setSelectedClient(null);
                                            setEditing(null);
                                        } else {
                                            setSelectedClient(person);
                                        }
                                    }} className={`hover:bg-accent hover:text-accent-content cursor-pointer ${selectedClient?._id === person._id ? 'bg-accent text-accent-content' : ''}`}>
                                        <td className="whitespace-nowrap text-sm font-medium">
                                            <span className={`ml-4`}>{person.name}</span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
