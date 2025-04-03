'use client'
import React, { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import ActivityDynamicSelect from "./ActivityDynamicSelect";

export default function ActivityModal({ open, setOpen, setActions, client, getActions}) {
    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        let cleanedQuestions = {};
        const response = await fetch('/api/questions');
        const questions = await response.json();
        const {adult, youth} = await questions;
        cleanedQuestions.adult = adult
        cleanedQuestions.youth = youth
        setQuestions(cleanedQuestions)
        return cleanedQuestions
    }

    useEffect(() => {
        getQuestions().then()
    }, []);

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-60">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/35 backdrop-blur-xs transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-base-100 p-12 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="px-12 py-8">
                            <div>
                                <DialogTitle as="h3" className="text-3xl font-light text-base-content  max-w-60 mx-auto">
                                    Add an activity
                                </DialogTitle>
                                <div className="">
                                    { questions && <ActivityDynamicSelect setActions={setActions} client={client} questions={questions} getActions={getActions} />}
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
