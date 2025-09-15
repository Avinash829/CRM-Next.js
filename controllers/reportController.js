import Report from "@/models/Report";

export async function createReport(req, res) {
    try {
        const report = await Report.create({ ...req.body, createdBy: req.user?._id });
        return res.status(201).json({ success: true, data: report });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}

export async function getReports(req, res) {
    try {
        const reports = await Report.find({ createdBy: req.user?._id });
        return res.status(200).json({ success: true, data: reports });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
