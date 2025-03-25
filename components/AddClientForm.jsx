"use client"
import React, {useEffect, useState} from "react";
import {adultSchools, youthSchools} from "/lib/schools";
import {XCircle} from "phosphor-react";
const AddClientForm = ({setEditing, setOpen}) => {
    const [feps, setFeps] = useState([]);
    const [navigators, setNavigators] = useState([]);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        contactNumber: "",
        caseNumber: "",
        dob: "",
        fep: "",
        navigator: "",
        dateReferred: "",
        lastGrade: "",
        hadOrientation: false,
        pin: "",
        region: "",
        clientStatus: "Active",
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

    const fetchFeps = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/feps`)
        const data = await response.json()
        if(data){
            setFeps(data)
        }
    }

    const fetchNavigators = async () => {
        const response = await fetch(`/api/education-navigators`)
        const data = await response.json()
        if(data){
            setNavigators(data)
        }
    }

    useEffect(() => {
        fetchFeps().then();
        fetchNavigators().then();
        console.log(navigators)
    }, []);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    async function postData() {
        const response = await fetch(`/api/clients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        const data = await response.json()
        if(data){
            setOpen(true)
            setEditing(false)
            setTimeout(() => {
                setOpen(false)
            }, 7000)
        }
        console.log(data)
    }

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        }, 2000); // Simulate API call
    };

    return (
        <div className="px-10 py-6 space-y-4 relative">
            <div className="flex justify-between items-center text-2xl font-light">Add a Client</div>
            <div onClick={() => setEditing(false)} className="absolute top-6 right-10"><XCircle size={36}/></div>
            <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-6 gap-4">

                <div className="flex w-full flex-col col-span-6">
                    <div className="divider">Personal</div>
                </div>

                {/* First Name */}
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="input col-span-2 w-full border p-2 rounded-md"
                />
                {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}

                {/* Last Name */}
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="input col-span-2 w-full border p-2 rounded-md"
                />
                {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}

                {/* Age group */}
                <select name="group" value={formData.group} onChange={handleChange} className="select border p-2 rounded-md ">
                    <option value="">Age group</option>
                    <option>Adult</option>
                    <option>Youth</option>
                </select>
                {errors.group && <p className="text-red-500">{errors.group}</p>}

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
                    className="input col-span-2 w-full border p-2 rounded-md"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}

                {/* Contact Number */}
                <input
                    type="tel"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="input col-span-2 w-full border p-2 rounded-md"
                />
                {errors.contactNumber && <p className="text-red-500">{errors.contactNumber}</p>}

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

                <div className="flex w-full flex-col col-span-6">
                    <div className="divider">Administrative</div>
                </div>

                {/* FEP */}
                <select name="fep" value={formData.fep} onChange={handleChange} className="select border p-2 rounded-md ">
                    <option value="">Select FEP</option>
                    {
                       feps.map((fep) => {
                            return (
                                <option key={fep.name} value={fep.name}>{fep.name}</option>
                            )
                        })
                    }
                </select>
                {errors.fep && <p className="text-red-500">{errors.fep}</p>}

                {/* Navigator */}
                <select name="navigator" value={formData.navigator} onChange={handleChange} className="select border p-2 rounded-md ">
                    <option value="">Select Navigator</option>
                    {
                        navigators.map((navigator) => {
                            return (
                                <option key={navigator.name} value={navigator.name}>{navigator.name}</option>
                            )
                        })
                    }
                </select>
                {errors.navigator && <p className="text-red-500">{errors.navigator}</p>}

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
                <select name="officeCity" value={formData.officeCity} onChange={handleChange} className="select border col-span-2 w-full p-2 rounded-md ">
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

                {/* PIN */}
                <input
                    type="number"
                    name="pin"
                    placeholder="PIN"
                    value={formData.pin}
                    onChange={handleChange}
                    className="input col-span-1 border p-2 rounded-md"
                />
                {errors.pin && <p className="text-red-500">{errors.pin}</p>}

                {/* Date referred */}
                <input
                    type="date"
                    name="dateReferred"
                    value={formData.dateReferred}
                    onChange={handleChange}
                    className="input col-span-1 border p-2 rounded-md"
                />
                {errors.dateReferred && <p className="text-red-500">{errors.dateReferred}</p>}

                {/* TTS dream */}
                <textarea
                    name="ttsDream"
                    placeholder="TTS dream"
                    value={formData.ttsDream}
                    onChange={handleChange}
                    className="input col-span-4 w-full border p-2 rounded-md"
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
