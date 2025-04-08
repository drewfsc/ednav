"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import NoteFeed from "/components/activity/NoteFeed";
import ActivityModal from "/components/activity/ActivityModal";
import { useActivities } from "@/contexts/ActivityContext";

export default function ActivityTable({ actions }) {
  const { selectedActivity, setSelectedActivity } = useActivities();
  const [open, setOpen] = useState(false);
  const [, setActivities] = useState([]);

  useEffect(() => {
    if (window) {
      setActivities(selectedActivity?.activities);
    }
  }, [open, setOpen, selectedActivity, setSelectedActivity]);

  return (
    <div
      className={`border-base-300/60 bg-base-200/50 mt-6 w-full flex-col gap-6 rounded-lg border-1 p-6 shadow-xl`}
    >
      <ActivityModal open={open} setOpen={setOpen} />
      <div className={`mb-8 flex items-center justify-between gap-4`}>
        <div className={`text-2xl`}>Activity Log </div>
        <button
          className={`btn btn-sm btn-primary`}
          onClick={() => {
            setOpen(true);
          }}
        >
          Add an activity
        </button>
      </div>

      <div className={`w-full transition-all duration-500`}>
        <ul className="font-normal">
          {actions.data &&
            actions?.data
              .sort(
                (a, b) => new Date(b.selectedDate) - new Date(a.selectedDate),
              )
              .map((action, i) => (
                <li key={i} className={`mt-10 mb-10`}>
                  <div className="text-base-content/70 mb-1 text-xs font-light">
                    {moment(action.selectedDate).calendar()}
                  </div>
                  <div className="mb-4 text-sm capitalize">
                    {action.statement || "Activity could not be found, sorry."}
                  </div>
                  <NoteFeed actionId={action?._id} />
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
