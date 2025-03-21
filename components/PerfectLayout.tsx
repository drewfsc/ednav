"use client";
import React, {useEffect, useState} from "react"
import RightListClients from "@/components/RightListClients";
import LeftNavEntire from "@/components/LeftNavEntire";
import {useEditing} from "@/contexts/EditingContext";
import {useClients} from "@/contexts/ClientsContext";
import ClientProfile from "@/components/ClientProfile";

const isClient = typeof window !== "undefined";

export default function PerfectLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {

    const [isClient, setIsClient] = React.useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("All");
    const [selectedNavigator, setSelectedNavigator] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const {editing, setEditing} = useEditing()
    const [loading, setLoading] = useState(true)
    const { selectedClient, setSelectedClient } = useClients();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const [metrics, setMetrics] = useState({
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
            setSelectedNavigator(storedNavigator);
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
                    <LeftNavEntire searchTerm={searchTerm} setSearchTerm={setSearchTerm} status={status} setStatus={setStatus}/>
                </div>
                <div className={`bg-base-200 w-50 md:w-90 overflow-y-scroll no-scrollbar flex-col h-screen `}>
                    <RightListClients setEditing={setEditing} />
                </div>
                <div className={"max-h-full flex-1"}>
                    <main className="h-full flex">
                        <div className={`bg-base-100 border-x border-base-300 flex-1 flex flex-col relative overflow-hidden`}>
                            <div
                                className={`absolute top-0 left-0 bg-base-100 z-30 w-full h-full transform duration-500  ${editing ? '' : 'translate-x-[1800px] '}`}>
                                <div className={``}>
                                    {
                                        selectedClient && <ClientProfile setEditing={setEditing} selectedNavigator={selectedNavigator} client={selectedClient}/>
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
