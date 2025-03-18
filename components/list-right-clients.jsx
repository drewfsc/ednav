"use client";
import React, {useEffect, useState} from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {PersonSimpleWalk, ProhibitInset, TrendUp, GraduationCap} from "phosphor-react";
import {useClients} from "@/contexts/ClientsContext";
import {useFeps} from "@/contexts/FepsContext";

const ActiveSpan = () => {
    return (
        <div className={`client-list-item bg-primary`}>
            <PersonSimpleWalk size={20} className="text-primary-content" />
        </div>
    )
}
const InProgressSpan = () => {
    return (
        <div className={`client-list-item bg-accent`}>
            <TrendUp size={20} className={`text-neutral-100`} />
        </div>
    )
}
const GraduatedSpan = () => {
    return (
        <div className={`client-list-item bg-secondary`}>
            <GraduationCap size={20} className={`text-secondary-content`} />
        </div>
    )
}
const InactiveSpan = () => {
    return (
        <div className={`client-list-item bg-warning`}>
            <ProhibitInset size={20} className={`text-warning-content`} />
        </div>
    )
}

export default function ListRightClients({searchVisible}) {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm] = useState("")
    const [status] = useState("")
    const [age] = useState("")
    const {selectedFep } = useFeps();
    const { selectedClient, setSelectedClient } = useClients();


    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch("/api/education-navigators")
                if (response.ok) {
                    const data = await response.json()
                    const chosenClient = data.find((client) => client.name === "Andrew McCauley")
                    setClients(chosenClient.clients)
                }
            } catch (error) {
                console.error("Error fetching clients:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchClients().then()
    }, [])

    const filteredClients = clients.filter((client) => {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch = client.name?.toLowerCase().includes(searchLower);
        const matchesStatus = status ? client.clientStatus === status : true;
        const matchesAge = age ? client.isYouth.toString() === age : true;
        return matchesSearch && matchesStatus && matchesAge;
    })

    const handleClientClick = (clientObject) => {
        setSelectedClient(clientObject)
    }

    const StatusIcon = (status) => {
        switch (status) {
            case "Active":
                return <ActiveSpan/>;
            case "Inactive":
                return <InactiveSpan/>
            case "Graduated":
                return <GraduatedSpan/>
            case "In Progress":
                return <InProgressSpan/>
        }
    }
    return (
        <div className={`group pb-8 h-full`}>
            {searchVisible && (
                <div className={` w-auto`}>
                    <div className={` bg-primary/60 h-30`}></div>
                    <div className="h-10 bg-primary/80"></div>
                </div>
            )}

            <div className={`w-full h-full overflow-y-scroll no-scrollbar`}>
                <ul className="list w-full p-[0]">
                    {loading ? (
                            Array(10)
                                .fill(0)
                                .map((_, i) => (
                                    <div key={i} className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-10 w-10 rounded-full"/>
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-24"/>
                                                <Skeleton className="h-3 w-16"/>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )
                        : filteredClients.length > 0 ? (
                            filteredClients.map((client) => (
                                <li key={client._id}
                                    className={`h-18 px-8  cursor-pointer hover:bg-primary/50 hover:border-y hover:border-primary/80 text-lg flex ${selectedClient?._id === client._id ? 'hover:text-primary-content bg-accent text-primary-content ' : ''}`}
                                    onClick={() => {
                                        const thisClient = clients.find((c) => c._id === client._id)
                                        handleClientClick(thisClient)
                                    }}>
                                    <div className="flex items-center gap-10 bg-transparent text-xl">
                                        <div className={`shadow-lg shadow-black`}>
                                            {StatusIcon(client.clientStatus)}
                                        </div>
                                        <div className=" ">
                                            <div
                                                className={`${selectedClient?._id === client._id ? 'font-medium ' : ''}`}>{client.name}</div>
                                            <div
                                                className={`text-xs font-light ${selectedClient?._id === client._id ? '' : ''}`}>{client.latestInteraction}</div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <div className="p-8 text-center text-base-content/70">No clients found</div>
                        )}
                </ul>
            </div>
        </div>
    );
}
