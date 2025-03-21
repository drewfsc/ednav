import React from 'react';
import Image from "next/image";
import DashboardStats from "./DashboardStats";

export default function Header({metrics, loading}) {
    return (
        <div className={`border-b-6 border-secondary`}>
            <div className={`w-full bg-base-100 flex h-30 justify-between items-center`}>
                <div className="">
                    <Image src="/EDNAV.png" width={220} height={220} alt="EDNAV" priority/>
                </div>
                <div className={``}>
                    <DashboardStats metrics={metrics} loading={loading}/>
                </div>
            </div>
        </div>
    );
}
