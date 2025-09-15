import dbConnect from "@/lib/mongodb";
import Report from "@/models/Report";

export default async function handler(req, res) {
    await dbConnect();
    const { id } = req.query;
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const report = await Report.findById(id).populate("createdBy", "name email");
                if (!report) return res.status(404).json({ success: false, message: "Report not found" });
                res.status(200).json({ success: true, data: report });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "PUT":
            try {
                const report = await Report.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
                if (!report) return res.status(404).json({ success: false, message: "Report not found" });
                res.status(200).json({ success: true, data: report });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "DELETE":
            try {
                const report = await Report.findByIdAndDelete(id);
                if (!report) return res.status(404).json({ success: false, message: "Report not found" });
                res.status(200).json({ success: true, message: "Report deleted" });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.status(405).json({ success: false, message: "Method not allowed" });
    }
}
