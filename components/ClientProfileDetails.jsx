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
    const [fetching, setFetching] = useState(false);
    const [hasTrackable, setHasTrackable] = useState([]);
    const [updated, setUpdated] = useState(false);

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

    useEffect(() => {
        if(selectedClient && selectedClient.trackable) {
            setHasTrackable(selectedClient.trackable.items)
        } else {
            setHasTrackable([])
        }
    }, [actions])

    useEffect( () => {
       getActions().then()
    }, [selectedClient])

    return (
        <div className="mb-12 ml-6">
            <ClientProfileProgress hasTrackable={hasTrackable} setHasTrackable={setHasTrackable} updated={updated} setUpdated={setUpdated}/>
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
            <ClientProfileTABEOrientation/>
            <ClientProfilePersonalOrganization/>

        </div>
    );
}
