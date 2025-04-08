import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

// Extracted reusable types
interface Preferences {
  theme: string;
  lastAgeFilter: string;
  lastStatusFilter: string;
}

interface Notifications {
  unread: string[];
  read: string[];
}

interface Streak {
  active: boolean;
  streak: number;
  lastDate: string;
  longestStreak: number;
  longestStreakDate: number;
}

// Navigator type
export interface Navigator {
  id: string;
  name: string;
  pinned: string[];
  preferences: Preferences;
  notifications: Notifications;
  streak: Streak;
}

// Context type
interface NavigatorContextType {
  selectedNavigator: Navigator | null;
  setSelectedNavigator: Dispatch<SetStateAction<Navigator | null>>;
}

// Context and provider
const NavigatorContext = createContext<NavigatorContextType | undefined>(
  undefined,
);

export const NavigatorProvider = ({ children }: { children: ReactNode }) => {
  const [selectedNavigator, setSelectedNavigator] = useState<Navigator | null>(
    null,
  );

  return (
    <NavigatorContext.Provider
      value={{ selectedNavigator, setSelectedNavigator }}
    >
      {children}
    </NavigatorContext.Provider>
  );
};

// Custom hook for consuming context
export const useNavigators = (): NavigatorContextType => {
  const context = useContext(NavigatorContext);
  if (!context) {
    throw new Error("useNavigator must be used within a NavigatorProvider");
  }
  return context;
};
