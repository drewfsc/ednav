import type React from "react"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    badge?: React.ReactNode
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link
                href={item.url}
                className="flex items-center gap-2 px-4 py-2 rounded-md w-full text-base-content hover:bg-base-300"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
                {item.badge && (
                  <span className="ml-auto bg-base-300 text-base-content px-2 py-0.5 rounded-full text-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

