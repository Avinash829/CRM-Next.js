import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";
import Lead from "@/models/Lead";
import Deal from "@/models/Deal";

export default async function handler(req, res) {
    try {
        await dbConnect();

        const contacts = await Contact.countDocuments();
        const leads = await Lead.countDocuments();
        const deals = await Deal.countDocuments();

        const pipelineAgg = await Deal.aggregate([
            { $group: { _id: null, total: { $sum: "$value" } } },
        ]);
        const pipeline = pipelineAgg[0]?.total || 0;

        res.status(200).json({
            success: true,
            data: {
                contacts,
                leads,
                deals,
                pipeline,
            },
        });
    } catch (error) {
        console.error("Stats API error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
