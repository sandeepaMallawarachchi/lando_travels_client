import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBullseye, FaEye } from "react-icons/fa";
import CompanyIntro from "../components/CompanyIntro ";

const AboutUs: React.FC = () => {

    const baseImages = [
        "/about/about1.webp",
        "/about/about2.webp",
        "/about/about3.webp",
        "/about/about4.webp",
        "/about/about5.webp",
        "/about/about6.webp",
        "/about/about7.webp",
        "/about/about8.webp",
        "/about/about9.webp",
        "/about/about10.webp",
        "/about/about11.webp",
    ]

    const missionImages = ["/aboutCover.webp", ...baseImages];
    const visionImages = [...missionImages.slice(1), missionImages[0]];

    const [missionIndex, setMissionIndex] = useState(0);
    const [visionIndex, setVisionIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMissionIndex((prev) => (prev + 1) % missionImages.length);
            setVisionIndex((prev) => (prev + 1) % visionImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
    };

    return (
        <div className='justify-center items-center pb-20'>
            {/* Cover Section */}
            <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
                <img
                    src="/aboutCover.webp"
                    alt="About Lando Travels"
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
                        About Lando Travels
                    </h1>
                    <p className="text-white text-md md:text-lg max-w-xl text-center md:text-left">
                        At Lando Travels, we specialize in corporate travel with over two decades of experience. Our expert team ensures efficient, reliable, and personalized service for all your business travel needs.
                    </p>
                </motion.div>
            </section>

            <CompanyIntro />

            <section className="bg-white py-16 px-6 md:px-12">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <motion.div
                        className="mission-hover group relative overflow-hidden border border-gray-200 rounded-xl p-8 shadow-md text-center transition-all duration-300"
                        variants={itemVariants}
                    >
                        <div className="flex justify-center mb-4 relative z-10">
                            <div className="icon-wrapper bg-blue-500 text-white group-hover:text-blue-500 group-hover:bg-white p-4 rounded-full transition duration-300">
                                <FaBullseye size={28} />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 relative z-10 group-hover:text-white">Our Mission</h3>
                        <p className="text-gray-600 group-hover:text-white transition duration-300 relative z-10">
                            To deliver reliable, personalized, and seamless travel solutions that empower individuals and businesses to explore the world with confidence.
                        </p>
                    </motion.div>

                    <motion.div
                        className="rounded-xl overflow-hidden shadow-md w-full h-64 flex items-center justify-center"
                        variants={itemVariants}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={missionIndex}
                                src={missionImages[missionIndex]}
                                alt="Our Mission"
                                loading="lazy"
                                className="w-full h-full object-cover"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 40, opacity: 0 }}
                                transition={{ duration: 0.8 }}
                            />
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        className="rounded-xl overflow-hidden shadow-md w-full h-64 relative"
                        variants={itemVariants}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={visionIndex}
                                src={visionImages[visionIndex]}
                                alt="Our Vision"
                                loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ y: 0, opacity: 0 }}
                                animate={{ y: -20, opacity: 1 }}
                                exit={{ y: -40, opacity: 0 }}
                                transition={{ duration: 0.8 }}
                            />
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        className="vision-hover group relative overflow-hidden border border-gray-200 rounded-xl p-8 shadow-md text-center transition-all duration-300"
                        variants={itemVariants}
                    >
                        <div className="flex justify-center mb-4 relative z-10">
                            <div className="icon-wrapper bg-[#ff6b00] text-white group-hover:text-[#ff6b00] group-hover:bg-white p-4 rounded-full transition duration-300">
                                <FaEye size={28} />
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 relative z-10 group-hover:text-white">Our Vision</h3>
                        <p className="text-gray-600 group-hover:text-white transition duration-300 relative z-10">
                            To be the most trusted travel partner in the region, setting new standards in corporate and leisure travel through innovation and care.
                        </p>
                    </motion.div>
                </motion.div>
            </section>
            <section className="relative flex flex-col md:flex-row items-center justify-center px-6 md:px-24 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.4 }}
                        className="flex justify-center"
                    >
                        <img
                            src="/user.svg"
                            alt="Director"
                            loading="lazy"
                            className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-white"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.4 }}
                        className="text-center md:text-left"
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Message from the Director
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            At Lando Travels, our journey began with a simple belief—that travel should be seamless, purposeful, and personal. Over the years, we've committed ourselves to building trusted partnerships and delivering services that go beyond expectations. I am proud to lead a team that values integrity, innovation, and client satisfaction above all.
                        </p>
                        <p className="mt-4 font-semibold text-blue-600">— Managing Director, Lando Travels</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
