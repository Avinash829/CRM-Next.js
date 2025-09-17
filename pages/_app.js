import "../styles/globals.css";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import CrmAssistant from "../components/CRMassist";
import { UserProvider, UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { useRouter } from "next/router";

function AppWrapper({ Component, pageProps }) {
    return (
        <UserProvider>
            <AppLayout Component={Component} pageProps={pageProps} />
        </UserProvider>
    );
}

function AppLayout({ Component, pageProps }) {
    const { user, loading } = useContext(UserContext);
    const router = useRouter();
    const noLayoutPages = ["/login"];

    if (loading) return <p className="p-6">Loading...</p>;

    if (!user && router.pathname !== "/login") {
        router.replace("/login");
        return null;
    }

    if (noLayoutPages.includes(router.pathname)) return <Component {...pageProps} />;

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

export default AppWrapper;
