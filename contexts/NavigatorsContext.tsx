import React, {createContext, useContext, useState, ReactNode, SetStateAction, Dispatch} from "react";

type Navigator = {
    navigator: "",
}

type NavigatorsContextType = {
    selectedNavigator: string | null;
    setSelectedNavigator: Dispatch<SetStateAction<Navigator | null>>;
};

const NavigatorContext = createContext<NavigatorsContextType | undefined>(undefined);

export const NavigatorProvider = ({ children }: { children: ReactNode }) => {
    const [selectedNavigator, setSelectedNavigator] = useState<"" | null>(null);

    return (
        // @ts-ignore
        <NavigatorContext.Provider value={{ selectedNavigator, setSelectedNavigator }}>
            {children}
        </NavigatorContext.Provider>
    );
};

// Custom hook for consuming context
export const useNavigators = () => {
    const context = useContext(NavigatorContext);
    if (!context) {
        throw new Error("useNavigators must be used within a NavigatorContext");
    }
    return context;
};
