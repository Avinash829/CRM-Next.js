import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String },
        phone: { type: String },
        status: {
            type: String,
            enum: ["new", "contacted", "qualified", "lost"],
            default: "new",
        },
        source: { type: String },
        notes: { type: String },
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // sales rep or user
    },
    { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
