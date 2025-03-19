import React, { createContext, useContext, useState, ReactNode } from "react";

type Location = {
    "_id": string,
    "name": string,
}

type LocationsContext = {
    selectedLocation: Location | null;
    setSelectedLocation: (location: Location | null) => void;
};

const LocationsContext = createContext<LocationsContext | undefined>(undefined);

export const LocationsProvider = ({ children }: { children: ReactNode }) => {
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    return (
        <LocationsContext.Provider value={{ selectedLocation, setSelectedLocation }}>
            {children}
        </LocationsContext.Provider>
    );
};

// Custom hook for consuming context
export const useNLocations = () => {
    const context = useContext(LocationsContext);
    if (!context) {
        throw new Error("useNavigators must be used within a useNavigators");
    }
    return context;
};
