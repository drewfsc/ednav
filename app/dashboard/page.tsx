"use client";
import React from "react"
import {LineChartt} from "@/components/viz/LineChart"
import {BarChartt} from "@/components/viz/BarChart"
import {PieChartt} from "@/components/viz/PieChart"
import {InteractiveLineChart} from "@/components/viz/InteractiveLineChart";
import ThemedChart from "@/components/ThemedBarChart";

export default function DashboardPage() {

  return (
      <div className={`dashboard-viz flex-col overflow-y-scroll no-scrollbar`}>
        <div className={`flex flex-row justify-around my-4`}>
            <div className={`w-1/3`}><ThemedChart/></div>
            <div className={`w-1/3`}><BarChartt/></div>
            <div className={`w-1/3`}><PieChartt/></div>
            <div className={`w-1/3`}><LineChartt/></div>
        </div>
        <InteractiveLineChart/>
        <InteractiveLineChart/>
        <InteractiveLineChart/>
        <InteractiveLineChart/>
      </div>
  )
}

