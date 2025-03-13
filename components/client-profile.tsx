"use client"

import {Component, useEffect, useState} from "react"
import {ArrowLeft} from "lucide-react"
import {Button} from "@/components/ui/button"
import {GuidedActivityForm} from "./guided-activity-form"
import ClientDescriptionList from "@/components/client-description-list";

export type Client = {
    _id: string,
    name: string,
    email: string,
    contactNumber: string,
    caseNumber: number,
    dob: string,
    fep: string,
    dateReferred: string,
    lastGrade: string,
    hadOrientation: string,
    pin: number,
    region: number,
    clientStatus: string,
    tabe: string,
    transcripts: string,
    officeCity: string,
    group: string,
    schoolIfEnrolled: string,
    ttsDream: string,
    createdAt: string,
    latestInteraction: string,
    isYouth: boolean,
}

type Action = {
    _id: string
    clientId: string
    type: string
    description: string
    createdAt: string
    createdBy?: string
}

interface ClientProfileProps {
    client: Client,
    onCloseAction: () => void,
}

const getClientActionsUrl = (clientId: string) => `/api/actions?clientId=${clientId}`;

export class ClientProfile extends Component<ClientProfileProps> {
  render() {
    let {client, onCloseAction} = this.props;
    const [clientActions, setClientActions] = useState<Action[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchActionsData = async (clientId: string) => {
      try {
        const response = await fetch(getClientActionsUrl(clientId));
        if (response.ok) {
          const data = await response.json();
          setClientActions(data);
        }
      } catch (error) {
        console.error("Error fetching client actions:", error);
      }
    };

    useEffect(() => {
      setLoading(true);
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
}

