import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import CardModalForm from "./CardModalForm";
import { Edit, Trash } from "lucide-react";

type CardType = {
    _id?: string;
    src: string;
    title: string;
    description: string;
    show: boolean
};

const ManageCards: React.FC = () => {
    const [cards, setCards] = useState<CardType[]>([]);
    const [editingCard, setEditingCard] = useState<CardType | null>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<CardType>({ src: "", title: "", description: "", show: true });
    const [uploading, setUploading] = useState(false);
    const [showActionsId, setShowActionsId] = useState<string | null>(null);

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
        setEditingCard({ src: "", title: "", description: "", show: true });
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
                    "https://lando-travels-api.vercel.app/admin/createCard",
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

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this card?")) return;

        try {
            await axios.delete(`https://lando-travels-api.vercel.app/admin/cards/${id}`);
            setCards((prev) => prev.filter((c) => c._id !== id));
            toast.success("Card deleted successfully!");
        } catch (err: any) {
            console.error("Delete error:", err);
            toast.error("Failed to delete card.");
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const paginatedCards = cards.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        const handleOutsideClick = () => setShowActionsId(null);
        window.addEventListener("click", handleOutsideClick);
        return () => window.removeEventListener("click", handleOutsideClick);
    }, []);

    return (
        <div className="p-10">
            <motion.div
                className="flex justify-between items-center mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-2xl font-bold">Manage Blogs</h1>
                <button aria-label="Button"
                    onClick={handleAddNewClick}
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded"
                >
                    + Add Blog
                </button>
            </motion.div>

            {loading ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-64 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-md animate-pulse flex flex-col"
                        >
                            <div className="h-40 bg-gray-200 rounded-t-xl" />
                            <div className="flex-1 p-4 space-y-2">
                                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                                <div className="h-3 w-2/3 bg-gray-200 rounded" />
                                <div className="h-3 w-1/2 bg-gray-200 rounded" />
                            </div>
                        </div>
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
                            className="relative shadow-lg rounded-xl overflow-hidden group transition"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (window.innerWidth < 768) {
                                    setShowActionsId((prev) => (prev === card._id ? null : card._id ?? null));
                                }
                            }}
                        >
                            {/* Hidden badge */}
                            {!card.show && (
                                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow">
                                    Hidden
                                </span>
                            )}

                            <img
                                src={card.src}
                                alt={card.title}
                                className={`w-full h-52 object-cover rounded-t-xl" ${card.show ? "" : "opacity-50 grayscale"}`}
                            />

                            {/* Hover overlay (same as before) */}
                            <motion.div
                                initial={{ y: -60, opacity: 0 }}
                                animate={
                                    window.innerWidth < 768
                                        ? showActionsId === card._id
                                            ? { y: 0, opacity: 1 }
                                            : { y: -60, opacity: 0 }
                                        : {}
                                }
                                whileHover={window.innerWidth >= 768 ? { y: 0, opacity: 1 } : {}}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-black/80 bg-opacity-40 flex items-center justify-center gap-4 text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
                            >
                                <button aria-label="Button"
                                    onClick={() => handleEditClick(card)}
                                    className="bg-white/20 cursor-pointer text-blue-500 p-2 rounded-full hover:bg-white/30 transition"
                                    title="Edit"
                                >
                                    <Edit />
                                </button>
                                <button aria-label="Button"
                                    onClick={() => handleDelete(card._id!)}
                                    className="bg-white/20 cursor-pointer text-red-500 p-2 rounded-full hover:bg-white/30 transition"
                                    title="Delete"
                                >
                                    <Trash />
                                </button>
                            </motion.div>

                            <div className="p-3 text-center">
                                <h3 className="font-bold text-lg">{card.title}</h3>
                                <p className="text-sm text-gray-600 mt-2">{card.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(cards.length / itemsPerPage) }).map((_, i) => (
                    <button aria-label="Button"
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
