"use client";
import React, {useEffect, useState} from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {useClients} from "@/contexts/ClientsContext";
import {useFeps} from "@/contexts/FepsContext";
import RightListClientSingle from "@/components/RightListClientSingle";
import ClientTable from "@/components/client-table";

export default function RightListClients({searchVisible}) {
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

    return (
        <ClientTable clients={filteredClients} loading={loading} onClientClick={handleClientClick}/>
    );
}
