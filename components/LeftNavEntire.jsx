"use client"
import React from 'react';
import ThemeSwitcher from "./ThemeSwitcher"
import NavigatorSelector from "@/components/NavigatorSelector";
import LeftNavigation from "@/components/LeftNavigation";
import {LocationsProvider} from "@/contexts/LocationsContext";
import {useFepsLeft} from "@/contexts/FepsLeftContext";

export default function LeftNavEntire() {
    const {setSelectedFepLeft} = useFepsLeft();
    return (
        <div className={`flex flex-col h-full justify-between bg-primary px-4 pb-8 pt-4 gap-4 shadow-2xl `}>
            <div>
                <div className={`mb-4`}>
                    <div className={`text-6xl font-black italic`}>
                        <span className={`text-info z-10 relative`}>ED</span><span className={`text-warning -m-3 z-0 relative`}>NAV</span>
                    </div>
                    <div className={`uppercase text-primary-content -mt-2 tracking-widest text-lg`}>
                        Success Tracker
                    </div>
                </div>
                <input type="text" onChange={(e) => {
                    setSelectedFepLeft(prev => {
                        return {
                            ...prev,
                            searchTerm: e.target.value
                        }
                    })
                }} placeholder="Search by name..." className="input w-full mb-4"/>
                <LocationsProvider>
                <LeftNavigation/>
                </LocationsProvider>
            </div>

            <div className={`mb-6`}>
                <NavigatorSelector/>
                <ThemeSwitcher/>
            </div>

        </div>
);
}
