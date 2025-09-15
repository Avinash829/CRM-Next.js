import dbConnect from "@/lib/mongodb";
import { loginUser } from "@/controllers/userController";

export default async function handler(req, res) {
    await dbConnect();
    if (req.method === "POST") {
        return loginUser(req, res);
    }
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
