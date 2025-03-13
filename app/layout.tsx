"use client";
import "./globals.css"
import React from "react";
import {ClientsProvider} from "@/contexts/ClientsContext";
// import {Cookies} from "react-cookie";
import {NavigatorsProvider} from "@/contexts/NavigatorsContext";
import {FepsProvider} from "@/contexts/FepsContext";
// const cookies = new Cookies();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
    // const [ theme, setTheme ] = useState(() => {
    //     return cookies.get('theme') || 'light'; // Default to light theme
    // });
    // useEffect(() => {
    //   const theme = cookies.get("theme") || "corporate"
    //     if (theme != null) {
    //         document.documentElement.setAttribute("data-theme", theme)
    //     }
    // }, [])
  return (
    <html lang="en">
      <body>
      <NavigatorsProvider>
          <ClientsProvider>
              <FepsProvider>
                  {children}
              </FepsProvider>
          </ClientsProvider>
      </NavigatorsProvider>
      </body>
    </html>
  )
}
