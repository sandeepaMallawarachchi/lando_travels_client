import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const cardsData = [
    {
        id: 1,
        imgSrc: '/airTicketing.jpg',
        title: 'Air Ticketing',
        description:
            'Book flights worldwide with ease. Our IATA-certified team secures the best corporate fares and ensures a smooth travel process.',
        fullText:
            'As an IATA-accredited travel agency, Lando Travels offers seamless ticketing and reservations with all major airlines, both online and offline. We provide competitive fares and ensure that your corporate travel is hassle-free, efficient, and cost-effective.',
        gallery: ['/airTicketing.jpg', '/airTicketing2.jpg', '/airTicketing3.jpg', '/airTicketing4.avif'],
    },
    {
        id: 2,
        imgSrc: '/visaProcessing.jpg',
        title: 'Visa Processing',
        description:
            'We simplify visa processing for any destination—fast, reliable, and stress-free support from our expert team.',
        fullText:
            'Navigating visa requirements can be challenging, but Lando Travels simplifies the process for you. Our expert team handles visa applications for all countries, ensuring that your documents are processed quickly and efficiently, allowing you to focus on your business.',
        gallery: ['/visaProcessing.jpg', '/visaProcessing2.jpg', '/visaProcessing3.jpg', '/visaProcessing4.jpg'],
    },
    {
        id: 4,
        imgSrc: '/travelInsurance.png',
        title: 'Travel Insurance',
        description:
            'Ensure peace of mind with tailored travel insurance plans that safeguard your business trips from start to finish.',
        fullText:
            'Protect your corporate travelers with comprehensive travel insurance. We offer tailored insurance packages that cover all aspects of your journey, giving you peace of mind as you travel the world for business.',
        gallery: ['/travelInsurance.png', '/travelInsurance2.jpg', '/travelInsurance3.jpg', '/travelInsurance4.jpg'],
    },
    {
        id: 4,
        imgSrc: '/travelConsultation.jpg',
        title: 'Travel Consultation',
        description:
            'Get expert travel advice for smooth business trips. From simple bookings to complex itineraries, we’re here to help — at no extra cost.',
        fullText:
            'Planning your business trips with us is easy. We offer free travel consultations to help you plan and execute your corporate travel with minimal hassle. Whether it is a simple ticket booking or a complex itinerary, we are here to assist.',
        gallery: ['/travelConsultation.jpg', '/travelConsultation2.jpg', '/travelConsultation3.jpg', '/travelConsultation4.jpg'],
    }
];

const CorporateTravels: React.FC = () => {
    const [selectedCard, setSelectedCard] = useState<any | null>(null);

    return (
        <div className='justify-center items-center pb-20'>
            {/* Cover Section */}
            <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
                <img
                    src="/corporatecover.jpg"
                    alt="Corporate Travel Services"
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
                        Corporate Travel Services
                    </h1>
                    <p className="text-white text-md md:text-lg max-w-xl text-center md:text-left">
                        Your one-stop partner for visa processing, flight bookings, insurance, and expert consultation—delivering efficiency, compliance, and peace of mind.
                    </p>
                </motion.div>
            </section>

            {/* Card Grid */}
            <section className="py-20 px-6 md:px-12 bg-white">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Streamline Business Travel with Lando
                </h2>
                <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
                    From visa processing and air ticketing to travel insurance and expert consulting — our Corporate Travel Services are designed to make every business journey smooth, secure, and stress-free.
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
                            <button
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
                    to="/contact"
                    className="bg-blue-500 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                    Talk to Our Travel Experts
                </Link>
            </motion.div>

        </div>
    );
};

export default CorporateTravels;
