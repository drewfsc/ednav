"use client";
import React from 'react';
import {usePathname} from "next/navigation";
import {FileText, GraduationCap, Home, Users} from "lucide-react";

export default function NavLeftWithIcons() {
    const pathname = usePathname()

    const navMain = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Home,
            isActive: pathname === "/dashboard",
        },
        {
            title: "Clients",
            url: "/clients",
            icon: Users,
            isActive: pathname.startsWith("/clients"),
        },
        {
            title: "Navigators",
            url: "/navigators",
            icon: GraduationCap,
            isActive: pathname.startsWith("/navigators"),
        },
        {
            title: "FEPs",
            url: "/feps",
            icon: FileText,
            isActive: pathname.startsWith("/feps"),
        },
    ]

    return (
        <div className={`flex flex-col justify-between`}>
            <ul className="menu rounded w-full text-base-content/60 p-0 m-0">
                {navMain.map(item => (
                    <li className={`w-full p-0 my-2`} key={item.title}>
                        <a href={item.url} className={`${item.isActive ? 'bg-accent text-accent-content ' : ''}`}>
                            <item.icon/> {item.title}
                        </a>

                    </li>
                ))}

            </ul>

        </div>
    );
}
