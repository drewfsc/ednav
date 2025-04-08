"use client";
import React from "react";
import LeftNavEntire from "/components/layout/LeftNavEntire";
import ClientTable from "/components/client/ClientTable";
import AddClientForm from "../client/AddClientForm";
import ClientProfile from "../client/ClientProfile";
import { useEditing } from "/contexts/EditingContext";
import HomeGrid from "@/components/dashboard/HomeGrid";

export default function PerfectLayout() {
  const { editing } = useEditing();

  return (
    <div className={`bg-base-100 relative h-screen w-full overflow-hidden`}>
      <div className={`flex h-screen w-full flex-row`}>
        <div className={`flex h-screen`}>
          <div className={`box-border w-[230px]`}>
            <LeftNavEntire />
          </div>
          <div
            className={`no-scrollbar relative z-40 box-border h-screen w-[250px] flex-col overflow-y-scroll drop-shadow-lg 2xl:w-[320px]`}
          >
            <ClientTable />
          </div>
        </div>

        {/*CLIENT PROFILE AND ADD NEW CLIENT FORM*/}
        <div
          className={`bg-base-300 border-base-300/60 no-scrollbar relative flex h-screen flex-grow overflow-hidden overflow-y-scroll border-1`}
        >
          <div className={`relative ${editing === "" || editing === null ? "w-full translate-x-0" : "collapse w-0 translate-x-[4000px]"} transition-all duration-500`}><HomeGrid /></div>
          <div
            className={`relative ${editing === "client" ? "w-full translate-x-0" : "collapse w-0 -translate-x-[4000px]"} transition-all duration-500`}
          >
            <ClientProfile />
          </div>
          <div
            className={`relative ${editing === "add-client" ? "w-full translate-x-0" : "collapse w-0 translate-x-[4000px]"} transition-all duration-500`}
          >
            <AddClientForm />
          </div>
        </div>
      </div>
    </div>
  );
}
