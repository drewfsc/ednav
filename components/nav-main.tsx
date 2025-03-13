"use client"

import type { LucideIcon } from "lucide-react"
import Link from "next/link"

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
  }[]
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <Link
            href={item.url}
            className={`flex items-center gap-2 px-4 py-2 rounded-md w-full btn btn-primary ${
              item.isActive ? " " : ""
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

