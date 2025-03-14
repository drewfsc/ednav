"use client";

import React, { createContext, useContext } from "react";
import { Session } from "next-auth"; // Import NextAuth session type

// Create context
const SessionContext = createContext<{ session: Session | null }>({ session: null });

// Custom hook for accessing session
export const useSessionContext = () => useContext(SessionContext);

// Session Provider component
export default function SessionProvider({ session, children }: { session: Session | null; children: React.ReactNode }) {
    return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
}
