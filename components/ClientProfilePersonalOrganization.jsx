import React, { useEffect, useState } from 'react';
import { useClients } from '@/contexts/ClientsContext';
import InputVariants from '@/components/InputVariants';

function ClientProfilePersonalOrganization() {
  const { selectedClient } = useClients();
  const [editing, setEditing] = useState(false);
  const [feps, setFeps] = useState([]);
  const [navigators] = useState([
    { name: 'Andrew McCauley', id: '677e2852b19820275b00c061' },
    { name: 'Ashleigh Chesney', id: '67b4418653573b52275ce0cb' },
    { name: 'Corine Boelk', id: '67ef15a26f5242a3b5153f32' },
    { name: 'Hailey Jester', id: '67b4414e53573b52275ce0ca' },
    { name: 'Kecia Thompson-Gordon', id: '67b4424f53573b52275ce0cf' },
    { name: 'Marissa Foth', id: '67e9614a74cc11c0dff9e172' },
    { name: 'Morgan Sole', id: '67b4418653573b52275ce0cb' },
    { name: 'Rachael Banerdt', id: '67b441dc53573b52275ce0cd' },
    { name: 'Rich Basche', id: '67b441ad53573b52275ce0cc' },
    { name: 'Sara Jackson', id: '67eaa1d0f0d0003549891ba9' },
    { name: 'Stacy Martinez', id: '67b4410753573b52275ce0c9' },
    { name: 'Trevor Brunette', id: '67eab2ceb13b898d7f56ec21' }
  ]);

  const [change, setChange] = useState({
    _id: selectedClient?._id || '',
    name: selectedClient?.name || selectedClient?.first_name + ' ' + selectedClient?.last_name,
    last_name: selectedClient?.last_name || '',
    email: selectedClient?.email || '',
    contactNumber: selectedClient?.contactNumber || '',
    first_name: selectedClient?.first_name || '',
    navigator: selectedClient?.navigator || '',
    lastGrade: selectedClient?.lastGrade || '',
    fep: selectedClient?.fep || '',
    region: selectedClient?.region || '',
    clientStatus: selectedClient?.clientStatus || '',
    officeCity: selectedClient?.officeCity || ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'first_name') {
      const newName = change.first_name + ' ' + change.last_name;
      setChange({ ...change, [e.target.name]: e.target.value, name: newName });
    } else if (e.target.name === 'last_name') {
      const newName = change.first_name + ' ' + change.last_name;
      setChange({ ...change, [e.target.name]: e.target.value, name: newName });
    } else {
      setChange({ ...change, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    setChange({
      ...change,
      _id: selectedClient?._id || '',
      name: selectedClient?.name || selectedClient?.first_name + ' ' + selectedClient?.last_name,
      last_name: selectedClient?.last_name || '',
      email: selectedClient?.email || '',
      contactNumber: selectedClient?.contactNumber || '',
      first_name: selectedClient?.first_name || '',
      navigator: selectedClient?.navigator || '',
      lastGrade: selectedClient?.lastGrade || '',
      fep: selectedClient?.fep || '',
      region: selectedClient?.region || '',
      clientStatus: selectedClient?.clientStatus || '',
      officeCity: selectedClient?.officeCity || ''
    });
  }, [selectedClient]);

  const fetchFeps = async () => {
    let feps = [];
    const response = await fetch(`/api/feps`);
    const data = await response.json();
    await data.forEach(fep => {
      feps.push(fep.name);
    });
    setFeps(feps);
  };

  // const fetchNavigators = async () => {
  //   try {
  //     const response = await fetch('/api/education-navigators');
  //     const data = await response.json();
  //   } catch (error) {
  //     console.error('Error fetching navigators:', error);
  //   }
  // };

  useEffect(() => {
    fetchFeps().then();
    // fetchNavigators();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/clients', {
      method: 'POST',
      body: JSON.stringify(change),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      console.log('response', response);
      setEditing(false);
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-6 mt-6">
      <form onSubmit={handleSubmit}>
        <div className={` border-1 border-base-300/30 bg-base-200/40 shadow-xl p-6 rounded-lg`}>
          <button className={`mt-6 btn btn-sm btn-primary text-base-content ${editing ? 'btn-secondary' : 'visible'}`}
                  type="button" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>

          <div className="text-sm w-full mb-6">
            <dl className="divide-y divide-base-content/10 w-full">
              <div className="relative ">
                <InputVariants name={`first_name`} id={`first_name`} placeholder={`First Name`}
                               value={change.first_name} onChange={handleChange} />
              </div>
            </dl>
          </div>

          <div className="text-sm w-full mb-6">
            <dl className="divide-y divide-base-content/10 w-full">
              <div className="relative ">
                <InputVariants name={`last_name`} id={`last_name`} placeholder={`Last Name`} value={change.last_name}
                               onChange={handleChange} />
              </div>
            </dl>
          </div>

          <div className="text-sm w-full mb-6">
            <dl className="divide-y divide-base-content/10 w-full">
              <div className="relative boorder-0">
                <InputVariants name={`email`} id={`email`} placeholder={`email...`} value={change.email}
                               onChange={handleChange} />
              </div>
            </dl>
          </div>

          <div className="text-sm w-full mb-6">
            <dl className="divide-y divide-base-content/10 w-full">
              <div className="relative ">
                <InputVariants name={`contactNumber`} id={`contactNumber`} placeholder={`Phone Number`}
                               value={change.contactNumber} onChange={handleChange} />

              </div>
            </dl>
          </div>

          <div className="text-sm w-full mb-6">
            <select
              name="fep"
              value={change.fep}
              onChange={(value) => handleChange({ target: { name: 'fep', value } })}
              className="input outline-none border-0 border-b-1 border-base-content/30 relative z-0 rounded-none">

              <option className="text-base-content border-0 p-1 " value="">Select FEP</option>
              {feps.map((fep, index) => (
                <option className="text-base-content border-0 p-1 " key={index} value={fep}>{fep}</option>
              ))}
            </select>
          </div>

          <div className="text-sm w-full mb-6">
            <dl className="divide-y divide-base-content/10 w-full">
              <div className="relative ">
                <select
                  name="navigator"
                  value={change.navigator}
                  onChange={handleChange}
                  className="input outline-none border-0 border-b-1 border-base-content/30 relative z-0 rounded-none"
                >
                  <option value="">Select Navigator</option>
                  {navigators?.map((nav, index) => (
                    <option key={index} value={nav._id}>{nav.name}</option>
                  ))}
                </select>
              </div>
            </dl>
          </div>

          <button disabled={!change.last_name || !change.email || !change.contactNumber || !change.fep || !editing}
                  className="mt-6 btn btn-primary text-base-content disabled:opacity-40" type="submit">Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default ClientProfilePersonalOrganization;