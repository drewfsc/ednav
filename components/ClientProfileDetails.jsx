import React, {useEffect, useState} from "react";
import ActivityTable from "/components/ActivityTable";
import {useClients} from "/contexts/ClientsContext";
import ClientProfilePersonalOrganization from '@/components/ClientProfilePersonalOrganization';
import ClientProfileProgress from '@/components/ClientProfileProgress';
import moment from 'moment';

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

    function hasValidKey(obj, key) {
        return obj && Object.prototype.hasOwnProperty.call(obj, key) && !!obj[key];
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

    const skeletonPlaceholder = () => {
        return (
          <div className={`w-1/2 h-full`}>
              <div className="font-semibold mb-4 w-18 h-[19px] bg-base-300 rounded"/>
              <div className={`flex justify-start gap-10`}>
                  <div>
                      <div className={`text-sm font-light w-24 h-4 bg-base-300 rounded mb-1.5`}/>
                      <div className={`text-sm font-light w-36 h-6 bg-base-300 rounded`}/>
                  </div>
                  <div>
                      <div className={`text-sm font-light w-24 h-4 bg-base-300 rounded mb-1.5`}/>
                      <div className={`text-sm font-light w-36 h-6 bg-base-300 rounded`}/>
                  </div>
              </div>
          </div>
        )
    }

    return (
        <div className="mb-12 ml-6">
            <ClientProfilePersonalOrganization/>
            {
              selectedClient && (hasValidKey(selectedClient, "tabe") || hasValidKey(selectedClient, "orientation")) && (
                <div className={`flex justify-items-start divide-x divide-base-content/10 w-full mt-6 bg-base-200 rounded-lg p-6 ${hasValidKey(selectedClient, 'tabe') || hasValidKey(selectedClient, 'orientation') ? 'visible' : 'hidden'}`}>
                    {
                        hasValidKey(selectedClient, 'tabe') ? (
                            <div className={`w-1/2 pr-4 `}>
                                <div className="font-semibold mb-2">TABE</div>
                                <div className={`flex justify-start gap-10`}>
                                    <div>
                                        <div className={`text-sm font-light`}>Referred Date</div>
                                        {moment(selectedClient.tabe.referredDate).format('MMMM Do, YYYY')}
                                    </div>
                                    <div>
                                        <div className={`text-sm font-light`}>Completed Date</div>
                                        {
                                            selectedClient.tabe.completedDate ? <div>{moment(selectedClient.tabe.completedDate).format('MMMM Do, YYYY')}</div> : <div className={`text-secondary underline`}>Enter complete date</div>
                                        }

                                    </div>
                                </div>
                            </div>
                      ) : <div className={`w-1/2`}>{skeletonPlaceholder()}</div>
                    }
                    {
                        hasValidKey(selectedClient.orientation, 'dateReferred') ? (
                          <div className={`w-1/2 pl-8 `}>
                              <div className="font-semibold mb-2">Orientation</div>
                              <div className={`flex justify-start gap-10`}>
                                  <div>
                                      <div className={`text-sm font-light`}>Referred Date</div>
                                      {moment(selectedClient.orientation.dateReferred).format('MMMM Do, YYYY')}
                                  </div>
                                  <div>
                                      <div className={`text-sm font-light`}>Completed Date</div>
                                      {
                                          selectedClient.orientation.completedDate ? <div>{moment(selectedClient.orientation.completedDate).format('MMMM Do, YYYY')}</div> : <div className={`text-secondary underline`}>Enter complete date</div>
                                      }

                                  </div>
                              </div>
                          </div>
                        ) : <div className={`pl-4`}>{skeletonPlaceholder()}</div>
                    }
                </div>
              )
            }

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
        </div>
    );
}
