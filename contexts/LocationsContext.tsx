import React, { createContext, useContext, useState, ReactNode } from "react";

type Location = {
    "name": "Dashboard",
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
export const useLocations = () => {
    const context = useContext(LocationsContext);
    if (!context) {
        throw new Error("useLocations must be used within a useLocations");
    }
    return context;
};
