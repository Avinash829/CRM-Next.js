export function requireRole(role) {
    return (handler) => {
        return async (req, res) => {
            if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
            if (req.user.role !== role && req.user.role !== "admin") {
                return res.status(403).json({ success: false, message: "Forbidden" });
            }
            return handler(req, res);
        };
    };
}
