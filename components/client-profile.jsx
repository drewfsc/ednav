"use client"

import {useEffect, useState} from "react"
import {ArrowLeft} from "lucide-react"
import {Button} from "./ui/button"
import {GuidedActivityForm} from "./guided-activity-form"
import ClientDescriptionList from "../components/client-description-list";

const getClientActionsUrl = (clientId) => `/api/actions?clientId=${clientId}`;

export default function ClientProfile ({client, onCloseAction}) {
    // const [clientActions, setClientActions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchActionsData = async (clientId) => {
      try {
        const response = await fetch(getClientActionsUrl(clientId));
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          // setClientActions(data);
        }
      } catch (error) {
        console.error("Error fetching client actions:", error);
      }
    };

    useEffect(() => {
      setLoading(true);
      console.log(loading)
      fetchActionsData(client._id).finally(() => setLoading(false));
    }, [client._id]);

    return (
        <div className="w-full">
          <div className="w-full">
            <div className="w-full ">
              <div className={`card bg-base-100 m-6`}>
                <div className={`card-body`}>
                  <div className={`card-title`}>
                    <div className={`flex items-center gap-4`}>
                      <Button variant="outline" size="sm" onClick={onCloseAction}
                              className="text-base-content hover:bg-base-200">
                        <ArrowLeft className="h-4 w-4"/>
                      </Button>
                      <div className={`text-xl`}>
                        <div className={`text-2xl`}>{client.name}</div>
                        <div className={`text-sm font-normal -mt-1`}>{client.caseNumber}</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <ClientDescriptionList client={client}/>
          <div className={`p-6`}>
            <GuidedActivityForm client={client} onActivityAddedAction={() => fetchActionsData(client._id)}/>
          </div>
        </div>
    )
}

