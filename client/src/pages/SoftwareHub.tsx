import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const softwares = [
    {
        name: "Admin Panel",
        logo: "/logo-white.webp",
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
        link: "https://hrm-software-nine.vercel.app",
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

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 text-gray-800'>
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl w-full p-6"
            >
                <h1 className="text-3xl font-bold text-center mb-8">Welcome, Admin 👋</h1>

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
                                className="w-16 h-16 mb-4 transition-transform group-hover:scale-110"
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
