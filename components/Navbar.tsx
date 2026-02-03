"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const navItems = [
        { name: "Home", href: "#home" },
        { name: "Work", href: "#work" },
        { name: "Case Studies", href: "#case-studies" },
        { name: "Services", href: "#services" },
        { name: "Contact", href: "#contact" },
    ];

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = ["home", "work", "case-studies", "services", "contact"];
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const sectionId = href.replace("#", "");
        const element = document.getElementById(sectionId);

        if (!element) return;

        // Close mobile menu
        setIsMobileMenuOpen(false);

        // Small delay for menu close animation  
        setTimeout(() => {
            const navbarHeight = window.innerWidth < 768 ? 70 : 85;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }, 100);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-2xl"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0"
                        >
                            <button
                                onClick={() => scrollToSection("#home")}
                                className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent hover:from-purple-300 hover:via-pink-300 hover:to-blue-300 transition-all duration-300"
                            >
                                Portfolio
                            </button>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.href.replace("#", "");
                                return (
                                    <motion.button
                                        key={item.name}
                                        onClick={() => scrollToSection(item.href)}
                                        className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-300"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:block">
                            <motion.button
                                onClick={() => scrollToSection("#contact")}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                className="relative px-6 py-2.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full text-white text-sm font-semibold overflow-hidden group"
                            >
                                <span className="relative z-10">Get in Touch</span>
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <motion.button
                                type="button"
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 text-white/80 hover:text-white focus:outline-none relative z-50"
                                aria-label="Toggle menu"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {isMobileMenuOpen ? (
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
                        >
                            <div className="px-6 py-8 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
                                {navItems.map((item, index) => {
                                    const isActive = activeSection === item.href.replace("#", "");
                                    return (
                                        <motion.button
                                            key={item.name}
                                            type="button"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.08, duration: 0.3 }}
                                            onClick={() => scrollToSection(item.href)}
                                            className={`block w-full text-left px-5 py-4 rounded-xl text-lg font-semibold transition-all duration-300 pointer-events-auto cursor-pointer ${isActive
                                                ? "bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 text-white border border-purple-500/30 shadow-lg shadow-purple-500/10"
                                                : "text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10"
                                                }`}
                                        >
                                            {item.name}
                                        </motion.button>
                                    );
                                })}
                                <motion.button
                                    type="button"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: navItems.length * 0.08, duration: 0.3 }}
                                    onClick={() => scrollToSection("#contact")}
                                    className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full text-white text-lg font-bold shadow-xl shadow-purple-500/30 active:scale-95 transition-transform pointer-events-auto cursor-pointer"
                                >
                                    Get in Touch
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Spacer to prevent content from going under the navbar */}
            <div className="h-16 md:h-20" />
        </>
    );
}
