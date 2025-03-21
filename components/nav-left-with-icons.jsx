"use client";
import React from 'react';
import {FileText, GraduationCap, Home} from "lucide-react";
import {useFepsLeft} from "@/contexts/FepsLeftContext";

export default function NavLeftWithIcons() {
    // const {selectedLocation, setSelectedLocation} = useLocations("");
    const {selectedFepLeft, setSelectedFepLeft} = useFepsLeft();
    const navMain = [
        {
            title: "Dashboard",
            url: "dashboard",
            icon: Home,
        },
        {
            title: "Navigators",
            url: "navigators",
            icon: GraduationCap,
        },
        {
            title: "FEPs",
            url: "feps",
            icon: FileText,
        },
    ]

    const navStatus = ["All", "Active", "In Progress", "Graduated", "Inactive"]
    const navAgeGroup = ["All", "Adult", "Youth"]

    return (
        <div>
            <ul className="menu menu-vertical w-full bg-base-300 rounded mb-4">
                {
                    navStatus.map((item, i) => (
                        <li key={i}>
                            <a onClick={() => setSelectedFepLeft(prevState => {
                                return {
                                    ...prevState,
                                    status: item !== "All" ? item : ""
                                }
                            })} className={`hover:bg-accent capitalize ${selectedFepLeft.status === item ? "bg-accent text-accent-content" : ""}`}>{item}</a>
                        </li>
                    ))
                }
            </ul>
            <ul className="menu menu-vertical w-full bg-base-300 rounded mb-4">
                {
                    navAgeGroup.map((item, i) => (
                        <li key={i}>
                            <a onClick={() => setSelectedFepLeft(prevState => {
                                return {
                                    ...prevState,
                                    age: item === "All" ? "" : item
                                }
                            })} className={`hover:bg-accent ${selectedFepLeft.age === item ? "bg-accent text-accent-content" : ""}`}>{item}</a>
                        </li>
                    ))
                }
            </ul>
            <ul className="menu menu-vertical w-full bg-base-300 rounded mb-4">
                {
                    navMain.map((item, i) => (
                        <li key={i}>
                            <a className={`hover:bg-accent`}>{item.title}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
