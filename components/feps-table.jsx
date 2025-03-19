"use client"

import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useFeps} from "/contexts/EditingContext";

export default function FepsTable({feps}) {
    const [allFeps, setAllFeps] = useState([]);
    // console.log(feps);
    // const { selectedFep, setSelectedFep } = useFeps();
    let selectedFep;
    const newSelectedFep = selectedFep === undefined ? "not selected" : selectedFep;
    const fetchAllFeps = async () => {
        const response = await fetch('/api/feps');
        const data = await response.json();
        setAllFeps(data);
        console.log(data);
    }

    useEffect(() => {
        fetchAllFeps().then(() => console.log(allFeps));
    })

    console.log(newSelectedFep);
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Clients</th>
                    <th>Actions</th>
                    <th>Last Activity</th>
                </tr>
                </thead>
                <tbody>
                {
                    allFeps.map((fep, index) => (
                        <tr key={fep._id+index} className={`hover:bg-base-200 cursor-pointer`}>{fep.name}</tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}
