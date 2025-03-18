"use client"
import React, {useEffect, useState} from "react";
import {adultSchools, youthSchools} from "@/lib/schools";
import {useClients} from "@/contexts/ClientsContext";

const AddClientForm = ({formStuff}) => {
    const { selectedClient, setSelectedClient } = useClients();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        contactNumber: "",
        caseNumber: "",
        dob: "",
        fep: "",
        dateReferred: "",
        lastGrade: "",
        hadOrientation: false,
        pin: "",
        region: "",
        clientStatus: "",
        reasonForInactive: false,
        tabe: false,
        transcripts: false,
        officeCity: "",
        group: "",
        schoolIfEnrolled: "",
        ttsDream: ""
    });
    const locations = [  "Brown",
        "Calumet",
        "Columbia",
        "Dane",
        "Fond du Lac",
        "Grant",
        "Green",
        "Jefferson",
        "Manitowoc",
        "Marathon",
        "Outagamie",
        "Portage",
        "Rock",
        "Shawano",
        "Sheboygan",
        "Waupaca",
        "Waushara",
        "Winnebago",
        "Wood"]
    const statuses = ["Active", "Inactive", "Graduated", "In Progress"]
    const reasonForInactive = [
        "W-2 Case Closed",
        "Graduated",
        "Participant Declined Assistance",
        "Participant Request (Barriers)",
        "No contact with EN for 60 days",
        "Participant request (Employment)",
        "Participant decline prior to meeting EN",
        "No show to warm hand off 3x",
    ]
    const lastGradeCompletedOptions = [
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th - No Diploma",
        "Foreign Diploma",
        "GED",
        "No Formal Education"
    ];

    useEffect(() => {
        const fetchData = async () => {
           const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clients?clientId=${selectedClient._id}`)
            const data = await response.json()
            if(data){
               setSelectedClient(data)
            }
        };
        fetchData();
    }, []);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    async function postData() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clients?clientId=${selectedClient._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        const data = await response.json()
        console.log(data)
    }

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle toggle change
    const handleToggle = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    };

    // Validate required fields
    const validateForm = () => {
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key] && formData[key] !== false) {
                newErrors[key] = "This field is required";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        postData(formData).then()

        if (!validateForm()) {
            alert("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Client saved successfully!");
        }, 2000); // Simulate API call
    };

    return (
        <div className="p-4 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-3 gap-4">

                <div className="flex w-full flex-col col-span-3">
                    <div className="divider">Personal</div>
                </div>

                {/* First Name */}
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="input  border p-2 rounded-md"
                />
                {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}

                {/* Last Name */}
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="input border p-2 rounded-md"
                />
                {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}

                {/* Date of Birth */}
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="input  border p-2 rounded-md"
                />
                {errors.dob && <p className="text-red-500">{errors.dob}</p>}

                {/* Email */}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input  border p-2 rounded-md"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}

                {/* Contact Number */}
                <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="input  border p-2 rounded-md"
                />
                {errors.contactNumber && <p className="text-red-500">{errors.contactNumber}</p>}

                {/* Age group */}
                <select name="group" value={formData.group} onChange={handleChange} className="select border p-2 rounded-md ">
                    <option value="">Select age group</option>
                    <option>Adult</option>
                    <option>Youth</option>
                </select>
                {errors.group && <p className="text-red-500">{errors.group}</p>}

                <div className="flex w-full flex-col col-span-3">
                    <div className="divider">Education</div>
                </div>

                {/* Last grade */}
                <select name="lastGrade" value={formData.lastGrade} onChange={handleChange} className="select border p-2 rounded-md ">
                    <option value="">Select last grade completed</option>
                    {
                        lastGradeCompletedOptions.map((grade) => {
                            return (
                                <option key={grade} value={grade}>{grade}</option>
                            )
                        })
                    }
                </select>
                {errors.lastGrade && <p className="text-red-500">{errors.lastGrade}</p>}

                {/* School if enrolled */}
                <select name="schoolIfEnrolled" value={formData.schoolIfEnrolled} onChange={handleChange} disabled={formData.group === ""} className="select border p-2 rounded-md ">
                    <option value="">Select school if enrolled</option>
                    {
                        formData.group === "Adult" ? adultSchools.map((school) => {
                            return (
                                <option key={school} value={school}>{school}</option>
                            )
                        }) : youthSchools.map((school) => {
                            return (
                                <option key={school} value={school}>{school}</option>
                            )
                        })
                    }
                </select>
                {errors.schoolIfEnrolled && <p className="text-red-500">{errors.schoolIfEnrolled}</p>}

                <label className="flex items-center space-x-2 ml-4">
                    <span>Transcripts?</span>
                    <input type="checkbox" name="transcripts" checked={formData.transcripts} onChange={handleToggle} className="toggle" />
                </label>
                {errors.transcripts && <p className="text-red-500">{errors.transcripts}</p>}



                <div className="flex w-full flex-col col-span-3">
                    <div className="divider">Administrative</div>
                </div>

                {/* FEP */}
                {/*<select name="fep" value={formData.fep} onChange={handleChange} className="select border p-2 rounded-md ">*/}
                {/*    <option value="">Select FEP</option>*/}
                {/*    {*/}
                {/*        formStuff.feps.map((fep) => {*/}
                {/*            return (*/}
                {/*                <option key={fep.name} value={fep.name}>{fep.name}</option>*/}
                {/*            )*/}
                {/*        })*/}
                {/*    }*/}
                {/*</select>*/}
                {errors.fep && <p className="text-red-500">{errors.fep}</p>}

                {/* Case Number */}
                <input
                    type="number"
                    name="caseNumber"
                    placeholder="Case Number"
                    value={formData.caseNumber}
                    onChange={handleChange}
                    className="input  border p-2 rounded-md"
                />
                {errors.caseNumber && <p className="text-red-500">{errors.caseNumber}</p>}

                {/* PIN */}
                <input
                    type="number"
                    name="pin"
                    placeholder="PIN"
                    value={formData.pin}
                    onChange={handleChange}
                    className="input  border p-2 rounded-md"
                />
                {errors.pin && <p className="text-red-500">{errors.pin}</p>}


                {/* Region */}
                <select name="region" value={formData.region} onChange={handleChange} className="select border p-2 rounded-md ">
                    <option value="">Select region</option>
                    {
                        Array(9).fill(0).map((_, i) => (
                            <option key={i} value={i+1}>{i+1}</option>
                        ))
                    }
                </select>
                {errors.region && <p className="text-red-500">{errors.region}</p>}

                {/* Office city */}
                <select name="officeCity" value={formData.officeCity} onChange={handleChange} className="select border p-2 rounded-md ">
                    <option value="">Select office location</option>
                    {
                        locations.map((location) => {
                            return (
                                <option key={location} value={location}>{location}</option>
                            )
                        })
                    }
                </select>
                {errors.officeCity && <p className="text-red-500">{errors.officeCity}</p>}

                <div className="flex w-full flex-col col-span-3">
                    <div className="divider">Progress</div>
                </div>

                {/* Date referred */}
                <input
                    type="date"
                    name="dateReferred"
                    value={formData.dateReferred}
                    onChange={handleChange}
                    className="input  border p-2 rounded-md"
                />
                {errors.dateReferred && <p className="text-red-500">{errors.dateReferred}</p>}

                {/* Status */}
                <select name="clientStatus" value={formData.clientStatus} onChange={handleChange} className="select border p-2 rounded-md ">
                    <option value="">Select status</option>
                    {
                        statuses.map((status) => {
                            return (
                                <option key={status} value={status}>{status}</option>
                            )
                        })
                    }
                </select>
                {errors.clientStatus && <p className="text-red-500">{errors.clientStatus}</p>}

                {/* Reason for inactive */}
                <select name="reasonForInactive" value={formData.reasonForInactive} onChange={handleChange} className="select border p-2 rounded-md " disabled={formData.reasonForInactive !== "Inactive"}>
                    <option value="">Select reason for inactive</option>
                    {
                        reasonForInactive.map((status) => {
                            return (
                                <option key={status} value={status}>{status}</option>
                            )
                        })
                    }
                </select>
                {errors.reasonForInactive && <p className="text-red-500">{errors.reasonForInactive}</p>}



                {/* Yes/No Toggles */}
                <label className="flex items-center space-x-2">
                    <span>Had Orientation?</span>
                    <input type="checkbox" name="hadOrientation" checked={formData.hadOrientation} onChange={handleToggle} className="toggle" />
                </label>
                {errors.hadOrientation && <p className="text-red-500">{errors.hadOrientation}</p>}

                <label className="flex items-center space-x-2">
                    <span>TABE?</span>
                    <input type="checkbox" name="tabe" checked={formData.tabe} onChange={handleToggle} className="toggle" />
                </label>
                {errors.tabe && <p className="text-red-500">{errors.tabe}</p>}



                <div className="flex w-full flex-col col-span-3">
                    <div className="divider">Dreams</div>
                </div>

                {/* TTS dream */}
                <input
                    type="text"
                    name="ttsDream"
                    placeholder="TTS dream"
                    value={formData.ttsDream}
                    onChange={handleChange}
                    className="input  border p-2 rounded-md"
                />
                {errors.ttsDream && <p className="text-red-500">{errors.ttsDream}</p>}

                {/* Submit Button with Loading Spinner */}
                <button type="submit" className="bg-green-500 text-white p-2 rounded-md ">
                    {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mx-auto"></div>
                    ) : (
                        "Submit"
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddClientForm;
