import type React from "react"
import ListRightClients from "@/components/list-right-clients";
import LeftNavEntire from "@/components/LeftNavEntire";
import HeaderBar from "@/components/HeaderBar";

export default function PerfectLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {

  return (
      <div className="fixed h-screen w-full bg-base-100">
        <div className="flex w-full h-screen">
          <LeftNavEntire/>
          <div className=" flex-grow overflow-scroll h-full overflow-y-scroll p-0 no-scrollbar">
                <HeaderBar/>
              <div className={ "flex-1 overflow-y-scroll w-full h-full no-scrollbar"}>
                  <main className="h-auto w-full p-4">
                      {children}
                  </main>
              </div>
          </div>
            <ListRightClients searchVisible={true}/>
        </div>
      </div>
  )
}
