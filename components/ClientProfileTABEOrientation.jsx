import React, { useState } from 'react';
import moment from 'moment/moment';
import { useClients } from '@/contexts/ClientsContext';
import InputLabel from '@/components/InputLabel';

function ClientProfileTabeOrientation() {
  const { selectedClient } = useClients();
  const [tabeOpen, setTabeOpen] = useState(false);
  const [orientationOpen, setOrientationOpen] = useState(false);
  const [dateValue, setDateValue] = useState('');

  const handleChange = (e) => {
    setDateValue(e.target.value);
  };

  const handleTabeSave = async () => {
    const res = await fetch(`/api/tabe`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: selectedClient._id,
        completedDate: dateValue,
      }),
      method: 'POST'
    });
    const data = await res.json();
    if (data.error) {
      console.error(data.error);
    } else {
      console.log('data', data);
      setDateValue('');
      setTabeOpen(false);
    }
  };

  function hasValidKey(obj, key) {
    return obj && Object.prototype.hasOwnProperty.call(obj, key) && !!obj[key];
  }

  return (
    <div className="w-full mt-6 text-sm">
      {
        selectedClient && (selectedClient.tabe.completionDate || selectedClient.orientation.completionDate || selectedClient.transcripts === "yes") && (
          <div
            className={`grid grid-cols-3 xl:grid-cols-3 w-full border-1 border-base-300/30 bg-base-200/40 shadow-xl rounded-lg py-4 px-4 ${hasValidKey(selectedClient, 'tabe') || hasValidKey(selectedClient, 'orientation') ? 'visible' : 'hidden'}`}>
            {
              hasValidKey(selectedClient, 'tabe') ? (
                <div className={`px-4 border-r-1 border-base-content/10`}>
                  <div className={`grid grid-cols-1 gap-2`}>
                    <div className="font-semibold">TABE</div>
                    <div>
                      <div className={`text-xs font-light`}>Date Referred</div>
                      {moment(selectedClient.tabe.dateReferred).format('MMMM Do, YYYY')}
                    </div>
                    <div>
                      <div
                        className={`text-xs font-light ${tabeOpen ? 'invisible h-0 collapse overflow-hidden' : 'visible'}`}>Date
                        Completed
                      </div>
                      {
                        selectedClient.tabe.completionDate !== ""
                          ? <div>{moment(selectedClient.tabe.completedDate).format('MMMM Do, YYYY')}</div>
                          : (<div>
                            <div onClick={() => setTabeOpen(!tabeOpen)}
                                 className={`text-secondary underline cursor-pointer ${tabeOpen ? 'invisible h-0 collapse overflow-hidden' : 'visible'}`}>Enter
                              date
                            </div>
                            <div
                              className={`flex gap-4 items-baseline ${tabeOpen ? 'visible' : 'invisible h-0 collapse overflow-hidden'}`}>
                              <InputLabel className={``} type={`date`} name={`tabe`}
                                          value={dateValue} handleChange={handleChange} label="Date Completed" />
                              <button onClick={handleTabeSave}
                                      className={`inline text-secondary/50 hover:text-secondary underline text-xs font-light ${tabeOpen ? 'visible' : 'invisible'}`}>Save
                              </button>
                            </div>
                          </div>)
                      }
                    </div>
                  </div>
                </div>
              ) : ''
            }
            {
              hasValidKey(selectedClient, 'orientation') ? (
                <div className={`px-4 border-r-1 border-base-content/10`}>
                  <div className={`grid grid-cols-1 gap-2`}>
                    <div className="font-semibold">Orientation</div>
                    <div>
                      <div className={`text-xs font-light`}>Date Referred</div>
                      {moment(selectedClient?.orientation.dateReferred).format('MMMM Do, YYYY')}
                    </div>
                    <div>
                      <div
                        className={`text-xs font-light ${tabeOpen ? 'invisible h-0 collapse overflow-hidden' : 'visible'}`}>Date
                        Completed
                      </div>
                      {
                        selectedClient?.orientation.completedDate
                          ? <div>{moment(selectedClient.orientation.completedDate).format('MMMM Do, YYYY')}</div>
                          : (<div>
                            <div onClick={() => setOrientationOpen(!orientationOpen)}
                                 className={`text-secondary underline cursor-pointer ${orientationOpen ? 'invisible h-0 collapse overflow-hidden' : 'visible'}`}>Enter
                              date
                            </div>
                            <div
                              className={`flex gap-4 items-baseline ${orientationOpen ? 'visible' : 'invisible h-0 collapse overflow-hidden'}`}>
                              <InputLabel className={``} type={`date`} name={`tabe`}
                                          value={dateValue} handleChange={handleChange} label="Date Completed" />
                              <button onClick={handleTabeSave}
                                      className={`inline text-secondary/50 hover:text-secondary underline text-xs font-light ${orientationOpen ? 'visible' : 'invisible'}`}>Save
                              </button>
                            </div>
                          </div>)
                      }
                    </div>
                  </div>
                </div>
              ) : ''
            }
            {
              hasValidKey(selectedClient, 'tabe') ? (
                <div className={`flex justify-center items-start px-6`}>
                  <div className={`grid grid-cols-1 gap-2`}>
                    <div className="font-semibold">Transcripts</div>
                    <div>
                      <div className={`text-xs font-light`}>Date Obtained</div>
                      {moment(selectedClient.tabe.dateReferred).format('MMMM Do, YYYY')}
                    </div>
                  </div>
                </div>
              ) : ''
            }
          </div>
        )
      }
    </div>
  );
}

export default ClientProfileTabeOrientation;
