"use client"
import React, {useEffect, useState} from 'react';
import moment from "moment";
import {GuidedActivityForm} from "./guided-activity-form";
import NoteFeed from "@/components/NoteFeed";
import MoodSelect from "@/components/MoodSelect";

export default function ActivityTable({actions, client, fetchActionsData}) {
    const [openNote, setOpenNote] = useState(0);
    const [clientNotes, setClientNotes] = useState([])
    const [selectedNavigator, setSelectedNavigator] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    console.log(selectedNavigator)
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
            console.log(client)
            getNotes().then()
        }
    }, []);

    const getNotes = async () => {
        const response = await fetch(`/api/notes?clientId=${client._id}`)
        const data = await response.json()
        setClientNotes(data)
        // console.log(data)
    }

    const saveNote = async () => {
        await fetch(`/api/notes/`, {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
                "Content-Type": "application/json"
            }

        })
        // const data = sentNote.JSON()
        // console.log(data)
    }

    const handleNote = () => {
        saveNote().then(data => console.log(data))
    }

    return (

        <div className={`flex-1 mt-4`}>
            <div className={`flex justify-between items-center mr-4 ml-2`}>
                <div className={`mb-5 text-2xl`}>Activity Log</div>
                <GuidedActivityForm client={client} navigator={"selectedNavigator"} onActivityAddedAction={() => fetchActionsData(client._id)}/>
            </div>
            <div className="overflow-x-auto h-full">
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
                                }} className={`hover:bg-base-200 cursor-pointer grid grid-cols-10 px-2 py-2`}>
                                    <div className={`col-span-2`}>{action?.who}</div>
                                    <div className={`col-span-2`}>{action?.what}</div>
                                    <div className={`col-span-3`}>{moment(action?.when).format("M/D/Y")}</div>
                                    <div className={`col-span-2`}>{action?.where}</div>
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
        </div>
    );
}
