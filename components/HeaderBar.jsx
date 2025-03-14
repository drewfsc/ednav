"use client"
import React from 'react';
import {useFeps} from "@/contexts/FepsContext";
import {SidebarSimple} from "phosphor-react"
import {useFepsLeft} from "@/contexts/FepsLeftContext";

export default function HeaderBar() {
    // right sidebar
    const {selectedFep, setSelectedFep } = useFeps();
    const {selectedFepLeft, setSelectedFepLeft} = useFepsLeft()

    return (
        <div className={`flex flex-1 items-center gap-2 bg-primary z-10 rounded my-4 transition  duration-500 h-16 mx-4`}>
            <header className={` flex w-auto flex-1 items-center justify-between gap-2 px-3 relative`}>
                <div className="flex items-center justify-between">
                    <div className={`flex  items-center justify-between gap-2`}>
                        <div onClick={() => {
                            setSelectedFepLeft(!selectedFepLeft)
                        }} className={`w-[40px] h-[40px] cursor-pointer flex items-center`}><SidebarSimple
                            className="h-10 w-8 font-light text-primary-content/40 hover:text-primary-content transition duration-300"/>
                        </div>
                        <div className={`flex items-center gap-2 text-primary-content`}>
                            <span className="text-2xl font-light">Dashboard</span>
                        </div>
                    </div>
                    <div onClick={() => {
                        setSelectedFep(!selectedFep)
                    }} className={`w-[40px] h-[40px] cursor-pointer flex items-center`}><SidebarSimple
                        className="h-10 w-8 font-light rotate-180 text-primary-content/40 hover:text-primary-content transition duration-300"/>
                    </div>
                </div>
            </header>
        </div>
    );
}
