"use client"

import { useEffect, useState } from "react";

// List of available DaisyUI themes
const themes = ["light", "dark", "abyss", "silk", "autumn", 'garden']

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<number>(0)

  // Update the data-theme attribute when the theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themes[theme])
    localStorage.setItem("theme", themes[theme])
  }, [theme])

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme && themes.includes(savedTheme)) {
      setTheme(themes.indexOf(savedTheme))
    }
  }, [])

  return (
      <div>
        <select name="theme-select" id="theme-select" value={theme} className={`select`} onChange={(e) => setTheme(Number(e.target.value))}>
          {themes.map((theme, index) => (
          <option key={theme} value={index}>{theme}</option>))}
        </select>
      </div>
      // <div className={``}><VisualVolume themes={themes} theme={theme} setTheme={setTheme}/></div>
  )
}

