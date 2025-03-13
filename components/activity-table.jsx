import React from 'react';

export default function ActivityTable({actions}) {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        actions.map((action, i) => (
                            <tr key={i}>
                                <th>{action?.when}</th>
                                <td>{action?.what}</td>
                                <td>{action?.who}</td>
                                <td>{action?.where}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
