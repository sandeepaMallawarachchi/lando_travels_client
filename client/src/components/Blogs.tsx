import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface BlogCard {
    src: string;
    title: string;
    description: string;
    show: boolean;
}

const Blogs: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogCard[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const [selectedCard, setSelectedCard] = useState<BlogCard | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCards = async () => {
            setLoading(true)
            try {
                const response = await axios.get("https://lando-travels-api.vercel.app/admin/getcards");
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching cards:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCards();
    }, []);

    const getCardsPerView = () => {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    };

    const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

    useEffect(() => {
        const handleResize = () => setCardsPerView(getCardsPerView());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setStartIndex((prev) =>
                blogs.length === 0 ? 0 : (prev + 1) % blogs.length
            );
        }, 15000);
        return () => clearInterval(interval);
    }, [blogs]);

    const visibleCards = blogs.slice(startIndex, startIndex + cardsPerView);
    if (visibleCards.length < cardsPerView && blogs.length >= cardsPerView) {
        visibleCards.push(...blogs.slice(0, cardsPerView - visibleCards.length));
    }
    // Truncate function
    const truncate = (text: string, maxWords = 20) =>
        text.split(" ").slice(0, maxWords).join(" ") + "...";

    if (loading) {
        return (
            <div className="relative overflow-hidden max-w-7xl mx-auto h-[400px]">
                <div className="flex gap-10 justify-center">
                    {Array(cardsPerView).fill(0).map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse bg-gray-200 rounded-xl h-[300px] w-[300px]"
                        />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <motion.section
            id="blogs"
            className="w-full py-16 px-4 bg-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }}
        >
            <h2 className="text-3xl font-bold text-center mb-10 mt-20">Latest Blogs</h2>

            <div className="relative flex flex-row overflow-hidden max-w-7xl mx-auto h-[450px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={startIndex}
                        className="absolute top-0 left-0 w-full h-[400px] flex gap-10 justify-center py-1"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        {visibleCards
                            .filter((card) => card.show)
                            .map((card, i) => (
                                <div
                                    key={`${card.title}-${i}`}
                                    onClick={() => setSelectedCard(card)}
                                    className="cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden max-w-sm w-full transition-transform hover:scale-[1.015]"
                                >
                                    <img
                                        src={card.src}
                                        alt={card.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">
                                            {card.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {truncate(card.description)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </motion.div>
                </AnimatePresence>

                {/* Dot Pagination */}
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10 flex justify-center gap-2">
                    {Array.from({ length: Math.ceil(blogs.length / cardsPerView) }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setStartIndex(i * cardsPerView)}
                            className={`w-3 h-1 cursor-pointer rounded-full transition-all duration-300 ${startIndex === i * cardsPerView
                                ? "bg-blue-500 scale-110 shadow-md"
                                : "bg-gray-300 hover:bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Modal Popup */}
            <AnimatePresence>
                {selectedCard && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
                        onClick={() => setSelectedCard(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-xl shadow-2xl max-w-xl w-full mx-4 p-6 relative"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={selectedCard.src}
                                alt={selectedCard.title}
                                className="w-full h-64 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-2xl font-bold mb-2">{selectedCard.title}</h2>
                            <p className="text-gray-700">{selectedCard.description}</p>
                            <button
                                onClick={() => setSelectedCard(null)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                            >
                                &times;
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default Blogs;
