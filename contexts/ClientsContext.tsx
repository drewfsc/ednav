import React, { createContext, useContext, useState, ReactNode } from "react";

type Client = {
  _id: string;
  caseNumber: number;
  clientStatus: string;
  contactNumber: string;
  createdAt: string;
  dateReferred: string;
  dob: string;
  email: string;
  fep: string;
  first_name: string;
  group: string;
  hadOrientation: string;
  isYouth: boolean;
  lastGrade: string;
  last_name: string;
  latestInteraction: string;
  name: string;
  navigator: string;
  officeCity: string;
  pin: number;
  region: number;
  schoolIfEnrolled: string;
  tabe: {
    referralDate: string;
    completionDate: string;
  };
  orientation: {
    referralDate: string;
    completionDate: string;
  };
  trackable: {
    type: string;
    length: number;
    items: [];
  };
  transcripts: string;
  ttsDream: string;
};

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
