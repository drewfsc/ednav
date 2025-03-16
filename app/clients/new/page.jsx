"use client"
import React, {useEffect, useState} from 'react';
import AddClientForm from "../../../components/add-client-form";
import EditClientForm from "../../../components/edit-client-form";

export default function NewClient({ selectedClient}) {
    const [stats, setStats] = useState({
        clients: [],
        navigators: [],
        feps: 0,
        notes: 0,
        actions: [],
    })
    const [loading, setLoading] = useState(true)
    const [formStep] = useState(0)
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch counts from each collection
                const [clientsRes, navigatorsRes, fepsRes, notesRes, actionsRes] = await Promise.all([
                    fetch(`/api/clients?navigator=${"Andrew McCauley"}`),
                    fetch("/api/education-navigators"),
                    fetch("/api/feps"),
                    fetch("/api/notes"),
                    fetch("/api/actions"),
                ])

                const clients = await clientsRes.json()
                const navigators = await navigatorsRes.json()
                const feps = await fepsRes.json()
                const notes = await notesRes.json()
                const actions = await actionsRes.json()

                setStats({
                    clients: clients,
                    navigators: navigators,
                    feps: feps,
                    notes: notes.length,
                    actions: actions,
                })
            } catch (error) {
                console.error("Error fetching stats:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats().then()
    }, [])
    return (
       loading ? <div>Loading...</div> : (
           <div className={`flex gap-10 justify-between`}>
               <div className={`w-3/4`}>{selectedClient !== null ? <EditClientForm/> : <AddClientForm/>}</div>
               <div className={`w-1/4`}>
                   <ul className="steps steps-vertical mt-4">
                       <li className={`step ${formStep >= 1 ? "step-primary" : ""}`}>Personal</li>
                       <li className={`step ${formStep >= 2 ? "step-primary" : ""} `}>Education</li>
                       <li className={`step ${formStep >= 3 ? "step-primary" : ""} `}>Administrative</li>
                       <li className={`step ${formStep >= 4 ? "step-primary" : ""} `}>Purchase</li>
                       <li className={`step ${formStep >= 5 ? "step-primary" : ""} `}>Receive Product</li>
                   </ul>
               </div>
           </div>
       )
    );
}
