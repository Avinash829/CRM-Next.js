import "../styles/globals.css";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CrmAssistant from "../components/CRMassist";

export default function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // pages without layout
    const noLayoutPages = ["/login"];

    useEffect(() => {
        const auth = localStorage.getItem("auth");

        if (!auth && router.pathname !== "/login") {
            // not logged in → force login
            router.replace("/login");
        } else {
            setIsAuthenticated(!!auth);
        }

        setLoading(false);
    }, [router.pathname]);

    if (loading) {
        return <p className="p-6">Loading...</p>; // or spinner
    }

    const isNoLayout = noLayoutPages.includes(router.pathname);

    if (isNoLayout) {
        return <Component {...pageProps} />;
    }

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 ml-64 min-h-screen bg-gray-50">
                <TopNav />

                <main className="p-6">
                    <Component {...pageProps} />
                    <CrmAssistant />
                </main>
            </div>
        </div>
    );
}
