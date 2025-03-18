"use client"

import React, { useEffect, useState } from "react";
import { useThemes } from "@/contexts/ThemesContext";

// List of available DaisyUI themes
const themes = ["light", "dark", "abyss", "silk", "autumn", "garden"];

export default function ThemeSwitcher() {
    // Load theme index from localStorage OR default to "light"
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            return savedTheme && themes.includes(savedTheme) ? themes.indexOf(savedTheme) : 0;
        }
        return 0;
    });

    const { selectedTheme, setSelectedTheme } = useThemes() as unknown as {
        selectedTheme: string;
        setSelectedTheme: React.Dispatch<React.SetStateAction<string>>;
    };

    // Update the theme only when it changes
    useEffect(() => {
        const selected = themes[theme];
        document.documentElement.setAttribute("data-theme", selected);
        localStorage.setItem("theme", selected);
        setSelectedTheme(selected);
    }, [theme, setSelectedTheme]);

    return (
        <div>
            <select
                name="theme-select"
                id="theme-select"
                value={theme}
                className="select"
                onChange={(e) => setTheme(Number(e.target.value))}
            >
                {themes.map((theme, index) => (
                    <option key={theme} value={index}>
                        {theme}
                    </option>
                ))}
            </select>
        </div>
    );
}
