import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    HiChartPie,
    HiInbox,
    HiViewBoards,
    HiUserAdd,
    HiUsers,
    HiLogout,
    HiNewspaper,
} from "react-icons/hi";
import { BiBuoy, BiMenu } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

type AdminRole = {
    role: string;
};

const AdminSidebar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [adminRole, setAdminRole] = useState<AdminRole>({ role: "" });
    const navigate = useNavigate();
    const location = useLocation();
    const adminID = localStorage.getItem("adminID");

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await fetch(
                    `https://lando-travels-api.vercel.app/admin/getAdmin/${adminID}`
                );
                const data = await res.json();
                setAdminRole(data);
            } catch (err) {
                console.error("Admin fetch error:", err);
            }
        };
        fetchAdmin();
    }, [adminID]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleLogout = async () => {
        if (!window.confirm("Are you sure you want to logout?")) return;
        try {
            await fetch("https://lando-travels-api.vercel.app/admin/logout", { method: "POST" });
            localStorage.removeItem("token");
            navigate("/");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    const isActive = (path: string) =>
        location.pathname === path ? "bg-gray-200 text-black" : "";

    return (
        <>
            {/* Sidebar */}
            <AnimatePresence>
                {(isSidebarOpen || window.innerWidth >= 768) && (
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed md:relative sm:pt-28 pt-0 h-screen sm:z-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 overflow-y-auto"
                    >
                        {/* Hamburger inside sidebar */}
                        <div className="md:hidden flex justify-end p-3">
                            <button
                                onClick={toggleSidebar}
                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow"
                            >
                                <BiMenu size={22} />
                            </button>
                        </div>

                        {/* Sidebar content */}
                        <nav className="flex flex-col px-4 pb-6 space-y-2 text-gray-700">
                            <SidebarLink to="/admin/admindashboard" icon={<HiChartPie />} label="Dashboard" active={isActive} />
                            <SidebarLink to="/admin/inbox" icon={<HiInbox />} label="Inbox" active={isActive} />

                            {adminRole.role === "owner" && (
                                <>
                                    <div className="text-xs uppercase mt-4 mb-1 text-gray-500">User Management</div>
                                    <SidebarLink to="/admin/adminregister" icon={<HiUserAdd />} label="Register User" active={isActive} />
                                    <SidebarLink to="/admin/allUsers" icon={<HiUsers />} label="All Users" active={isActive} />
                                </>
                            )}

                            <div className="text-xs uppercase mt-4 mb-1 text-gray-500">Blogs</div>
                            <SidebarLink to="/admin/adminCards" icon={<HiNewspaper />} label="Cards For News" active={isActive} />

                            <div className="text-xs uppercase mt-4 mb-1 text-gray-500">Resources</div>
                            <SidebarLink to="/admin/documentation" icon={<HiViewBoards />} label="Documentation" active={isActive} />
                            <SidebarLink to="/admin/helps" icon={<BiBuoy />} label="Help" active={isActive} />

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-3 py-2 mt-6 text-sm rounded hover:bg-red-100 text-red-600"
                            >
                                <HiLogout />
                                Logout
                            </button>
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Overlay (only for mobile) */}
            <AnimatePresence>
                {isSidebarOpen && window.innerWidth < 768 && (
                    <motion.div
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={toggleSidebar}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>

            {/* Hamburger trigger (for mobile only, when sidebar is closed) */}
            {!isSidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className="md:hidden fixed top-20 left-5 z-50 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow"
                >
                    <BiMenu size={24} />
                </button>
            )}
        </>

    );
};

type SidebarLinkProps = {
    to: string;
    label: string;
    icon: React.ReactNode;
    active: (path: string) => string;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, label, icon, active }) => (
    <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2 rounded text-sm hover:bg-gray-100 ${active(
            to
        )}`}
    >
        {icon}
        {label}
    </Link>
);

export default AdminSidebar;
