"use client"
import React from 'react';
import ThemeSwitcher from "./ThemeSwitcher"
import NavigatorSelector from "/components/NavigatorSelector";
import LeftNavigation from "/components/LeftNavigation";
import {LocationsProvider} from "/contexts/LocationsContext";
import {useFepsLeft} from "/contexts/FepsLeftContext";
import { useSession } from 'next-auth/react';
import { SignOutButton } from './sign-out';
import SignInButton from './sign-in';

export default function LeftNavEntire({setEditing}) {
    const session = useSession();
    const {setSelectedFepLeft} = useFepsLeft();
    return (
        <div className={`flex flex-col h-full justify-between bg-base-300 px-4 pb-8 pt-2 gap-4 drop-shadow-lg z-50  relative`}>
            <div>
                <div className={`mb-4`}>
                    <div className={`text-[57px] font-black italic antialiased`}>
                        <a href={`/`}><span className={`text-secondary z-10 relative drop-shadow-lg shadow-black`}>ED</span><span
                            className={`text-accent -ml-[12px] z-0 relative`}>NAV</span></a>
                    </div>
                    <div className={`uppercase text-base-content font-light -mt-3 tracking-widest text-[18px]`}>
                        <p className={` leading-4 tracking-[2px]`}>SUCCESS TRACKER</p>
                    </div>
                </div>
                <input name={`client-search`} type="text" onChange={(e) => {
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
                <div className={`flex flex-col mb-4 p-3 bg-base-200 rounded-lg`}>
                    <div className={`text-sm`}>{session.data.user.name}</div>
                    <div className={`text-xs`}>{session.data.user.email}</div>
                    <div className={`text-xs mb-4`}>{session.data.user.level}</div>
                    {session.status === 'authenticated' ? <SignOutButton /> : <SignInButton />}
                </div>
                {session.data.user.level !== 'navigator' ? <NavigatorSelector/> : null}
                <ThemeSwitcher/>
            </div>

        </div>
);
}
