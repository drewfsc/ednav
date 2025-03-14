"use client"
// import { useSession } from "next-auth/react";
import {useEffect, useState} from "react"
import {FileText, GraduationCap, Users} from "lucide-react"
import {useClients} from "@/contexts/ClientsContext";
import ClientDescription from "@/components/client-description";
import ActivityTable from "@/components/activity-table";
import {ThemeSwitcher} from "@/components/theme-switcher";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    clients: [],
    navigators: [],
    feps: 0,
    notes: 0,
    actions: [],
  })
  const [loading, setLoading] = useState(true)
  const { selectedClient } = useClients();
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch counts from each collection
        const [clientsRes, navigatorsRes, fepsRes, notesRes, actionsRes] = await Promise.all([
          fetch(`/api/clients?navigator=${"Andrew McCauley"}`),
          fetch("/api/education-navigators"),
          fetch("/api/feps"),
          fetch("/api/notes"),
          fetch("/api/actions"),
        ])

        const clients = await clientsRes.json()
        const navigators = await navigatorsRes.json()
        const feps = await fepsRes.json()
        const notes = await notesRes.json()
        const actions = await actionsRes.json()

        setStats({
          clients: clients.length,
          navigators: navigators.length,
          feps: feps.length,
          notes: notes.length,
          actions: actions,
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
  ]

  return (
      <div>
        {/*{session && <div className="flex justify-between items-center">YAAAAY</div>}*/}
        <div className={`grid grid-cols-3 gap-6 ${selectedClient ? 'invisible h-0 overflow-hidden' : ''}`}>
          {statCards.map((card, i) => (
              <div key={i} className="bg-base-200 rounded p-6">
                <h2 className="mb-1 font-medium">{card.title}</h2>
                <p className={`text-sm`}>A card component has a figure, a body part, and inside body there are title and actions parts</p>
              </div>
          ))}
        </div>
        <div>
          {selectedClient && <div className={`grid grid-cols-3 gap-6 w-full`}>
            <div className={`col-span-3 bg-base-200 min-h-10 p-6 rounded-box flex items-center justify-between font-normal text-2xl`}>
              <div className={`text-3xl font-medium`}>{selectedClient.name}</div>
              <div><span className={`text-lg text-base-content/60 font-light`}>Referred: </span>{selectedClient.dateReferred}</div>
              <div><span className={`text-lg text-base-content/60 font-light`}>Age Group: </span>{selectedClient.group}</div>
              <div><span className={`text-lg text-base-content/60 font-light`}>Case Number: </span>{selectedClient.caseNumber}</div>
            </div>
            <div className={`col-span-1 bg-base-200 min-h-80 rounded-box`}>
              <ClientDescription client={selectedClient} />
            </div>
            <div className={`col-span-2 bg-base-200`}>
              <ActivityTable actions={stats.actions} />
            </div>
          </div>}
        </div>
        <div className={`m-auto  bg-base-200 rounded z-20 py-4 my-4`}>
          <ThemeSwitcher />
        </div>
      </div>

  )
}

