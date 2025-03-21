"use client"
import React, {useEffect, useState} from "react"
import ClientProfileDetails from "./ClientProfileDetails";
import {useClients} from "@/contexts/ClientsContext";
import ActivityTable from "@/components/ActivityTable";
import {Heart, User} from "phosphor-react";
import {ChevronDown} from "lucide-react";

const getClientActionsUrl = (clientId) => `/api/activities?clientId=${clientId}`;

export default function ClientProfile({client, setEditing}) {
    const [isMounted, setIsMounted] = useState(false);
    const [selectedNavigator, setSelectedNavigator] = useState("");

    useEffect(() => {
        setIsMounted(true); // ✅ Mark component as mounted before interacting with localStorage
        if (typeof window !== "undefined") {
            const storedNavigator = localStorage.getItem("navigatorName") || "";
            setSelectedNavigator(storedNavigator);
        }
    }, [selectedNavigator]);

    const [loading, setLoading] = useState(true);
    const [actions, setActions] = useState([]);
    const {selectedClient, setSelectedClient} = useClients();
    const [tabState, setTabState] = useState("Profile");

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const fetchActionsData = async (clientId) => {

        try {
            const response = await fetch(getClientActionsUrl(clientId));
            if (response.ok) {
                const data = await response.json();
                setActions(data);
            }
        } catch (error) {
            console.error("Error fetching client activities:", error);
        }
    };

    useEffect(() => {
        setLoading(true);
        if (selectedClient) {
            fetchActionsData(client._id).finally(() => setLoading(false));
        }
    }, [client._id]);

    const tabs = [
        {name: 'Profile', href: '#', icon: User, current: true},
        {name: 'Activity', href: '#', icon: Heart, current: false},
    ]

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // ✅ Prevent hydration mismatch by rendering only after mount
    if (!isMounted) return null;

    return (
        <div className="w-full px-5 h-screen overflow-y-scroll relative">
            <div
                className={`text-2xl font-extralight absolute p-6 left-0 right-0 bg-secondary text-secondary-content`}>Client
                Profile
            </div>
            <div onClick={() => {
                setEditing(null)
                setSelectedClient(null)
            }}
                 className={`absolute top-5 right-5 text-2xl font-extralight cursor-pointer py-1 px-3 bg-base-100 rounded-full text-base-content hover:bg-primary hover:accent-primary-content`}>X
            </div>
            <div className="w-full">
                <div className="w-full ">
                    <div className={`items-center gap-4`}>
                        <div className={` mb-8`}>
                            <div className={`text-2xl`}>{client.name}</div>
                            <div className={` font-normal`}>{client.caseNumber}</div>
                            <div className={` font-normal`}>{selectedNavigator}</div>
                        </div>
                        <div className={`px-5`}>
                            <div className="grid grid-cols-1 sm:hidden">
                                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                                <select
                                    defaultValue={tabState}
                                    aria-label="Select a tab"
                                    onChange={(e) => setTabState(e.target.value)}
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 focus:-outline-offset-2 focus:outline-secondary"
                                >
                                    {tabs.map((tab) => (
                                        <option key={tab.name}>{tab.name}</option>
                                    ))}
                                </select>
                                <ChevronDown
                                    aria-hidden="true"
                                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
                                />
                            </div>
                            <div className="hidden sm:block">
                                <div className="border-b border-gray-200">
                                    <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                                        {tabs.map((tab) => (
                                            <a
                                                key={tab.name}
                                                onClick={() => setTabState(tab.name)}
                                                href={tab.href}
                                                aria-current={tab.current ? 'page' : undefined}
                                                className={classNames(
                                                    tab.name === tabState
                                                        ? 'border-accent text-accent'
                                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                    'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium',
                                                )}
                                            >
                                                <tab.icon
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        tab.name === tabState ? 'text-accent' : 'text-gray-400 group-hover:text-base-content',
                                                        '-ml-0.5 mr-2 size-5',
                                                    )}
                                                />
                                                <span>{tab.name}</span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className={`flex gap-10`}>
                            <div className={`flex-1 ${tabState === "Profile" ? '' : 'hidden'}`}>
                                <ClientProfileDetails client={client}/>
                            </div>
                            <div className={`flex-1 ${tabState === "Activity" ? '' : 'hidden'}`}>
                                <ActivityTable actions={actions} loading={loading} client={client}
                                               onActivityAddedAction={fetchActionsData}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

