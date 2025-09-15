import dbConnect from "@/lib/mongodb";
import Deal from "@/models/Deal";

export default async function handler(req, res) {
    await dbConnect();
    const { id } = req.query;
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const deal = await Deal.findById(id)
                    .populate("contact", "name email")
                    .populate("assignedTo", "name email");
                if (!deal) return res.status(404).json({ success: false, message: "Deal not found" });
                res.status(200).json({ success: true, data: deal });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "PUT":
            try {
                const deal = await Deal.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
                if (!deal) return res.status(404).json({ success: false, message: "Deal not found" });
                res.status(200).json({ success: true, data: deal });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "DELETE":
            try {
                const deal = await Deal.findByIdAndDelete(id);
                if (!deal) return res.status(404).json({ success: false, message: "Deal not found" });
                res.status(200).json({ success: true, message: "Deal deleted" });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.status(405).json({ success: false, message: "Method not allowed" });
    }
}
