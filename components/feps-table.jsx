import React from 'react';
import moment from 'moment';
import {useFeps} from "/contexts/FepsContext";
export default function FepsTable({feps}) {
    // console.log(feps);
    const { selectedFep, setSelectedFep } = useFeps();
    console.log(selectedFep);
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Clients</th>
                    <th>Actions</th>
                    <th>Last Activity</th>
                </tr>
                </thead>
                <tbody>
                {
                    [...feps]
                        .sort((a, b) => new Date(b.actions[0].when) - new Date(a.actions[0].when))
                        .map(fep => (
                        <tr key={fep._id} className={`hover:bg-base-200 cursor-pointer`} onClick={() => setSelectedFep(fep)}>
                            <th>{fep.name}</th>
                            <td>{fep.clients.length}</td>
                            <td>{fep.actions.length}</td>
                            <td>{moment(fep.actions[0].when).calendar()}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}
