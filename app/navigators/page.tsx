"use client"

import { useEffect, useState } from "react"
import NavigatorsTable from "@/components/navigators-table";

export default function NavigatorsPage() {
  const [stats, setStats] = useState({
    clients: [],
    navigators: [],
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
          clients: clients,
          navigators: navigators,
          feps: feps.length,
          notes: notes.length,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats().then()
  }, [])
console.log(loading)
  return (
      <NavigatorsTable navigators={stats.navigators} />
  )
}

