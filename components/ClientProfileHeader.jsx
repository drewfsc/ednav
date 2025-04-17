import React from 'react';
// import { XSquare } from 'phosphor-react';
import { useClients } from '/contexts/ClientsContext';
import ClientProfilePin from './ClientProfilePin';
import { useEditing } from '@/contexts/EditingContext';

export default function ClientProfileHeader() {

    const {selectedClient, setSelectedClient} = useClients();
    const {setEditing} = useEditing();

    const getBadgeColor = (status) => {
        switch (status) {
            case "Active":
                return "badge badge-success text-success-content text-xs px-3 ";
            case "Inactive":
                return "badge badge-error text-error-content text-xs px-3";
            case "In Progress":
                return "badge badge-warning text-warning-content text-xs px-3";
            case "Graduated":
                return "badge badge-info text-info-content text-xs px-3";
            default:
                return "badge badge-primary text-primary-content text-xs px-3";
        }
    }

    return (
        <div
          className={` h-[68px] fixed font-extralight flex justify-between items-center top-0 px-6 left-0 right-0 shadow bg-base-300 text-base-content w-full transition-all duration-600`}>
            <div className={` flex justify-between gap-4 items-center divide-x divide-accent-content/30`}>
                <ClientProfilePin/>
                <div
                    className={`font-bold pr-4`}>{selectedClient && !selectedClient?.name ? selectedClient?.first_name + " " + selectedClient?.last_name : selectedClient?.name}</div>
                <div className={`pr-4`}>
                    <div className={`${getBadgeColor(selectedClient?.clientStatus)}`}>{selectedClient?.clientStatus}</div>
                </div>
            </div>
            <div onClick={() => {
                setEditing("")
                setSelectedClient(null)
            }}
                 className={``}>
                <XSquare size={33} className={`text-base-content`}/>
            </div>
        </div>
    );
}
