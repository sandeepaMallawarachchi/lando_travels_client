import SEO from "../components/SEO";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const cardsData = [
    {
        id: 1,
        imgSrc: "/outboundmaldives.webp",
        title: "Asian Wonders Tour",
        description:
            "From the tranquil waters of the Maldives to the vibrant cities of Asia, this tour unveils the rich diversity and beauty of the continent.",
        fullText:
            "Begin your journey in the Maldives, relaxing in overwater villas and exploring turquoise lagoons. Head to India to witness the majestic Taj Mahal and immerse in the culture of Jaipur. Experience the serenity of Japan with its ancient temples, cherry blossoms, and futuristic cities like Tokyo. Conclude in Thailand, where golden beaches, bustling night markets, and sacred temples create an unforgettable finale.",
        gallery: [
            "/outboundmaldives.webp",
            "/india.webp",
            "/japan.webp",
            "/thailand.webp",
        ],
    },
    {
        id: 2,
        imgSrc: "/paris.webp",
        title: "Grand Europe Tour",
        description:
            "Explore the timeless elegance of Europe — from romantic cities to majestic landscapes and iconic landmarks.",
        fullText:
            "Start in Paris, the city of love, strolling beneath the Eiffel Tower and along the Seine. Head to Rome to uncover the rich history of the Colosseum and the Vatican. Journey through Switzerland’s Alps for breathtaking mountain views and serene lakes. End your tour in Amsterdam, exploring charming canals, tulip gardens, and vibrant local culture.",
        gallery: [
            "/paris.webp",
            "/rome.webp",
            "/switzerland.webp",
            "/amsterdam.webp",
        ],
    },
    {
        id: 4,
        imgSrc: "/egypt.webp",
        title: "Majestic Africa Tour",
        description:
            "Experience the raw beauty, cultural richness, and ancient wonders of Africa’s most iconic destinations.",
        fullText:
            "Embark on a thrilling safari in Kenya’s Maasai Mara to witness the Big Five in their natural habitat. Explore the ancient pyramids and temples of Egypt that stand as testaments to a glorious past. Relax on the pristine beaches of Zanzibar, soaking in turquoise waters and Swahili culture. Conclude your journey in Cape Town, South Africa, where Table Mountain and Robben Island tell stories of resilience and natural splendor.",
        gallery: [
            "/egypt.webp",
            "/capetown.webp",
            "/kenya.webp",
            "/zanzibar.webp",
        ],
    },
    {
        id: 4,
        imgSrc: "/sydney.webp",
        title: "Australia & New Zealand Escape",
        description:
            "Discover the stunning coasts, thrilling adventures, and iconic landscapes of Oceania’s finest destinations.",
        fullText:
            "Begin your journey in Sydney, Australia, where the Opera House and Harbour Bridge welcome you to a cosmopolitan coast. Dive into the Great Barrier Reef for unforgettable marine exploration. Then head to Queenstown, New Zealand — the adventure capital — for bungee jumping, jet boating, and scenic lake views. End with a visit to Rotorua, where Māori culture and geothermal wonders offer a unique, immersive experience.",
        gallery: [
            "/sydney.webp",
            "/greatbarrierreef.webp",
            "/queenstown.webp",
            "/rotorua.webp",
        ],
    },
];

const OutboundTours: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<
        (typeof cardsData)[number] | null
    >(null);

    return (
        <div className="justify-center items-center pb-20">
            <SEO
                title="Outbound Travel Packages | Lando Travels"
                description="Discover international travel packages from Sri Lanka with Lando Travels. Get expert assistance with flights, travel arrangements, and overseas holidays."
                canonical="https://www.landotravels.com/outbound"
                image="/outboundcover.webp"
            />

            {/* Cover Section */}
            <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
                <img
                    src="/outboundCover2.webp"
                    alt="Outbound Tours"
                    fetchPriority="high"
                    decoding="async"
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
                        Outbound Tours
                    </h1>

                    <p className="text-white text-md md:text-lg max-w-xl text-center md:text-left">
                        Journey beyond Sri Lanka to explore iconic destinations
                        across the globe. From historic cities to breathtaking
                        landscapes, let us design the perfect outbound adventure
                        tailored just for you.
                    </p>
                </motion.div>
            </section>

            {/* Card Grid */}
            <section className="py-20 px-6 md:px-12 bg-white">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Discover the World with Lando Travels
                </h2>

                <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
                    Our outbound tour packages open the doors to unforgettable
                    international experiences — from iconic landmarks and
                    cultural marvels to relaxing getaways and thrilling
                    adventures.
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
                                decoding="async"
                                className="w-full h-96 object-cover transform group-hover:scale-105 transition duration-500"
                            />

                            <div className="absolute bottom-0 bg-white p-4 backdrop-blur-sm w-full">
                                <p className="text-gray-700 text-sm mb-2">
                                    {card.description}
                                </p>

                                <h3 className="text-lg font-bold text-gray-900">
                                    {card.title}
                                </h3>
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
                                {selectedCard.gallery.map(
                                    (img: string, i: number) => (
                                        <div
                                            key={i}
                                            className="sm:min-w-[230px] w-1/4 h-96 relative"
                                        >
                                            <img
                                                src={img}
                                                alt={`${selectedCard.title} gallery image ${i + 1}`}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover clip-diagonal hover:scale-105 transition duration-500"
                                            />
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                    {selectedCard.title}
                                </h2>

                                <p className="text-gray-600">
                                    {selectedCard.fullText}
                                </p>
                            </div>

                            <button
                                type="button"
                                aria-label="Close tour details"
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
                    to="/contact?subject=Outbound%20Tour%20Request&message=I%20would%20like%20to%20customize%20a%20Outbound%20Tour%20package.%20Please%20assist..."
                    className="bg-blue-500 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                    Plan Your Journey
                </Link>
            </motion.div>
        </div>
    );
};

export default OutboundTours;