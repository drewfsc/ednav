import React, {useEffect, useState} from "react";
import ActivityTable from "@/components/ActivityTable";
import {useClients} from "@/contexts/ClientsContext";

const getClientActionsUrl = (clientId) => `/api/activities?clientId=${clientId}`;

export default function ClientProfileDetails({ client }) {
    const [change, setChange] = useState({
        _id: client._id,
        email: client.email,
        contactNumber: client.contactNumber,
        dob: client.dob,
        lastGrade: client.lastGrade,
        fep: client.fep,
        referred: client.dateReferred,
        pin: client.pin,
        region: client.region,
        clientStatus: client.clientStatus,
        transcripts: client.transcripts,
        officeCity: client.officeCity,
        group: client.group,
        schoolIfEnrolled: client.schoolIfEnrolled,
    });
    const [editingPersonal, setEditingPersonal] = useState(false);
    const [editingOrganization, setEditingOrganization] = useState(false);
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const {selectedClient} = useClients();

    const personalFields = ["email", "contactNumber", "dob", "lastGrade", "clientStatus", "transcripts"];
    const organizationFields = ["fep", "referred", "pin", "region", "officeCity", "schoolIfEnrolled"];

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

    const fetchActionsData = async (clientId) => {

        try {
            const response = await fetch(getClientActionsUrl(clientId));
            if (response.ok) {
                const data = await response.json();
                setActions(data);
            }
        } catch (error) {
            console.error("Error fetching client activities:", error);
        }
    };

    useEffect(() => {
        setLoading(true);
        if (selectedClient) {
            fetchActionsData(client._id).finally(() => setLoading(false));
        }
    }, [client._id]);

    return (
        <div className="  mb-12 ml-6">
            <div className="flex w-full gap-20 mt-6">
                <div className={`flex-1`}>
                    <div className="font-semibold mb-4">Personal <span onClick={() => {
                        if (editingPersonal) {
                            handleSubmit().then();
                            setEditingPersonal(false);
                        }
                        else {
                            setEditingPersonal(true);
                        }
                    }} className={`font-normal underline text-accent cursor-pointer`}>{editingPersonal ? 'Save' : 'Edit'}</span></div>
                    <div className="flex-1 text-sm">
                        <dl className="divide-y divide-base-content/20 w-full">
                            {
                                personalFields.map((f) => (
                                    <div key={f} className="py-2 grid grid-cols-2 gap-4 text-base-content text-sm/6">
                                        <dt className="font-light capitalize">{f}</dt>
                                        <dd className={`visible ${editingPersonal ? 'hidden' : 'visible'}`}>
                                            <div className={``}>{client[f]}</div>
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
                <div className={`flex-1`}>
                    <div className="font-semibold mt-0 mb-4">Organization <span onClick={() => {
                        if (editingOrganization) {
                            handleSubmit().then();
                            setEditingOrganization(false);
                        }
                        else {
                            setEditingOrganization(true);
                        }
                    }} className={`font-normal underline text-accent cursor-pointer`}>{editingOrganization ? 'Save' : 'Edit'}</span></div>
                    <div className="text-sm w-full">
                        <dl className="divide-y divide-base-content/20">
                            {
                                organizationFields.map((f) => (
                                    <div key={f} className="py-2 grid grid-cols-2 gap-4 text-base-content text-sm/6">
                                        <dt className="font-light capitalize">{f}</dt>
                                        <dd className={`visible ${editingOrganization ? 'hidden' : 'visible'}`}>
                                            <div className={``}>{client[f]}</div>
                                        </dd>
                                        <dd className={`${!editingOrganization ? 'hidden' : ''}`}>
                                            <input className={`border`} name={f} type={`text`} value={change[f]} onChange={handleChange}/>
                                        </dd>
                                        {/*<dd className="">Edit</dd>*/}
                                    </div>
                                ))
                            }
                        </dl>
                    </div>

                </div>

            </div>
            <ActivityTable actions={actions} loading={loading} client={client}
                           onActivityAddedAction={fetchActionsData}/>
        </div>
    );
}
