import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Theme = {
  theme: string;
};

type ThemesContextType = {
  selectedTheme: Theme;
  setSelectedTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const ThemesContext = createContext<ThemesContextType | undefined>(undefined);

export const ThemesProvider = ({ children }: { children: ReactNode }) => {
  // Load theme from localStorage or default to an empty theme
  const [selectedTheme, setSelectedTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("selectedTheme");
      return storedTheme ? JSON.parse(storedTheme) : { theme: "" };
    }
    return { theme: "" };
  });

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTheme", JSON.stringify(selectedTheme));
    }
  }, [selectedTheme]);

  return (
    <ThemesContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ThemesContext.Provider>
  );
};

// Custom hook for consuming context
export const useThemes = () => {
  const context = useContext(ThemesContext);
  if (!context) {
    throw new Error("useThemes must be used within a ThemesProvider");
  }
  return context;
};
