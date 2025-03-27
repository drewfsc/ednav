"use client";
import React from 'react';
import ClientDescription from "../components/ClientProfileDetails"
import {useClients} from "../contexts/ClientsContext";
// import ThemedChart from "./ThemedBarChart";


export default function DashboardContent({loading}) {
    const {selectedClient} = useClients();

    return (
        loading ? <div>Loading...</div> : <div>
            <div>
                <div>
                    {selectedClient &&
                        <div className={`grid grid-cols-3 gap-3 w-full`}>
                            <div className={`col-span-3 bg-base-300 min-h-10 py-2 px-4 rounded flex items-center justify-between font-normal`}>
                                <div className={``}>{selectedClient.name}</div>

                                <div><span className={`text-sm text-base-content`}>Referred: </span>{selectedClient.dateReferred}</div>
                                <div><span className={`text-sm text-base-content`}>Age Group: </span>{selectedClient.group}</div>
                                <div><span className={`text-sm text-base-content`}>Case Number: </span>{selectedClient.caseNumber}</div>
                            </div>
                            <div className={`col-span-1 bg-base-200 min-h-80 rounded overflow-clip`}>
                                <ClientDescription client={selectedClient} />
                            </div>
                            <div className={`col-span-2 bg-base-200 rounded overflow-clip`}>
                                {/*<ActivityTable actions={stats.actions} />*/}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
