"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GuidedActivityForm } from "./guided-activity-form"

type Client = {
  _id: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  address?: string
  dateOfBirth?: string
  notes?: string
  youth: boolean
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button onClick={onClose} variant="ghost" size="sm" className="text-base-content hover:bg-base-200">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">Back</span>
          </Button>
          <h1 className="text-2xl font-bold text-base-content">
            {client.firstName} {client.lastName}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <GuidedActivityForm client={{ ...client, youth: false }} onActivityAdded={refreshActions} />
          <Button variant="outline" size="sm" onClick={onClose} className="text-base-content hover:bg-base-200">
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
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
                  value="activity"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-content"
                >
                  Activity
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

              <TabsContent value="activity">
                <div className="space-y-4">
                  <h3 className="font-medium text-base-content">Client Activity</h3>
                  {loading ? (
                    <div className="space-y-2">
                      {Array(3)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="h-10 bg-base-300 animate-pulse rounded" />
                        ))}
                    </div>
                  ) : actions.length > 0 ? (
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Created By</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {actions.map((action) => (
                            <TableRow key={action._id}>
                              <TableCell className="font-medium">{action.type}</TableCell>
                              <TableCell>{action.description}</TableCell>
                              <TableCell>{new Date(action.createdAt).toLocaleString()}</TableCell>
                              <TableCell>{action.createdBy || "System"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-base-content/70">No activity recorded for this client.</p>
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

