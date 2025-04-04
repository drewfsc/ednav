'use client';
import React, { useEffect, useState } from 'react';
import LeftNavEntire from '/components/LeftNavEntire';
import ClientTable from '/components/ClientTable';
import { useEditing } from '/contexts/EditingContext';
import ClientProfile from './ClientProfile';
import { useClients } from '/contexts/ClientsContext';
import AddClientForm from './AddClientForm';
import { useSession } from 'next-auth/react';
import { useNavigators } from '@/contexts/NavigatorsContext';

export default function PerfectLayout() {
  const session = useSession();
  const { editing, setEditing } = useEditing();
  const { selectedClient } = useClients();
  const {selectedNavigator,setSelectedNavigator} = useNavigators();
  const [userClients, setUserClients] = useState([]);
  const [, setFetching] = useState(false);

  useEffect(() => {
    if (session.data.user?.["level"] === 'navigator') {
      setSelectedNavigator(session.data.user.name)
    }
  }, []);

  useEffect(() => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(data => setUserClients(data))
      .catch(err => console.log(err));
  }, [selectedNavigator]);

  return (
    <div className={`w-full h-screen overflow-hidden relative bg-base-100`}>
      <div className={` w-full flex flex-row h-screen`}>

        {/*NAV AND CLIENT TABLE*/}
        <div className={`flex h-screen`}>
          <div className={`w-[230px] box-border`}>
            <LeftNavEntire setEditing={setEditing} />
          </div>
          <div className={`bg-base-100 w-[250px] box-border 2xl:w-[320px] overflow-y-scroll no-scrollbar flex-col h-screen border-r border-base-300 z-40 relative drop-shadow-lg `}>
            <ClientTable userClients={userClients} setEditing={setEditing} setFetching={setFetching}/>
          </div>
        </div>

        {/*CLIENT PROFILE AND ADD NEW CLIENT FORM*/}
        <div className={`flex h-screen flex-grow bg-base-100 overflow-hidden border-1 border-base-300/60`}>
          <div className={`relative ${editing === 'client' ? 'w-full translate-x-0' : '-translate-x-[4000px] collapse w-0'}`}>
            <ClientProfile client={selectedClient} setEditing={setEditing} />
          </div>
          <div className={`relative ${editing === 'add-client' ? 'w-full  translate-x-0' : 'translate-x-[4000px] collapse w-0'}`}>
            {editing === 'add-client' && <AddClientForm client={selectedClient} setEditing={setEditing} />}
          </div>
        </div>
      </div>
    </div>
  );
}
