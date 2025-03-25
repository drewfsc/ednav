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

    const navStatus = [[
        "All",
        "all",
        "bg-base-300 shadow-lg",
        "hover:bg-base-200",
    ], [
        "Active",
        "active",
        "bg-error shadow-lg",
        "hover:bg-error",
    ], [
        "Inactive",
        "inactive",
        "bg-warning shadow-lg",
        "hover:bg-warning"
    ],
    [
        "In Progress",
        "in-progress",
        "bg-success shadow-lg",
        "hover:bg-success"
    ],
    [
        "Graduated",
        "graduated",
        "bg-info shadow-lg",
        "hover:bg-info"
    ]

    ]
    const navAgeGroup = ["All", "Adult", "Youth"]

    return (
        <div>
            <ul className="menu menu-vertical w-full bg-base-100 rounded mb-4">
                {
                    navStatus.map((item, i) => (
                        <li className={`mb-1`} key={i}>
                            <a onClick={() => setSelectedFepLeft(prevState => {
                                return {
                                    ...prevState,
                                    status: item[0]
                                }
                            })}
                               className={`${item[3]} capitalize ${selectedFepLeft.status === item[0] || selectedFepLeft.status === "" ? item[2] : ''}`}>{item[0]}</a>
                        </li>
                    ))
                }
            </ul>
            <ul className="menu menu-vertical w-full bg-base-100 rounded mb-4">
                {
                    navAgeGroup.map((item, i) => (
                        <li className={`mb-1`} key={i}>
                            <a onClick={() => setSelectedFepLeft(prevState => {
                                return {
                                    ...prevState,
                                    age: item
                                }
                            })}
                               className={`hover:bg-base-200 ${selectedFepLeft.age === item ? "bg-base-300 text-base-content shadow-lg" : ""}`}>{item}</a>
                        </li>
                    ))
                }
            </ul>
            <ul className="menu menu-vertical w-full bg-base-100 rounded mb-4">
                <li>
                    <a onClick={() => setSelectedLocation("Dashboard")}
                       className={`hover:bg-accent ${selectedLocation === "Dashboard" ? "bg-accent text-accent-content" : ""}`}>Add New Client</a>
                </li>
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
