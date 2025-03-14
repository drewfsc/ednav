"use client";
import React, {useEffect, useState} from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {PersonSimpleWalk, ProhibitInset, TrendUp, GraduationCap} from "phosphor-react";
import {useClients} from "@/contexts/ClientsContext";
import {useFeps} from "@/contexts/FepsContext";

const ActiveSpan = () => {
    return (
        <div className={`bg-green-500 rounded-full p-1 w-fit`}><PersonSimpleWalk size={16} className={`text-white`} /></div>
    )
}
const InProgressSpan = () => {
    return (
        <div className={`bg-amber-500 rounded-full p-1 w-fit`}><TrendUp size={16} className={`text-white`} /></div>
    )
}
const GraduatedSpan = () => {
    return (
        <div className={`bg-purple-600 rounded-full p-1 w-fit`}><GraduationCap size={16} className={`text-white`} /></div>
    )
}
const InactiveSpan = () => {
    return (
        <div className={`bg-red-600 rounded-full p-1 w-fit`}><ProhibitInset size={17} className={`text-white`} /></div>
    )
}

export default function ListRightClients({searchVisible}) {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [status, setStatus] = useState("")
    const [age, setAge] = useState("")
    const {selectedFep } = useFeps();
    const { selectedClient, setSelectedClient } = useClients();


    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch("/api/education-navigators")
                if (response.ok) {
                    const data = await response.json()
                    const chosenClient = data.find((client) => client.name === "Andrew McCauley")
                    // console.log(chosenClient.clients)
                    setClients(chosenClient.clients)
                    // setClients(data.filter((client) => client.name === "Andrew McCauley").clients)
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

    const handleClientClick = (client) => {
        setSelectedClient(client)
    }

    const handleFilterReset = () => {
        setSearchTerm("")
        setStatus("")
        setAge("")
    }

    const StatusIcon = (status) => {
        switch (status) {
            case "Active":
                return <ActiveSpan />;
            case "Not":
                return <InactiveSpan/>
            case "Graduated":
                return <GraduatedSpan/>
            case "In Progress":
                return <InProgressSpan/>
        }
    }
    // console.log(filteredClients)
    return (
        <div className={` bg-base-200 overflow-scroll transition duration-500 rounded no-scrollbar ${selectedFep === true ? "translate-x-280 w-0 overflow-hidden collapse m-0" : "min-w-110 ml-0 m-4 "}`}>
        <div className={``}>
            {searchVisible && (
                <div className={`sticky top-0 right-0 border-b border-base-300 z-20 w-auto`}>
                    <div className={`grid grid-cols-2 gap-2 p-4 w-auto bg-primary rounded-t shadow`}>
                        <label className="input col-span-2 w-auto">
                            <input type="search" className="grow" placeholder="Search clients by name..."
                                   value={searchTerm}
                                   onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </label>
                        <select value={status} className="select" onChange={(e) => setStatus(e.target.value)}>
                            <option disabled={true}>Filter by status</option>
                            <option value={``}>All</option>
                            <option value={`Active`}>Active</option>
                            <option value={`In Progress`}>In Progress</option>
                            <option value={`Graduated`}>Graduated</option>
                            <option value={`Not`}>Inactive</option>
                        </select>
                        <select value={age} className="select" onChange={(e) => setAge(e.target.value)}>
                            <option disabled={true}>Filter by age</option>
                            <option value={``}>All</option>
                            <option value={"false"}>Adult</option>
                            <option value={"true"}>Youth</option>
                        </select>
                        <div className={`text-right col-span-2 -mx-1`}>
                            <a className="link link-primary text-primary-content text-sm" href="#" onClick={handleFilterReset}>Reset Filters</a>
                        </div>
                    </div>
                </div>
            )}

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
                            <li key={client._id} className={`list-row hover:bg-base-300 cursor-pointer rounded-none ${selectedClient?._id === client._id ? 'bg-primary text-primary-content' : ''}`}
                                onClick={() => handleClientClick(client)}>
                                <div className="flex items-center gap-3">
                                    <div>
                                        {StatusIcon(client.clientStatus)}
                                    </div>
                                    <div className="">
                                        {client.name}
                                        <div className={`text-xs text-base-content/50 ${selectedClient?._id === client._id ? 'text-primary-content' : ''}`}>{client.latestInteraction}</div>
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
