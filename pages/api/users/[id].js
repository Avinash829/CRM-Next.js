import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authenticate } from "@/utils/authMiddleware";

export default async function handler(req, res) {
    await dbConnect();

    const { id } = req.query;
    const { method } = req;

    const auth = await authenticate(req, res);
    if (!auth.success) {
        return res.status(auth.status).json({ success: false, message: auth.message });
    }

    switch (method) {
        case "GET":
            try {
                const user = await User.findById(id).select("-password");
                if (!user) return res.status(404).json({ success: false, message: "User not found" });
                res.status(200).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;

        case "PUT":
            if (auth.user.role !== "admin" && auth.user._id.toString() !== id) {
                return res.status(403).json({ success: false, message: "Forbidden" });
            }

            try {
                const user = await User.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                }).select("-password");
                if (!user) return res.status(404).json({ success: false, message: "User not found" });
                res.status(200).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;

        case "DELETE":
            if (auth.user.role !== "admin") {
                return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
            }

            try {
                const deleted = await User.findByIdAndDelete(id);
                if (!deleted) return res.status(404).json({ success: false, message: "User not found" });
                res.status(200).json({ success: true, message: "User deleted" });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;

        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
