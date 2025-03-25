"use client";
import React, {useEffect, useState} from "react"
// import {LineChartt} from "@/components/viz/LineChart"
// import {BarChartt} from "@/components/viz/BarChart"
// import {PieChartt} from "@/components/viz/PieChart"
// import {InteractiveLineChart} from "@/components/viz/InteractiveLineChart";
import {SignOut} from "phosphor-react"
import BentoHome from "@/components/BentoHome";
import MetricsHome from "@/components/MetricsHome";

export default function DashboardPage() {
    const [, setMetrics] = useState({
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
                    fetch("/api/metrics", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch",
                            "Date": new Date().toUTCString(),
                            "Connection": "keep-alive",
                            "Keep-Alive": "timeout=5",
                            "Transfer-Encoding": "chunked"
                        }
                    })
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
                // setLoading(false)
            }
        }
        fetchStats().then()
    }, [])

  return (
      <div className={`dashboard-viz flex-col overflow-y-scroll no-scrollbar`}>
          <div className={`px-8 py-4 h-16 bg-base-200 text-base-content flex items-center justify-between text-xl font-extralight`}>
            Dashboard
              <SignOut size={28} onClick={() => {}}/>
          </div>
          <MetricsHome/>
          <BentoHome/>
          <div className={`grid grid-cols-3 py-4 px-4`}>
              {/*<div className={`col-span-3  md:col-span-1`}><BarChartt metrics={metrics}/></div>*/}
              {/*<div className={` md:col-span-1`}><PieChartt metrics={metrics}/></div>*/}
              {/*<div className={`col-span-2 md:col-span-1`}><LineChartt/></div>*/}
          </div>
          <div className={`px-8`}>
              {/*<InteractiveLineChart/>*/}
              {/*<InteractiveLineChart/>*/}
              {/*<InteractiveLineChart/>*/}
              {/*<InteractiveLineChart/>*/}
          </div>
      </div>
  )
}

