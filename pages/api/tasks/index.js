import dbConnect from "@/lib/mongodb";
import Task from "@/models/Task";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            try {
                const tasks = await Task.find().sort({ createdAt: -1 });
                res.status(200).json({ success: true, data: tasks });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
            break;

        case "POST":
            try {
                const task = await Task.create(req.body);
                res.status(201).json({ success: true, data: task });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
