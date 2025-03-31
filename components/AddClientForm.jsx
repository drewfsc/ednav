"use client"
import React, {useEffect, useState} from "react";
import {adultSchools, youthSchools} from "/lib/schools";
import {XCircle} from "phosphor-react";
import { useClients } from '@/contexts/ClientsContext';
import InputLabel from '@/components/InputLabel';
import { useEditing } from '@/contexts/EditingContext';

const AddClientForm = () => {

    const [feps, setFeps] = useState([]);
    const [, setNavigators] = useState([]);
    const {setEditing} = useEditing();
    const {setSelectedClient}= useClients(null);
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
        pin: "",
        region: "",
        clientStatus: "Active",
        reasonForInactive: false,
        transcripts: false,
        officeCity: "",
        group: "",
        schoolIfEnrolled: "",
        ttsDream: ""
    });
    const navigatorNames = [
        "All",
        "Stacy Martinez",
        "Hailey Jester",
        "Ashleigh Chesney",
        "Rich Basche",
        "Rachael Banerdt",
        "Morgan Sole",
        "Kecia Thompson-Gorgon",
        "Andrew McCauley",
        "Drew McCauley",
        "Sara Jackson"
    ]
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
        let feps = []
        const response = await fetch(`/api/feps`)
        const data = await response.json()
        await data.forEach(fep => {
            feps.push(fep.name)
        })
           setFeps(feps)

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
    }, []);

    const [, setErrors] = useState({});
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
            // setOpen(true)
            setEditing(false)
            setTimeout(() => {
                // setOpen(false)
            }, 7000)
        }
        console.log(data)
    }

    const formFields = [
        {name: 'first_name', label: 'First Name', type: 'text', required: true, value: formData.first_name, options: null},
        {name: 'last_name', label: 'Last Name', type: 'text', required: true, value: formData.last_name, options: null},
        {name: 'email', label: 'Email', type: 'email', required: true, value: formData.email, options: null},
        {name: 'contactNumber', label: 'Contact Number', type: 'tel', required: true, value: formData.contactNumber, options: null},
        {name: 'caseNumber', label: 'Case Number', type: 'text', required: true, value: formData.caseNumber, options: null},
        {name: 'pin', label: 'PIN', type: 'text', required: true, value: formData.pin, options: null},
        {name: 'dob', label: 'Date of Birth', type: 'date', required: true, value: formData.dob, options: null},
        {name: 'fep', label: 'FEP', type: 'select', required: true, options: feps, value: formData.fep},
        {name: 'navigator', label: 'Navigator', type: 'select', required: true, options: navigatorNames, value: formData.navigator},
        {name: 'dateReferred', label: 'Date Referred', type: 'date', required: true, value: formData.dateReferred, options: null},
        {name: 'lastGrade', label: 'Last Grade Completed', type: 'select', required: true, options: lastGradeCompletedOptions, value: formData.lastGrade},
        {name: 'region', label: 'Region', type: 'select', required: true, options: ["1", "2", "3", "4", "5", "6"], value: formData.region},
        {name: 'group', label: 'Age Group', type: 'select', required: true, options: ["Adult", "Youth"], value: formData.group},
        {name: 'schoolIfEnrolled', label: 'School (if enrolled)', type: 'select', required: true, options: formData.group === "Adult" ? formData.group === "Youth" ? null : adultSchools : youthSchools , value: formData.schoolIfEnrolled},
        {name: 'officeCity', label: 'Office Location', type: 'select', required: true, options: locations, value: formData.officeCity},
        {name: 'ttsDream', label: 'TTS Dream', type: 'textarea', required: true, value: formData.ttsDream, options: null},
    ]

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
            <div onClick={() => {
                setEditing("")
                setSelectedClient(null)
            }} className="absolute top-6 right-10"><XCircle size={36}/></div>
            <form onSubmit={handleSubmit}>

                <div className="space-y-4 grid grid-cols-3 gap-4">
                    {formFields.map((field) => {
                    return (
                      <InputLabel key={field.name} label={field.label} name={field.name} formData={formData}
                                  handleChange={handleChange} text={field.label} type={field.type}
                                  required={field.required} options={field.options} value={field.value} />
                    );
                })}
                </div>

                {/*/!* Submit Button with Loading Spinner *!/*/}
                <button type="submit" className="bg-green-500 text-white p-2 rounded-md mt-6 px-6">
                    {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mx-auto max-h-10"></div>
                    ) : (
                        "Submit"
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddClientForm;
