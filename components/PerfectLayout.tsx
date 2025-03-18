import type React from "react"
import ListRightClients from "@/components/list-right-clients";
import LeftNavEntire from "@/components/LeftNavEntire";
import DashboardStats from "@/components/DashboardStats";

export default function PerfectLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {

  return (
      <div className="flex max-h-screen">
          <div className={`rounded-l-xl overflow-hidden my-8 ml-8 bg-base-300/70 shadow-xl backdrop-blur-[2px]`}>
              <LeftNavEntire/>
          </div>
          <div className={"flex-1 mx-4 my-8 "}>
              <main className="h-full flex">
                  <div className={`bg-base-300/70 w-full shadow-xl backdrop-blur-[2px] flex flex-col `}>
                      {/*<HeaderBar/>*/}
                      <div className={`flex-1 flex flex-col`}>
                          <div className={`bg-primary/60 py-6 shadow-lg`}>
                              <DashboardStats/>
                          </div>
                          <div className={`h-10 bg-primary/80`}/>
                      </div>
                      {children}
                  </div>
              </main>
          </div>
          <div className={`rounded-r-xl overflow-hidden my-8 mr-8 bg-base-300/70  shadow-xl backdrop-blur-[2px] xl:w-1/3`}>
              <ListRightClients searchVisible={true}/>
          </div>
      </div>
  )
}
