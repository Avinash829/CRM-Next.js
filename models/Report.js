import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["sales", "leads", "performance"], required: true },
    filters: { type: Object }, // e.g. { dateRange: "last30days", user: "id" }
    generatedAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
