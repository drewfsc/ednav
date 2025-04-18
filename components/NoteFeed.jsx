'use client';
import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useClients } from '../contexts/ClientsContext';
import { useNavigators } from '../contexts/NavigatorsContext';
import Comments from './Comments';

export default function NoteModal({ open, setOpen }) {
  const { selectedClient } = useClients();
  const { selectedNavigator } = useNavigators();
  // const [notes, setNotes] = useState([]);
  // const [openNote, setOpenNote] = useState('');
  // const [openComment, setOpenComment] = useState('');

  const [note, setNote] = useState(
    {
      noteContent: '',
      noteAuthor: selectedNavigator?.name,
      createdAt: new Date(),
      clientId: selectedClient?._id
    }
  );

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedNote = {
      ...note,
      clientId: selectedClient?._id
    };
    const response = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({ note: updatedNote })
    });
    // const data = await response.json();
    // setOpen('');
    // setNote((prev) => ({ ...prev, noteContent: '' }));
  }

  return (
    <Dialog open={open === 'note'} onClose={() => setOpen('')} className="relative z-60">
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
                <DialogTitle as="h3" className="text-xl font-light text-base-content mx-auto">
                  Add a note
                </DialogTitle>
                <div className="flex flex-col mt-4 gap-4">
                  <form onSubmit={handleSave}>
                    <textarea
                      className="textarea textarea-bordered w-full"
                      placeholder="Note" value={note.noteContent}
                      onChange={handleChange} />
                    <button disabled={note.noteContent.length === 0} onClick={handleSave}
                            className="btn btn-sm btn-primary w-fit">Save
                    </button>
                    <button onClick={handleCancel} className="btn btn-sm btn-secondary w-fit">Cancel</button>
                  </form>
                  <Comments />
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
