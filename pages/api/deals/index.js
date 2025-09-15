import dbConnect from "../../../lib/mongodb";
import Deal from "../../../models/Deal";


export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const deals = await Deal.find({})
                    .populate("contact", "name email")
                    .populate("assignedTo", "name email");
                res.status(200).json({ success: true, data: deals });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "POST":
            try {
                const deal = await Deal.create(req.body);
                res.status(201).json({ success: true, data: deal });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.status(405).json({ success: false, message: "Method not allowed" });
    }
}
