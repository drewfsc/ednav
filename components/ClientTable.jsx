"use client";
import React, { useEffect, useState } from "react";
import { useClients } from "@/contexts/ClientsContext";
import { useEditing } from "@/contexts/EditingContext";
import ClientsFilterGroup from "@/components/ClientsFilterGroup";
import ClientsAgeFilterGroup from "@/components/ClientsAgeFilterGroup";
import { useThemes } from "@/contexts/ThemesContext";
import FilterCheckboxes from "@/components/FilterCheckboxes";

export default function ClientTable({ clients }) {
    const { editing, setEditing } = useEditing();
    const [isMounted, setIsMounted] = useState(false);
    const { selectedClient, setSelectedClient } = useClients(null);
    const [userClients, setUserClients] = useState(clients);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchFields, setSearchFields] = useState(["name"]); // ✅ Default to searching only by name
    const { theme } = useThemes(); // 🔥 Get active DaisyUI theme
    const [chartColors, setChartColors] = useState({
        background: "#4F46E5",
        border: "#4338CA",
    });

    const handleClientClick = (clientObject) => {
        setSelectedClient(clientObject);
        setEditing(true);
    };

    // ✅ Function to filter clients based on search term
    const filterClients = (term) => {
        if (!term) return clients; // Show all clients if no search term
        return clients.filter((client) =>
            searchFields.some(
                (field) =>
                    client[field] &&
                    typeof client[field] === "string" &&
                    client[field].toLowerCase().includes(term.toLowerCase())
            )
        );
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setUserClients(filterClients(searchTerm)); // ✅ Update filtered clients when search term changes
    }, [searchTerm, clients, searchFields]);

    useEffect(() => {
        // 🔥 Get primary colors from DaisyUI CSS variables
        const rootStyle = getComputedStyle(document.documentElement);
        const primaryColor = rootStyle.getPropertyValue("--p").trim() || "#4F46E5";
        const secondaryColor = rootStyle.getPropertyValue("--s").trim() || "#4338CA";

        setChartColors({
            background: primaryColor,
            border: secondaryColor,
        });
    }, [theme]); // 🔄 Re-run when theme changes

    // ✅ Prevent hydration mismatch by rendering only after mount
    if (!isMounted) return null;

    return (
        <div className={`overflow-y-scroll no-scrollbar`}>
            <div className={`bg-primary/60 px-8 shadow-lg justify-center h-30 flex flex-col gap-2`}>
                <ClientsFilterGroup />
                <ClientsAgeFilterGroup />
            </div>
            <div className={`h-18 bg-primary/80 text-primary-content justify-between items-center flex px-8 `}>
                <input
                    type="text"
                    placeholder="Search clients by name"
                    className=" w-1/2 transition duration-300 border border-base-100 py-1 px-4 rounded hover:bg-base-100 text-white focus:bg-secondary focus:text-white focus:outline-none focus:ring-2 focus:ring-secondary-600"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FilterCheckboxes searchFields={searchFields} setSearchFields={setSearchFields}/>
            </div>
            <div className="px-4 sm:px-6 lg:px-8 mt-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base-content font-semibold ">Clients</h1>
                        <p className="mt-2 text-sm text-base-content/70">
                            A list of all the clients in your care.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            onClick={handleClientClick}
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
                                    {userClients.length > 0 ? (
                                        userClients.map((person, i) => (
                                            <tr key={person.email + i}>
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
