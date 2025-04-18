import React, { useState } from "react";
import moment from "moment/moment";
import { useClients } from "@/contexts/ClientsContext";
import InputLabel from "@/components/client/InputLabel";

function ClientProfileTabeOrientation() {
  const { selectedClient } = useClients();
  const [tabeOpen, setTabeOpen] = useState(false);
  const [orientationOpen, setOrientationOpen] = useState(false);
  const [dateValue, setDateValue] = useState("");

  const handleChange = (e) => {
    setDateValue(e.target.value);
  };

  const handleTabeSave = async () => {
    const res = await fetch(`/api/tabe`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: selectedClient._id,
        completionDate: dateValue,
      }),
      method: "POST",
    });
    const data = await res.json();
    if (data.error) {
      console.error(data.error);
    } else {
      setDateValue("");
      setTabeOpen(false);
    }
  };

  function hasValidKey(obj, key) {
    return obj && Object.prototype.hasOwnProperty.call(obj, key) && !!obj[key];
  }

  return (
    <div className="mt-6 w-full text-sm">
      {selectedClient &&
        (selectedClient.tabe?.completionDate ||
          selectedClient.orientation?.completionDate ||
          selectedClient.transcripts === "yes") && (
          <div
            className={`border-base-300/30 bg-base-200/40 grid w-full grid-cols-3 rounded-lg border-1 px-4 py-4 shadow-xl xl:grid-cols-3 ${hasValidKey(selectedClient, "tabe") || hasValidKey(selectedClient, "orientation") ? "visible" : "hidden"}`}
          >
            {hasValidKey(selectedClient, "tabe") ? (
              <div className={`border-base-content/10 border-r-1 px-4`}>
                <div className={`grid grid-cols-1 gap-2`}>
                  <div className="font-semibold">TABE</div>
                  <div>
                    <div className={`text-xs font-light`}>Date Referred</div>
                    {moment(selectedClient.tabe?.referralDate).format(
                      "MMMM Do, YYYY",
                    )}
                  </div>
                  <div>
                    <div
                      className={`text-xs font-light ${tabeOpen ? "collapse invisible h-0 overflow-hidden" : "visible"}`}
                    >
                      Date Completed
                    </div>
                    {selectedClient.tabe?.completionDate !== "" ? (
                      <div>
                        {moment(selectedClient.tabe?.completionDate).format(
                          "MMMM Do, YYYY",
                        )}
                      </div>
                    ) : (
                      <div>
                        <div
                          onClick={() => setTabeOpen(!tabeOpen)}
                          className={`text-secondary cursor-pointer underline ${tabeOpen ? "collapse invisible h-0 overflow-hidden" : "visible"}`}
                        >
                          Enter date
                        </div>
                        <div
                          className={`flex items-baseline gap-4 ${tabeOpen ? "visible" : "collapse invisible h-0 overflow-hidden"}`}
                        >
                          <InputLabel
                            className={``}
                            type={`date`}
                            name={`tabe`}
                            value={dateValue}
                            handleChange={handleChange}
                            label="Date Completed"
                          />
                          <button
                            onClick={handleTabeSave}
                            className={`text-secondary/50 hover:text-secondary inline text-xs font-light underline ${tabeOpen ? "visible" : "invisible"}`}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {hasValidKey(selectedClient, "orientation") ? (
              <div className={`border-base-content/10 border-r-1 px-4`}>
                <div className={`grid grid-cols-1 gap-2`}>
                  <div className="font-semibold">Orientation</div>
                  <div>
                    <div className={`text-xs font-light`}>Date Referred</div>
                    {moment(selectedClient?.orientation?.referralDate).format(
                      "MMMM Do, YYYY",
                    )}
                  </div>
                  <div>
                    <div
                      className={`text-xs font-light ${tabeOpen ? "collapse invisible h-0 overflow-hidden" : "visible"}`}
                    >
                      Date Completed
                    </div>
                    {selectedClient?.orientation?.completionDate ? (
                      <div>
                        {moment(
                          selectedClient.orientation?.completionDate,
                        ).format("MMMM Do, YYYY")}
                      </div>
                    ) : (
                      <div>
                        <div
                          onClick={() => setOrientationOpen(!orientationOpen)}
                          className={`text-secondary cursor-pointer underline ${orientationOpen ? "collapse invisible h-0 overflow-hidden" : "visible"}`}
                        >
                          Enter date
                        </div>
                        <div
                          className={`flex items-baseline gap-4 ${orientationOpen ? "visible" : "collapse invisible h-0 overflow-hidden"}`}
                        >
                          <InputLabel
                            className={``}
                            type={`date`}
                            name={`tabe`}
                            value={dateValue}
                            handleChange={handleChange}
                            label="Date Completed"
                          />
                          <button
                            onClick={handleTabeSave}
                            className={`text-secondary/50 hover:text-secondary inline text-xs font-light underline ${orientationOpen ? "visible" : "invisible"}`}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {hasValidKey(selectedClient, "tabe") ? (
              <div className={`flex items-start justify-center px-6`}>
                <div className={`grid grid-cols-1 gap-2`}>
                  <div className="font-semibold">Transcripts</div>
                  <div>
                    <div className={`text-xs font-light`}>Date Obtained</div>
                    {moment(selectedClient.tabe?.referralDate).format(
                      "MMMM Do, YYYY",
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
    </div>
  );
}

export default ClientProfileTabeOrientation;
