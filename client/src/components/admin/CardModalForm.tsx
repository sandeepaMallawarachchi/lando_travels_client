import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit, X } from "lucide-react";
import type { CardFormProps } from "../../types/CardFormProps";
import toast from "react-hot-toast";

const CardModalForm: React.FC<CardFormProps> = ({
    card,
    onClose,
    onChange,
    onSubmit,
    uploading,
}) => {
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleCloudinaryUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");
        formData.append("folder", "lando-travels");

        try {
            setUploadingImage(true);
            const res = await fetch("https://api.cloudinary.com/v1_1/dnvppgx1r/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.secure_url) {
                onChange("src", data.secure_url);
            } else {
                throw new Error("Upload failed");
            }
        } catch (err) {
            console.error(err);
            toast.success("Image upload failed");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleToggleVisibility = async () => {
        try {
            const updated = { ...card, show: !card.show };
            const res = await fetch(`https://lando-travels-api.vercel.app/admin/cards/${card._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated),
            });

            if (!res.ok) throw new Error("Failed to update visibility");

            onChange("show", updated.show.toString());
            toast.success(updated.show ? "Card is now visible!" : "Card is hidden.");
            window.location.reload();
        } catch (err) {
            toast.error("Failed to update visibility");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl relative"
            >
                <button aria-label="Button"
                    onClick={onClose}
                    className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold mb-6">
                    {card._id ? "Edit Card" : "Add New Card"}
                </h2>

                <form onSubmit={onSubmit} className="space-y-6">
                    {/* Image Preview with Edit Icon */}
                    {card.src && (
                        <div className="relative group w-full h-48 mb-4">
                            <div className="flex justify-end">
                                <div className="absolute bg-blue-500 text-white p-2 rounded-full shadow">
                                    <Edit size={20} />
                                </div>
                            </div>
                            <img
                                src={card.src}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-xl"
                            />
                            <label
                                htmlFor="imageUpload"
                                className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer"
                            >
                                <div className="bg-white text-blue-500 p-2 rounded-full shadow hover:scale-110 transition">
                                    <Edit />
                                </div>
                            </label>
                        </div>
                    )}

                    {/* Hidden File Input (used for edit icon) */}
                    <input
                        type="file"
                        accept="image/*"
                        id="imageUpload"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleCloudinaryUpload(file);
                        }}
                    />

                    {uploadingImage && <p className="text-sm text-gray-500 mt-1">Uploading image...</p>}

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={card.title}
                            onChange={(e) => onChange("title", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 outline-none rounded focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="Enter your title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={card.description}
                            onChange={(e) => onChange("description", e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 outline-none rounded focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="Your description here..."
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <button aria-label="Button"
                            type="submit"
                            disabled={uploading}
                            className="px-5 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:opacity-60"
                        >
                            {uploading ? "Saving..." : "Save"}
                        </button>
                        <button aria-label="Button"
                            type="button"
                            onClick={handleToggleVisibility}
                            className={`px-5 py-2 rounded transition cursor-pointer ${card.show
                                ? "bg-red-100 text-red-600 hover:bg-red-200"
                                : "bg-green-100 text-green-600 hover:bg-green-200"
                                }`}
                        >
                            {card.show ? "Hide Card" : "Show Card"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default CardModalForm;