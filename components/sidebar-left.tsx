"use client"

import type * as React from "react"
import { Users, GraduationCap, FileText, HelpCircle, Home, ClipboardList, MessageSquare, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

export function SidebarLeft({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: pathname === "/dashboard",
    },
    {
      title: "Clients",
      url: "/dashboard/clients",
      icon: Users,
      isActive: pathname.startsWith("/dashboard/clients"),
    },
    {
      title: "Education Navigators",
      url: "/dashboard/navigators",
      icon: GraduationCap,
      isActive: pathname.startsWith("/dashboard/navigators"),
    },
    {
      title: "FEPs",
      url: "/dashboard/feps",
      icon: FileText,
      isActive: pathname.startsWith("/dashboard/feps"),
    },
  ]

  const navSecondary = [
    {
      title: "Questions",
      url: "/dashboard/questions",
      icon: HelpCircle,
    },
    {
      title: "Notes",
      url: "/dashboard/notes",
      icon: MessageSquare,
    },
    {
      title: "Reports",
      url: "/dashboard/reports",
      icon: ClipboardList,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar className="border-r border-base-700 bg-base-400" {...props}>
      <SidebarHeader>
        <div className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-base-content">Education Navigator</span>
          </Link>
        </div>
        <NavMain items={navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

