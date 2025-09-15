import Deal from "@/models/Deal";

export async function getDeals(req, res) {
    try {
        const deals = await Deal.find({}).populate("contact assignedTo");
        return res.status(200).json({ success: true, data: deals });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function createDeal(req, res) {
    try {
        const deal = await Deal.create(req.body);
        return res.status(201).json({ success: true, data: deal });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}

export async function getDealById(req, res) {
    try {
        const deal = await Deal.findById(req.query.id).populate("contact assignedTo");
        if (!deal) return res.status(404).json({ success: false, message: "Not found" });
        return res.status(200).json({ success: true, data: deal });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function updateDeal(req, res) {
    try {
        const deal = await Deal.findByIdAndUpdate(req.query.id, req.body, { new: true, runValidators: true });
        return res.status(200).json({ success: true, data: deal });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}

export async function deleteDeal(req, res) {
    try {
        await Deal.findByIdAndDelete(req.query.id);
        return res.status(200).json({ success: true, message: "Deleted" });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
