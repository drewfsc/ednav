"use client"
import React from "react"
import {ArrowLeft, Home} from "lucide-react";
import LeftNavEntire from "@/components/LeftNavEntire";
import {useNavigators} from "@/contexts/NavigatorsContext";
import RightListClients from "@/components/RightListClients";
import {Button} from "@/components/ui/button";

export default function NavigatorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { selectedNavigator, setSelectedNavigator } = useNavigators() as { selectedNavigator: { name: string; email: string } | null, setSelectedNavigator: (navigator: { name: string; email: string } | null) => void };
  function handleOnClose() {
    setSelectedNavigator(null)
  }
  return (
      <div className="relative h-screen overflow-y-hidden w-full">
        <div className="flex w-full h-screen">
          <LeftNavEntire/>
          <div className="bg-base-100 flex-grow w-full min-w-0">
            <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 bg-base-200 z-10 w-full">
              <div className="flex flex-1 items-center justify-between gap-2 px-3">
                <div className={`flex items-center gap-2 text-base-content/70`}>
                  <Home className="h-6 w-6 text-base-content/50" />
                  <span className="text-base-content/70">Education Navigators</span>
                </div>

              </div>
            </header>
            {/* Pass selectedClient to children */}
            <div className={`h-full w-full overflow-y-scroll p-0`}>
              <main className="p-8">
                {children}
              </main>
            </div>
          </div>
          <div className={`w-0 flex-shrink-0 h-screen bg-base-300 shadow-lg z-20 ${selectedNavigator ? "w-96" : "hidden"}`}>
            {selectedNavigator ? (
                <div className={``}>
                  <div className={`p-4`}>
                    <Button variant="outline" size="sm" onClick={handleOnClose} className="text-base-content hover:bg-base-200">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* name of each tab group should be unique */}
                  <div className="tabs tabs-lift mx-4">
                    <input type="radio" name="my_tabs_3" className="tab" aria-label="Clients" defaultChecked />
                    <div className="tab-content bg-base-100 border-base-300">
                      <RightListClients/>
                    </div>

                    <input type="radio" name="my_tabs_3" className="tab" aria-label="FEPs" />
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                      Other
                    </div>
                    <input type="radio" name="my_tabs_3" className="tab" aria-label="Details" />
                    <div className="tab-content bg-base-100 border-base-300 p-6" >
                      <div>{selectedNavigator.name}</div>
                      <div>{selectedNavigator.email}</div>
                    </div>
                  </div>
                </div>
            ) : (
              <div>nope</div>
            )}
          </div>
        </div>
      </div>
  )
}

