"use client";
import React, { useEffect, useState } from 'react';
import { useClients } from '../contexts/ClientsContext';
import { PinIcon } from 'lucide-react';
// import { useSession } from 'next-auth/react';
import { useNavigators } from '../contexts/NavigatorsContext';

function ClientProfilePin() {
  // const session = useSession();
  const {selectedClient} = useClients();
  const {selectedNavigator, setSelectedNavigator} = useNavigators();
  const [, setPinned] = useState([]);

  useEffect(() => {
    if (selectedNavigator?.pinned) {
      setPinned(selectedNavigator?.pinned);
    }
  }, [])

  const savePinned = async () => {
    const data = await fetch(`/api/education-navigators`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        navigator: selectedNavigator._id,
        clientId: selectedClient?._id,
      })
    })
    const json = await data.json();
    await setSelectedNavigator(json.updatedNavigator)
    await console.log(selectedNavigator)
  }

  async function handlePinClick(event) {
    await event.stopPropagation();
    await setPinned(
      prev => {
        if (prev.includes(selectedClient?._id)) {
          return prev.filter(id => id !== selectedClient?._id)
        } else {
          return [...prev, selectedClient?._id]
        }
      })
   await savePinned().then();
  }

  return (
    <div>
      <button className={` p-2 pr-4`} onClick={handlePinClick}><PinIcon className={` hover:text-primary/70 ${selectedNavigator && selectedNavigator.pinned?.length > 0 &&  selectedNavigator.pinned?.includes(selectedClient?._id) ? 'text-primary' : 'text-primary/20'}`}/></button>
    </div>
  );
}

export default ClientProfilePin;