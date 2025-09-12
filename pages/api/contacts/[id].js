import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export default async function handler(req, res) {
    await dbConnect();

    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case "GET": // Get one contact
            try {
                const contact = await Contact.findById(id);
                if (!contact) return res.status(404).json({ success: false });
                res.status(200).json({ success: true, data: contact });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "PUT": // Update one contact
            try {
                const contact = await Contact.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!contact) return res.status(404).json({ success: false });
                res.status(200).json({ success: true, data: contact });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "DELETE": // Delete one contact
            try {
                const deleted = await Contact.deleteOne({ _id: id });
                if (!deleted.deletedCount)
                    return res.status(404).json({ success: false });
                res.status(200).json({ success: true, message: "Contact deleted" });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
