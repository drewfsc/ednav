'use client';
import React, { useState } from 'react';
import moment from 'moment';
import ActivityModal from '/components/ActivityModal';
import { useActivities } from '../contexts/ActivityContext';
import NoteModal from '/components/NoteModal';
import Comments from './Comments';

export default function ActivityTable({ actions }) {
  const {selectedActivity} = useActivities()
  const [open, setOpen] = useState('');
  return (
    <div className={`flex-col gap-6 mt-6 border-1 border-base-300/60 bg-base-200/50 shadow-xl rounded-lg p-6 w-full`}>
      <ActivityModal open={open} setOpen={setOpen}/>
      <NoteModal open={open} setOpen={setOpen} />
      <div className={`flex justify-between items-center gap-4 mb-10`}>
        <div className={`text-2xl`}>Notes and Activities</div>
        <div className={`flex gap-4`}>
        <button className={`btn btn-sm btn-primary`}
              onClick={() => {
                setOpen('activity');
              }}>Add an activity</button>
          <button className={`btn btn-sm btn-secondary`}
                  onClick={() => {
                    setOpen('note');
                  }}>Add a note
          </button>
        </div>
      </div>

      <div className={`w-full transition-all duration-500`}>
        <ul className="font-normal ">
          {
            selectedActivity && selectedActivity.activities && selectedActivity?.activities.sort((a, b) => new Date(b.selectedDate) - new Date(a.selectedDate))
              .map((action, i) => (
                <li key={i} className={`mt-2 mb-10`}>
                  <div
                    className="text-xs font-light text-base-content mb-1">{moment(action.selectedDate).calendar()}</div>
                  <div className="text-sm mb-3">{action.statement || 'Activity could not be found, sorry.'}</div>
                  <Comments actions={actions} actionId={action?._id} />
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}
