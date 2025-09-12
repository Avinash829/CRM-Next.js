import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const leads = await Lead.find({});
                res.status(200).json({ success: true, data: leads });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "POST":
            try {
                const lead = await Lead.create(req.body);
                res.status(201).json({ success: true, data: lead });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
