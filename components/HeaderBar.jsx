"use client"
import React from 'react';
// import {useFeps} from "@/contexts/FepsContext";
// import {useFepsLeft} from "@/contexts/FepsLeftContext";
// import {useClients} from "@/contexts/ClientsContext";

export default function HeaderBar() {
    // const {selectedFep, setSelectedFep } = useFeps();
    // const {selectedFepLeft, setSelectedFepLeft} = useFepsLeft();
    // const {selectedClient} = useClients();

    return (
        <div className={`bg-primary/60 border-b border-primary/80 h-30 text-primary-content z-20  mx-8 mt-8 transition duration-500`}>
            <div className="flex items-center justify-between h-full p-4">
                {/*<div className="flex items-center">*/}
                {/*    <div onClick={() => {*/}
                {/*        setSelectedFepLeft(!selectedFepLeft)*/}
                {/*    }} className={`w-[40px] h-[40px] cursor-pointer flex items-center mr-2`}>*/}
                {/*        <SidebarSimple*/}
                {/*            className="h-15 w-12 font-light text-primary-content/40 hover:text-primary-content transition duration-300"/>*/}
                {/*    </div>*/}
                {/*    <div className={`text-3xl font-light`}>{selectedClient !== "" ? `Edit: ${selectedClient?.name || ""}` : "Client"}</div>*/}
                {/*</div>*/}
                {/*<div onClick={() => {setSelectedFep(!selectedFep)}} className={`w-[40px] h-[40px] cursor-pointer flex items-center`}>*/}
                {/*    <SidebarSimple className="h-15 w-12 font-light rotate-180 text-secondary-content transition duration-300"/>*/}
                {/*</div>*/}
            </div>

        </div>
    );
}
