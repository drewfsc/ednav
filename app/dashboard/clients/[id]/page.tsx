"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Edit } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Client = {
  _id: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  address?: string
  dateOfBirth?: string
  notes?: string
}

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(`/api/clients/${params.id}`)
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

    if (params.id) {
      fetchClient()
    }
  }, [params.id])

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
        <p className="text-base-content/70 mt-2">The client you're looking for doesn't exist or has been removed.</p>
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
          <h1 className="text-2xl font-bold text-base-content">
            {client.firstName} {client.lastName}
          </h1>
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
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-content text-xl font-bold">
                {client.firstName?.[0]}
                {client.lastName?.[0]}
              </div>
              <div>
                <h3 className="font-medium text-base-content">
                  {client.firstName} {client.lastName}
                </h3>
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

              {client.phone && (
                <div className="flex items-center gap-2 text-base-content">
                  <Phone className="h-4 w-4 text-base-content/70" />
                  <span>{client.phone}</span>
                </div>
              )}

              {client.address && (
                <div className="flex items-center gap-2 text-base-content">
                  <MapPin className="h-4 w-4 text-base-content/70" />
                  <span>{client.address}</span>
                </div>
              )}

              {client.dateOfBirth && (
                <div className="flex items-center gap-2 text-base-content">
                  <Calendar className="h-4 w-4 text-base-content/70" />
                  <span>{new Date(client.dateOfBirth).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-base-100 border-base-300">
          <CardHeader>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-base-200">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-content"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="feps"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-content"
                >
                  FEPs
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-content"
                >
                  Notes
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsContent value="overview">
                <div className="space-y-4">
                  <h3 className="font-medium text-base-content">Client Notes</h3>
                  {client.notes ? (
                    <p className="text-base-content">{client.notes}</p>
                  ) : (
                    <p className="text-base-content/70">No notes available for this client.</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="feps">
                <div className="text-center py-8 text-base-content/70">
                  No Family Education Plans available for this client.
                </div>
              </TabsContent>
              <TabsContent value="notes">
                <div className="text-center py-8 text-base-content/70">No notes available for this client.</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

