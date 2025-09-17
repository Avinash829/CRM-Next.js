import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export function useApi() {
    const { token } = useContext(UserContext);

    async function request(endpoint, options = {}) {
        const headers = {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        };

        const res = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers,
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "API request failed");
        }

        return res.json();
    }

    return {
        get: (endpoint) => request(endpoint, { method: "GET" }),
        post: (endpoint, body) =>
            request(endpoint, { method: "POST", body: JSON.stringify(body) }),
        put: (endpoint, body) =>
            request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
        delete: (endpoint) => request(endpoint, { method: "DELETE" }),
    };
}
