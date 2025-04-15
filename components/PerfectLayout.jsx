'use client';
import React, { useState } from 'react';
import { useEditing } from '/contexts/EditingContext';
import LeftNavEntire from '/components/LeftNavEntire';
import ClientTable from '/components/ClientTable';
import AddClientForm from './AddClientForm';
import ClientProfile from './ClientProfile';


export default function PerfectLayout() {
  const [menuClosed, setMenuClosed] = useState(false);
  const {editing } = useEditing();

  return (
    <div className={`w-full h-screen relative`}>

      <div className={`w-full flex flex-row h-screen`}>

        {/*NAV AND CLIENT TABLE*/}
        <div
          className={`flex h-screen transition-all duration-400  ${menuClosed ? '-translate-x-[230px]' : 'translate-x-0'}`}>

          <div className={`w-[230px] box-border transition-all duration-300 ${!menuClosed ? 'overflow-hidden w-0 collapse' : ''}`}>
            <LeftNavEntire />
          </div>
          <div className={`w-[250px]  transition-all duration-300 box-border 2xl:w-[320px] ${menuClosed ? 'w-[500px] 2xl:w-[700px]' : ''} overflow-y-scroll overflow-x-visible no-scrollbar flex-col h-screen z-40 relative drop-shadow-lg`}>
            <ClientTable setMenuClosed={setMenuClosed} menuClosed={menuClosed}/>
          </div>
        </div>

        {/*CLIENT PROFILE AND ADD NEW CLIENT FORM*/}
        <div className={`flex h-screen flex-1 bg-base-100 overflow-hidden  ${menuClosed ? 'w-full' : 'translate-x-0'}`}>
          <div className={` transition-all duration-400 relative ${editing === 'client' ? 'w-full translate-x-0' : '-translate-x-[4000px] collapse w-0'}`}>
             <ClientProfile />
          </div>
          <div className={` transition-all duration-400 relative ${editing === 'add-client' ? 'w-full  translate-x-0' : 'translate-x-[4000px] collapse w-0'}`}>
            <AddClientForm />
          </div>
        </div>
      </div>
    </div>
  );
}
