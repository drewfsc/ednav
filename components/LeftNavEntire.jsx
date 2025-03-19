"use client"
import React from 'react';
import ThemeSwitcher from "..//components/theme-switcher"
import Image from "next/image";
import {useNavigators} from "@/contexts/NavigatorsContext";
import FepsTable from "@/components/feps-table";

export default function LeftNavEntire() {
    const {selectedNavigator, setSelectedNavigator} = useNavigators();
    return (
        <div className={`flex flex-col justify-between h-full`}>
            <div>
                <div
                    className=" text-6xl border-b-1 border-primary/80 h-30 bg-primary/60 flex items-center justify-center">
                    <Image src="/EDNAV.png" width={220} height={220} alt="EDNAV"/>
                </div>
                <div className="h-18 bg-primary/80 text-primary-content items-center flex pl-8">
                    {selectedNavigator}
                </div>
                <FepsTable setSelectedNavigator={setSelectedNavigator} selectedNavigator={selectedNavigator} />
            </div>
            <div className={`mx-10 mb-6`}>
                <div className={`my-4`}>
                    <ThemeSwitcher className="w-full block"/>
                </div>
            </div>

        </div>
);
}
