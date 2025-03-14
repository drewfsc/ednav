"use client";
import "./globals.css"
import React from "react";
import {ClientsProvider} from "@/contexts/ClientsContext";
import {NavigatorsProvider} from "@/contexts/NavigatorsContext";
import {FepsProvider} from "@/contexts/FepsContext";
import {SessionProvider} from "next-auth/react";
import PerfectLayout from "@/components/PerfectLayout";
import {FepsLeftProvider} from "@/contexts/FepsLeftContext";
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {


    return (
        <html lang="en">
        <body>
        <SessionProvider>
            <NavigatorsProvider>
                <ClientsProvider>
                    <FepsProvider>
                        <FepsLeftProvider>
                        <PerfectLayout>
                            {children}
                        </PerfectLayout>
                        </FepsLeftProvider>
                    </FepsProvider>
                </ClientsProvider>
            </NavigatorsProvider>
        </SessionProvider>
        </body>
        </html>
    )
}
