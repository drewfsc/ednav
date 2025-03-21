import React, {useState} from "react";


export default function ClientProfileDetails({ client }) {
    const [change, setChange] = useState({
        email: client.email,
        phone: client.contactNumber,
        dob: client.dob,
        lastGrade: client.lastGrade,
        fep: client.fep,
        referred: client.dateReferred,
        pin: client.pin,
        region: client.region,
        status: client.clientStatus,
        transcripts: client.transcripts,
        officeCity: client.officeCity,
        group: client.group,
        schoolIfEnrolled: client.schoolIfEnrolled,
    });

    const personalFields = ["email", "phone", "dob", "lastGrade"];
    const organizationFields = ["fep", "referred", "pin", "region", "clientStatus", "transcripts", "officeCity", "group", "schoolIfEnrolled"];

    const handleChange = (e) => {
        setChange({...change, [e.target.name]: e.target.value});
    }

    return (
        <div className="  mb-12 ml-6">
            <div className={`mt-8 mb-8`}>
                <div className={`text-2xl`}>{client.name}</div>
                <div className={` font-normal`}>{client.caseNumber}</div>
            </div>
            <div className="flex w-full gap-20">
                <div className={`flex-1`}>
                    <div className="font-semibold mb-4">Personal</div>
                    <div className="flex-1 text-sm">
                        <dl className="divide-y divide-base-content/20 w-full">
                            {
                                personalFields.map((f) => (
                                    <div key={f} className="py-2 grid grid-cols-3 gap-4 text-base-content text-sm/6">
                                        <dt className="font-light capitalize">{f}</dt>
                                        <dd className="">
                                            <div className={``}>{client[f]}</div>
                                            <div><input name={f} type={`text`} value={change[f]}
                                                        onChange={handleChange}/>
                                            </div>
                                        </dd>
                                        <dd className="">Edit</dd>
                                    </div>
                                ))
                            }
                        </dl>
                    </div>
                </div>
                <div className={`flex-1`}>
                    <div className="font-semibold mt-0 mb-4">Organization</div>
                    <div className="text-sm w-full">
                        <dl className="divide-y divide-base-content/20">
                            {
                                organizationFields.map((f) => (
                                    <div key={f} className="py-2 grid grid-cols-3 gap-4 text-base-content text-sm/6">
                                        <dt className="font-light capitalize">{f}</dt>
                                        <dd className="">
                                            <div className={``}>{client[f]}</div>
                                            <div><input name={f} type={`text`} value={change[f]} onChange={handleChange}/>
                                            </div>
                                        </dd>
                                        <dd className="">Edit</dd>
                                    </div>
                                ))
                            }
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
