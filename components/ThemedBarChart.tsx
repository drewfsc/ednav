import { useEffect, useState } from "react";

const extractThemeColors = () => {
    const root = document.documentElement;
    if (!root) return {
        primaryColor: "#4F46E5",
        secondaryColor: "#4338CA",
        textColor: "#000000",
        gridColor: "#E5E7EB",
    };

    const getCSSVariable = (variable: string) => {
        let value = getComputedStyle(root).getPropertyValue(variable).trim();

        // Handle HSL values correctly
        if (value.includes("%") && !value.startsWith("hsl(")) {
            value = `hsl(${value})`;
        }

        // Ensure valid hex or HSL colors, fallback if needed
        if (!value || value === "1rem") {
            value = "#000000"; // Default fallback for missing colors
        }

        return value;
    };

    return {
        primaryColor: getCSSVariable("--primary") || "#4F46E5",
        secondaryColor: getCSSVariable("--secondary") || "#4338CA",
        textColor: getCSSVariable("--text-base") || "#000000",
        gridColor: getCSSVariable("--neutral") || "#E5E7EB",
    };
};

const ThemedBarChart = () => {
    const [themeColors, setThemeColors] = useState<{
        primaryColor: string;
        secondaryColor: string;
        textColor: string;
        gridColor: string;
    }>({
        primaryColor: "",
        secondaryColor: "",
        textColor: "",
        gridColor: "",
    });
    const [currentTheme, setCurrentTheme] = useState("");

    useEffect(() => {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
                    const newTheme = document.documentElement.getAttribute("data-theme") || "";
                    console.log("Theme switched to:", newTheme);

                    if (typeof newTheme !== "string") {
                        console.error("Invalid theme value detected:", newTheme);
                    }

                    setCurrentTheme(newTheme);
                    requestAnimationFrame(() => {
                        setThemeColors(extractThemeColors());
                    });
                }
            }
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    return (
        <div>
            <h2>Styled Chart</h2>
            <p>Current Theme: {currentTheme}</p>
            <p>Primary Color: {themeColors.primaryColor}</p>
            <p>Secondary Color: {themeColors.secondaryColor}</p>
            <p>Text Color: {themeColors.textColor}</p>
            <p>Grid Color: {themeColors.gridColor}</p>
        </div>
    );
};

export default ThemedBarChart;
