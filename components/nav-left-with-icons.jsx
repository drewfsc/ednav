"use client";
import React from 'react';
import {ThemeSwitcher} from "@/components/theme-switcher";
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
            title: "Education Navigators",
            url: "/navigators",
            icon: GraduationCap,
            isActive: pathname.startsWith("/dashboard/navigators"),
        },
        {
            title: "FEPs",
            url: "/feps",
            icon: FileText,
            isActive: pathname.startsWith("/dashboard/feps"),
        },
    ]

    return (
        <div className={``}>
            <ul className="menu bg-base-200 rounded-box w-56 text-base-content/60">
                {navMain.map(item => (
                    <li key={item.title}>
                        <a href={item.url} className={`${item.isActive ? 'bg-primary text-primary-content ' : ''}`}>
                            <item.icon/> {item.title}
                        </a>

                    </li>
                ))}
                <ThemeSwitcher/>
            </ul>
        </div>
    );
}
