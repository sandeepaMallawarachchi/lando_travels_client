import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Inbound Tours",
    subtitle: "LOCAL EXPERIENCES",
    image: "/inbound.webp",
    hoverImage: "/inboundleisure.webp",
    link: "/inbound",
  },
  {
    title: "Outbound Tours",
    subtitle: "INTERNATIONAL TRIPS",
    image: "/outbounddubai.webp",
    hoverImage: "/outboundmaldives.webp",
    link: "/outbound",
  },
  {
    title: "Corporate Travel",
    subtitle: "BUSINESS SOLUTIONS",
    image: "/corparate.webp",
    hoverImage: "/corparate-hover.webp",
    link: "/corporate",
  },
];

const OurServices: React.FC = () => {
  return (
    <section className="bg-[#111827] py-20 px-6 md:px-12" id="services">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.4 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-3">Our Services</h2>
        <p className="text-gray-400">
          Discover flexible travel options tailored just for you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map(({ title, subtitle, image, hoverImage, link }, i) => (
          <Link to={link} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.4 }}
              className="relative rounded-xl overflow-hidden group cursor-pointer shadow-lg"
            >
              <div className="relative h-[400px] w-full">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:-translate-y-full"
                />
                <img
                  src={hoverImage}
                  alt={`${title} Hover`}
                  loading="lazy"
                  className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                  <p className="text-sm tracking-widest mb-2">{subtitle}</p>
                  <h3 className="text-2xl font-bold">{title}</h3>
                  <button aria-label="Button" className="mt-5 cursor-pointer text-sm bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition">
                    MORE INFO
                  </button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
