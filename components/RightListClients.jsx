"use client";
import React, {useEffect, useState} from 'react';
// import {Skeleton} from "@/components/ui/skeleton";
import ClientTable from "@/components/ClientTable";
import {useFepsLeft} from "@/contexts/FepsLeftContext";

export default function RightListClients({selectedNavigator}) {
    const {selectedFepLeft, setSelectedFepLeft} = useFepsLeft("");
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm] = useState("")

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clients?navigator=${selectedNavigator}`)
                if (response.ok) {
                    const data = await response.json()
                    // const chosenClient = data.find((client) => client.name === "")
                    setClients(data)
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
        const matchesStatus = selectedFepLeft.status ? client.clientStatus === selectedFepLeft.status : true;
        const matchesAge = selectedFepLeft.age ? client.group === selectedFepLeft.age : true;
        return matchesSearch && matchesStatus && matchesAge;
    })

    return (
        <ClientTable clients={filteredClients} loading={loading}/>
    );
}
