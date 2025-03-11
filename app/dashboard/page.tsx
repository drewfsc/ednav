"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, FileText, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    clients: 0,
    navigators: 0,
    feps: 0,
    notes: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts from each collection
        const [clientsRes, navigatorsRes, fepsRes, notesRes] = await Promise.all([
          fetch("/api/clients"),
          fetch("/api/education-navigators"),
          fetch("/api/feps"),
          fetch("/api/notes"),
        ])

        const clients = await clientsRes.json()
        const navigators = await navigatorsRes.json()
        const feps = await fepsRes.json()
        const notes = await notesRes.json()

        setStats({
          clients: clients.length,
          navigators: navigators.length,
          feps: feps.length,
          notes: notes.length,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Clients",
      value: stats.clients,
      description: "Active client records",
      icon: Users,
      link: "/dashboard/clients",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Education Navigators",
      value: stats.navigators,
      description: "Registered navigators",
      icon: GraduationCap,
      link: "/dashboard/navigators",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Family Education Plans",
      value: stats.feps,
      description: "Active FEPs",
      icon: FileText,
      link: "/dashboard/feps",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      title: "Notes",
      value: stats.notes,
      description: "Client notes",
      icon: MessageSquare,
      link: "/dashboard/notes",
      color: "text-amber-500",
      bgColor: "bg-amber-100",
    },
  ]

  return (
    <div className="space-y-6 w-full max-w-full">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <Link href={card.link} key={i}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <div className={`${card.bgColor} p-2 rounded-full ${card.color}`}>
                  <card.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? <div className="h-8 w-16 bg-base-300 animate-pulse rounded" /> : card.value}
                </div>
                <p className="text-xs text-base-content/70 pt-1">{card.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
            <CardDescription>Latest client additions</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-base-300 animate-pulse" />
                      <div className="space-y-1">
                        <div className="h-4 w-24 bg-base-300 animate-pulse rounded" />
                        <div className="h-3 w-16 bg-base-300 animate-pulse rounded" />
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-base-content/70">Client data will appear here</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent FEPs</CardTitle>
            <CardDescription>Latest family education plans</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-base-300 animate-pulse" />
                      <div className="space-y-1">
                        <div className="h-4 w-24 bg-base-300 animate-pulse rounded" />
                        <div className="h-3 w-16 bg-base-300 animate-pulse rounded" />
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-base-content/70">FEP data will appear here</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

