import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const cardsData = [
    {
        id: 1,
        imgSrc: '/inboundbeach.webp',
        title: 'Historic & Archaeological Sites',
        description:
            'Explore Sri Lanka’s most iconic historic and archaeological landmarks that tell the story of ancient civilizations.',
        fullText:
            'Sigiriya is a breathtaking rock fortress with royal gardens and ancient frescoes. Galle Fort stands along the southern coast, showcasing colonial history through its well-preserved ramparts and buildings. Yapahuwa, once a royal capital, features grand stairways and rock-cut architecture. Independence Memorial Hall in Colombo symbolizes Sri Lanka’s freedom and blends traditional design with national pride.',
        gallery: ['/inboundbeach.webp', '/gallefort.webp', '/yapahuwa.webp', '/freedomsqr.webp'],
    },
    {
        id: 2,
        imgSrc: '/inbound.webp',
        title: 'Cultural & Religious Centers',
        description:
            'Discover the spiritual and historical richness of Sri Lanka through its ancient cities and sacred landmarks.',
        fullText:
            'The Temple of the Sacred Tooth Relic in Kandy is a major Buddhist site, housing a revered relic of the Buddha. Anuradhapura, Sri Lanka’s first capital, is home to centuries-old stupas and sacred Bodhi trees. Polonnaruwa showcases the architectural brilliance of medieval Sri Lanka through temples, statues, and royal ruins. The Nallur Kandaswamy Kovil in Jaffna is a significant Hindu temple known for its colorful festivals and devotional heritage.',
        gallery: ['/inbound.webp', '/anuradhapura.webp', '/polonnaruwa.webp', '/nallur.webp'],
    },
    {
        id: 3,
        imgSrc: '/inboundtiger.webp',
        title: 'Nature & Wildlife',
        description:
            'Sri Lanka’s rich biodiversity invites you to explore lush rainforests, majestic wildlife, and breathtaking natural wonders.',
        fullText:
            'Yala National Park is renowned for its leopard population and immersive safari experiences. The central highlands are dotted with cascading waterfalls like Diyaluma and Bambarakanda that highlight the island’s scenic beauty. Elephant sanctuaries such as Pinnawala provide close encounters with these gentle giants in protected environments. Sinharaja Rainforest is a UNESCO World Heritage Site teeming with endemic flora and fauna, perfect for nature trekking and bird watching.',
        gallery: ['/inboundtiger.webp', '/waterfalls.webp', '/elephants.webp', '/knuckles.webp'],
    },
    {
        id: 4,
        imgSrc: '/inboundleisure.webp',
        title: 'Adventure & Leisure',
        description:
            'Experience the thrill and tranquility of Sri Lanka through water sports, beaches, and nature escapades.',
        fullText:
            'Unawatuna is a serene beach town perfect for sunbathing, snorkeling, and coral reef exploration. Kitulgala invites adventurers with its white-water rafting, lush rainforest trails, and river expeditions. Mirissa is famous for its whale watching tours, golden beaches, and relaxed coastal vibe. Sri Lanka also offers scenic hiking experiences through misty hills, tea plantations, and waterfall trails, perfect for nature lovers.',
        gallery: ['/inboundleisure.webp', '/kithulgala.webp', '/mirissa.webp', '/hicking.webp'],
    }
];

const InboundTours: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<any | null>(null);

    return (
        <div className='justify-center items-center pb-20'>
            {/* Cover Section */}
            <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
                <img
                    src="/inboundcover2.webp"
                    alt="Inbound Tours"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-black/40 z-0" />
                <motion.div
                    className="relative z-10 flex flex-col items-center text-center md:text-left md:items-end md:flex-row justify-between max-w-7xl mx-auto px-6 md:px-12 h-full pb-28"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 md:mb-0 mt-64 md:mt-0">
                        Inbound Tours
                    </h1>
                    <p className="text-white text-md md:text-lg max-w-xl text-center md:text-left">
                        Discover Sri Lanka like never before. From cultural landmarks to scenic coastlines, let us craft a journey that reveals the island’s magic at every step.
                    </p>
                </motion.div>
            </section>

            {/* Card Grid */}
            <section className="py-20 px-6 md:px-12 bg-white">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Explore Sri Lanka with Lando Travels
                </h2>
                <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
                    Our inbound packages bring you ancient heritage, wildlife adventures, and vibrant culture.
                </p>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {cardsData.map((card) => (
                        <div
                            key={card.id}
                            className="relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
                            onClick={() => {
                                setSelectedCard(card);
                            }}
                        >
                            <img
                                src={card.imgSrc}
                                alt={card.title}
                                loading="lazy"
                                className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute bottom-0 bg-white p-4 backdrop-blur-sm w-full">
                                <p className="text-gray-700 text-sm mb-2">{card.description}</p>
                                <h3 className="text-lg font-bold text-gray-900">{card.title}</h3>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {selectedCard && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCard(null)}
                    >
                        <motion.div
                            className="bg-white overflow-hidden rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-center">
                                {selectedCard.gallery.map((img: string, i: number) => (
                                    <div key={i} className="sm:min-w-[230px] w-1/4 h-96 relative">
                                        <img
                                            src={img}
                                            alt={`thumb-${i}`}
                                            loading="lazy"
                                            className="w-full h-full object-cover clip-diagonal hover:scale-105 transition duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                    {selectedCard.title}
                                </h2>
                                <p className="text-gray-600">{selectedCard.fullText}</p>
                            </div>
                            <button aria-label="Button"
                                onClick={() => setSelectedCard(null)}
                                className="absolute cursor-pointer top-3 right-4 text-3xl text-gray-500 hover:text-black"
                            >
                                &times;
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Call to Action */}
            <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link
                    to="/contact?subject=Inbound%20Tour%20Request&message=I%20would%20like%20to%20customize%20a%20Inbound%20Tour%20package.%20Please%20assist..."
                    className="bg-blue-500 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                    Tailor Your Experience
                </Link>
            </motion.div>

        </div>
    );
};

export default InboundTours;
