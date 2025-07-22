import React from 'react';
import { motion } from 'framer-motion';
import FlightRequestForm from '../components/FlightRequestForm';

const Support: React.FC = () => {

    return (
        <div className='justify-center items-center'>
            {/* Cover Section */}
            <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
                <img
                    src="/flight1.webp"
                    alt="Flight"
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
                    <h1 className="text-4xl md:text-6xl font-bold text-white mt-64 md:mt-0">
                        Search Your Flight
                    </h1>
                    <p className="text-white text-md md:text-lg max-w-xl text-center md:text-left">
                        Find the best flight deals to your favorite destinations. One-way, round trip or multi-city — your next journey starts here.
                    </p>
                </motion.div>
            </section>

            <FlightRequestForm />
        </div>
    );
};

export default Support;
