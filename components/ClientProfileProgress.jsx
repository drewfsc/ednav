import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useClients } from '@/contexts/ClientsContext';

function ClientProfileProgress({ hasTrackable, setHasTrackable, updated, setUpdated, hasTrackableCopy}) {
  const {selectedClient} = useClients();

  const handleTrackableUpdate = async () => {
    const graduated = hasTrackable.filter(item => item.completed === true).length === hasTrackable.length;
    if (graduated) {
      setHasTrackable(prevState => {
        return [...prevState,
          {'programComplete': true }
          ]
      })
    }
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
    if (!items?.length) return 0;

    const completedCount = items.filter(item => item?.completed).length;
    const totalCount = items?.length;

    return ((completedCount / totalCount) * 100).toFixed(1);
  }

  return (
    <div>
      {
        hasTrackable && hasTrackableCopy && hasTrackable.length > 0 && (
          <div className={`flex-col gap-6 mt-6 border-1 border-base-300/60 bg-base-200/50 shadow-xl rounded-lg p-6 w-full`}>
            <div className={`flex items-center justify-between  mt-0 mb-2`}>
              <div>
                {selectedClient?.trackable?.type} Progress
                - {calculateCompletionPercentage(selectedClient?.trackable?.items)}%
                <p className={`text-xs text-info`}>If you are having trouble selecting items, please refresh the
                  page.</p>
              </div>

              <div onClick={handleTrackableUpdate} className={` cursor-pointer text-sm text-secondary font-light underline ${updated ? 'visible' : 'hidden'}`}>Save Progress</div>
            </div>
            <progress className="progress progress-success" value={calculateCompletionPercentage(selectedClient?.trackable?.items)} max="100"></progress>
            <div className={`flex gap-3 flex-wrap mt-4`}>
              {
                hasTrackable?.map((item, index) => {
                  return (
                    <button key={index}
                            disabled={hasTrackableCopy[index]?.completed === true}
                            className={`text-nowrap cursor-pointer disabled:cursor-not-allowed`}
                            onClick={() => {
                              const hasTrackableState = !hasTrackable[index].completed;
                              setHasTrackable(prevState => {
                                const newItems = [...prevState];
                                newItems[index].completed = hasTrackableState;
                                setUpdated(true);
                                return newItems;
                              })
                            }}>
                      {item.completed === true ?
                        <span className={`text-xs border rounded-full pr-2 flex items-center justify-center border-success`}>
                          <span className={`mr-1`}>
                            <CheckCircleIcon className={`w-6 h-6 text-success`}/>
                          </span>{item.name}</span> :
                        <span className={`text-xs border rounded-full pr-2 flex items-center justify-center border-base-content/40`}>
                          <span className={`mr-1`}>
                            <span className={`w-5 h-5 m-[2px] text-base-content/40 block border rounded-full`}/></span>
                          {item.name}
                        </span>}
                    </button>
                  )
                })
              }
            </div>
          </div>
        )
      }

    </div>
  );
}

export default ClientProfileProgress;