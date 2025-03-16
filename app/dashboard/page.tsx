"use client"
import React, {useEffect, useState} from "react"
import {useClients} from "@/contexts/ClientsContext";
import {LineChartt} from "@/components/viz/LineChart"
import {BarChartt} from "@/components/viz/BarChart"
import {PieChartt} from "@/components/viz/PieChart"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    clients: [],
    navigators: [],
    feps: 0,
    notes: 0,
    actions: [],
    metrics: []
  })
  const [loading, setLoading] = useState(true)
  const { selectedClient, setSelectedClient } = useClients();
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts from each collection
        const [clientsRes, navigatorsRes, fepsRes, notesRes, actionsRes, metricsRes] = await Promise.all([
          fetch(`/api/clients?navigator=${"Andrew McCauley"}`),
          fetch("/api/education-navigators"),
          fetch("/api/feps"),
          fetch("/api/notes"),
          fetch("/api/actions"),
          fetch("/api/metrics/wordcloud")
        ])

        const clients = await clientsRes.json()
        const navigators = await navigatorsRes.json()
        const feps = await fepsRes.json()
        const notes = await notesRes.json()
        const actions = await actionsRes.json()
        const metrics = await metricsRes.json()

        setStats({
          clients: clients.length,
          navigators: navigators.length,
          feps: feps.length,
          notes: notes.length,
          actions: actions,
          metrics: metrics
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
      <div>
        <div className={`dashboard-viz flex gap-4 justify-around`}>
          <div><BarChartt/></div>
          <div><LineChartt/></div>
          <div><PieChartt/></div>
        </div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
  )
}

