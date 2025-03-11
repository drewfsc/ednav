"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Client = {
  _id: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  createdAt?: string
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

  const filteredClients = clients.filter((client) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      client.firstName?.toLowerCase().includes(searchLower) ||
      client.lastName?.toLowerCase().includes(searchLower) ||
      client.email?.toLowerCase().includes(searchLower) ||
      client.phone?.includes(searchTerm)
    )
  })

  return (
    <div className="space-y-6 w-full max-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Button asChild>
          <Link href="/dashboard/clients/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Link>
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Client Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2 w-full">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-base-content/50" />
              <Input
                type="search"
                placeholder="Search clients..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="space-y-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="h-10 bg-base-300 animate-pulse rounded" />
                ))}
            </div>
          ) : clients.length > 0 ? (
            <div className="rounded-md border overflow-x-auto w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden sm:table-cell">Phone</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client._id}>
                      <TableCell className="font-medium">
                        {client.firstName} {client.lastName}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{client.email || "—"}</TableCell>
                      <TableCell className="hidden sm:table-cell">{client.phone || "—"}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/clients/${client._id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10 text-base-content/70">
              No clients found. Add your first client to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

