import React from 'react';
import {XCircle} from "phosphor-react";
import {useClients} from "@/contexts/ClientsContext";

export default function ClientProfileHeader({setEditing}) {
    const {selectedClient, setSelectedClient} = useClients();
    const getBGColor = (status) => {
        switch (status) {
            case "Active":
                return "bg-error text-error-content";
            case "Inactive":
                return "bg-warning text-warning-content";
            case "In Progress":
                return "bg-success text-success-content";
            case "Graduated":
                return "bg-info text-info-content";
            default:
                return "bg-primary text-primary-content";
        }
    }

    return (
        <div
            className={`text-xl h-16 font-extralight absolute flex justify-between items-center px-6 left-0 right-0 ${getBGColor(selectedClient.clientStatus)} text-accent-content`}>
            <div className={`font-medium`}>{selectedClient && selectedClient.name}</div>
            <div>Case #: {selectedClient && selectedClient.caseNumber}</div>
            <div>Age Group: {selectedClient && selectedClient.group}</div>
            <div>Status: {selectedClient && selectedClient.clientStatus}</div>
            <div onClick={() => {
                setEditing(null)
                setSelectedClient(null)
            }}
                 className={``}>
                <XCircle size={33} color={'#2f2f2f'}/>
            </div>
        </div>
    );
}
