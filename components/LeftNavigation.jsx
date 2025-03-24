"use client";
import React from 'react';
import {FileText, GraduationCap, Home} from "lucide-react";
import {useFepsLeft} from "@/contexts/FepsLeftContext";
import {useLocations} from "@/contexts/LocationsContext";

export default function LeftNavigation() {
    const {selectedLocation, setSelectedLocation} = useLocations("Dashboard");
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
                                    status: item
                                }
                            })} className={`hover:bg-accent capitalize ${selectedFepLeft.status === item || selectedFepLeft.status === "" ? "bg-accent text-accent-content" : ''}`}>{item}</a>
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
                                    age: item
                                }
                            })} className={`hover:bg-accent ${selectedFepLeft.age === item ? "bg-accent text-accent-content" : ""}`}>{item}</a>
                        </li>
                    ))
                }
            </ul>
            {/*<ul className="menu menu-vertical w-full bg-base-300 rounded mb-4">*/}
            {/*    {*/}
            {/*        navMain.map((item, i) => (*/}
            {/*            <li key={i}>*/}
            {/*                <a onClick={() => {*/}
            {/*                    console.log(selectedLocation)*/}
            {/*                    setSelectedLocation(item.title);*/}

            {/*                }} className={`hover:bg-accent ${selectedLocation === item.title ? "bg-accent text-accent-content" : ""}`}>{item.title}</a>*/}
            {/*            </li>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</ul>*/}
        </div>
    );
}
