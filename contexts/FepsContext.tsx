import React, {createContext, useContext, useState, ReactNode, SetStateAction, Dispatch} from "react";

type FEP = {
    "left": boolean,
    "right": boolean,
}

type FepsContextType = {
    selectedFep: FEP | null;
    setSelectedFep: Dispatch<SetStateAction<FEP | null>>;
};

const FepsContext = createContext<FepsContextType | undefined>(undefined);

export const FepsProvider = ({ children }: { children: ReactNode }) => {
    const [selectedFep, setSelectedFep] = useState<FEP | null>(null);

    return (
        <FepsContext.Provider value={{ selectedFep, setSelectedFep }}>
            {children}
        </FepsContext.Provider>
    );
};

// Custom hook for consuming context
export const useFeps = () => {
    const context = useContext(FepsContext);
    if (!context) {
        throw new Error("useClients must be used within a FepsProvider");
    }
    return context;
};
