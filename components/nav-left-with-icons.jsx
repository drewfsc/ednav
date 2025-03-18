"use client";
import React from 'react';
import {usePathname} from "next/navigation";
import {FileText, GraduationCap, Home, Users, UserPlus2} from "lucide-react";

export default function NavLeftWithIcons() {
    const pathname = usePathname()
    const navMain = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Home,
            isActive: pathname === "/dashboard",
        },
        // {
        //     title: "Clients",
        //     url: "/clients",
        //     icon: Users,
        //     isActive: pathname === "/clients",
        // },
        {
            title: "Navigators",
            url: "/navigators",
            icon: GraduationCap,
            isActive: pathname === "/navigators",
        },
        {
            title: "FEPs",
            url: "/feps",
            icon: FileText,
            isActive: pathname === "/feps",
        },
        {
            title: "Add Client",
            url: "/clients/new",
            icon: UserPlus2,
            isActive: pathname === "/clients/new",
        },
    ]

    return (
        <div className={`flex flex-col justify-between`}>
            <ul className="menu flex-col w-full p-0 m-0 text-lg h-full">
                {navMain.map(item => (
                    <li className={`w-full transition duration-300 border-b border-base-300/10 h-12 hover:bg-primary justify-start rounded-0 ${item.isActive ? 'text-primary-content hover:bg-primary' : ''}`} key={item.title}>
                        <a href={item.url} className={`px-10 w-full h-full hover:rounded-none flex items-center justify-start text-sm ${item.isActive ? 'bg-accent rounded-none text-primary-content' : ''}`}>
                            <item.icon size={20}/> {item.title}
                        </a>

                    </li>
                ))}

            </ul>

        </div>
    );
}
