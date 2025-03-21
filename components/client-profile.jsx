"use client"
import React, {useEffect, useState} from "react"
import ClientDescriptionList from "../components/client-description-list";
import {useClients} from "@/contexts/ClientsContext";
import ActivityTable from "@/components/activity-table";

const getClientActionsUrl = (clientId) => `/api/activities?clientId=${clientId}`;

export default function ClientProfile ({client, selectedNavigator, setEditing}) {
    const [loading, setLoading] = useState(true);
    const [actions, setActions] = useState([]);
    const { selectedClient, setSelectedClient } = useClients();

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

    return (
        <div className="w-full px-5 h-screen overflow-y-scroll relative">
            <div className={`text-2xl font-extralight absolute p-6 left-0 right-0 bg-secondary text-secondary-content`}>Client Profile</div>
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
                    <div className={`flex gap-10`}>
                        <div className={`w-1/3`}><ClientDescriptionList client={client}/></div>
                        <ActivityTable actions={actions} loading={loading} client={client} onActivityAddedAction={fetchActionsData}/>
                    </div>
                </div>
            </div>
          </div>
        </div>
    )
}

