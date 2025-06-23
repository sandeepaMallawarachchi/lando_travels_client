import { ArcImage } from './ArcImage'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
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
    ]

    const images = [...baseImages, ...baseImages];

    return (
        <div id='about' className="sm:h-[70vh] h-[50vh] overflow-hidden mb-10 sm:mb-0">
            <section className="relative min-h-screen bg-white text-black flex flex-col items-center justify-start pt-24 md:pt-36 lg:pt-48 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center sm:mt-[500px] mt-10">
                    <div className="sm:w-[1080px] sm:h-[1080px] w-[700px] h-[700px] aspect-square relative">
                        <div className="absolute inset-0 [animation:spin_50s_linear_infinite]">
                            {images.map((src, index) => {
                                const angle = (2 * Math.PI * index) / images.length;
                                const radius = 50;
                                const xPercent = 50 + radius * Math.cos(angle)
                                const yPercent = 50 + radius * Math.sin(angle)

                                // const scale = 0.8 + 0.2 * Math.sin(angle)
                                return (
                                    <ArcImage
                                        key={index}
                                        src={src}
                                        style={{
                                            left: `${xPercent}%`,
                                            top: `${yPercent}%`,
                                            transform: `translate(-50%, -50%) rotate(${angle * (180 / Math.PI)}deg)`,
                                        }}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
                <motion.div
                    className='relative z-10 mt-12 md:mt-5 text-center max-w-2xl mx-auto px-4 my-5 hero-large-mt'
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.5 }}
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">About Lando Travels</h1>
                    <p className="text-gray-500 text-sm sm:text-base mb-8 px-2 max-w-lg mx-auto">
                        At Lando Travels, we take pride in being one of Sri Lanka's premier travel agencies, specializing in corporate travel services.
                        With over two decades of industry experience, our dedicated and highly trained team is committed to providing top-tier service,
                        handling all your travel needs with efficiency and care.
                    </p>
                    <Link to={'/about'} aria-label="Learn more about Lando's travel services" className="bg-blue-500 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-600 transition">
                        Learn More
                    </Link>
                </motion.div>
                <div className="absolute left-0 top-0 h-60 w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 h-60 w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                <div className="absolute bottom-48 left-0 w-full h-24 z-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />

            </section>
        </div>
    )
}

export default About
