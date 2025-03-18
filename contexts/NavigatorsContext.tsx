import React, { createContext, useContext, useState, ReactNode } from "react";

type Navigator = {
    "_id": string,
    "name": string,
}

type NavigatorsContextType = {
    selectedNavigator: Navigator | string | null;
    setSelectedNavigator: (client: Navigator | null) => void;
};

const NavigatorsContext = createContext<NavigatorsContextType | undefined>(undefined);

export const NavigatorsProvider = ({ children }: { children: ReactNode }) => {
    const [selectedNavigator, setSelectedNavigator] = useState<Navigator | null>(null);

    return (
        <NavigatorsContext.Provider value={{ selectedNavigator, setSelectedNavigator }}>
            {children}
        </NavigatorsContext.Provider>
    );
};

// Custom hook for consuming context
export const useNavigators = () => {
    const context = useContext(NavigatorsContext);
    if (!context) {
        throw new Error("useNavigators must be used within a useNavigators");
    }
    return context;
};
