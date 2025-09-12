import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case "GET": // Get all contacts
            try {
                const contacts = await Contact.find({});
                res.status(200).json({ success: true, data: contacts });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case "POST": // Create new contact
            try {
                const contact = await Contact.create(req.body);
                res.status(201).json({ success: true, data: contact });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
