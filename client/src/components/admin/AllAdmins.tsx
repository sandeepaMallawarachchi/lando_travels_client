import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

type Admin = {
    _id: string;
    adminID: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    gender: string;
    role: string;
};

const AllAdmins: React.FC = () => {
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get(
                    "https://lando-travels-api.vercel.app/admin/getAll"
                );
                setAdmins(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAdmins();
    }, []);

    const handleDeleteAdmin = async (adminID: string) => {
        if (!window.confirm("Are you sure you want to delete this admin?")) return;

        try {
            await axios.delete(
                `https://lando-travels-api.vercel.app/admin/delete/${adminID}`
            );
            setAdmins(admins.filter((admin) => admin.adminID !== adminID));
            toast.success("Admin deleted successfully.");
        } catch (err: any) {
            toast.error("Error deleting admin: " + err.message);
        }
    };

    const handleRoleChange = async (adminID: string, newRole: string) => {
        try {
            await axios.put(`https://lando-travels-api.vercel.app/admin/updateRole/${adminID}`, {
                role: newRole,
            });
            setAdmins((prev) =>
                prev.map((a) =>
                    a.adminID === adminID ? { ...a, role: newRole } : a
                )
            );
        } catch (err: any) {
            console.log("Failed to update role: " + err.message);
            toast.error("Failed to update role");
        }
    };

    if (loading) {
        return (
            <div className="p-10 grid gap-4 animate-pulse">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded w-full" />
                ))}
            </div>
        );
    }

    if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

    return (
        <motion.div
            className="p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <h1 className="text-xl font-bold mb-5">All Admins</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left bg-white shadow-lg rounded-xl overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">First Name</th>
                            <th className="p-3">Last Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Address</th>
                            <th className="p-3">Gender</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin._id} className="border-b border-b-gray-200 hover:bg-gray-50">
                                <td className="p-3">{admin.firstname}</td>
                                <td className="p-3">{admin.lastname}</td>
                                <td className="p-3">
                                    <a
                                        href={`mailto:${admin.email}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {admin.email}
                                    </a>
                                </td>
                                <td className="p-3">
                                    <a
                                        href={`tel:${admin.phone}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {admin.phone}
                                    </a>
                                </td>
                                <td className="p-3">{admin.address}</td>
                                <td className="p-3">{admin.gender}</td>
                                <td className="p-3">
                                    <select
                                        value={admin.role}
                                        onChange={(e) => handleRoleChange(admin.adminID, e.target.value)}
                                        className="bg-gray-100 border border-gray-300 rounded px-2 py-1"
                                    >
                                        <option value="owner">owner</option>
                                        <option value="editor">editor</option>
                                    </select>
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleDeleteAdmin(admin.adminID)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default AllAdmins;
