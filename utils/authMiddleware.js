import jwt from "jsonwebtoken";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

export const authenticate = async (req, res) => {
    await dbConnect();

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return { success: false, status: 401, message: "Unauthorized" };
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return { success: false, status: 401, message: "User not found" };
        }

        return { success: true, user };
    } catch (error) {
        return { success: false, status: 401, message: "Invalid token" };
    }
};
