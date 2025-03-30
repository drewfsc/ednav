'use client';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import NoteFeed from '/components/NoteFeed';
// import MoodSelect from "@/components/MoodSelect";
import ActivityModal from '/components/ActivityModal';

export default function ActivityTable({
                                        actions,
                                        setActions,
                                        notes,
                                        setNotes,
                                        client,
                                        setLoading,
                                        loading,
                                        fetching,
                                        setFetching,
                                        selectedClient
                                      }) {
  const [openNote, setOpenNote] = useState(0);
  // const [clientNotes, setClientNotes] = useState([])
  const [selectedNavigator, setSelectedNavigator] = useState('');
  const [, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [note, setNote] = React.useState(
    {
      noteContent: '',
      noteAuthor: selectedNavigator,
      activityId: '',
      mood: 'User',
      createdAt: new Date(),
      clientId: client?._id
    }
  );
  useEffect(() => {
    setIsMounted(true); // ✅ Mark component as mounted before interacting with localStorage
    if (typeof window !== 'undefined') {
      const storedNavigator = localStorage.getItem('navigatorName') || '';
      setSelectedNavigator(storedNavigator);
    }
  }, []);

  const getNotes = async () => {
    if (!client) return;
    const response = await fetch(`/api/notes?clientId=${client._id}`);
    const data = await response.json();
    await setNotes(data);
  };

  useEffect(() => {
    getNotes().then();
  }, [fetching, selectedClient]);

  const saveNote = async (noteData) => {
    const note = await fetch(`/api/notes/`, {
      method: 'POST',
      body: JSON.stringify(noteData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await note.json();
    setNotes(prevState => {
      setFetching(prevState => !prevState);
      return [data, ...prevState];
    });
  };

  function createStatement(action) {
    if (!action || !action.path || action.path.length < 2) return '';

    const [, ...relevantPath] = action.path;
    const sentenceCore = relevantPath.join(' ');
    const selection = action.selections?.length ? ` in ${action.selections.join(', ')}` : '';
    return `${action.fep} noted that the client ${sentenceCore}${selection}.`;
  }

  const handleNote = () => {
    saveNote().then(data => console.log(data));
  };

  return (
    <div className={`flex-1 bg-base-200 p-6 rounded-lg mt-6`}>
      <ActivityModal actions={actions} setActions={setActions} notes={notes} setNotes={setNotes} client={client}
                     open={open} setOpen={setOpen} loading={loading} setLoading={setLoading} />
      <div className={`flex justify-start items-center gap-4 mb-6`}>
        <div className={`font-bold`}>Activity Log <span className={`text-secondary/50 text-xs hover:text-secondary cursor-pointer underline font-normal ml-2`}
                                                        onClick={() => {
                                                          setOpen(true);
                                                        }}>Add an activity</span></div>
      </div>

      <div className={``}>
        <ul className="font-normal ">
          {
            [...actions]
              .sort((a, b) => new Date(b.selectedDate) - new Date(a.selectedDate))
              .map((action, i) => (
              <li key={i} className={`mb-6 border-l-2 border-base-content/20 hover:border-accent cursor-pointer pl-3`}>
                <div className="text-xs font-light text-base-content/70 mb-1">{moment(action.selectedDate).calendar()}</div>
                <div className="font-light">{createStatement(action)}</div>
                <div className={`text-xs underline text-secondary/50 hover:text-secondary`} onClick={() => {
                  setNote(prevState => {
                    return {
                      ...prevState,
                      activityId: action?._id,
                      noteAuthor: selectedNavigator,
                      clientId: client._id
                    };
                  });
                  setOpenNote(prevState => {
                    return prevState === i + 1 ? 0 : i + 1;
                  });
                }}>Comment</div>
                <div className={` ${openNote === i + 1 ? `block` : `hidden`}`}>
                  <div className={`flex p-2`}>
                    <div className={`flex-1 mr-10 h-fit`}>
                      {/*<span className={`text-lg font-medium`}>Activity Notes</span>*/}
                      <div className={``}>
                        <NoteFeed notes={notes} setNotes={setNotes} activityIdFromPage={action?._id} />
                      </div>
                    </div>
                    <div className={`w-1/3 flex flex-col`}>
                      <span className={`text-lg font-medium`}>Add a Note</span>
                      <textarea className={`textarea textarea-accent min-h-40 mt-4 mb-2 relative`}
                                placeholder={`Enter your notes here...`}
                                onChange={(e) => setNote(prevState => {
                                  return {
                                    ...prevState,
                                    noteContent: e.target.value
                                  };
                                })} value={note.noteContent} />
                      <div className={`flex justify-between items-center`}>
                        <button disabled={note.noteContent === ''} className={`btn btn-secondary w-1/4`} onClick={() => {
                          handleNote();
                          setNote({
                            noteContent: '',
                            noteAuthor: selectedNavigator,
                            activityId: '',
                            createdAt: new Date(),
                            mood: ''
                          });
                          setOpenNote(0);
                        }}>Save
                        </button>
                        {/*<div className={``}><MoodSelect mood={note.mood} setNote={setNote}/></div>*/}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>

      {/*<div className="overflow-x-auto w-full border border-base-300">*/}
      {/*  /!*<div className={`flex divide-x divide-base-content/5 border-b border-base-300`}>*!/*/}
      {/*  /!*  <div className={`w-1/5 pl-6 py-2`}>Who</div>*!/*/}
      {/*  /!*  <div className={`w-1/5 pl-6 py-2`}>What</div>*!/*/}
      {/*  /!*  <div className={`w-1/5 pl-6 py-2`}>When</div>*!/*/}
      {/*  /!*  <div className={`w-1/5 pl-6 py-2`}>Where</div>*!/*/}
      {/*  /!*  <div className={`w-1/5 pl-6 py-2`}>Note Count</div>*!/*/}
      {/*  /!*</div>*!/*/}
      {/*  {*/}
      {/*    actions.map((action, i) => (*/}
      {/*      <div className={``} key={i + 1}>*/}
      {/*        <div key={i + 1} onClick={() => {*/}
      {/*          setNote(prevState => {*/}
      {/*            return {*/}
      {/*              ...prevState,*/}
      {/*              activityId: action?._id,*/}
      {/*              noteAuthor: selectedNavigator,*/}
      {/*              clientId: client._id*/}
      {/*            };*/}
      {/*          });*/}
      {/*          setOpenNote(prevState => {*/}
      {/*            return prevState === i + 1 ? 0 : i + 1;*/}
      {/*          });*/}
      {/*        }}*/}
      {/*             className={`hover:bg-accent/60 hover:text-accent-content ${openNote === i + 1 ? `bg-accent text-accent-content` : ``}} cursor-pointer flex divide-x divide-base-content/5 border-b border-base-300`}>*/}
      {/*          /!*<div className={`w-1/5 pl-6 py-2`}>{action?.who || action?.fep}</div>*!/*/}
      {/*          /!*<div className={`w-1/5 pl-6 py-2`}>{action?.what || action?.path}</div>*!/*/}
      {/*          /!*<div className={`w-1/5 pl-6 py-2`}>{moment(action?.when).format('M/D/Y')}</div>*!/*/}
      {/*          /!*<div className={`w-1/5 pl-6 py-2`}>{action?.where}</div>*!/*/}
      {/*          /!*<div className={`w-1/5 pl-6 py-2`}>{notes.filter(note => note.activityId === action._id).length}</div>*!/*/}
      {/*          /!*<div className={`w-1/5 pl-6 py-2`}>{action?.who || action?.fep}</div>*!/*/}
      {/*          <div className={`w-full pl-6 py-2`}>{createStatement(action)}</div>*/}
      {/*        </div>*/}
      {/*        <div className={`bg-base-200  ${openNote === i + 1 ? `block` : `hidden`}`}>*/}
      {/*          <div className={`flex p-6`}>*/}
      {/*            <div className={`flex-1 p mr-10 h-fit`}>*/}
      {/*              <span className={`text-lg font-medium`}>Activity Notes</span>*/}
      {/*              <div className={`mt-4`}>*/}
      {/*                <NoteFeed notes={notes} setNotes={setNotes} activityIdFromPage={action?._id} />*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*            <div className={`w-1/3 flex flex-col`}>*/}
      {/*              <span className={`text-lg font-medium`}>Add a Note</span>*/}
      {/*              <textarea className={`textarea textarea-accent min-h-40 mt-4 mb-2 relative`}*/}
      {/*                        placeholder={`Enter your notes here...`}*/}
      {/*                        onChange={(e) => setNote(prevState => {*/}
      {/*                          return {*/}
      {/*                            ...prevState,*/}
      {/*                            noteContent: e.target.value*/}
      {/*                          };*/}
      {/*                        })} value={note.noteContent} />*/}
      {/*              <div className={`flex justify-between items-center`}>*/}
      {/*                <button disabled={note.noteContent === ''} className={`btn btn-secondary w-1/4`} onClick={() => {*/}
      {/*                  handleNote();*/}
      {/*                  setNote({*/}
      {/*                    noteContent: '',*/}
      {/*                    noteAuthor: selectedNavigator,*/}
      {/*                    activityId: '',*/}
      {/*                    createdAt: new Date(),*/}
      {/*                    mood: ''*/}
      {/*                  });*/}
      {/*                  setOpenNote(0);*/}
      {/*                }}>Save*/}
      {/*                </button>*/}
      {/*                /!*<div className={``}><MoodSelect mood={note.mood} setNote={setNote}/></div>*!/*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    ))*/}
      {/*  }*/}
      {/*</div>*/}
    </div>
  );
}
