"use client";
import React, { useEffect, useState } from "react";
import ClientProfileDetails from "./ClientProfileDetails";
import ClientProfileHeader from "/components/client/ClientProfileHeader";

export default function ClientProfile({ client, setEditing }) {
  const [isMounted, setIsMounted] = useState(false);
  const [, setSelectedNavigator] = useState("");

  useEffect(() => {
    setIsMounted(true); // ✅ Mark component as mounted before interacting with localStorage
    if (typeof window !== "undefined") {
      const storedNavigator = localStorage.getItem("navigatorName") || "";
      setSelectedNavigator(storedNavigator);
    }
  }, []);

  const [tabState] = useState("Profile");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="no-scrollbar relative h-screen w-full overflow-y-scroll">
      <ClientProfileHeader setEditing={setEditing} client={client} />
      <div className="">
        <div className=" ">
          <div className={`items-center gap-4`}>
            <div className={`flex gap-10 pt-16 pr-6`}>
              <div
                className={`mr-6 w-full ${tabState === "Profile" ? "" : "hidden"}`}
              >
                <ClientProfileDetails />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
