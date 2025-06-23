import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const airlines = [
  { name: "Partner 24", image: "/partners/logo10.webp" },
  { name: "Partner 23", image: "/partners/logo26.webp" },
  { name: "Partner 22", image: "/partners/logo25.webp" },
  { name: "Partner 21", image: "/partners/logo24.webp" },
  { name: "Partner 20", image: "/partners/logo23.webp" },
  { name: "Partner 1", image: "/partners/logo1.svg" },
  { name: "Partner 2", image: "/partners/logo2.svg" },
  { name: "Partner 3", image: "/partners/logo5.webp" },
  { name: "Partner 4", image: "/partners/logo11.webp" },
  { name: "Partner 5", image: "/partners/logo7.webp" },
  { name: "Partner 6", image: "/partners/logo8.svg" },
  { name: "Partner 7", image: "/partners/logo9.webp" },
  { name: "Partner 8", image: "/partners/logo6.webp" },
  { name: "Partner 9", image: "/partners/logo12.webp" },
  { name: "Partner 10", image: "/partners/logo13.webp" },
  { name: "Partner 11", image: "/partners/logo14.webp" },
  { name: "Partner 12", image: "/partners/logo15.webp" },
  { name: "Partner 13", image: "/partners/logo16.svg" },
  { name: "Partner 14", image: "/partners/logo17.webp" },
  { name: "Partner 15", image: "/partners/logo18.webp" },
  { name: "Partner 16", image: "/partners/logo19.webp" },
  { name: "Partner 17", image: "/partners/logo20.webp" },
  { name: "Partner 18", image: "/partners/logo21.webp" },
  { name: "Partner 19", image: "/partners/logo22.webp" }
];

const Partnerships: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroll = async () => {
      const fullWidth = el.scrollWidth / 2; // because logos are duplicated
      await controls.start({
        x: -fullWidth,
        transition: {
          duration: fullWidth / 50,
          ease: "linear",
        },
      });
      controls.set({ x: 0 });
      scroll();
    };

    scroll();
  }, [controls]);

  return (
    <section className="bg-white pb-20 px-4 md:px-10 lg:px-20 overflow-hidden">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Our Airlines
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-10 md:gap-16 items-center whitespace-nowrap"
          ref={containerRef}
          animate={controls}
        >
          {[...airlines, ...airlines].map((airline, index) => (
            <img
              key={index}
              src={airline.image}
              alt={airline.name}
              className="h-16 sm:h-20 md:h-24 lg:h-28 object-contain opacity-90 hover:opacity-100 transition"
              loading="lazy"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partnerships;
