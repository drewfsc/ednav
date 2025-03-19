"use client";
import "./globals.css"
import React, { useEffect, useState } from "react";
import { ClientsProvider } from "@/contexts/ClientsContext";
import {EditingProvider} from "@/contexts/EditingContext";
import {getSession, SessionProvider} from "next-auth/react";
import { FepsLeftProvider } from "@/contexts/FepsLeftContext";
import PerfectLayout from "@/components/PerfectLayout";
import { ThemesProvider, useThemes } from "@/contexts/ThemesContext";
import {NavigatorsProvider} from "@/contexts/NavigatorsContext";
import {LocationsProvider} from "@/contexts/LocationsContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            getSession().then((session) => console.log(session));
        }
    }, []);
    return (
        <ThemesProvider>
            {/*<ThemeWrapper>*/}
                <SessionProvider>
                    <ClientsProvider>
                        <LocationsProvider>
                        <EditingProvider>
                            <FepsLeftProvider>
                                <PerfectLayout>
                                    <NavigatorsProvider>
                                    {children}
                                    </NavigatorsProvider>
                                </PerfectLayout>
                            </FepsLeftProvider>
                        </EditingProvider>
                        </LocationsProvider>
                    </ClientsProvider>
                </SessionProvider>
            {/*</ThemeWrapper>*/}
        </ThemesProvider>
    );
}

// ✅ Separate wrapper component to safely use `useThemes()`
function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const { selectedTheme } = useThemes();
    const [isMounted, setIsMounted] = useState(false);

    // useEffect(() => {
    //     setIsMounted(true);
    // }, []);
    //
    // const theme = useThemes().selectedTheme; // Ensure it returns a string
    //
    // return (
    //
    //     // @ts-ignore
 return(
     <html lang="en" data-theme={"light"} suppressHydrationWarning>
     <body>{isMounted && children}</body>
     </html>
 )
    // );
}

// ✅ Persistent Navigator Selector Component with Static Names
//  function NavigatorSelector() {
//      const navigatorNames = [
//          "Stacy Martinez",
//          "Hailey Jester",
//          "Ashleigh Chesney",
//          "Rich Basche",
//          "Rachael Banerdt",
//          "Morgan Sole",
//          "Kecia Thompson-Gorgon"
//      ];
//
//      const [selectedNavigator, setSelectedNavigator] = useState(() => {
//          if (typeof window !== "undefined") {
//              return localStorage.getItem("navigatorName") || "";
//          }
//          return "";
//      });
//
//      useEffect(() => {
//          if (typeof window !== "undefined") {
//              localStorage.setItem("navigatorName", selectedNavigator);
//          }
//      }, [selectedNavigator]);
//
//      return (
//          <div style={{ marginBottom: "10px" }}>
//              <label htmlFor="navigator-select">Select Navigator:</label>
//              <select
//                  id="navigator-select"
//                  value={selectedNavigator}
//                  onChange={(e) => setSelectedNavigator(e.target.value)}
//              >
//                  <option value="" disabled>Select a navigator</option>
//                  {navigatorNames.map((name) => (
//                      <option key={name} value={name}>
//                          {name}
//                      </option>
//                  ))}
//              </select>
//          </div>
//      );
//  }
