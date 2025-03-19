"use client";
import React, {useEffect, useState} from "react"
import RightListClients from "@/components/RightListClients";
import LeftNavEntire from "@/components/LeftNavEntire";
import DashboardStats from "@/components/DashboardStats";
import {useEditing} from "@/contexts/EditingContext";
import NavLeftWithIcons from "@/components/nav-left-with-icons";
import {NavigatorsProvider} from "@/contexts/NavigatorsContext";
const isClient = typeof window !== "undefined";

export default function PerfectLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {

    const [isClient, setIsClient] = React.useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const {editing, setEditing} = useEditing()
    const [loading, setLoading] = useState(true)
    const [metrics, setMetrics] = useState({
        referrals: [{count: 0}],
        clients: 0,
        graduations: [{count: 0}],
        enrollments: [{count: 0}],
        clientsPerRegion: [],
        clientStatuses: []
    })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [response] = await Promise.all([
                    fetch("/api/metrics")
                ])

                const metrics = await response.json()

                setMetrics({
                    graduations: metrics.graduatedClientsPerMonth,
                    referrals: metrics.clientsReferredPerMonth,
                    clients: metrics.totalClients,
                    enrollments: metrics.enrolledClientsPerMonth,
                    clientsPerRegion: metrics.clientsByRegion,
                    clientStatuses: metrics.clientStatusBreakdown
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
        // @ts-ignore
        <NavigatorsProvider>
          <div className="flex max-h-screen">
              <div className={`rounded-l-xl overflow-hidden my-8 ml-8 bg-base-300/60 shadow-xl backdrop-blur-xs max-w-[12%]`}>

                  <LeftNavEntire/>
              </div>

              <div className={"flex-1 mx-4 my-8 "}>
                  <main className="h-full flex">
                      <div className={`bg-base-300/80 w-full shadow-xl backdrop-blur-xs flex flex-col relative overflow-hidden`}>
                          <div className={`absolute top-0 left-0 bg-base-300 z-30 w-full h-full transform duration-500 p-6  ${editing ? '' : 'translate-x-[1500px] '}`}>
                              <div onClick={() => (setEditing(null))} className={`absolute top-8 right-12 text-2xl font-extralight cursor-pointer py-1 px-3 bg-primary rounded-full text-primary-content`}>X</div>
                              <div className={`text-4xl p-3 font-light`}>Add a Client</div>
                              {/*<div className={``}><AddClientForm formStuff={metrics}/></div>*/}
                          </div>
                          <div className={`flex-col`}>
                              <div className={`bg-primary/60 py-6 shadow-lg`}>
                                  <DashboardStats metrics={metrics} loading={loading}/>
                              </div>
                              <div className={"h-18 bg-primary/80 text-primary-content items-center flex pl-8"}>
                                  <NavLeftWithIcons/>
                              </div>
                          </div>
                          {children}
                      </div>
                  </main>
              </div>

              <div className={`rounded-r-xl overflow-hidden my-8 mr-8 bg-base-300/80  shadow-xl backdrop-blur-xs xl:w-[33%]`}>
                  <RightListClients/>
              </div>
          </div>
        </NavigatorsProvider>
  )
}
