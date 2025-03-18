"use client"

import { useEffect, useState } from "react"
import ClientTable from "@/components/ClientTable";

export default function ClientsPage() {
  const [stats, setStats] = useState({
    clients: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts from each collection
        const [clientsRes] = await Promise.all([
          fetch("/api/clients"),
        ])

        const clients = await clientsRes.json()

        setStats({
          clients: clients,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats().then()
  }, [])

  return (
      loading && stats.clients.length === 0 ? (
          Array(12).fill(0).map((_, i) => (
              <div key={i} className="flex w-full gap-6 space-y-10">
                  <div className="skeleton h-8 w-50"></div>
                  <div className="skeleton h-8 w-138"></div>
                  <div className="skeleton h-8 w-full"></div>
                  <div className="skeleton h-8 w-84"></div>
              </div>
          ))

      ) : (
          <div className="flex w-full gap-6 space-y-10">
              <ClientTable clients={stats.clients} />
          </div>

      )
  )
}

