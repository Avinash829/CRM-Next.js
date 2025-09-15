import Lead from "@/models/Lead";

export async function getLeads(req, res) {
    try {
        const leads = await Lead.find({}).populate("assignedTo", "name email");
        return res.status(200).json({ success: true, data: leads });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function createLead(req, res) {
    try {
        const lead = await Lead.create(req.body);
        return res.status(201).json({ success: true, data: lead });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}

export async function getLeadById(req, res) {
    try {
        const lead = await Lead.findById(req.query.id).populate("assignedTo", "name email");
        if (!lead) return res.status(404).json({ success: false, message: "Not found" });
        return res.status(200).json({ success: true, data: lead });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function updateLead(req, res) {
    try {
        const lead = await Lead.findByIdAndUpdate(req.query.id, req.body, { new: true, runValidators: true });
        return res.status(200).json({ success: true, data: lead });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}

export async function deleteLead(req, res) {
    try {
        await Lead.findByIdAndDelete(req.query.id);
        return res.status(200).json({ success: true, message: "Deleted" });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
