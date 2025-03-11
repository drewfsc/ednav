"use client"

import type React from "react"

import { useState } from "react"
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ClientProfile } from "@/components/client-profile"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"

type Client = {
  _id: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  address?: string
  dateOfBirth?: string
  notes?: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  return (
    <SidebarProvider>
      <div className="relative min-h-screen w-full">
        <div className="absolute top-4 right-4 z-50">
          <ThemeSwitcher />
        </div>
        <div className="flex w-full">
          <SidebarLeft className="flex-shrink-0" />
          <SidebarInset className="bg-base-100 flex-grow w-full min-w-0">
            <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-base-100 border-b border-base-300 z-10 w-full">
              <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger className="text-base-content hover:bg-base-200" />
                <Separator orientation="vertical" className="mr-2 h-4 bg-base-300" />
                {/*<Breadcrumb>*/}
                {/*  <BreadcrumbList>*/}
                {/*    <BreadcrumbItem>*/}
                {/*      <BreadcrumbPage className="line-clamp-1 text-base-content">*/}
                {/*        {selectedClient*/}
                {/*          ? `Client: ${selectedClient.firstName} ${selectedClient.lastName}`*/}
                {/*          : "Education Navigator Dashboard"}*/}
                {/*      </BreadcrumbPage>*/}
                {/*    </BreadcrumbItem>*/}
                {/*  </BreadcrumbList>*/}
                {/*</Breadcrumb>*/}
              </div>
            </header>
            <main className="flex-1 p-4 w-full overflow-x-hidden">
              {selectedClient ? (
                <ClientProfile client={selectedClient} onClose={() => setSelectedClient(null)} />
              ) : (
                children
              )}
            </main>
          </SidebarInset>
          <SidebarRight
            className="flex-shrink-0 flex-basis-1/3 max-w-[33%]"
            onSelectClient={setSelectedClient}
            selectedClientId={selectedClient?._id}
          />
        </div>
      </div>
    </SidebarProvider>
  )
}

