import React, {createContext, useContext, useState, ReactNode, SetStateAction, Dispatch} from "react";

type FEP = {
    "left": boolean,
    "right": boolean,
}

type FepsLeftContextType = {
    selectedFepLeft: FEP | null;
    setSelectedFepLeft: Dispatch<SetStateAction<FEP | null>>;
};

const FepsLeftContext = createContext<FepsLeftContextType | undefined>(undefined);

export const FepsLeftProvider = ({ children }: { children: ReactNode }) => {
    const [selectedFepLeft, setSelectedFepLeft] = useState<FEP | null>(null);

    return (
        <FepsLeftContext.Provider value={{ selectedFepLeft, setSelectedFepLeft }}>
            {children}
        </FepsLeftContext.Provider>
    );
};

// Custom hook for consuming context
export const useFepsLeft = () => {
    const context = useContext(FepsLeftContext);
    if (!context) {
        throw new Error("useClients must be used within a FepsLeftProvider");
    }
    return context;
};
