import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === "GET") {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } else if (req.method === "POST") {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
