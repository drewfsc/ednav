import React from "react"
import {LineChartt} from "@/components/viz/LineChart"
import {BarChartt} from "@/components/viz/BarChart"
import {PieChartt} from "@/components/viz/PieChart"
import {InteractiveLineChart} from "@/components/viz/InteractiveLineChart";

export default function DashboardPage() {

  return (
      <div className={`dashboard-viz flex-col overflow-y-scroll no-scrollbar`}>
        <div className={`flex flex-row justify-around mx-4 my-10`}>
          <div><BarChartt/></div>
            <div><PieChartt/></div>
          <div><LineChartt/></div>

        </div>
        <InteractiveLineChart/>
        <InteractiveLineChart/>
        <InteractiveLineChart/>
        <InteractiveLineChart/>
      </div>
  )
}

