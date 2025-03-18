"use client"
import React from 'react';
import NavLeftWithIcons from "./nav-left-with-icons";
import ThemeSwitcher from "..//components/theme-switcher"
import Image from "next/image";

export default function LeftNavEntire() {
    return (
        <div>
            <div className=" text-6xl border-b-1 border-primary/80 h-30 bg-primary/60 flex items-center justify-center">
                <Image src="/EDNAV.png" width={220} height={220} alt="EDNAV"/>
            </div>
            <div className="h-10 bg-primary/80"></div>
            <NavLeftWithIcons/>
            <div className={`m-4`}>
                <ThemeSwitcher className="w-full block"/>
            </div>
        </div>
);
}
