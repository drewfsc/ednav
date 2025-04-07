import React, { useEffect, useState } from 'react';
import {useClients} from "/contexts/ClientsContext";
import { PinIcon } from 'lucide-react';
import { useNavigators } from '../contexts/NavigatorsContext';
import { useEditing } from '../contexts/EditingContext';
import { useActivities } from '../contexts/ActivityContext';

export default function ClientTableItem({ person, i, statusCollapse}) {
    const {setSelectedActivity} = useActivities()
    const {selectedClient, setSelectedClient} = useClients(null);
    const {selectedNavigator} = useNavigators();
    const {setEditing} = useEditing();

    const getBadgeColor = (status) => {
        switch (status) {
            case "Inactive":
                return "badge badge-error text-error-content text-xs px-3 ";
            case "In Progress":
                return "badge badge-warning text-warning-content text-xs px-3";
            case "Active":
                return "badge badge-success text-success-content text-xs px-3";
            case "Graduated":
                return "badge badge-info text-info-content text-xs px-3";
            default:
                return "badge badge-primary text-primary-content text-xs px-3";
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

    const getActivities = async (person) => {
        const res = await fetch('/api/activities?clientId=' + person._id)
        const json = await res.json();
        await setSelectedActivity(prev => ({
            ...prev,
            activities: json.data
        }))
        // await console.log(person, person._id, selectedActivity)
    }

    function getScreenWidth() {
        return window.innerWidth;
    }

    function useScreenWidth() {
        const [screenWidth, setScreenWidth] = useState(getScreenWidth());

        useEffect(() => {
            function handleResize() {
                setScreenWidth(getScreenWidth());
            }
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, [screenWidth]);

        return screenWidth;
    }

    const screenWidth = useScreenWidth();
    const personStatus = person.clientStatus;
    const statusAbbr1 = personStatus.substring(0, 1);

    return (
        <tr key={person.email + i}
            onClick={() => {
                if (selectedClient?._id === person._id) {
                    setSelectedClient(null);
                    setEditing("");
                } else {
                    setSelectedClient(person);
                    getActivities(person).then();
                    setEditing("client");
                }
            }}
            className={`${statusCollapse?.includes(person?.clientStatus) ? 'hidden' : 'visible'} hover:bg-base-200 hover:text-base-content hover:border-base-200 cursor-pointer box-border ${selectedClient?._id === person._id ? getBorderColor(selectedClient?.clientStatus) : ''} ${selectedClient?._id === person?._id ? 'bg-base-300 text-base-content' : ''}`}>
            <td className="text-sm truncate whitespace-normal">
                <span className={`ml-4`}>{person.first_name + " " + person.last_name}</span>
            </td>
            <td className="text-sm truncate whitespace-normal"><PinIcon size={16} className={`${selectedNavigator?.pinned.includes(person?._id) ? 'visible' : 'hidden'} text-primary/70`}/></td>
            <td className=" truncate text-sm text-gray-500 text-right flex justify-end">
                <div className={`w-[15px] m-3 2xl:w-fit ${getBadgeColor(person?.clientStatus)}`}>{(screenWidth < 1536 ? statusAbbr1 : "") + (screenWidth >= 1536 ? personStatus : "")}</div>
            </td>
        </tr>
    );
}
