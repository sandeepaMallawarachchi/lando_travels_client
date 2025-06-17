import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
    const companyEmail = "lawrence@landotravel.com";
    const phone = "+94722267400";

    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post(
                `https://lando-travels-api.vercel.app/admin/contact`,
                {
                    email,
                    subject,
                    message,
                }
            );
            toast.success("Message sent successfully");
            setEmail("");
            setSubject("");
            setMessage("");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Failed to send message");
            } else {
                toast.error("Unexpected error occurred");
            }
        }
    };

    return (
        <section
            id="contact"
            className="relative min-h-screen bg-white text-black flex flex-col md:flex-row items-center justify-center px-6 md:px-24 overflow-hidden"
        >
            <motion.div
                className="w-full md:w-1/2 mb-12 md:mb-0"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }}
            >
                <div className="max-w-md">
                    <div className="mb-10">
                        <img
                            src="/logo-white.png"
                            alt="landotravels Logo"
                            width={200}
                            height={100}
                            className="object-contain"
                        />
                    </div>
                    <h2 className="text-4xl mb-4 font-bold">Get in touch.</h2>
                    <p className="text-gray-400">
                        Need some help? Let us know what you need and we'll get straight
                        back to you.
                    </p>
                    <p className="mt-6">
                        <a
                            href={`mailto:${companyEmail}`}
                            className="text-blue-500 text-sm hover:underline"
                        >
                            Email: {companyEmail}
                        </a>
                    </p>
                    <p>
                        <a
                            href={`tel:${phone}`}
                            className="text-blue-500 text-sm hover:underline"
                        >
                            Phone: {phone}
                        </a>
                    </p>
                </div>
            </motion.div>

            <motion.form
                onSubmit={handleSubmit}
                className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
            >
                <div className="col-span-1">
                    <label className="text-sm text-gray-400 block mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded w-full bg-transparent border-b border-blue-500 focus:outline-none focus:border-b-2 focus:border-blue-500 transition"
                        placeholder="example@gmail.com"
                        required
                    />
                </div>
                <div className="col-span-1">
                    <label className="text-sm text-gray-400 block mb-1">Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="rounded w-full bg-transparent border-b border-blue-500 focus:outline-none focus:border-b-2 focus:border-blue-500 transition"
                        placeholder="Your Subject"
                        required
                    />
                </div>
                <div className="col-span-2">
                    <label className="text-sm text-gray-400 block mb-1">Message</label>
                    <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="rounded w-full bg-transparent border-b border-blue-500 focus:outline-none focus:border-b-2 focus:border-blue-500 transition resize-none"
                        placeholder="Start typing here..."
                        required
                    />
                </div>
                <div className="col-span-2 text-right">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Send
                    </button>
                </div>
            </motion.form>
        </section>
    );
};

export default Contact;
