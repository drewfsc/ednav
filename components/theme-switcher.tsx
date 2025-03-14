"use client"

import { useEffect, useState } from "react"
// import { Moon, Sun } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"
import VisualVolume from "@/components/VisualVolume";

// List of available DaisyUI themes
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
]

export function ThemeSwitcher() {
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
      <div className={``}><VisualVolume themes={themes} theme={theme} setTheme={setTheme}/></div>
      // <input onChange={() => {
      //   if (theme === "light") {
      //     setTheme("dark")
      //   } else {
      //     setTheme("light")
      //   }
      // }} type="checkbox" defaultChecked className="toggle border-indigo-600 bg-indigo-500 checked:bg-orange-400 checked:text-orange-800 checked:border-orange-500 " />
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="outline" size="icon" className="bg-base-100 border-base-300">
    //       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    //       <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    //       <span className="sr-only">Toggle theme</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end" className="bg-base-100 text-base-content">
    //     {themes.map((t) => (
    //       <DropdownMenuItem
    //         key={t}
    //         onClick={() => setTheme(t)}
    //         className={`capitalize hover:bg-base-200 ${theme === t ? "bg-base-200" : ""}`}
    //       >
    //         {t}
    //       </DropdownMenuItem>
    //     ))}
    //   </DropdownMenuContent>
    // </DropdownMenu>
  )
}

