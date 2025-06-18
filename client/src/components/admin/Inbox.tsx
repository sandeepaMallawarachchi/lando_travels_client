import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface Email {
  _id: string;
  subject: string;
  email: string;
  message: string;
  read: boolean;
}

const Inbox: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://lando-travels-api.vercel.app/admin/contacts")
      .then((res) => setEmails(res.data))
      .catch((err) => console.error("Error fetching emails:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: string) => {
    axios
      .delete(`https://lando-travels-api.vercel.app/admin/contacts/${id}`)
      .then((res) => {
        setEmails(emails.filter((email) => email._id !== id));
        setSelectedEmail(null);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error("Error deleting email:", err)
        toast.error("Error deleting emai")
      });
  };

  const handleEmailClick = (email: Email) => {
    axios
      .patch(`https://lando-travels-api.vercel.app/admin/contacts/${email._id}`, {
        read: true,
      })
      .then(() => {
        setEmails(emails.map((e) => (e._id === email._id ? { ...e, read: true } : e)));
        setSelectedEmail(email);
      })
      .catch((err) => console.error("Error updating read status:", err));
  };

  const handleReply = () => {
    if (selectedEmail) {
      const mailtoLink = `mailto:${selectedEmail.email}?subject=${encodeURIComponent(
        `Replying to: ${selectedEmail.subject}`
      )}`;
      window.location.href = mailtoLink;
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">Inbox</h1>
      <div className="bg-white rounded-xl shadow-md overflow-hidden divide-y divide-gray-200">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </div>
          ))
        ) : emails.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No emails found.</p>
        ) : (
          emails.map((email) => (
            <div
              key={email._id}
              onClick={() => handleEmailClick(email)}
              className={`cursor-pointer px-4 py-3 transition ${email.read ? "bg-white" : "bg-green-100 hover:bg-green-200"
                }`}
            >
              <p className={`text-md ${email.read ? "font-normal" : "font-semibold"}`}>
                {email.subject}
              </p>
              <p className="text-xs text-gray-500">{email.email}</p>
            </div>
          ))
        )}
      </div>

      <AnimatePresence>
        {selectedEmail && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className="absolute cursor-pointer top-3 right-4 text-gray-500 hover:text-black"
                onClick={() => setSelectedEmail(null)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-2">{selectedEmail.subject}</h2>
              <p className="text-sm text-gray-500 mb-4">{selectedEmail.email}</p>
              <p className="mb-6">{selectedEmail.message}</p>
              <div className="flex gap-3">
                <button
                  onClick={handleReply}
                  className="flex-1 py-2 rounded cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm"
                >
                  Reply
                </button>
                <button
                  onClick={() => handleDelete(selectedEmail._id)}
                  className="flex-1 py-2 rounded cursor-pointer bg-red-400 hover:bg-red-500 text-white text-sm"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Inbox;
