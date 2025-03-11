"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Plus, Search, ChevronRight, Mail, Phone } from "lucide-react"
import Link from "next/link"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"

type Client = {
  _id: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  address?: string
}

interface SidebarRightProps extends React.ComponentProps<typeof Sidebar> {
  onSelectClient: (client: Client) => void
  selectedClientId?: string
}

export function SidebarRight({ onSelectClient, selectedClientId, ...props }: SidebarRightProps) {
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

  const handleClientClick = (client: Client) => {
    onSelectClient(client)
  }

  return (
    <Sidebar
      collapsible="none"
      className="hidden lg:flex sticky top-0 h-svh border-l border-base-300 bg-base-200 flex-basis-1/3 max-w-[33%]"
      {...props}
    >
      <SidebarHeader className="h-auto border-b border-base-300">
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="text-lg font-semibold text-base-content">Clients</h2>
          <Link href="/dashboard/clients/new" className="btn btn-sm btn-primary">
            <Plus className="h-4 w-4" />
            New
          </Link>
        </div>
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-base-content/50" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="pl-8 w-full bg-base-100 border-base-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto">
        <div className="divide-y divide-base-300">
          {loading ? (
            Array(10)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </div>
              ))
          ) : filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <div
                key={client._id}
                className={`p-4 cursor-pointer hover:bg-base-300 transition-colors ${
                  selectedClientId === client._id ? "bg-base-300" : ""
                }`}
                onClick={() => handleClientClick(client)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-grow">
                    <Avatar className="h-10 w-10 bg-primary text-primary-content">
                      <AvatarFallback>
                        {client.firstName?.[0]}
                        {client.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-grow">
                      <div className="font-medium text-base-content truncate">
                        {client.firstName} {client.lastName}
                      </div>
                      <div className="flex flex-col xl:flex-row xl:gap-4">
                        {client.email && (
                          <div className="flex items-center text-xs text-base-content/70 truncate">
                            <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{client.email}</span>
                          </div>
                        )}
                        {client.phone && (
                          <div className="flex items-center text-xs text-base-content/70 truncate">
                            <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{client.phone}</span>
                          </div>
                        )}
                      </div>
                      {client.address && (
                        <div className="text-xs text-base-content/70 truncate hidden 2xl:block">{client.address}</div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-base-content/50 flex-shrink-0" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-base-content/70">No clients found</div>
          )}
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-base-300 p-4">
        <Link href="/dashboard/clients/new" className="btn btn-outline btn-block">
          <Plus className="h-4 w-4 mr-2" />
          Add New Client
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}

