"use client"
// import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import {useEffect, useState} from "react";

export default function NavigatorGrid() {
    const [stats, setStats] = useState({
        clients: [],
        navigators: [],
        feps: 0,
        notes: 0,
        actions: [],
    })
    const [loading, setLoading] = useState(true)

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
        <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${loading ? "animate-pulse" : ""}`}>
            {/*{*/}
            {/*    stats.navigators.map((n, i) => (*/}
            {/*        <div key={n+i} className="card">*/}
            {/*            <div className="card-inner">*/}
            {/*                <div className="card-front">*/}
            {/*                    <p>{n.name}</p>*/}
            {/*                </div>*/}
            {/*                <div className="card-back">*/}
            {/*                    <p>Back Side</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ))*/}
            {/*}*/}

        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">



            {stats.navigators?.map((person) => (
                <li key={person.email} className="col-span-1 divide-y divide-base-content/5 rounded bg-base-200 shadow text-base-content">
                    <div className="flex w-full items-center justify-between space-x-6 p-6 card">
                        <div className="flex-1 truncate card-inner">
                            <div className="flex items-center space-x-3 card-front">
                                <h3 className="truncate text-sm font-medium text-base-content">{person.name}</h3>
                                <span className={`inline-flex shrink-0 items-center rounded-full  px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset  ${person.group === "Adult" ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-red-50 text-red-700 ring-red-600/20"}`}>
                  {person.group}
                </span>
                            </div>
                            {/*<p className="mt-1 truncate text-sm text-gray-500">{person.title}</p>*/}
                        </div>
                        <img alt="" src={person.imageUrl} className="size-10 shrink-0 rounded-full bg-base-300" />
                    </div>
                    <div className={`card-back`}>
                        <div className="-mt-px flex divide-x divide-base-content/5">
                            <div className="flex w-0 flex-1">
                                <a
                                    href={`mailto:${person.email}`}
                                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-base-content"
                                >
                                    {/*<EnvelopeIcon aria-hidden="true" className="size-5 text-gray-400" />*/}
                                    Email
                                </a>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                                <a
                                    href={`tel:${person.telephone}`}
                                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-base-content"
                                >
                                    {/*<PhoneIcon aria-hidden="true" className="size-5 text-gray-400" />*/}
                                    Call
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
        </div>
    )
}
