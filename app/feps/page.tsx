"use client"

import { useEffect, useState } from "react"
import FepsTable from "@/components/feps-table";

export default function NavigatorsPage() {
  const [stats, setStats] = useState({
    feps: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts from each collection
        const [fepsRes] = await Promise.all([
          fetch("/api/feps"),
        ])
        const feps = await fepsRes.json()
        setStats({
          feps: feps
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
      <FepsTable feps={stats.feps} />
  )
}

