import dbConnect from "../../../lib/mongodb";
import Activity from "../../../models/Activity";
import { authMiddleware } from "../../../middleware/auth";
import auth from "../../../middleware/auth";


export default async function handler(req, res) {
    await dbConnect();
    await authMiddleware(req, res);

    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case "GET":
            try {
                const activity = await Activity.findById(id)
                    .populate("contact", "name email")
                    .populate("createdBy", "name email");
                if (!activity) return res.status(404).json({ success: false, message: "Not found" });
                res.status(200).json({ success: true, data: activity });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "PUT":
            try {
                const activity = await Activity.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
                if (!activity) return res.status(404).json({ success: false, message: "Not found" });
                res.status(200).json({ success: true, data: activity });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "DELETE":
            try {
                const activity = await Activity.findByIdAndDelete(id);
                if (!activity) return res.status(404).json({ success: false, message: "Not found" });
                res.status(200).json({ success: true, message: "Deleted successfully" });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.status(405).json({ success: false, message: "Method not allowed" });
            break;
    }
}
