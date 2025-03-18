"use client"
import React from 'react';
import NavLeftWithIcons from "./nav-left-with-icons";
import ThemeSwitcher from "..//components/theme-switcher"
import Image from "next/image";
import NavigatorSelector from "@/components/NavigatorSelector";

export default function LeftNavEntire() {

    return (
        <div className={`flex flex-col justify-between h-full`}>
            <div>
                <div
                    className=" text-6xl border-b-1 border-primary/80 h-30 bg-primary/60 flex items-center justify-center">
                    <Image src="/EDNAV.png" width={220} height={220} alt="EDNAV"/>
                </div>
                <div className="h-10 bg-primary/80"></div>
                <NavLeftWithIcons/>
            </div>
            <div className={`mx-10 mb-6`}>
                <div className={`my-4`}>
                    <ThemeSwitcher className="w-full block"/>
                </div>

                <div className={`my-4`}>
                    <NavigatorSelector/>
                </div>
            </div>

        </div>
);
}
