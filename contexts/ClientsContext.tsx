import React, { createContext, useContext, useState, ReactNode } from "react";

type Client = {
    "_id": string,
    "name": string,
    "email": string,
    "contactNumber": string,
    "caseNumber": number,
    "dob": string,
    "fep": string,
    "dateReferred": string,
    "lastGrade": string,
    "hadOrientation": string,
    "pin": number,
    "region": number,
    "clientStatus": string,
    "tabe": string,
    "transcripts": string,
    "officeCity": string,
    "group": string,
    "schoolIfEnrolled": string,
    "ttsDream": string,
    "createdAt": string,
    "latestInteraction": string,
    "isYouth": boolean,
}

type ClientsContextType = {
    selectedClient: Client | null;
    setSelectedClient: (client: Client | null) => void;
};

const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

export const ClientsProvider = ({ children }: { children: ReactNode }) => {
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    return (
        <ClientsContext.Provider value={{ selectedClient, setSelectedClient }}>
            {children}
        </ClientsContext.Provider>
    );
};

// Custom hook for consuming context
export const useClients = () => {
    const context = useContext(ClientsContext);
    if (!context) {
        throw new Error("useClients must be used within a ClientsProvider");
    }
    return context;
};
