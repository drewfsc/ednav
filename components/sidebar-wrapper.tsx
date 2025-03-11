"use client"
import { SidebarLeft } from "./sidebar-left"
import { SidebarRight } from "./sidebar-right"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export function SidebarWrapper() {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset className="bg-base-100">
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-base-100 border-b border-base-300">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="text-base-content hover:bg-base-200" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-base-300" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 text-base-content">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-base-200" />
          <div className="mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-base-200" />
        </div>
      </SidebarInset>
      <SidebarRight onSelectClient={function(client: { _id: string; firstName: string; lastName: string; email?: string; phone?: string; address?: string }): void {
              throw new Error("Function not implemented.")
          } } />
    </SidebarProvider>
  )
}

