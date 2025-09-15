import Contact from "@/models/Contact";

export async function getContacts(req, res) {
    try {
        const contacts = await Contact.find({});
        return res.status(200).json({ success: true, data: contacts });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function createContact(req, res) {
    try {
        const contact = await Contact.create(req.body);
        return res.status(201).json({ success: true, data: contact });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}

export async function getContactById(req, res) {
    try {
        const contact = await Contact.findById(req.query.id);
        if (!contact) return res.status(404).json({ success: false, message: "Not found" });
        return res.status(200).json({ success: true, data: contact });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function updateContact(req, res) {
    try {
        const contact = await Contact.findByIdAndUpdate(req.query.id, req.body, { new: true, runValidators: true });
        return res.status(200).json({ success: true, data: contact });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}

export async function deleteContact(req, res) {
    try {
        await Contact.findByIdAndDelete(req.query.id);
        return res.status(200).json({ success: true, message: "Deleted" });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
