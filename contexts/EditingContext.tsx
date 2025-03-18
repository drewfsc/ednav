import React, {createContext, useContext, useState, ReactNode, SetStateAction, Dispatch} from "react";

type Edit = {
    editing: boolean,
}

type EditContextType = {
    editing: false | null;
    setEditing: Dispatch<SetStateAction<Edit | null>>;
};

const EditingContext = createContext<EditContextType | undefined>(undefined);

export const EditingProvider = ({ children }: { children: ReactNode }) => {
    const [editing, setEditing] = useState<false | null>(null);

    return (
        // @ts-ignore
        <EditingContext.Provider value={{ editing, setEditing }}>
            {children}
        </EditingContext.Provider>
    );
};

// Custom hook for consuming context
export const useEditing = () => {
    const context = useContext(EditingContext);
    if (!context) {
        throw new Error("useEditing must be used within a useEditing");
    }
    return context;
};
