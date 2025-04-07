'use client';
import React, { useState } from 'react';
import moment from 'moment';
import NoteFeed from '/components/NoteFeed';
import ActivityModal from '/components/ActivityModal';
import { useActivities } from '../contexts/ActivityContext';

export default function ActivityTable() {
  const {selectedActivity} = useActivities()
  const [open, setOpen] = useState(false);


  return (
    <div className={`flex-col gap-6 mt-6 border-1 border-base-300/60 bg-base-200/50 shadow-xl rounded-lg p-6 w-full`}>
      <ActivityModal open={open} setOpen={setOpen}/>
      <div className={`flex justify-between items-center gap-4 mb-10`}>
        <div className={`text-2xl`}>Activity Log </div>
        <button className={`btn btn-sm btn-primary`}
              onClick={() => {
                setOpen(true);
              }}>Add an activity</button>
      </div>

      <div className={`w-full transition-all duration-500`}>
        <ul className="font-normal ">
          {
            selectedActivity && selectedActivity.activities && selectedActivity?.activities.sort((a, b) => new Date(b.selectedDate) - new Date(a.selectedDate))
              .map((action, i) => (
              <li key={i} className={`mt-10 mb-10`}>
                <div className="text-xs font-light text-base-content/70 mb-1">{moment(action.selectedDate).calendar()}</div>
                <div className="text-sm">{action.statement || "Activity could not be found, sorry."}</div>
                <NoteFeed actionId={action?._id} />
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}
