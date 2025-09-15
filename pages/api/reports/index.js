import dbConnect from "@/lib/mongodb";
import Report from "@/models/Report";

export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const reports = await Report.find({}).populate("createdBy", "name email");
                res.status(200).json({ success: true, data: reports });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "POST":
            try {
                const report = await Report.create(req.body);
                res.status(201).json({ success: true, data: report });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.status(405).json({ success: false, message: "Method not allowed" });
    }
}
