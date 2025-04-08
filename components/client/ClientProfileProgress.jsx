import React from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useClients } from "@/contexts/ClientsContext";

function ClientProfileProgress({
  hasTrackable,
  setHasTrackable,
  updated,
  setUpdated,
  hasTrackableCopy,
}) {
  const { selectedClient } = useClients();

  const handleTrackableUpdate = async () => {
    const graduated =
      hasTrackable.filter((item) => item.completed === true).length ===
      hasTrackable.length;
    if (graduated) {
      setHasTrackable((prevState) => {
        return [...prevState, { programComplete: true }];
      });
    }

    const res = await fetch(`/api/trackable?clientId=${selectedClient._id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedClient),
      method: "POST",
    });
    const data = await res.json();
    if (data.error) {
      console.error(data.error);
    }
    setUpdated(false);
  };

  function calculateCompletionPercentage(items) {
    if (!items?.length) return 0;

    const completedCount = items.filter((item) => item?.completed).length;
    const totalCount = items?.length;

    return ((completedCount / totalCount) * 100).toFixed(1);
  }

  return (
    <div>
      {hasTrackable && hasTrackableCopy && hasTrackable.length > 0 && (
        <div
          className={`border-base-300/60 bg-base-200/50 mt-6 w-full flex-col gap-6 rounded-lg border-1 p-6 shadow-xl`}
        >
          <div className={`mt-0 mb-2 flex items-center justify-between`}>
            <div>
              {selectedClient?.trackable?.type} Progress -{" "}
              {calculateCompletionPercentage(selectedClient?.trackable?.items)}%
            </div>
            <div
              onClick={handleTrackableUpdate}
              className={`text-secondary cursor-pointer text-sm font-light underline ${updated ? "visible" : "hidden"}`}
            >
              Save Progress
            </div>
          </div>
          <progress
            className="progress progress-success"
            value={calculateCompletionPercentage(
              selectedClient?.trackable?.items,
            )}
            max="100"
          ></progress>
          <div className={`mt-4 flex flex-wrap gap-3`}>
            {hasTrackable?.map((item, index) => {
              return (
                <button
                  key={index}
                  disabled={hasTrackableCopy[index]?.completed === true}
                  className={`cursor-pointer text-nowrap disabled:cursor-not-allowed`}
                  onClick={() => {
                    const hasTrackableState = !hasTrackable[index].completed;
                    setHasTrackable((prevState) => {
                      const newItems = [...prevState];
                      newItems[index].completed = hasTrackableState;
                      setUpdated(true);
                      return newItems;
                    });
                  }}
                >
                  {item.completed === true ? (
                    <span
                      className={`border-success flex items-center justify-center rounded-full border pr-2 text-xs`}
                    >
                      <span className={`mr-1`}>
                        <CheckCircleIcon className={`text-success h-6 w-6`} />
                      </span>
                      {item.name}
                    </span>
                  ) : (
                    <span
                      className={`border-base-content/40 flex items-center justify-center rounded-full border pr-2 text-xs`}
                    >
                      <span className={`mr-1`}>
                        <span
                          className={`text-base-content/40 m-[2px] block h-5 w-5 rounded-full border`}
                        />
                      </span>
                      {item.name}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientProfileProgress;
