"use client";
import "./globals.css"
import React, { useEffect, useState } from "react";
import { ClientsProvider } from "@/contexts/ClientsContext";
import {EditingProvider} from "@/contexts/EditingContext";
// import { SessionProvider } from "next-auth/react";
import { FepsLeftProvider } from "@/contexts/FepsLeftContext";
import PerfectLayout from "@/components/PerfectLayout";
import { ThemesProvider, useThemes } from "@/contexts/ThemesContext";
import {NavigatorsProvider} from "@/contexts/NavigatorsContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemesProvider>
            <ThemeWrapper>
                    <ClientsProvider>
                        <EditingProvider>
                            <FepsLeftProvider>
                                <PerfectLayout>
                                    <NavigatorsProvider>
                                    {children}
                                    </NavigatorsProvider>
                                </PerfectLayout>
                            </FepsLeftProvider>
                        </EditingProvider>
                    </ClientsProvider>
            </ThemeWrapper>
        </ThemesProvider>
    );
}

// ✅ Separate wrapper component to safely use `useThemes()`
function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const { selectedTheme } = useThemes();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <html lang="en" data-theme={selectedTheme} suppressHydrationWarning>
            <body>{isMounted && children}</body>
        </html>
    );
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
