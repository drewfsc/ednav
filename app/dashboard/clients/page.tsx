"use client"

import { useEffect, useState } from "react"

type Client = {
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

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/api/clients")
        if (response.ok) {
          const data = await response.json()
          setClients(data)
        }
      } catch (error) {
        console.error("Error fetching clients:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  return (
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">

      </div>
  )
}

