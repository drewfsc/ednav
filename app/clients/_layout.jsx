"use client"
import React from "react"
import { Home} from "lucide-react";
import {useClients} from "../../contexts/ClientsContext";
import LeftNavEntire from "../../components/LeftNavEntire";
import ClientProfile from "../../components/client-profile";

export default function ClientsLayout({children}){

  const { selectedClient, setSelectedClient } = useClients();
  function handleOnClose() {
    setSelectedClient(null)
  }
  return (
      <div className="relative h-screen overflow-y-hidden w-full">
        <div className="flex w-full h-screen">
          <LeftNavEntire/>
          <div className="bg-base-100 flex-grow w-full min-w-0">
            <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 bg-primary z-10 w-auto rounded my-4 p-4">
              <div className="flex flex-1 items-center justify-between gap-2 px-3">
                <div className={`flex items-center gap-2 text-primary-content`}>
                  <Home className="h-8 w-8"/>
                  <span className="text-3xl font-light">Clients</span>
                </div>
              </div>
            </header>
            <main className="flex-1 w-full overflow-x-hidden p-1">
              {children}
            </main>
          </div>
          <div className={`w-0 flex-shrink-0 h-screen bg-base-300 shadow-lg z-20 ${selectedClient ? "w-96" : "hidden"}`}>
            {selectedClient ? (
              <ClientProfile client={selectedClient} onCloseAction={handleOnClose}/>
            ) : (
              <div>No client selected</div>
            )}
          </div>
        </div>
      </div>
  )
}

