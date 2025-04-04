import React, {useEffect, useState} from "react";
import ActivityTable from "/components/ActivityTable";
import {useClients} from "/contexts/ClientsContext";
import ClientProfilePersonalOrganization from '@/components/ClientProfilePersonalOrganization';
import ClientProfileProgress from '@/components/ClientProfileProgress';
import ClientProfileTABEOrientation from '@/components/ClientProfileTABEOrientation';

export default function ClientProfileDetails() {
    const {selectedClient} = useClients();
    const [actions, setActions] = useState([]);
    const [notes, setNotes] = useState([])
    const [hasTrackable, setHasTrackable] = useState([]);
    const [hasTrackableUpdated, setHasTrackableUpdated] = useState(false);
    const [hasTrackableCopy, setHasTrackableCopy] = useState([]);
    const [updated, setUpdated] = useState(false);

    const getNotes = async () => {
        if (!selectedClient) return;
        const response = await fetch(`/api/notes?clientId=${selectedClient._id}`);
        const data = await response.json();
        setNotes(prevState => {
            return [...prevState, ...data];
        });
    };

    useEffect(() => {
        getNotes().then();
    }, [setNotes, selectedClient]);

    let getActions;
    getActions = async () => {
        if (!selectedClient) return;
        try {
            await fetch(`/api/activities?clientId=${selectedClient._id}`)
              .then(response => response.json())
              .then(data => {
                  setActions(data);
              })
              .catch(error => console.error('Error fetching client activities:', error));
        } catch (error) {
            console.error('Error fetching client activities:', error);
        }
    };

    useEffect( () => {
        getActions().then()
    }, [selectedClient, setActions])
    
    useEffect(() => {
        if(selectedClient && selectedClient.trackable) {
            setHasTrackable(selectedClient.trackable.items)
            if (!hasTrackableUpdated){
                const copy = JSON.parse(JSON.stringify(selectedClient.trackable.items))
                setHasTrackableCopy(copy)
                setHasTrackableUpdated(true)
            }
        } else {
            setHasTrackable([])
        }
    }, [actions])

    return (
        <div className="mb-12 ml-6 w-full transition-all duration-500">
            {selectedClient && selectedClient.group === "Adult" && <ClientProfileProgress hasTrackableCopy={hasTrackableCopy} hasTrackable={hasTrackable}
                                    setHasTrackable={setHasTrackable} updated={updated} setUpdated={setUpdated} />}
            <ActivityTable
              getNotes={getNotes}
              getActions={getActions}
              hasTrackable={hasTrackable}
              setHasTrackable={setHasTrackable}
              hasTrackableUpdated={hasTrackableUpdated}
              setHasTrackableUpdated={setHasTrackableUpdated}
              actions={actions}
              setActions={setActions}
              notes={notes}
              setNotes={setNotes}
              client={selectedClient}/>
            <ClientProfileTABEOrientation/>
            <ClientProfilePersonalOrganization/>
        </div>
    );
}
