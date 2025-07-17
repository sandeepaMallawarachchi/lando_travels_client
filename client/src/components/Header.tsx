import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./admin/Login";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/inbound", label: "Inbound Tours" },
    { to: "/outbound", label: "Outbound Tours" },
    { to: "/corporate", label: "Corporate Travel Services" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/support", label: "Support" },
  ];

  const dropdownVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-4 rounded-b-3xl text-gray-800" : "bg-transparent py-5 text-white"
        }`}
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between px-6 sm:px-20">
        {/* Left: logos */}
        <div className="flex items-center space-x-4">
          <Link to={'/'}><img src="/logo-white.webp" alt="Lando Travels" className="h-10" /></Link>
          <img src="/iata.webp" alt="IATA" className="h-10" />
        </div>

        {/* Center nav: desktop only */}
        <nav className="hidden md:flex space-x-10 text-md font-medium">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`${location.pathname === to ? "text-blue-600" : ""
                } hover:text-blue-600`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: login + menu */}
        <div className="flex items-center gap-4">
          <button aria-label="Button"
            onClick={handleOpenModal}
            className="bg-blue-500 cursor-pointer text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>

          {/* Hamburger icon: mobile only */}
          <button aria-label="Button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg px-6 pt-4 pb-6 rounded-b-3xl overflow-hidden"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <nav className="flex flex-col gap-4 text-gray-800">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`${location.pathname === to ? "text-blue-600" : ""
                    } hover:text-blue-600`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <Login isOpen={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
};

export default Header;
