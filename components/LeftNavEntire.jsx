"use client"
import React from 'react';
import NavLeftWithIcons from "./nav-left-with-icons";
import {useFepsLeft} from "@/contexts/FepsLeftContext";

export default function LeftNavEntire() {
    const {selectedFepLeft} = useFepsLeft()
    return (
        <div className={`transition duration-500  bg-primary rounded p-3 ${selectedFepLeft === true ? "-translate-x-180 collapse overflow-hidden m-0 w-0 invisible p-0 flex-none -ml-6" : "min-w-30 m-4 mr-0 "}`}>
            <div>
                <div className=" text-5xl border-b border-primary flex items-center">
                    <div className={`p-2`}>
                        <div>
                            <span className={`text-primary-content font-extralight`}>ED</span><span
                            className={`text-accent font-bold italic`}>NAV</span>
                        </div>
                        <div className={`text-[16px] text-primary-content`}>SUCCESS TRACKER</div>
                    </div>
                </div>
                <NavLeftWithIcons/>
            </div>
            {/*<div className={`w-auto text-right`}><ThemeSwitcher className="w-full block"/></div>*/}
        </div>
    );
}
