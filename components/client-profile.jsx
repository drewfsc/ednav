"use client"
import {useEffect, useState} from "react"
import {GuidedActivityForm} from "./guided-activity-form"
import ClientDescriptionList from "../components/client-description-list";
import {useClients} from "@/contexts/ClientsContext";
import ActivityTable from "@/components/activity-table";

const getClientActionsUrl = (clientId) => `/api/activities?clientId=${clientId}`;

export default function ClientProfile ({client, selectedNavigator}) {
    const [loading, setLoading] = useState(true);
    const [actions, setActions] = useState([]);
    const { selectedClient, setSelectedClient } = useClients();

    const fetchActionsData = async (clientId) => {

      try {
        const response = await fetch(getClientActionsUrl(clientId));
        if (response.ok) {
          const data = await response.json();
          setActions(data);
          console.log(data)
        }
      } catch (error) {
        console.error("Error fetching client activities:", error);
      }
    };

    useEffect(() => {
      setLoading(true);
      console.log(loading)
        if (selectedClient) {
            fetchActionsData(client._id).finally(() => setLoading(false));
        }
    }, [client._id]);

    return (
        <div className="w-full px-5 pt-4">
          <div className="w-full">
            <div className="w-full ">
                <div className={`items-center gap-4`}>
                    <div className={` mb-8`}>
                        <div className={`text-2xl`}>{client.name}</div>
                        <div className={` font-normal`}>{client.caseNumber}</div>
                        <div className={` font-normal`}>{selectedNavigator}</div>
                    </div>
                    <div className={`flex gap-10`}>
                        <ClientDescriptionList client={client}/>
                        <ActivityTable actions={actions} loading={loading} client={client} onActivityAddedAction={fetchActionsData}/>
                    </div>
                </div>
            </div>
          </div>

          <div className={`p-6`}>
            <GuidedActivityForm client={selectedClient} onActivityAddedAction={() => fetchActionsData(client._id)}/>
          </div>

        </div>
    )
}

