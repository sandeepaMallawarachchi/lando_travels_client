import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollButton = () => {
    const [visible, setVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const progress = Math.min(scrollTop / docHeight, 1);
            setScrollProgress(progress);
            setVisible(scrollTop > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed cursor-pointer bottom-6 right-6 z-50 w-10 h-10 rounded-full overflow-hidden shadow-xl bg-white/10 backdrop-blur border border-blue-700"
                >
                    {/* Water fill background */}
                    <div className="absolute bottom-0 left-0 w-full h-full">
                        <div
                            className="absolute left-0 w-full bg-gradient-to-t from-blue-700 to-blue-400 transition-all duration-300 ease-out"
                            style={{
                                top: `${100 - scrollProgress * 100}%`,
                                height: `${scrollProgress * 100}%`,
                            }}
                        />
                    </div>

                    {/* Arrow icon */}
                    <motion.div
                        className="relative z-10 flex items-center justify-center w-full h-full"
                        animate={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <ArrowUp
                            className="w-5 h-5"
                            color={scrollProgress < 0.5 ? "#2563eb" : "#fff"}
                        />
                    </motion.div>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollButton;