"use client";
import "./globals.css"
import React from "react";
import {ClientsProvider} from "@/contexts/ClientsContext";
// import {NavigatorsProvider} from "@/contexts/NavigatorsContext";
import {FepsProvider} from "@/contexts/FepsContext";
import {SessionProvider} from "next-auth/react";
import {FepsLeftProvider} from "@/contexts/FepsLeftContext";
import PerfectLayout from "@/components/PerfectLayout";
import {ThemesProvider} from "@/contexts/ThemesContext";
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {


    return (
        <html lang="en">
        <body>
        <SessionProvider>
            <ThemesProvider>
                <ClientsProvider>
                    <FepsProvider>
                        <FepsLeftProvider>
                        <PerfectLayout>
                            {children}
                        </PerfectLayout>
                        </FepsLeftProvider>
                    </FepsProvider>
                </ClientsProvider>
            </ThemesProvider>
        </SessionProvider>
        </body>
        </html>
    )
}
