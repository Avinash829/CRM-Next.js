import dbConnect from "../../../lib/mongodb";
import Activity from "../../../models/Activity";
import auth from "../../../middleware/auth";


async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const activities = await Activity.find({})
                    .populate("contact", "name email")
                    .populate("createdBy", "name email");
                return res.status(200).json({ success: true, data: activities });
            } catch (error) {
                return res.status(400).json({ success: false, error: error.message });
            }

        case "POST":
            try {
                const activity = await Activity.create({
                    ...req.body,
                    createdBy: req.user._id,
                });
                return res.status(201).json({ success: true, data: activity });
            } catch (error) {
                return res.status(400).json({ success: false, error: error.message });
            }

        default:
            return res.status(405).json({ success: false, message: "Method not allowed" });
    }
}

export default auth(handler);
