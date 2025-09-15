import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

if (!SECRET) {
    throw new Error("JWT_SECRET not defined in environment");
}

export function signToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token) {
    return jwt.verify(token, SECRET);
}
