"use client"
import React, {useEffect, useState} from 'react';
import moment from "moment";
import NoteFeed from "@/components/NoteFeed";
import MoodSelect from "@/components/MoodSelect";
import DynamicSelect from "@/components/DynamicSelect";

export default function ActivityTable({actions, client}) {
    const [openNote, setOpenNote] = useState(0);
    const [clientNotes, setClientNotes] = useState([])
    const [selectedNavigator, setSelectedNavigator] = useState("");
    const [, setIsMounted] = useState(false);
    // console.log(selectedNavigator)
    const [note, setNote] = React.useState(
        {
            noteContent: "",
            noteAuthor: selectedNavigator,
            activityId: "",
            mood: "User",
            createdAt: new Date(),
            clientId: client._id,
        }
    );
    useEffect(() => {
        setIsMounted(true); // ✅ Mark component as mounted before interacting with localStorage
        if (typeof window !== "undefined") {
            const storedNavigator = localStorage.getItem("navigatorName") || "";
            setSelectedNavigator(storedNavigator);
            // console.log(client)
            getNotes().then()
        }
    }, []);

    const getNotes = async () => {
        const response = await fetch(`/api/notes?clientId=${client._id}`)
        const data = await response.json()
        setClientNotes(data)
    }

    const saveNote = async () => {
        await fetch(`/api/notes/`, {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    const handleNote = () => {
        saveNote().then(data => console.log(data))
    }

    return (
        <div className={`flex-1 mt-4`}>
            <div className={`flex justify-start items-center gap-4 mb-6`}>
                <div className={`text-2xl`}>Activity Log</div>
            </div>

            <div className="overflow-x-auto w-full border border-base-300">
            <div className={`flex divide-x divide-base-content/5 border-b border-base-300`}>
                <div className={`w-1/5 pl-6 py-2`}>Who</div>
                <div className={`w-1/5 pl-6 py-2`}>What</div>
                <div className={`w-1/5 pl-6 py-2`}>When</div>
                <div className={`w-1/5 pl-6 py-2`}>Where</div>
                <div className={`w-1/5 pl-6 py-2`}>Note Count</div>
            </div>
                    {
                        actions.map((action, i) => (
                            <div className={``} key={i+1}>
                                <div key={i+1} onClick={() => {
                                    setNote(prevState => {
                                        return {
                                            ...prevState,
                                            activityId: action?._id,
                                            noteAuthor: selectedNavigator,
                                            clientId: client._id,
                                        }
                                    })
                                    setOpenNote(prevState => {
                                        return prevState === i+1 ? 0 : i+1;
                                    })
                                }} className={`hover:bg-accent/60 hover:text-accent-content ${openNote === i+1 ? `bg-accent text-accent-content` : ``}} cursor-pointer flex divide-x divide-base-content/5 border-b border-base-300`}>
                                    <div className={`w-1/5 pl-6 py-2`}>{action?.who || action?.fep}</div>
                                    <div className={`w-1/5 pl-6 py-2`}>{action?.what || action?.path}</div>
                                    <div className={`w-1/5 pl-6 py-2`}>{moment(action?.when).format("M/D/Y")}</div>
                                    <div className={`w-1/5 pl-6 py-2`}>{action?.where}</div>
                                    <div className={`w-1/5 pl-6 py-2`}>{clientNotes.filter(note => note.activityId === action._id).length}</div>
                                </div>
                                <div className={`bg-base-200  ${openNote === i+1 ? `block` : `hidden`}`}>
                                    <div className={`flex p-6`}>
                                        <div className={`flex-1 p mr-10 h-fit`}>
                                            <span className={`text-lg font-medium`}>Activity Notes</span>
                                            <div className={`mt-4`}>
                                                {
                                                    <NoteFeed notes={clientNotes} activityIdFromPage={action?._id}/>
                                                }
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
                                                              }
                                                          })} value={note.noteContent}/>
                                            <div className={`flex justify-between items-center`}>
                                                <button disabled={note.noteContent === ""} className={`btn btn-secondary w-1/4`} onClick={() => {
                                                    handleNote()
                                                    setNote({
                                                        noteContent: "",
                                                        noteAuthor: selectedNavigator,
                                                        activityId: "",
                                                        createdAt: new Date(),
                                                        mood: "",
                                                    })
                                                    setOpenNote(0)
                                                }}>Save
                                                </button>
                                                <div className={``}><MoodSelect mood={note.mood} setNote={setNote}/></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
            </div>
            <DynamicSelect client={client}/>
        </div>
    );
}
