import React from 'react';
import moment from "moment";
import {GuidedActivityForm} from "./guided-activity-form";

export default function ActivityTable({actions}) {
    return (
        <div>
            <div className="overflow-x-auto">
                <GuidedActivityForm client={selectedClient} navigator={selectedNavigator} fep={selectedFep}/>
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Who</th>
                        <th>What</th>
                        <th>When</th>
                        <th>Where</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        actions.map((action, i) => (
                            <tr key={i}>
                                <th>{action?.who}</th>
                                <td>{action?.what}</td>
                                <td>{moment(action?.when).calendar()}</td>
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
