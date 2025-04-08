'use client';
import React from 'react';
import LeftNavEntire from '/components/layout/LeftNavEntire';
import ClientTable from '/components/client/ClientTable';
import AddClientForm from '../client/AddClientForm';
import ClientProfile from '../client/ClientProfile';
import { useEditing } from '/contexts/EditingContext';

export default function PerfectLayout() {
  const {editing } = useEditing();

  return (
    <div className={`w-full h-screen overflow-hidden relative`}>
      {/*<div className={`py-3 bg-info text-info-content text-center font-light text-sm`}>You are currently in the Development environment. Did you intend to visit <a className={`font-medium underline`} href={`https://staging.ednav.fsc-corp.org`}>Staging</a> or <a className={`font-medium underline`} href={`https://ednav.fsc-corp.org`}>Production</a>?</div>*/}
      <div className={`w-full flex flex-row h-screen`}>

        {/*NAV AND CLIENT TABLE*/}
        <div className={`flex h-screen`}>
          <div className={`w-[230px] box-border`}>
            <LeftNavEntire />
          </div>
          <div className={`w-[250px] box-border 2xl:w-[320px] overflow-y-scroll no-scrollbar flex-col h-screen z-40 relative drop-shadow-lg `}>
            <ClientTable/>
          </div>
        </div>

        {/*CLIENT PROFILE AND ADD NEW CLIENT FORM*/}
        <div className={`flex h-screen flex-grow bg-base-100 overflow-hidden border-1 border-base-300/60`}>
          <div className={`relative ${editing === 'client' ? 'w-full translate-x-0' : '-translate-x-[4000px] collapse w-0'}`}>
             <ClientProfile />
          </div>
          <div className={`relative ${editing === 'add-client' ? 'w-full  translate-x-0' : 'translate-x-[4000px] collapse w-0'}`}>
            <AddClientForm />
          </div>
        </div>
      </div>
    </div>
  );
}
