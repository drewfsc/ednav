import React, { createContext, useContext, useState, ReactNode } from 'react';

type Activity = {
    activityId: "",
    activities: [],
    notes: [],
}

type ActivityContext = {
    selectedActivity: Activity | null;
    setSelectedActivity: React.Dispatch<React.SetStateAction<Activity | null>>;
};

const ActivityContext = createContext<ActivityContext | {}>({activities: [], notes: [], activityId: ""});

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

    return (
        <ActivityContext.Provider value={{ selectedActivity: selectedActivity || null, setSelectedActivity }}>
            {children}
        </ActivityContext.Provider>
    );
};

// Custom hook for consuming context
export const useActivities = () => {
    const context = useContext(ActivityContext);
    if (!context) {
        throw new Error("useLocations must be used within a useLocations");
    }
    return context;
};
