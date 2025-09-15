import { verifyToken } from "@/utils/jwt";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";


export default function auth(handler) {
    return async (req, res) => {
        try {
            const header = req.headers.authorization || "";
            const parts = header.split(" ");
            if (parts.length !== 2 || parts[0] !== "Bearer") {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }

            const token = parts[1];
            let decoded;
            try {
                decoded = verifyToken(token);
            } catch (err) {
                return res.status(401).json({ success: false, message: "Invalid or expired token" });
            }

            await dbConnect();
            const user = await User.findById(decoded.id).select("-password");
            if (!user) return res.status(401).json({ success: false, message: "User not found" });

            req.user = user;
            return handler(req, res);
        } catch (error) {
            console.error("Auth middleware error:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    };
}
