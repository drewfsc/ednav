import React, { useState } from "react";
import { useClients } from "@/contexts/ClientsContext";
import InputLabel from "@/components/client/InputLabel";

function ClientProfilePersonalOrganization() {
  const { selectedClient } = useClients();
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingOrganization, setEditingOrganization] = useState(false);
  const personalFields = [
    "email",
    "contactNumber",
    "dob",
    "lastGrade",
    "schoolIfEnrolled",
    "group",
  ];
  const organizationFields = [
    "fep",
    "dateReferred",
    "pin",
    "region",
    "officeCity",
    "clientStatus",
  ];
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
    await fetch("/api/clients", {
      method: "POST",
      body: JSON.stringify(change),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleChange = (e) => {
    setChange({ ...change, [e.target.name]: e.target.value });
  };

  const handleEditingPersonal = () => {
    if (editingPersonal) {
      handleSubmit().then();
      setEditingPersonal(false);
    } else {
      setEditingPersonal(true);
    }
  };

  const handleEditingOrganization = () => {
    if (editingOrganization) {
      handleSubmit().then();
      setEditingOrganization(false);
    } else {
      setEditingOrganization(true);
    }
  };

  function splitCamelCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  }

  return (
    <div className="mt-6 grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
      {/*PERSONAL*/}
      <div
        className={`border-base-300/30 bg-base-200/40 rounded-lg border-1 p-6 shadow-xl`}
      >
        <div className="mb-4 w-full font-semibold">
          Personal
          <span
            onClick={handleEditingPersonal}
            className={`text-secondary/70 hover:text-secondary ml-2 cursor-pointer text-xs font-normal underline`}
          >
            {editingPersonal ? "Save" : "Edit"}
          </span>
        </div>
        <div className="w-full text-sm">
          <dl className="divide-base-content/10 w-full divide-y">
            {selectedClient &&
              personalFields.map((f) => (
                <div
                  key={f}
                  className="text-base-content grid grid-cols-2 gap-4 py-2 text-sm/6"
                >
                  <dt className="font-light capitalize">{f}</dt>
                  <dd
                    className={`visible ${editingPersonal ? "hidden" : "visible"}`}
                  >
                    {/*{f === 'dob' ? <div className={``}>{moment(selectedClient[f]).calendar()}</div> : selectedClient[f]}*/}
                  </dd>
                  <dd className={`${!editingPersonal ? "hidden" : ""}`}>
                    <InputLabel
                      name={f}
                      handleChange={handleChange}
                      type="text"
                      value={change[f]}
                      label={f}
                    />
                  </dd>
                </div>
              ))}
          </dl>
        </div>
      </div>

      {/*ORGANIZATION*/}
      <div
        className={`border-base-300/30 bg-base-200/40 rounded-lg border-1 p-6 shadow-xl`}
      >
        <div className="mt-0 mb-4 font-semibold">
          Organization
          <span
            onClick={handleEditingOrganization}
            className={`text-secondary/70 hover:text-secondary ml-2 cursor-pointer text-xs font-normal underline`}
          >
            {editingOrganization ? "Save" : "Edit"}
          </span>
        </div>
        <div className="w-full text-sm">
          <dl className="divide-base-content/20 divide-y">
            {selectedClient &&
              organizationFields.map((f) => (
                <div
                  key={f}
                  className="text-base-content grid grid-cols-2 gap-4 py-2 text-sm/6"
                >
                  <dt className="font-light capitalize">{f}</dt>
                  <dd
                    className={`visible ${editingOrganization ? "hidden" : "visible"}`}
                  >
                    {/*{f === 'dateReferred' ? <div className={``}>{moment(selectedClient[f]).format('MMMM Do, YYYY')}</div> : selectedClient[f]}*/}
                    {/*<div className={``}>{selectedClient[f]}</div>*/}
                  </dd>
                  <dd className={`${!editingOrganization ? "hidden" : ""}`}>
                    <InputLabel
                      name={f}
                      handleChange={handleChange}
                      type="text"
                      value={change[f]}
                      label={splitCamelCase(f)}
                    />
                  </dd>
                </div>
              ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default ClientProfilePersonalOrganization;
