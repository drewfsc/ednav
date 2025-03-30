import React, {useEffect, useState} from "react";
import ActivityTable from "/components/ActivityTable";
import {useClients} from "/contexts/ClientsContext";
import ActivityFeed from './ActivityFeed';

export default function ClientProfileDetails() {
    const {selectedClient} = useClients();
    const [change, setChange] = useState({
        _id: selectedClient?._id,
        email: selectedClient?.email,
        contactNumber: selectedClient?.contactNumber,
        dob: selectedClient?.dob,
        lastGrade: selectedClient?.lastGrade,
        fep: selectedClient?.fep,
        referred: selectedClient?.dateReferred,
        pin: selectedClient?.pin,
        region: selectedClient?.region,
        clientStatus: selectedClient?.clientStatus,
        transcripts: selectedClient?.transcripts,
        officeCity: selectedClient?.officeCity,
        group: selectedClient?.group,
        schoolIfEnrolled: selectedClient?.schoolIfEnrolled,
    });
    const [editingPersonal, setEditingPersonal] = useState(false);
    const [editingOrganization, setEditingOrganization] = useState(false);
    const [actions, setActions] = useState([]);
    const [notes, setNotes] = useState([])
    const [fetching, setFetching] = useState(false);
    const personalFields = ["email", "contactNumber", "dob", "lastGrade", "schoolIfEnrolled", "group"];
    const organizationFields = ["fep", "dateReferred", "pin", "region", "officeCity", "clientStatus"];

    const handleChange = (e) => {
        setChange({...change, [e.target.name]: e.target.value});
    }

    const handleSubmit = async () => {
        await fetch('/api/clients', {
            method: 'POST',
            body: JSON.stringify(change),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    const getActions = async () => {
        if (!selectedClient) return;
        try {
            await fetch(`/api/activities?clientId=${selectedClient._id}`)
              .then(response => response.json())
              .then(data => setActions(data))
              .catch(error => console.error('Error fetching client activities:', error))
        } catch (error) {
            console.error("Error fetching client activities:", error);
        }

    }

    useEffect( () => {
       getActions().then()
    }, [selectedClient])

    // const fetchActionsData = async () => {
    //
    //     try {
    //         const response = await fetch(`/api/activities?clientId=${selectedClient._id}`);
    //             const data = await response.json();
    //             await setActions(data);
    //
    //     } catch (error) {
    //         console.error("Error fetching client activities:", error);
    //     }
    // };
    //
    // useEffect(() => {
    //     if (selectedClient) {
    //         fetchActionsData().then()
    //     }
    // }, []);

    return (
        <div className="  mb-12 ml-6">
            <div className="flex w-full gap-6 mt-6">
                <div className={`flex-1 bg-base-200 p-4 rounded-lg`}>
                    <div className="font-semibold mb-4">Personal <span onClick={() => {
                        if (editingPersonal) {
                            handleSubmit().then();
                            setEditingPersonal(false);
                        }
                        else {
                            setEditingPersonal(true);
                        }
                    }} className={`text-secondary/50 text-xs hover:text-secondary cursor-pointer underline font-normal`}>{editingPersonal ? 'Save' : 'Edit'}</span></div>
                    <div className="flex-1 text-sm">
                        <dl className="divide-y divide-base-content/20 w-full">
                            {
                              selectedClient && personalFields.map((f) => (
                                    <div key={f} className="py-2 grid grid-cols-2 gap-4 text-base-content text-sm/6">
                                        <dt className="font-light capitalize">{f}</dt>
                                        <dd className={`visible ${editingPersonal ? 'hidden' : 'visible'}`}>
                                            <div className={``}>{selectedClient[f]}</div>
                                        </dd>
                                        <dd className={`${!editingPersonal ? 'hidden' : ''}`}>
                                            <input className={`border`} name={f} type={`text`} value={change[f]} onChange={handleChange}/>
                                        </dd>
                                    </div>
                                ))
                            }
                        </dl>
                    </div>
                </div>
                <div className={`flex-1 bg-base-200 p-4 rounded-lg`}>
                    <div className="font-semibold mt-0 mb-4">Organization <span onClick={() => {
                        if (editingOrganization) {
                            handleSubmit().then();
                            setEditingOrganization(false);
                        }
                        else {
                            setEditingOrganization(true);
                        }
                    }} className={`text-secondary/50 text-xs hover:text-secondary cursor-pointer underline font-normal`}>{editingOrganization ? 'Save' : 'Edit'}</span></div>
                    <div className="text-sm w-full">
                        <dl className="divide-y divide-base-content/20">
                            {
                                selectedClient &&  organizationFields.map((f) => (
                                    <div key={f} className="py-2 grid grid-cols-2 gap-4 text-base-content text-sm/6">
                                        <dt className="font-light capitalize">{f}</dt>
                                        <dd className={`visible ${editingOrganization ? 'hidden' : 'visible'}`}>
                                            <div className={``}>{selectedClient[f]}</div>
                                        </dd>
                                        <dd className={`${!editingOrganization ? 'hidden' : ''}`}>
                                            <input className={`border`} name={f} type={`text`} value={change[f]} onChange={handleChange}/>
                                        </dd>
                                    </div>
                                ))
                            }
                        </dl>
                    </div>

                </div>

            </div>
            {/*<div className={`my-16`}>*/}
            {/*    <ActivityFeed client={selectedClient} actions={actions} setActions={setActions} notes={notes} setNotes={setNotes}/>*/}
            {/*</div>*/}

            <ActivityTable selectedClient={selectedClient} fetching={fetching} setFetching={setFetching} actions={actions} setActions={setActions} notes={notes} setNotes={setNotes} client={selectedClient}
                           />
        </div>
    );
}
