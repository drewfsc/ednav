'use client';
import React, { useEffect, useState } from 'react';
import LeftNavEntire from '/components/LeftNavEntire';
import ClientTable from '/components/ClientTable';
import { useEditing } from '/contexts/EditingContext';
import ClientProfile from './ClientProfile';
import { useClients } from '/contexts/ClientsContext';
import AddClientForm from './AddClientForm';

export default function PerfectLayout(props) {
  const { editing, setEditing } = useEditing();
  const { selectedClient } = useClients();
  const [userClients, setUserClients] = useState([]);

  const { children } = props;
  useEffect(() => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(data => setUserClients(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={`w-full h-screen overflow-hidden relative bg-base-100`}>
      <div className={`h-screen overflow-hidden flex`}>
        <div className="flex max-h-screen overflow-hidden w-full">
          <div className={`flex flex-row h-screen w-full`}>
            <div className={`flex w-[500px]`}>
              <div className={`w-[290px]`}>
                <LeftNavEntire setEditing={setEditing} />
              </div>
              <div
                className={`bg-base-100 w-full overflow-y-scroll no-scrollbar flex-col h-screen border-r border-base-300 z-40 relative drop-shadow-lg `}>
                <ClientTable userClients={userClients} setEditing={setEditing} />
              </div>
            </div>
            <div className={`flex h-screen w-full`}>
              <div className={`bg-base-100 relative overflow-hidden transition-all duration-500 ${editing === 'client' ? ' w-full  translate-x-0' : '-translate-x-[4000px] collapse w-0'}`}>
                <ClientProfile client={selectedClient} setEditing={setEditing} />
              </div>
              <div className={`bg-base-100 relative overflow-hidden transition-all duration-500  ${editing === 'add-client' ? 'w-full  translate-x-0' : 'translate-x-[4000px] collapse w-0'}`}>
                {editing === 'add-client' && <AddClientForm client={selectedClient} setEditing={setEditing} />}
                {children}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
