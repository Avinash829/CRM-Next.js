import dbConnect from "@/lib/mongodb";
import Task from "@/models/Task";

export default async function handler(req, res) {
    await dbConnect();
    const { id } = req.query;

    switch (req.method) {
        case "PUT": // edit or mark complete
            try {
                const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
                res.status(200).json({ success: true, data: task });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "DELETE":
            try {
                await Task.findByIdAndDelete(id);
                res.status(200).json({ success: true, message: "Task deleted" });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.setHeader("Allow", ["PUT", "DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
