import React from "react";
import { motion } from "framer-motion";
import FAQAccordion from "./FAQAccordion";
import { Link } from "react-router-dom";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
        className="mb-10 p-6 bg-white shadow-lg rounded-xl"
    >
        <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b pb-2">{title}</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">{children}</ul>
    </motion.div>
);

const Documentation: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-10 text-center">📘 Admin Dashboard Guide</h1>

            <Section title="📰 Manage Blogs">
                <li>Click "Cards For Blogs" in the sidebar.</li>
                <li>Use the "+ Add Blog" button to add new content.</li>
                <li>Click "Edit" on any card to update image, title or description.</li>
                <li>Hover over blog image to reveal quick action icons (Edit / Delete).</li>
                <li>Images can be uploaded directly via your device (Cloudinary integration).</li>
            </Section>

            <Section title="👥 Manage Users">
                <li>Only visible to admins with "owner" role.</li>
                <li>Register new users via "Register User" on the sidebar.</li>
                <li>View or remove users in "All Users".</li>
                <li>Change user roles instantly with dropdown selector.</li>
                <li>Real-time updates occur upon role change or deletion.</li>
            </Section>

            <Section title="📥 Inbox">
                <li>View all contact form submissions.</li>
                <li>Click on an entry to read the full message.</li>
                <li>Reply using your default email client.</li>
                <li>Mark messages as read by opening them.</li>
                <li>Use "Delete" button to permanently remove a message.</li>
            </Section>

            <Section title="📂 Documentation">
                <li>This is where you are! Refer to this guide anytime for help.</li>
                <li>Content is kept simple for non-technical users.</li>
                <li>Sections include clear instructions and visuals.</li>
            </Section>

            <Section title="📄 Additional Notes">
                <li>All actions auto-save; no need for manual refresh.</li>
                <li>Toast notifications appear on success or error.</li>
                <li>If something breaks, reload the page or contact support.</li>
                <li>Mobile view is supported but best used on desktop.</li>
                <li>If you need any help please use <Link to={'/admin/helps'} className="text-blue-500 hover:underline">Help</Link></li>
            </Section>

            <FAQAccordion />
        </div>
    );
};

export default Documentation;
