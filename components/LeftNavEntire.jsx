"use client"
import React from 'react';
import ThemeSwitcher from "./ThemeSwitcher"
import NavigatorSelector from "@/components/NavigatorSelector";
import NavLeftWithIcons from "@/components/nav-left-with-icons";
import {LocationsProvider} from "@/contexts/LocationsContext";

export default function LeftNavEntire({searchTerm, setSearchTerm, status, setStatus}) {
    return (
        <div className={`flex flex-col h-full justify-between bg-base-300 px-4 pb-8 pt-4 gap-4 shadow-2xl `}>
            <div>
                <div className={`mb-4`}>
                    <div className={`text-6xl font-black italic`}>
                        <span className={`text-accent z-10 relative`}>ED</span><span className={`text-secondary -m-3 z-0 relative`}>NAV</span>
                    </div>
                    <div className={`uppercase text-base-content -mt-2 tracking-widest text-lg`}>
                        Success Tracker
                    </div>
                </div>
                <input type="text" onChange={(e) => {
                    setSearchTerm(e.target.value)
                }} placeholder="Search by name..." className="input w-full mb-4"/>
                <LocationsProvider>
                <NavLeftWithIcons searchTerm={searchTerm} setSearchTerm={setSearchTerm} status={status} setStatus={setStatus}/>
                </LocationsProvider>
            </div>

            <div className={`mb-6`}>
                <NavigatorSelector/>
                <ThemeSwitcher/>
            </div>

        </div>
);
}
