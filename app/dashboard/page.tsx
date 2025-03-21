"use client";
import React from "react"
import {LineChartt} from "@/components/viz/LineChart"
import {BarChartt} from "@/components/viz/BarChart"
import {PieChartt} from "@/components/viz/PieChart"
import {InteractiveLineChart} from "@/components/viz/InteractiveLineChart";

export default function DashboardPage() {

  return (
      <div className={`dashboard-viz flex-col overflow-y-scroll no-scrollbar`}>
          {/*<div className={`grid grid-cols-3 py-4 px-4`}>*/}
          {/*    <div className={`col-span-3  md:col-span-1`}><BarChartt/></div>*/}
          {/*    <div className={` md:col-span-1`}><PieChartt/></div>*/}
          {/*    <div className={`col-span-2 md:col-span-1`}><LineChartt/></div>*/}
          {/*</div>*/}
          {/*<div className={`px-8`}><InteractiveLineChart/>*/}
          {/*    <InteractiveLineChart/>*/}
          {/*    <InteractiveLineChart/>*/}
          {/*    <InteractiveLineChart/>*/}
          {/*</div>*/}
      </div>
  )
}

