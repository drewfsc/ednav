const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    caseNumber: { type: Number, required: true },
    dob: { type: String, required: true },
    fep: { type: String, required: true },
    dateReferred: { type: String, required: true },
    lastGrade: { type: String, enum: ["6th", "7th", "8th", "9th", "10th", "11th"], required: true },
    hadOrientation: { type: String, enum: ["yes", "no"], required: true },
    pin: { type: Number, required: true },
    region: { type: Number, enum: [1, 2, 3, 4, 5, 6], required: true },
    clientStatus: { type: String, enum: ["active", "in progress", "graduated", "inactive"], required: true },
    tabe: { type: String, enum: ["yes", "no"], required: true },
    transcripts: { type: String, enum: ["yes", "no"], required: true },
    officeCity: { type: String, required: true },
    group: { type: String, enum: ["adult", "youth"], required: true },
    schoolIfEnrolled: { type: String, required: true },
    ttsDream: { type: String, required: true }
});

module.exports = mongoose.model("Client", ClientSchema);
