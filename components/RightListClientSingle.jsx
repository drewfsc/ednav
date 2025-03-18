import React from 'react';
import {GraduationCap, PersonSimpleWalk, ProhibitInset, TrendUp} from "phosphor-react";

const StatusIcon = (status) => {
    switch (status) {
        case "Active":
            return <ActiveSpan/>;
        case "Inactive":
            return <InactiveSpan/>
        case "Graduated":
            return <GraduatedSpan/>
        case "In Progress":
            return <InProgressSpan/>
    }
}


const ActiveSpan = () => {
    return (
        <div className={`client-list-item bg-primary`}>
            <PersonSimpleWalk size={20} className="text-primary-content" />
        </div>
    )
}
const InProgressSpan = () => {
    return (
        <div className={`client-list-item bg-accent`}>
            <TrendUp size={20} className={`text-neutral-100`} />
        </div>
    )
}
const GraduatedSpan = () => {
    return (
        <div className={`client-list-item bg-secondary`}>
            <GraduationCap size={20} className={`text-secondary-content`} />
        </div>
    )
}

const InactiveSpan = () => {
    return (
        <div className={`client-list-item bg-warning`}>
            <ProhibitInset size={20} className={`text-warning-content`} />
        </div>
    )
}

export default function RightListClientSingle({client, handleClientClick, selectedClient, clients}) {
    return (
        <li key={client._id}
            className={`h-18 px-8  cursor-pointer hover:bg-primary/50 hover:border-y hover:border-primary/80 text-lg flex ${selectedClient?._id === client._id ? 'hover:text-primary-content bg-accent text-primary-content ' : ''}`}
            onClick={() => {
                const thisClient = clients.find((c) => c._id === client._id)
                handleClientClick(thisClient)
            }}>
            <div className="flex items-center gap-10 bg-transparent text-xl">
                <div className={``}>
                    {StatusIcon(client.clientStatus)}
                </div>
                <div className=" ">
                    <div
                        className={`${selectedClient?._id === client._id ? 'font-medium ' : ''}`}>{client.name}</div>
                    <div
                        className={`text-xs font-light ${selectedClient?._id === client._id ? '' : ''}`}>{client.latestInteraction}</div>
                </div>
            </div>
        </li>
    );
}
