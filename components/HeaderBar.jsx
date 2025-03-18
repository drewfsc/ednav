"use client"
import React from 'react';
import DashboardStats from "./DashboardStats";
// import {useFeps} from "@/contexts/FepsContext";
// import {useFepsLeft} from "@/contexts/FepsLeftContext";
// import {useClients} from "@/contexts/ClientsContext";

export default function HeaderBar() {

    return (
        <div className={` h-30 text-primary-content bg-primary/60 backdrop-blur-sm`}>
            {/*<DashboardStats clientsReferredPerMonth={stats.clientsReferredPerMonth || []}/>*/}

        </div>
    );
}
