import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["sales", "leads", "performance"], required: true },
    filters: { type: Object },
    generatedAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
