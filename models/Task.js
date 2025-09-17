import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        date: { type: Date, required: true },
        time: { type: String },
        dueDate: { type: Date },
        status: { type: String, enum: ["pending", "completed"], default: "pending" },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
