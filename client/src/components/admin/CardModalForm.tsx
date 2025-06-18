import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { CardFormProps } from '../../types/CardFormProps'

const CardModalForm: React.FC<CardFormProps> = ({
    card,
    onClose,
    onChange,
    onSubmit,
    uploading,
    onImageUpload,
}) => {
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
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold mb-6">{card.src ? "Edit Card" : "Add New Card"}</h2>

                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={card.src}
                                className="w-full border border-gray-300 px-3 py-2 rounded"
                                onChange={(e) => onChange("src", e.target.value)}
                                placeholder="https://..."
                            />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="imageUpload"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file && onImageUpload) onImageUpload(file);
                                }}
                            />
                            <label
                                htmlFor="imageUpload"
                                className="bg-blue-500 cursor-pointer text-white px-3 rounded py-2 text-sm hover:bg-blue-600"
                            >
                                Upload
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            value={card.title}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            onChange={(e) => onChange("title", e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={card.description}
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                            onChange={(e) => onChange("description", e.target.value)}
                            rows={4}
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={uploading}
                            className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-60"
                        >
                            {uploading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default CardModalForm;
