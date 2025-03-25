"use client";
import React, { useEffect, useState } from "react";
import {useFepsLeft} from "@/contexts/FepsLeftContext";
import ClientTableItem from "@/components/ClientTableItem";

export default function ClientTable({ setEditing, userClients }) {
    const [isMounted, setIsMounted] = useState(false);
    const [selectedNavigator, setSelectedNavigator] = useState("");

    useEffect(() => {
        setIsMounted(true); // ✅ Mark component as mounted before interacting with localStorage
        if (typeof window !== "undefined") {
            const storedNavigator = localStorage.getItem("navigatorName") || "";
            setSelectedNavigator(storedNavigator);
        }
    }, [selectedNavigator]);

    const {selectedFepLeft} = useFepsLeft();
    const filteredClients = userClients.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(selectedFepLeft.searchTerm.toLowerCase());
        const matchesStatus = selectedFepLeft.status === 'All' || client.clientStatus === selectedFepLeft.status;
        const matchesGroup = selectedFepLeft.age === 'All' || client.group === selectedFepLeft.age;
        return matchesSearch && matchesStatus && matchesGroup;
    });

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
                        <div className="h-16 font-extralight text-xl fixed top-0 bg-base-300 text-secondary-content flex items-center pl-6 w-full">
                            {userClients
                                .filter(client => client.navigator === selectedNavigator)
                                .filter(client => selectedFepLeft.age !== "All" ? client.group === selectedFepLeft.age : "All" )
                                .filter(client => selectedFepLeft.status !== "All" ? client.clientStatus === selectedFepLeft.status : "All" ).length} Clients
                        </div>
                        <table className="min-w-full mt-16">
                            <tbody className="">
                            {filteredClients?.length > 0 ? (
                                filteredClients?.filter(client => client.navigator === selectedNavigator).map((person, i) => (
                                    <ClientTableItem key={i} person={person} i={i} setEditing={setEditing}/>
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
