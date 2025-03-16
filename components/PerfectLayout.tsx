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
      <div className="fixed h-screen w-full">
        <div className="flex w-full h-screen">
          <LeftNavEntire/>
          <div className=" flex-grow h-screen mb-8 p-0 overflow-clip">
                <HeaderBar/>
              <div className={ "flex-1 bg-base-300 border-x mx-8 mb-0 border-primary/20 rounded-none p-0"}>
                  <main className="h-auto">
                      <div className={`h-18 bg-primary/80`}>

                      </div>
                      <div className={`h-screen mb-20 overflow-scroll no-scrollbar pt-14`}>
                          {children}
                      </div>
                  </main>
              </div>
          </div>
            <ListRightClients searchVisible={true}/>
        </div>
      </div>
  )
}
