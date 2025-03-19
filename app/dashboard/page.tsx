"use client";
import React from "react"
import dynamic from "next/dynamic";
// @ts-ignore
const BarChartt = dynamic(() => import("@/components/viz/BarChart").then((mod) => mod), { ssr: false });

// @ts-ignore
const PieChartt = dynamic(() => import("@/components/viz/PieChart").then((mod) => mod), { ssr: false });

// @ts-ignore
const LineChartt = dynamic(() => import("@/components/viz/LineChart").then((mod) => mod), { ssr: false });

// @ts-ignore
const InteractiveLineChart = dynamic(() => import("@/components/viz/InteractiveLineChart").then((mod) => mod), { ssr: false });
export default function DashboardPage() {
    return (
        <div className={`dashboard-viz flex-col overflow-y-scroll justify-start border no-scrollbar`}>
            <div className={`flex flex-row justify-start my-4`}>
                <div className={`w-1/3`}><BarChartt/></div>
                <div className={`w-1/3`}><PieChartt/></div>
                <div className={`w-1/3`}><LineChartt/></div>
            </div>
            <InteractiveLineChart/>
        </div>
    )
}
