import React, { useState } from 'react';
import { useClients } from '@/contexts/ClientsContext';
import moment from 'moment';
import InputLabel from '@/components/InputLabel';

function ClientProfilePersonalOrganization() {
  const {selectedClient} = useClients();
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingOrganization, setEditingOrganization] = useState(false);
  const personalFields = ['email', 'contactNumber', 'dob', 'lastGrade', 'schoolIfEnrolled', 'group'];
  const organizationFields = ['fep', 'dateReferred', 'pin', 'region', 'officeCity', 'clientStatus'];
  const [change, setChange] = useState({
    _id: selectedClient?._id,
    email: selectedClient?.email,
    contactNumber: selectedClient?.contactNumber,
    dob: selectedClient?.dob,
    lastGrade: selectedClient?.lastGrade,
    fep: selectedClient?.fep,
    referred: selectedClient?.dateReferred,
    pin: selectedClient?.pin,
    region: selectedClient?.region,
    clientStatus: selectedClient?.clientStatus,
    transcripts: selectedClient?.transcripts,
    officeCity: selectedClient?.officeCity,
    group: selectedClient?.group,
    schoolIfEnrolled: selectedClient?.schoolIfEnrolled,
  });

  const handleSubmit = async () => {
    await fetch('/api/clients', {
      method: 'POST',
      body: JSON.stringify(change),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const handleChange = (e) => {
    setChange({...change, [e.target.name]: e.target.value});
  }

  const handleEditingPersonal = () => {
    if (editingPersonal) {
      handleSubmit().then();
      setEditingPersonal(false);
    } else {
      setEditingPersonal(true);
    }
  }

  const handleEditingOrganization = () => {
    if (editingOrganization) {
      handleSubmit().then();
      setEditingOrganization(false);
    } else {
      setEditingOrganization(true);
    }
  }

  function splitCamelCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  }

  return (
    <div className="flex w-full gap-6 mt-6">
      <div className={`w-1/2 bg-base-200 p-6 rounded-lg`}>
        <div className="font-semibold mb-4">Personal
          <span onClick={handleEditingPersonal} className={`text-secondary/70 text-xs hover:text-secondary cursor-pointer underline font-normal ml-2`}>
            {editingPersonal ? 'Save' : 'Edit'}
          </span>
        </div>
        <div className="text-sm">
          <dl className="divide-y divide-base-content/10 w-full">
            {
              selectedClient && personalFields.map((f) => (
                <div key={f} className="py-2 grid grid-cols-2 gap-4 text-base-content text-sm/6">
                  <dt className="font-light capitalize">{f}</dt>
                  <dd className={`visible ${editingPersonal ? 'hidden' : 'visible'}`}>
                    {f === 'dob' ? <div className={``}>{moment(selectedClient[f]).format('MMMM Do, YYYY')}</div> : splitCamelCase(selectedClient[f])}
                  </dd>
                  <dd className={`${!editingPersonal ? 'hidden' : ''}`}>
                    <InputLabel name={f} handleChange={handleChange} type="text" value={change[f]} label={splitCamelCase(f)}/>
                  </dd>
                </div>
              ))
            }
          </dl>
        </div>
      </div>
      <div className={`w-1/2 bg-base-200 p-6 rounded-lg`}>
        <div className="font-semibold mt-0 mb-4">Organization
          <span onClick={handleEditingOrganization} className={`text-secondary/70 text-xs hover:text-secondary cursor-pointer underline font-normal ml-2`}>
            {editingOrganization ? 'Save' : 'Edit'}
          </span>
        </div>
        <div className="text-sm w-full">
          <dl className="divide-y divide-base-content/20">
            {
              selectedClient && organizationFields.map((f) => (
                <div key={f} className="py-2 grid grid-cols-2 gap-4 text-base-content text-sm/6">
                  <dt className="font-light capitalize">{f}</dt>
                  <dd className={`visible ${editingOrganization ? 'hidden' : 'visible'}`}>
                    {f === 'dateReferred' ? <div className={``}>{moment(selectedClient[f]).format('MMMM Do, YYYY')}</div> : selectedClient[f]}
                    {/*<div className={``}>{selectedClient[f]}</div>*/}
                  </dd>
                  <dd className={`${!editingOrganization ? 'hidden' : ''}`}>
                    <InputLabel name={f} handleChange={handleChange} type="text" value={change[f]} label={splitCamelCase(f)}/>
                  </dd>
                </div>
              ))
            }
          </dl>
        </div>
      </div>
    </div>
  )
}

export default ClientProfilePersonalOrganization;