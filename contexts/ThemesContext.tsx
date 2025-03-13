import React, { createContext, useContext, useState, ReactNode } from "react";

type Theme = {
    theme: "corporate" | string,
}

type ThemesContextType = {
    selectedTheme: Theme;
    setSelectedTheme: (theme: "corporate" | Theme) => void;
};

const ThemesContext = createContext<ThemesContextType | undefined>(undefined);

export const ThemesProvider = ({ children }: { children: ReactNode }) => {
    const [selectedTheme, setSelectedTheme] = useState<Theme>({ theme: "corporate" });

    return (
        <ThemesContext.Provider
            value={{
                selectedTheme,
                setSelectedTheme: (theme: Theme | "corporate") => {
                    if (theme === "corporate") {
                        setSelectedTheme({ theme: "corporate" });
                    } else {
                        setSelectedTheme(theme);
                    }
                },
            }}
        >
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
