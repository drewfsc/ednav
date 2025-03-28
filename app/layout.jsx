"use client";
import React, {useEffect, useState} from "react";
import "../public/styles/globals.css";
import {ThemesProvider, useThemes} from "../contexts/ThemesContext";
import {ClientsProvider}           from "../contexts/ClientsContext";
import {EditingProvider} from "../contexts/EditingContext";
import {FepsLeftProvider} from "../contexts/FepsLeftContext";
import {LocationsProvider} from "../contexts/LocationsContext";
import {NavigatorProvider} from "../contexts/NavigatorsContext";
// import {SessionProvider} from "next-auth/react";

export default function RootLayout({children}) {

  return (
      // <SessionProvider>
      <ThemesProvider>
          <ThemeWrapper>
          <ClientsProvider>
              <EditingProvider>
                  <FepsLeftProvider>
                      <LocationsProvider>
                          <NavigatorProvider >
                              {children}
                          </NavigatorProvider>
                      </LocationsProvider>
                  </FepsLeftProvider>
              </EditingProvider>
          </ClientsProvider>
          </ThemeWrapper>
      </ThemesProvider>
      // </SessionProvider>
  )
}

// ✅ Separate wrapper component to safely use `useThemes()`
function ThemeWrapper({children}) {
    const {selectedTheme} = useThemes();
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

