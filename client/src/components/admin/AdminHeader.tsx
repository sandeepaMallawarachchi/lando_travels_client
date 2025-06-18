import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Admin = {
    firstname: string;
    lastname: string;
};

const AdminHeader: React.FC = () => {
    
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
                    `https://lando-travels-api.vercel.app/admin/getAdmin/${adminID}`
                );
                setAdmin(response.data);
            } catch (err) {
                console.log("Error fetching admin:", err);
            }
        };

        fetchAdmin();
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-md py-4 rounded-b-3xl text-gray-800">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                {/* Left: logos */}
                <div className="flex items-center space-x-4">
                    <Link to={'/admin/admindashboard'}><img src="/logo-white.png" alt="Lando Travels" className="h-10" /></Link>
                </div>

                <div className="flex items-center gap-4">
                    <img
                        className="w-12"
                        src="/user.svg"
                        alt="user profile"
                    />

                    <div className="space-y-1 font-medium dark:text-white">
                        {admin ? (
                            <>
                                <div className="text-blue-600">Welcome,</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {admin.firstname} {admin.lastname}
                                </div>
                            </>
                        ) : (
                            <div className="text-red-600">Failed to fetch data</div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
