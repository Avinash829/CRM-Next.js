import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authenticate } from "@/utils/authMiddleware";

export default async function handler(req, res) {
    await dbConnect();

    const { method } = req;

    switch (method) {
        case "GET": {
            const auth = await authenticate(req, res);
            if (!auth.success) {
                return res.status(auth.status).json({ success: false, message: auth.message });
            }

            if (auth.user.role !== "admin") {
                return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
            }

            try {
                const users = await User.find().select("-password");
                res.status(200).json({ success: true, data: users });
            } catch (error) {
                res.status(500).json({ success: false, message: error.message });
            }
            break;
        }

        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
