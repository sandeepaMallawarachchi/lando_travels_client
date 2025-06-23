import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import axios from "axios";
import type { AdminDetails } from "../../types/AdminDetails";

const Help: React.FC = () => {
    const adminID = localStorage.getItem("adminID");
    const [senderEmail, setSenderEmail] = useState<string>("");

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const res = await axios.get<AdminDetails>(
                    `https://lando-travels-api.vercel.app/admin/getAdmin/${adminID}`
                );
                if (res.data?.email) {
                    setSenderEmail(res.data.email);
                }
            } catch (err: any) {
                console.error("Error fetching admin details:", err.message);
            }
        };
        fetchAdminDetails();
    }, [adminID]);

    const mailtoLink = `mailto:abmszjaela@gmail.com?subject=Need%20Help&body=Hi%20Supporting%20team,%0A%0AI%20need%20assistance%20with<Enter%20your%20message here>%0A%0ARegards,%0A${senderEmail}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 max-w-3xl mx-auto"
        >
            <h1 className="text-3xl font-bold mb-4 text-black">Need Help?</h1>
            <p className="text-gray-700 text-md mb-6">
                If you're facing issues while using the admin dashboard—such as trouble updating blogs,
                managing users, or uploading content—don't worry. We’re here to assist you.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-md flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-blue-800">Contact Support</h2>
                    <p className="text-sm text-blue-700 mt-1">
                        Our support specialists will respond within 24 hours.
                    </p>
                </div>

                <a aria-label="anchor tag" aria-label="Button"
                    href={mailtoLink}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition"
                >
                    <Mail className="w-4 h-4" />
                    Email Support
                </a>
            </div>
        </motion.div>
    );
};

export default Help;
