import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const CompanyIntro = () => {
    const fullText = `At Lando Travels, we believe that travel is more than just movement—it's about meaningful connections, seamless experiences, and trusted partnerships. With over two decades of industry expertise, we've been the backbone of corporate journeys and leisure escapes, providing unmatched service in air ticketing, visa processing, and travel consultation. From first-time flyers to seasoned executives, our mission is to deliver excellence, every mile of the way.`;

    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + fullText.charAt(index));
                setIndex(index + 1);
            }, 20);
            return () => clearTimeout(timeout);
        } else {
            setFinished(true);
        }
    }, [index]);

    return (
        <section className="py-20 bg-white flex flex-col justify-center items-center px-6 md:px-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl text-center text-lg md:text-xl text-gray-700 leading-relaxed font-medium"
            >
                <p className="whitespace-pre-wrap">{displayedText}</p>

                {finished && (
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-10 text-2xl md:text-3xl font-bold text-blue-500"
                    >
                        “Your Journey, Our Passion.”
                    </motion.h2>
                )}
            </motion.div>
        </section>
    );
};

export default CompanyIntro;
