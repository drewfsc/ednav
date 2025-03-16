"use client"
import React from 'react';
import NavLeftWithIcons from "./nav-left-with-icons";
import {useFepsLeft} from "@/contexts/FepsLeftContext";
import ThemeSwitcher from "..//components/theme-switcher"
import Image from "next/image";

export default function LeftNavEntire() {
    const {selectedFepLeft} = useFepsLeft()
    return (
        <div className={`transition duration-500  bg-base-300/80 rounded-l-xl overflow-clip xl:min-w-60 m-8 mr-0 flex flex-col justify-between ${selectedFepLeft === true ? "-translate-x-180 collapse overflow-hidden m-0 w-0 invisible p-0 flex-none -ml-6" : "min-w-50 "}`}>
            <div>
                <div className=" text-6xl border-b-1 border-primary/80 h-30 bg-primary/60 flex items-center justify-center">
                    <Image src="/EDNAV.png" width={220} height={220} alt="EDNAV" />
                </div>
                <NavLeftWithIcons/>
            </div>
            <div className={`m-4`}>
                <ThemeSwitcher className="w-full block"/>
            </div>
        </div>
    );
}
