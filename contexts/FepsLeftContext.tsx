import React, {createContext, useContext, useState, ReactNode, SetStateAction, Dispatch} from "react";

type FEP = {
    "searchTerm": string,
    "age": string,
    "status": string
}

type FepsLeftContextType = {
    selectedFepLeft: {
        "searchTerm": string,
        "age": string,
        "status": string
    };
    setSelectedFepLeft: Dispatch<SetStateAction<FEP>>;
};

const FepsLeftContext = createContext<FepsLeftContextType | null>(null as FepsLeftContextType | null);

export const FepsLeftProvider = ({ children }: { children: ReactNode }) => {
    const [selectedFepLeft, setSelectedFepLeft] = useState<FEP>({ searchTerm: "", age: "", status: "" });

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
