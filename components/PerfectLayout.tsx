"use client";
import React, {useEffect, useState} from "react"
import LeftNavEntire from "@/components/LeftNavEntire";
import {useEditing} from "@/contexts/EditingContext";
import {useClients} from "@/contexts/ClientsContext";
import ClientProfile from "@/components/ClientProfile";
import ClientTable from "@/components/ClientTable";
import {NavigatorProvider, useNavigators} from "@/contexts/NavigatorsContext";
import AddClientForm from "@/components/AddClientForm";
import SuccessMessage from "@/components/SuccessMessage";


export default function PerfectLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {

    const [, setIsClient] = React.useState(false);
    const [, setIsMounted] = useState(false);
    const {editing, setEditing} = useEditing()
    const { selectedClient } = useClients();
    const [userClients, setUserClients] = useState([]);
    const { selectedNavigator, setSelectedNavigator } = useNavigators();
    const [open, setOpen] = useState(false);

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



    useEffect(() => {
        setIsMounted(true); // ✅ Mark component as mounted before interacting with localStorage
        if (typeof window !== "undefined") {
            const storedNavigator = localStorage.getItem("navigatorName") || "";
            // @ts-ignore
            setSelectedNavigator(storedNavigator || null);
        }
    }, []);

    return (
        <div className={`w-full h-screen overflow-hidden relative`}>
            <div className={`fixed bottom-12 right-6 w-[300px] h-[30px] z-50 transition-all duration-300 ease-in-out invisible opacity-0 ${open ? 'visible opacity-100' : ''}`}>
                <SuccessMessage message={`Client saved successfully.`} setOpen={setOpen}/>
            </div>
            <div className={`h-screen overflow-hidden flex`}>

                <div className="flex max-h-screen overflow-hidden flex-1 ">
                    <div className={`w-30 md:w-60`}>
                        <NavigatorProvider>
                            <LeftNavEntire setEditing={setEditing}/>
                        </NavigatorProvider>
                    </div>
                    <div
                        className={`bg-base-100 w-50 md:w-90 overflow-y-scroll no-scrollbar flex-col h-screen border-r border-base-300 z-40 relative drop-shadow-lg`}>
                        <NavigatorProvider>
                            <ClientTable userClients={userClients} setEditing={setEditing}/>
                        </NavigatorProvider>
                    </div>
                    <div className={"max-h-full flex-1"}>
                        <main className="h-full flex">
                            <div className={`bg-base-100 flex-1 flex flex-col relative overflow-hidden`}>
                                <div
                                    className={`absolute top-0 left-0 bg-base-100 z-30 w-full h-full transform duration-500  ${editing === "add-client" ? '' : 'translate-x-[1800px] '}`}>
                                    {
                                        editing === "add-client" && <AddClientForm setEditing={setEditing} setOpen={setOpen}/>
                                    }
                                </div>
                                <div
                                    className={`absolute top-0 left-0 bg-base-100 z-30 w-full h-full transform duration-500  ${editing === "client" ? '' : 'translate-x-[1800px] '}`}>
                                    {
                                        selectedClient &&
                                        <ClientProfile setEditing={setEditing} client={selectedClient}/>
                                    }
                                </div>
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
