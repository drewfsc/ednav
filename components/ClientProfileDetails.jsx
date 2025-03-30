import React, {useEffect, useState} from "react";
import ActivityTable from "/components/ActivityTable";
import {useClients} from "/contexts/ClientsContext";
import { CheckCircleIcon } from '@heroicons/react/20/solid';

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
    const [hasTrackable, setHasTrackable] = useState([]);
    const [updated, setUpdated] = useState(false);

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

    useEffect(() => {
        if(selectedClient && selectedClient.trackable) {
            setHasTrackable(selectedClient.trackable.items)
        } else {
            setHasTrackable([])
        }
    }, [actions])

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

    const handleTrackableUpdate = async () => {
        const res = await fetch(`/api/trackable?clientId=${selectedClient._id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedClient),
            method: 'POST'
        })
        const data = await res.json();
        if (data.error) {
            console.error(data.error);
        }else {
            console.log("data", data);
        }
        setUpdated(false);
    }

    function calculateCompletionPercentage( items ) {
        if (!items.length) return 0;

        const completedCount = items.filter(item => item.completed).length;
        const totalCount = items.length;

        return ((completedCount / totalCount) * 100).toFixed(1);
    }

    useEffect( () => {
       getActions().then()
    }, [selectedClient])

    return (
        <div className="mb-12 ml-6">
            <div className="flex w-full gap-6 mt-6">
                <div className={`w-1/2 bg-base-200 p-6 rounded-lg`}>
                    <div className="font-semibold mb-4">Personal <span onClick={() => {
                        if (editingPersonal) {
                            handleSubmit().then();
                            setEditingPersonal(false);
                        }
                        else {
                            setEditingPersonal(true);
                        }
                    }} className={`text-secondary/50 text-xs hover:text-secondary cursor-pointer underline font-normal`}>{editingPersonal ? 'Save' : 'Edit'}</span></div>
                    <div className="text-sm">
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
                <div className={`w-1/2 bg-base-200 p-6 rounded-lg`}>
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
            {
               selectedClient && Object.hasOwn(selectedClient, 'trackable') && (
                <div className={`flex-col w-full gap-6 mt-6 bg-base-200 rounded-lg p-6`}>
                    <div className={`flex items-center justify-between  mt-0 mb-2`}>
                        <div>{selectedClient?.trackable.type} Progress - {calculateCompletionPercentage(selectedClient?.trackable.items)}%</div>
                        <div onClick={handleTrackableUpdate} className={` cursor-pointer text-sm text-secondary font-light underline ${updated ? 'visible' : 'hidden'}`}>Save Progress</div>
                    </div>
                    <progress className="progress progress-success w-full" value={calculateCompletionPercentage(selectedClient?.trackable.items)} max="100"></progress>
                    <div className={`flex gap-3 flex-wrap mt-4`}>
                        {
                        hasTrackable.map((item, index) => (
                          <span key={index} className={`text-nowrap cursor-pointer`} onClick={() => {
                              const hasTrackableState = !hasTrackable[index].completed;
                              setHasTrackable(prevState => {
                                  const newItems = [...prevState];
                                  newItems[index].completed = hasTrackableState;
                                  setUpdated(true);
                                  return newItems;
                              })
                          }}>
                              {item.completed ? <span className={`text-xs border rounded-full pr-2 flex items-center justify-center border-success`}><span className={`mr-1`}><CheckCircleIcon className={`w-6 h-6 text-success`}/></span>{item.name}</span> : <span className={`text-xs border rounded-full pr-2 flex items-center justify-center border-base-content/40`}><span className={`mr-1`}><span className={`w-5 h-5 m-[2px] text-base-content/40 block border rounded-full`}/></span>{item.name}</span>}
                          </span>
                        ))
                    }
                    </div>
                </div>
              )
            }

            <ActivityTable
              selectedClient={selectedClient}
              setHasTrackable={setHasTrackable}
              fetching={fetching}
              setFetching={setFetching}
              actions={actions}
              setActions={setActions}
              notes={notes}
              setNotes={setNotes}
              client={selectedClient}/>
        </div>
    );
}
