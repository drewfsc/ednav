"use client";
import React from 'react';
import {FileText, GraduationCap, Home} from "lucide-react";
import NavigatorSelector from "@/components/NavigatorSelector";
import {useNLocations} from "@/contexts/LocationsContext";

export default function NavLeftWithIcons() {
    const {selectedLocation, setSelectedLocation} = useNLocations("");

    const navMain = [
        {
            title: "Dashboard",
            url: "dashboard",
            icon: Home,
        },
        {
            title: "Navigators",
            url: "navigators",
            icon: GraduationCap,
        },
        {
            title: "FEPs",
            url: "feps",
            icon: FileText,
        },
    ]

    return (
        <div className={`flex text-sm justify-between items-center w-full h-full mr-8`}>
            <div className={`flex gap-4`}>
                {
                navMain.map((item) => (
                    <div onClick={() => {
                        setSelectedLocation(item.url);
                    }} key={item}
                         className={` transition duration-300 border border-base-100 py-1 px-4 rounded hover:bg-base-100 hover:text-white ${item.url === selectedLocation ? 'bg-secondary' : ''}`}>
                        <a href={item.url} className={`flex w-full text-base-100 `}>{item.title}</a>
                    </div>
                ))
            }
            </div>
            <NavigatorSelector/>
        </div>
    );
}
