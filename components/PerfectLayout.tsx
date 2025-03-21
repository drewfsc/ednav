"use client";
import React, {useEffect, useState} from "react"
import LeftNavEntire from "@/components/LeftNavEntire";
import {useEditing} from "@/contexts/EditingContext";
import {useClients} from "@/contexts/ClientsContext";
import ClientProfile from "@/components/ClientProfile";
import ClientTable from "@/components/ClientTable";
import {NavigatorProvider, useNavigators} from "@/contexts/NavigatorsContext";


export default function PerfectLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {

    const [, setIsClient] = React.useState(false);
    const [, setIsMounted] = useState(false);
    const {editing, setEditing} = useEditing()
    const [, setLoading] = useState(true)
    const { selectedClient } = useClients();
    const [userClients, setUserClients] = useState([]);
    const { selectedNavigator, setSelectedNavigator } = useNavigators();


    useEffect(() => {
        setIsClient(true);
    }, []);

    // Fetch all clients and set them to a state for use in the table
    useEffect(() => {
        const fetchClients = async () => {
            let response;
            try {
                if(selectedNavigator) {
                    console.log(selectedNavigator !== "")
                    response = await fetch(`/api/clients?navigator=${selectedNavigator}`); // Replace with your API endpoint
                } else {
                    response = await fetch(`/api/clients`); // Replace with your API endpoint
                }

                if (response.ok) {
                    const data = (await response.json())
                        // .filter((client: { status: string; navigator: string; }) => client?.navigator === selectedNavigator);

                    setUserClients(data); // Update state with fetched clients
                } else {
                    console.error("Failed to fetch clients:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching clients:", error);
            }
        };
        fetchClients().then(); // Call the function here
    }, []);

    const [, setMetrics] = useState({
        referrals: [{count: 0}],
        clients: 0,
        graduations: [{count: 0}],
        enrollments: [{count: 0}],
        clientsPerRegion: [],
        clientStatuses: []
    })

    useEffect(() => {
        setIsMounted(true); // ✅ Mark component as mounted before interacting with localStorage
        if (typeof window !== "undefined") {
            const storedNavigator = localStorage.getItem("navigatorName") || "";
            // @ts-ignore
            setSelectedNavigator(storedNavigator || null);
        }
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [response] = await Promise.all([
                    fetch("/api/metrics")
                ])

                const metrics = await response.json()

                setMetrics({
                    graduations: metrics.graduatedClientsPerMonth,
                    referrals: metrics.clientsReferredPerMonth,
                    clients: metrics.totalClients,
                    enrollments: metrics.enrolledClientsPerMonth,
                    clientsPerRegion: metrics.clientsByRegion,
                    clientStatuses: metrics.clientStatusBreakdown
                })
            } catch (error) {
                console.error("Error fetching stats:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats().then()
    }, [])

    return (
        <div className={`h-screen overflow-hidden flex`}>
            <div className="flex max-h-screen overflow-hidden flex-1 ">
                <div className={`w-30 md:w-60 border border-base-300`}>
                    <NavigatorProvider>
                    <LeftNavEntire/>
                    </NavigatorProvider>
                </div>
                <div className={`bg-base-200 w-50 md:w-90 overflow-y-scroll no-scrollbar flex-col h-screen `}>
                    <ClientTable userClients={userClients} setEditing={setEditing}/>
                </div>
                <div className={"max-h-full flex-1"}>
                    <main className="h-full flex">
                        <div className={`bg-base-100 border-x border-base-300 flex-1 flex flex-col relative overflow-hidden`}>
                            <div
                                className={`absolute top-0 left-0 bg-base-100 z-30 w-full h-full transform duration-500  ${editing ? '' : 'translate-x-[1800px] '}`}>
                                <div className={``}>
                                    {
                                        selectedClient && <ClientProfile setEditing={setEditing} client={selectedClient}/>
                                    }

                                </div>
                            </div>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
