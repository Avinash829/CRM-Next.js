import mongoose from "mongoose";

const DealSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
    stage: {
        type: String,
        enum: ["prospecting", "qualification", "proposal", "negotiation", "closed-won", "closed-lost"],
        default: "prospecting"
    },
    value: { type: Number, required: true },
    expectedCloseDate: { type: Date },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Deal || mongoose.model("Deal", DealSchema);
