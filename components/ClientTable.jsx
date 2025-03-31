"use client";
import React, {useEffect, useState} from "react";
import {useFepsLeft} from "/contexts/FepsLeftContext";
import ClientTableItem from "/components/ClientTableItem";
import {GroupIcon} from "lucide-react";
import {ToggleGroup} from "/components/ui/toggle-group";
import { useNavigators } from '../contexts/NavigatorsContext';

export default function ClientTable({setEditing, userClients, setFetching}) {
    const [isMounted, setIsMounted] = useState(false);
    const {selectedNavigator} = useNavigators();
    const {selectedFepLeft} = useFepsLeft();
    const [grouped, setGrouped] = useState(false);
    const [, setTableClients] = useState(userClients.filter(client => client.navigator === selectedNavigator).length);

    const handleGroupChange = () => {
        setGrouped(!grouped);
        if (!grouped) {
            // Convert the groupedClients object to an array for rendering
            const groupedArray = Object.entries(groupedClients).flatMap(([status, clients]) =>
                clients.map(client => ({ ...client, groupStatus: status }))
            );
            setTableClients(groupedArray);
        } else {
            setTableClients(filteredClients);
        }
    };

    const groupByClientStatus = (clients) => {
        return clients
            .filter(client => client.navigator === selectedNavigator)
            .sort((a, b) => (a.clientStatus > b.clientStatus ? 1 : -1))
            .reduce((groups, client) => {
                const status = client.clientStatus || "Unknown";
                if (!groups[status]) groups[status] = [];
                groups[status].push(client);
                return groups;
            }, {});
    };

    const filteredClients = userClients.filter(client => client.navigator === selectedNavigator).filter(client => {
        // let currentName;
        // if (!client.name){
        //     currentName = client.firstName + " " + client.lastName;
        // } else {
        //     currentName = client.name;
        // }
        const matchesSearch = client.first_name.toLowerCase().includes(selectedFepLeft.searchTerm.toLowerCase())
          || client.last_name.toLowerCase().includes(selectedFepLeft.searchTerm.toLowerCase());
        const matchesStatus = selectedFepLeft.status === 'All' || client.clientStatus === selectedFepLeft.status;
        const matchesGroup = selectedFepLeft.age === 'All' || client.group === selectedFepLeft.age;
        return matchesSearch && matchesStatus && matchesGroup;
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const groupedClients = groupByClientStatus(filteredClients);

    // ✅ Prevent hydration mismatch by rendering only after mount
    if (!isMounted) return null;

    return (
        <div className="flex-1">
            <div className="mt-0 overflow-y-scroll no-scrollbar">
                <div className="h-auto">
                    <div className="inline-block min-w-full py-0 h-full align-middle relative">
                        <div
                            className="h-16 fixed top-0 bg-base-200 text-base-content flex justify-between items-center pr-4 pl-6 w-full">
                            <div>
                                <span className={`font-bold`} >{filteredClients
                                    .filter(client => client.navigator === selectedNavigator)
                                    .filter(client => selectedFepLeft.age !== "All" ? client.group === selectedFepLeft.age : "All")
                                    .filter(client => selectedFepLeft.status !== "All" ? client.clientStatus === selectedFepLeft.status : "All").length}</span>
                                {selectedFepLeft.status !== "All" ? " "+selectedFepLeft.status.toLowerCase() : null} {selectedFepLeft.age !== "All" ? selectedFepLeft.age.toLowerCase() : null} clients
                            </div>
                            <div>
                                <div className={`cursor-pointer`} onClick={handleGroupChange}>
                                    <ToggleGroup className={` px-3 py-1 rounded-full border ${grouped ? 'border-error text-error' : 'border-base-content/30 text-base-content/30'}`} type={`single`} onToggle={handleGroupChange} title={`Group`} >
                                    <GroupIcon className={`w-6 h-6 `} /><span>{grouped ? 'Group' : 'Group'}</span>
                                </ToggleGroup></div>
                            </div>
                        </div>
                        <table className="min-w-full mt-16">
                            <tbody className="">
                            {grouped ? (
                                Object.entries(groupedClients).map(([status, clients], idx) => (
                                    <React.Fragment key={status}>
                                        <tr className="bg-gray-200 border-l-6 border-l-base-200 border-b-1 border-b-base-300">
                                            <td colSpan="5" className="py-2 px-4 font-bold">{status} ({clients.length})</td>
                                        </tr>
                                        {clients.map((person, i) => (
                                            <ClientTableItem key={`${idx}-${i}`} person={person} i={i} setEditing={setEditing} setFetching={setFetching} />
                                        ))}
                                    </React.Fragment>
                                ))
                            ) : (
                                filteredClients?.length > 0 ? (
                                    filteredClients?.map((person, i) => (
                                        <ClientTableItem key={i} person={person} i={i} setEditing={setEditing}/>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-sm text-gray-500">
                                            No clients found.
                                        </td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
