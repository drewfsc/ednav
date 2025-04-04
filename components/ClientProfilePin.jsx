"use client";
import React from 'react';
import { useClients } from '../contexts/ClientsContext';
import { PinIcon } from 'lucide-react';

function ClientProfilePin() {
  const {selectedClient, setSelectedClient} = useClients();

  const savePinned = async () => {
    const data = await fetch(`/api/clients?clientId=${selectedClient._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedClient)
    })
    const json = await data.json();
    await console.log(json)
  }

  async function handlePinClick(event) {
    event.stopPropagation();
    setSelectedClient((prev) => {
      [...prev?.pinned, selectedClient._id]
    });
    savePinned().then();
  }

  return (
    <div>
      <button className={` p-2 pr-4`} onClick={handlePinClick}><PinIcon className={` hover:text-primary/70 ${selectedClient?.pinned && selectedClient?.pinned.length > 0 &&  selectedClient?.pinned?.includes(selectedClient._id) ? 'text-primary' : 'text-primary/40'}`}/></button>
    </div>
  );
}

export default ClientProfilePin;