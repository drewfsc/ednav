import React from 'react';
import moment from 'moment';
import {useNavigators} from "@/contexts/NavigatorsContext";
export default function NavigatorsTable({navigators}) {
    const { selectedNavigator, setSelectedNavigator } = useNavigators();
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Name</th>
                    <th>FEPs</th>
                    <th>Clients</th>
                    <th>Last Activity</th>
                </tr>
                </thead>
                <tbody>
                {
                    [...navigators]
                        .sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity))
                        .map(navigator => (
                        <tr key={navigator._id} className={`hover:bg-base-200 cursor-pointer`} onClick={() => setSelectedNavigator(navigator)}>
                            <th>{navigator.name}</th>
                            <td>{navigator.feps.length}</td>
                            <td>{navigator.clients.length}</td>
                            <td>{moment(navigator.lastActivity).calendar()}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}
