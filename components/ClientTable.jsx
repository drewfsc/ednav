"use client";
import React, { useEffect, useState } from "react";
import {useClients} from "@/contexts/ClientsContext";
import {useEditing} from "@/contexts/EditingContext";

export default function ClientTable({clients}) {
    const {editing, setEditing} = useEditing()
    const [isMounted, setIsMounted] = useState(false);
    const {selectedClient, setSelectedClient} = useClients(null);

    const handleClientClick = (clientObject) => {
        setSelectedClient(clientObject)
        setEditing(true)
    }


    useEffect(() => {
        setIsMounted(true);
    }, []);

    // ✅ Prevent hydration mismatch by rendering only after mount
    if (!isMounted) return null;

    return (
        <div className={`overflow-y-scroll no-scrollbar`}>
            <div className={`bg-primary/60 py-6 shadow-lg h-30`}></div>
            <div className={`h-10 bg-primary/80 text-primary-content items-center flex pl-8`}>{clients.length} clients</div>
            <div className="px-4 sm:px-6 lg:px-8 mt-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base-content font-semibold ">Clients</h1>
                        <p className="mt-2 text-sm text-base-content/70">
                            A list of all the clients in you care for.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button onClick={handleClientClick}
                            className="block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-content shadow-sm hover:bg-primary/60 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-bg-primary focus-visible:ring-2 focus-visible:ring-primary-600"
                        >
                            Add client
                        </button>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <table className="min-w-full divide-y divide-base-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-neutral-700 sm:pl-0">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-700">
                                            Title
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-700">
                                            Email
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-700">
                                            Role
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-base-300">
                                    {clients.length > 0 ? (
                                        clients.map((person, i) => (
                                            <tr key={person.email+i}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-neutral-700 sm:pl-0">
                                                    {person.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {person.title}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {person.email}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {person.role}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                    <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleClientClick(person)}>
                                                        Edit<span className="sr-only">, {person.name}</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4 text-sm text-gray-500">
                                                No clients found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
