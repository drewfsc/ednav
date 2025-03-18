"use client";
import React, {useEffect, useState} from "react"
import RightListClients from "@/components/RightListClients";
import LeftNavEntire from "@/components/LeftNavEntire";
import DashboardStats from "@/components/DashboardStats";

export default function PerfectLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {
    // const { selectedNavigator, setSelectedNavigator } = useNavigators()
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
          <div className="flex max-h-screen">
              <div className={`rounded-l-xl overflow-hidden my-8 ml-8 bg-base-300/70 shadow-xl backdrop-blur-[2px]`}>
                  <LeftNavEntire/>
              </div>
              <div className={"flex-1 mx-4 my-8 "}>
                  <main className="h-full flex">
                      <div className={`bg-base-300/70 w-full shadow-xl backdrop-blur-[2px] flex flex-col `}>
                          {/*<HeaderBar/>*/}
                          <div className={`flex-1 flex flex-col`}>
                              <div className={`bg-primary/60 py-6 shadow-lg`}>
                                  <DashboardStats metrics={metrics} loading={loading}/>
                              </div>
                              <div className={`h-10 bg-primary/80`}/>
                          </div>
                          {children}
                      </div>
                  </main>
              </div>
              <div className={`rounded-r-xl overflow-hidden my-8 mr-8 bg-base-300/70  shadow-xl backdrop-blur-[2px] xl:w-[33%]`}>
                  <RightListClients searchVisible={true}/>
              </div>
          </div>
  )
}
