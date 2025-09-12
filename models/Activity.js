import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    contact: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
    type: { type: String, enum: ["call", "email", "meeting", "note"], required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);
