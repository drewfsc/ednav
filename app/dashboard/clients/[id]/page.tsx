"use client"

import React, { useEffect, useState } from "react"
import { ArrowLeft, Mail, Phone, Calendar, Edit } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useClients } from "@/contexts/ClientsContext"
import { useParams } from "next/navigation"

type Client = {
  _id: string
  name: string
  email: string
  contactNumber: string
  caseNumber: number
  dob: string
  fep: string
  dateReferred: string
  lastGrade: string
  hadOrientation: string
  pin: number
  region: number
  clientStatus: string
  tabe: string
  transcripts: string
  officeCity: string
  group: string
  schoolIfEnrolled: string
  ttsDream: string
  createdAt: string
  latestInteraction: string
  isYouth: boolean
}

export default function ClientProfilePage() {
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams() // ✅ Next.js 13+ way of accessing dynamic route params
  const { id } = params as { id: string }
  const { selectedClient } = useClients()

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(`/api/clients/${id}`)
        if (response.ok) {
          const data = await response.json()
          setClient(data)
        }
      } catch (error) {
        console.error("Error fetching client:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchClient()
    }
  }, [id])

  if (loading) {
    return (
        <div className="space-y-4">
          <div className="h-8 w-48 bg-base-300 animate-pulse rounded"></div>
          <div className="h-64 bg-base-300 animate-pulse rounded"></div>
        </div>
    )
  }

  if (!client) {
    return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-base-content">Client not found</h2>
          <p className="text-base-content/70 mt-2">
            The client you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/dashboard/clients" className="btn btn-primary mt-4">
            Back to Clients
          </Link>
        </div>
    )
  }

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/clients" className="btn btn-ghost btn-sm">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:ml-2">Back</span>
            </Link>
            <h1 className="text-2xl font-bold text-base-content">{selectedClient?.name}</h1>
          </div>
          <Link href={`/dashboard/clients/${client._id}/edit`} className="btn btn-primary btn-sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 bg-base-100 border-base-300">
            <CardHeader>
              <CardTitle className="text-base-content">Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-medium text-base-content">{client.name}</h3>
                  <p className="text-sm text-base-content/70">Client ID: {client._id}</p>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                {client.email && (
                    <div className="flex items-center gap-2 text-base-content">
                      <Mail className="h-4 w-4 text-base-content/70" />
                      <span>{client.email}</span>
                    </div>
                )}

                {client.contactNumber && (
                    <div className="flex items-center gap-2 text-base-content">
                      <Phone className="h-4 w-4 text-base-content/70" />
                      <span>{client.contactNumber}</span>
                    </div>
                )}

                {client.dob && (
                    <div className="flex items-center gap-2 text-base-content">
                      <Calendar className="h-4 w-4 text-base-content/70" />
                      <span>{new Date(client.dob).toLocaleDateString()}</span>
                    </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
