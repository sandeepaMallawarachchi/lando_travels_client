import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import CardModalForm from "./CardModalForm";

type CardType = {
    _id?: string;
    src: string;
    title: string;
    description: string;
};

const ManageCards: React.FC = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [editingCard, setEditingCard] = useState<CardType | null>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<CardType>({ src: "", title: "", description: "" });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (editingCard) setFormData(editingCard);
    }, [editingCard]);

    const handleFormChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        axios
            .get("https://lando-travels-api.vercel.app/admin/getcards")
            .then((res) => {
                setCards(res.data);
            })
            .catch(() => toast.error("Failed to load cards"))
            .finally(() => setLoading(false));
    }, []);

    const handleEditClick = (card: CardType) => {
        setEditingCard(card);
        setShowModal(true);
    };

    const handleAddNewClick = () => {
        setEditingCard({ src: "", title: "", description: "" });
        setShowModal(true);
    };

    const handleModalClose = () => {
        setEditingCard(null);
        setShowModal(false);
    };

    const handleSubmitCard = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);
        try {
            if (formData._id) {
                const res = await axios.put(
                    `https://lando-travels-api.vercel.app/admin/cards/${formData._id}`,
                    formData
                );
                setCards((prev) =>
                    prev.map((c) => (c._id === formData._id ? res.data : c))
                );
                toast.success("Card updated!");
            } else {
                const res = await axios.post(
                    "https://lando-travels-api.vercel.app/admin/cards",
                    formData
                );
                setCards((prev) => [...prev, res.data]);
                toast.success("Card added!");
            }
            handleModalClose();
        } catch {
            toast.error("Something went wrong!");
        } finally {
            setUploading(false);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const paginatedCards = cards.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="p-10">
            <motion.div
                className="flex justify-between items-center mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl font-bold">Manage Blogs</h1>
                <button
                    onClick={handleAddNewClick}
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded"
                >
                    + Add Blog
                </button>
            </motion.div>

            {loading ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-64 bg-gray-200 rounded animate-pulse" />
                    ))}
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {paginatedCards.map((card) => (
                        <motion.div
                            key={card._id}
                            layout
                            className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <img
                                src={card.src}
                                alt={card.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="font-bold text-lg">{card.title}</h3>
                            <p className="text-sm text-gray-600 mt-2">{card.description}</p>
                            <button
                                className="mt-4 text-blue-600 hover:underline"
                                onClick={() => handleEditClick(card)}
                            >
                                Edit
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(cards.length / itemsPerPage) }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {showModal && editingCard && (
                <CardModalForm
                    show={showModal}
                    onClose={handleModalClose}
                    card={formData}
                    onChange={handleFormChange}
                    onSubmit={handleSubmitCard}
                    uploading={uploading}
                />
            )}
        </div>
    );
};

export default ManageCards;
