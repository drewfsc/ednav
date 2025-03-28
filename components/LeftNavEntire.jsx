"use client"
import React from 'react';
// import ThemeSwitcher from "./ThemeSwitcher"
import NavigatorSelector from "/components/NavigatorSelector";
import LeftNavigation from "/components/LeftNavigation";
import {LocationsProvider} from "/contexts/LocationsContext";
import {useFepsLeft} from "/contexts/FepsLeftContext";

export default function LeftNavEntire({ setEditing}) {
    const {setSelectedFepLeft} = useFepsLeft();
    return (
        <div className={`flex flex-col h-full justify-between bg-base-300 px-4 pb-8 pt-4 gap-4 drop-shadow-lg z-50  relative`}>
            <div>
                <div className={`mb-4`}>
                    <div className={`text-6xl font-black italic`}>
                        <a href={`/`}><span className={`text-info z-10 relative`}>ED</span><span
                            className={`text-warning -m-3 z-0 relative`}>NAV</span></a>
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
                <LeftNavigation setEditing={setEditing}/>
                </LocationsProvider>
            </div>

            <div className={`mb-6`}>
                <NavigatorSelector/>
                {/*<ThemeSwitcher/>*/}
            </div>

        </div>
);
}
