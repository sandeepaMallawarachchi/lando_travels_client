import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";

const slides = [
    {
        image: "/flight1.webp",
        title: "Explore the World",
        subtitle: "Book your next adventure with Lando Travels",
    },
    {
        image: "/flight2.webp",
        title: "Discover New Destinations",
        subtitle: "From Sri Lanka to the skies — we take you further",
    },
    {
        image: "/flight3.webp",
        title: "Fly in Comfort",
        subtitle: "Your journey begins with luxury and care",
    },
    {
        image: "/flight4.webp",
        title: "Adventure Awaits",
        subtitle: "Let your heart follow the horizon",
    },
    {
        image: "/flight5.webp",
        title: "Sky High Luxury",
        subtitle: "Premium experiences above the clouds",
    },
    {
        image: "/flight6.webp",
        title: "Uncover Hidden Gems",
        subtitle: "Travel beyond the usual, explore the extraordinary",
    },
    {
        image: "/flight7.webp",
        title: "Seamless Journeys",
        subtitle: "Your path to paradise starts with us",
    },
    {
        image: "/flight8.webp",
        title: "Boundless Horizons",
        subtitle: "Every flight is a new opportunity to explore",
    },
    {
        image: "/flight9.webp",
        title: "Wings of Freedom",
        subtitle: "Escape the ordinary — fly with Lando",
    },
];

const imageFade = {
    center: { opacity: 1, y: 0, scale: 1 },
    enter: { opacity: 0, y: 30, scale: 1.05 },
    exit: { opacity: 0, y: -30, scale: 0.95 },
};

const textSlide = {
    enter: { opacity: 0, y: -50 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
};

const Hero: React.FC = () => {
    const [index, setIndex] = useState(0);
    const currentSlide = slides[index];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleSelect = (i: number) => {
        if (i !== index) setIndex(i);
    };

    // const APIKEY = 'AIzaSyCI9ArvdMHEaNk7mvBbX7ueWqUyIIfNJJE'

    return (
        <section className="relative h-[60vh] md:h-screen w-full overflow-hidden bg-blue-200">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentSlide.image}
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    loading="lazy"
                    className="absolute w-full h-full object-cover"
                    variants={imageFade}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
            </AnimatePresence>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Dot Controls */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-20">
                {slides.map((_, i) => (
                    <button aria-label="Button"
                        key={i}
                        onClick={() => handleSelect(i)}
                        className={`w-1 h-5 rounded-full transition-all duration-300 cursor-pointer ${i === index ? "bg-white" : "bg-gray-400 hover:bg-white/70"
                            }`}
                    />
                ))}
            </div>

            {/* Text with rolling animation */}
            <div className="relative z-10 flex items-center justify-center h-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide.title}
                        className="text-center text-white px-4"
                        variants={textSlide}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">{currentSlide.title}</h1>
                        <p className="text-lg md:text-xl">{currentSlide.subtitle}</p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                <button aria-label="Button"
                    onClick={() => {
                        const blogsSection = document.getElementById("blogs");
                        blogsSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="cursor-pointer animate-bounce text-white hover:opacity-80"
                >
                    <ArrowDownCircle size={40} />
                </button>
            </div>
        </section>
    );
};

export default Hero;
