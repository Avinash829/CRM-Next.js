import User from "@/models/User";
import { hashPassword, comparePassword } from "@/utils/hash";
import { signToken } from "@/utils/jwt";


export async function registerUser(req, res) {
    try {
        const { name, email, password, role } = req.body;
        if (!email || !password || !name) return res.status(400).json({ success: false, message: "Missing fields" });

        const exists = await User.findOne({ email });
        if (exists) return res.status(409).json({ success: false, message: "Email already registered" });

        const hashed = await hashPassword(password);
        const user = await User.create({ name, email, password: hashed, role });
        const token = signToken({ id: user._id, role: user.role });

        const safe = user.toObject();
        delete safe.password;

        return res.status(201).json({ success: true, data: safe, token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: "Missing credentials" });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

        const ok = await comparePassword(password, user.password);
        if (!ok) return res.status(401).json({ success: false, message: "Invalid credentials" });

        const token = signToken({ id: user._id, role: user.role });

        const safe = user.toObject();
        delete safe.password;
        return res.status(200).json({ success: true, data: safe, token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}


export async function getUsers(req, res) {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({ success: true, data: users });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}


export async function getUserById(req, res) {
    try {
        const { id } = req.query;
        const user = await User.findById(id).select("-password");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        return res.status(200).json({ success: true, data: user });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.query;
        const data = req.body;
        if (data.password) data.password = await hashPassword(data.password);
        const user = await User.findByIdAndUpdate(id, data, { new: true }).select("-password");
        return res.status(200).json({ success: true, data: user });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}


export async function deleteUser(req, res) {
    try {
        const { id } = req.query;
        await User.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "User deleted" });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
