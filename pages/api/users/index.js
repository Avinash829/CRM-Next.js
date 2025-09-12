import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === "POST") {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    } else if (req.method === "GET") {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
