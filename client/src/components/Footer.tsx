import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#111827] text-white rounded-t-3xl px-6 md:px-12 py-10 text-center sm:text-left">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Logo & Social */}
                <div className="flex flex-col items-center sm:items-start">
                    <Link to={'/'}>
                        <img src="/logo-white.webp" alt="Lando Travels" className="h-12 mb-4" />
                    </Link>
                    <p className="text-sm text-gray-400 max-w-xs">
                        Your trusted travel partner for unforgettable journeys.
                    </p>
                    <div className="flex gap-4 mt-4">
                        <a aria-label="anchor tag"
                            href="https://www.facebook.com/Landotravel?mibextid=ZbWKwL"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition text-xl"
                        >
                            <FaFacebookF />
                        </a>
                        <a aria-label="anchor tag"
                            href="https://www.instagram.com/lando_travels_?igsh=MTBxMTNvemhtcDA1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition text-xl"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>

                {/* Useful Links */}
                <div className="flex flex-col gap-2 items-center md:items-start">
                    <h3 className="font-semibold text-lg mb-2">Useful Links</h3>
                    <a aria-label="anchor tag" href="/inbound" className="text-sm text-gray-300 hover:text-white transition">Inbound Tours</a>
                    <a aria-label="anchor tag" href="/outbound" className="text-sm text-gray-300 hover:text-white transition">Outbound Tours</a>
                    <a aria-label="anchor tag" href="/corporate" className="text-sm text-gray-300 hover:text-white transition">Corporate Travel</a>
                    <a aria-label="anchor tag" href="/contact" className="text-sm text-gray-300 hover:text-white transition">Contact Us</a>
                    <a aria-label="anchor tag" href="/support" className="text-sm text-gray-300 hover:text-white transition">Support</a>
                </div>

                {/* Map Embed */}
                <div>
                    <iframe title="iframe"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8948296164317!2d79.84946127475688!3d6.903178993096117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259d2995af26d%3A0x813a465bff45778a!2sLando%20Travels%20%5BPvt%5D%20Ltd!5e0!3m2!1sen!2slk!4v1750086126164!5m2!1sen!2slk"
                        width="250"
                        height="auto"
                        loading="lazy"
                        className="w-full h-40 md:h-52 lg:h-52 rounded-2xl"
                    ></iframe>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="text-sm text-gray-500 text-center mt-10">
                <p>
                    &copy; 2025 All rights reserved. Powered by{" "}
                    <a aria-label="anchor tag"
                        href="https://abmsz.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                    >
                        ABMSZ
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;