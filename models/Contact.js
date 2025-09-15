import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String },
        company: { type: String },
        notes: { type: String },
        tags: [{ type: String }],
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assigned user
    },
    { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
