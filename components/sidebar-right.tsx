"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {Search, Phone, ChevronLeft} from "lucide-react"
// import Link from "next/link"

import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"

type Client = {
  clientStatus: React.JSX.Element;
  _id: string
  name: string
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
    <div
      collapsible="none"
      className="hidden lg:flex sticky top-0 h-svh w-full"
      {...props}
    >
      <div className="h-auto relative">
        <div className=" fixed top-0 right-0 bg-base-200 z-20 shadow-lg w-[25%]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-base-content/50" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="px-8 py-10 w-full bg-base-300 border-0 border-b border-base-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="overflow-y-scroll overflow-hidden h-full w-full top-0 right-0 shadow-lg bg-base-200 z-10">
        <div className="overflow-y-scroll divide-y divide-base-content/10 border-l border-base-300 mt-20">
          {loading ? (
            Array(10)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full"/>
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
                    <ChevronLeft className="h-6 w-6 text-base-content/30 flex-shrink-0" />
                    <Avatar className="h-10 w-10 bg-primary text-primary-content">
                      <AvatarFallback>
                        {client.firstName?.[0]}
                        {client.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-grow">
                      <div className="text-base-content/80 text-sm">
                        {client.name}
                      </div>
                      <div className="flex flex-col xl:flex-row xl:gap-4">

                        {client.clientStatus && (
                          <div className="flex items-center text-xs text-base-content/60 truncate">
                            <span className="truncate">{client.clientStatus}</span>
                          </div>
                        )}
                      </div>
                      {client.address && (
                        <div className="text-xs text-base-content/70 truncate hidden 2xl:block">{client.address}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-base-content/70">No clients found</div>
          )}
        </div>
      </div>
    </div>
  )
}

