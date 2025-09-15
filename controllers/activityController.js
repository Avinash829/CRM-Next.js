import Activity from "@/models/Activity";

export async function getActivities(req, res) {
    try {
        const activities = await Activity.find({}).populate("contact createdBy");
        return res.status(200).json({ success: true, data: activities });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function createActivity(req, res) {
    try {
        const activity = await Activity.create({ ...req.body, createdBy: req.user?._id });
        return res.status(201).json({ success: true, data: activity });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}
