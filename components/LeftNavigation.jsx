"use client";
import React from 'react';
import {useFepsLeft} from "@/contexts/FepsLeftContext";

export default function LeftNavigation({ setEditing}) {
    const {selectedFepLeft, setSelectedFepLeft} = useFepsLeft();
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
                    <a onClick={() => {
                        setEditing("add-client")
                    }}
                       className={`hover:bg-base-200 `}>Add New Client +</a>
                </li>
                <li>
                    <a href="./pages/auth/signin">Login</a>
                </li>
                <li>
                    <a href="/auth/signout">Logout</a>
                </li>
                <li>
                    <a href="/auth/newUser">New User</a>
                </li>
                <li>
                    <a href="/auth/verifyRequest">Verify Request</a>
                </li>
                <li>
                    <a href="/auth/error">Error</a>
                </li>
                <li>
                    <a href="/dashboard">Dashboard</a>
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
