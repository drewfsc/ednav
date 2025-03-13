import type React from "react"
import { Home} from "lucide-react";
import ListRightClients from "@/components/list-right-clients";
import LeftNavEntire from "@/components/LeftNavEntire";

export default async function DashboardLayout({params,
  children,
}: {
  params: Record<string, any>;
  children: React.ReactNode;
}) {
  const { id } = await params;
  return (
      <div className="relative h-screen overflow-y-hidden w-full">
        <div className="flex w-full h-screen">
          <LeftNavEntire/>
          <div className="bg-base-100 flex-grow w-full min-w-0">
            <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 bg-base-200 z-10 w-full">
              <div className="flex flex-1 items-center justify-between gap-2 px-3">
                <div className={`flex items-center gap-2 text-base-content/70`}>
                  <Home className="h-6 w-6 text-base-content/50" />
                  <span className="text-base-content/70">Dashboard</span>
                </div>
              </div>
            </header>
            <main className="flex-1 w-full overflow-x-hidden p-8">
              {children}
            </main>
          </div>
          <div className="flex-shrink-0 w-96 h-screen bg-base-200">
            <ListRightClients searchVisible={true}/>
          </div>
        </div>
      </div>
  )
}

