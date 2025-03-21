"use client";
import React, {useEffect, useState} from 'react';
// import {Skeleton} from "@/components/ui/skeleton";
import ClientTable from "@/components/ClientTable";
import {useFepsLeft} from "@/contexts/FepsLeftContext";

export default function RightListClients({setEditing}) {
    const {selectedFepLeft} = useFepsLeft("");
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm] = useState("")
    const [selectedNavigator, setSelectedNavigator] = useState("")

    useEffect(() => {

        let navigator
        const fetchClients = async () => {
             if (typeof window !== "undefined") {
                navigator = localStorage.getItem("navigatorName") || "";
                setSelectedNavigator(navigator);
            }
            try {
                if (navigator) {
                    const response = await fetch(`/api/clients?navigator=${navigator}`)
                    if (response.ok) {
                        const data = await response.json()
                            .then(
                                (data) => {
                                    return data.filter((client) => client.navigator === navigator)
                                })
                        setClients(data)
                    }
                } else {

                    const response = await fetch(`/api/clients`)
                    if (response.ok) {
                        const data = await response.json()
                        setClients(data)
                    }
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
        <ClientTable setEditing={setEditing} clients={filteredClients} loading={loading}/>
    );
}
