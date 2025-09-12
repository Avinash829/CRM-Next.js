import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";

export default async function handler(req, res) {
    await dbConnect();

    const { id } = req.query;
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const lead = await Lead.findById(id).populate("assignedTo", "name email");
                if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });
                res.status(200).json({ success: true, data: lead });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "PUT":
            try {
                const lead = await Lead.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });
                res.status(200).json({ success: true, data: lead });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "DELETE":
            try {
                const lead = await Lead.findByIdAndDelete(id);
                if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });
                res.status(200).json({ success: true, message: "Lead deleted" });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
