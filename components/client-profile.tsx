"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GuidedActivityForm } from "./guided-activity-form"
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
  client: Client
  onClose: () => void
}

export function ClientProfile({ client, onClose }: ClientProfileProps) {
  const [actions, setActions] = useState<Action[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await fetch(`/api/actions?clientId=${client._id}`)
        if (response.ok) {
          const data = await response.json()
          setActions(data)
        }
      } catch (error) {
        console.error("Error fetching client actions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchActions()
  }, [client._id])

  const refreshActions = async () => {
    try {
      const response = await fetch(`/api/actions?clientId=${client._id}`)
      if (response.ok) {
        const data = await response.json()
        setActions(data)
      }
    } catch (error) {
      console.error("Error fetching client actions:", error)
    }
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="w-full ">
          <div className={`card bg-base-100 m-6`}>
            <div className={`card-body`}>
              <div className={`card-title`}>
                <div className={`flex items-center gap-4`}>
                  <Button variant="outline" size="sm" onClick={onClose} className="text-base-content hover:bg-base-200">
                    <ArrowLeft className="h-4 w-4" />
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
      <ClientDescriptionList client={client} />
      <div className={`p-6`}>
        <GuidedActivityForm client={client} onActivityAdded={refreshActions} />
      </div>

    </div>
  )
}

