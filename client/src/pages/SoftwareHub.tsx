import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import axios from "axios";

type Admin = {
    firstname: string;
    lastname: string;
};

const softwares = [
    {
        name: "Admin Panel",
        logo: "/logo-icon.webp",
        link: "/admin/admindashboard",
        external: false,
    },
    {
        name: "AirInvoice Pro",
        logo: "/invoice.webp",
        link: "https://air-invoice-client.vercel.app",
        external: true,
    },
    {
        name: "Global HRM",
        logo: "/hrm.webp",
        link: "https://globalhrm.vercel.app",
        external: true,
    },
    {
        name: "CRM System",
        logo: "/crm.webp",
        link: "#",
        external: true,
    },
];

const SoftwareHub: React.FC = () => {

    const [admin, setAdmin] = useState<Admin | null>(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            // Retrieve adminID from localStorage
            const adminID = localStorage.getItem("adminID");

            if (!adminID) {
                console.error("Admin ID is not found in localStorage");
                return;
            }

            try {
                const response = await axios.get(
                    `https://lando-travels.vercel.app/admin/getAdmin/${adminID}`
                );
                setAdmin(response.data);
            } catch (err) {
                console.log("Error fetching admin:", err);
            }
        };

        fetchAdmin();
    }, []);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 text-gray-800'>
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl w-full p-6"
            >
                <div className="justify-center items-center mb-10">
                    {admin ? (
                        <>
                            <div className="flex flex-col items-center text-2xl font-bold text-gray-500">
                                <div className="flex flex-col md:flex-row items-center justify-center">
                                    <h1 className="text-blue-600 mr-2">Welcome,</h1>
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                        className="inline-block text-gray-700"
                                    >
                                        {admin.firstname} {admin.lastname}
                                    </motion.span>
                                </div>
                                <span className="mt-2 md:mt-0 md:ml-2 animate-wave inline-block origin-bottom-right">
                                    👋
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="text-red-600">Failed to fetch data</div>
                    )}
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {softwares.map((software, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className='group rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl cursor-pointer transition-all bg-white hover:bg-blue-50'
                            onClick={() =>
                                software.external
                                    ? window.open(software.link, "_blank")
                                    : (window.location.href = software.link)
                            }
                        >
                            <img
                                src={software.logo}
                                alt={`${software.name} logo`}
                                className="w-20 h-auto mb-4 transition-transform group-hover:scale-110"
                            />
                            <h3 className="text-lg font-semibold">{software.name}</h3>
                            {software.external && <ExternalLink className="mt-1 text-blue-500" size={18} />}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default SoftwareHub;
