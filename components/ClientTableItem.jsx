import React from 'react';
import {useClients} from "@/contexts/ClientsContext";

export default function ClientTableItem({person, i, setEditing}) {

    const {selectedClient, setSelectedClient} = useClients(null);

    const getBadgeColor = (status) => {
        switch (status) {
            case "Active":
                return "badge badge-error text-error-content px-3";
            case "Inactive":
                return "badge badge-warning text-warning-content px-3";
            case "In Progress":
                return "badge badge-success text-success-content px-3";
            case "Graduated":
                return "badge badge-info text-info-content px-3";
            default:
                return "badge badge-primary text-primary-content px-3";
        }
    }

    const getBorderColor = (status) => {
        switch (status) {
            case "Active":
                return "border-error";
            case "Inactive":
                return "border-warning";
            case "In Progress":
                return "border-success";
            case "Graduated":
                return "border-info";
            default:
                return "border-primary";
        }
    }

    return (
        <tr key={person.email + i}  onClick={() => {
            if (selectedClient?._id === person._id) {
                setSelectedClient(null);
                setEditing(null);
            } else {
                setSelectedClient(person);
                setEditing(true);
            }
        }} className={`hover:bg-base-200 hover:text-base-content hover:border-base-200 cursor-pointer border-l-8 border-base-100 ${selectedClient?._id === person._id ? getBorderColor(selectedClient.clientStatus) : ''} ${selectedClient?._id === person._id ? 'bg-base-300 text-base-content' : ''}`}>
            <td className="whitespace-nowrap text-sm font-medium">
                <span className={`ml-4`}>{person.name}</span>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">
                <div className={`badge ${getBadgeColor(person.clientStatus)}`}>{person.clientStatus}</div>
            </td>
        </tr>
    );
}
