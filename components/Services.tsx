"use client";
import { useState } from 'react';
import { motion } from "motion/react";

const SERVICES = [
    { id: "01", name: "Creative Direction", description: "Defining the visual soul of your brand." },
    { id: "02", name: "Brand Identity", description: "Crafting logos and systems that endure." },
    { id: "03", name: "Web Design", description: "Immersive digital experiences." },
    { id: "04", name: "Development", description: "Robust, scalable, and high-performance code." },
    { id: "05", name: "Motion Design", description: "Bringing stories to life through movement." },
];

export default function Services() {
    const [hoveredService, setHoveredService] = useState<string | null>(null);

    return (
        <section className="bg-[#060606] text-white pt-16 pb-12 md:py-32 px-6 md:px-20 relative overflow-hidden">

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 border-b border-white/10 pb-8">
                    <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase">
                        Our <span className="text-emerald-500">Capabilities</span>
                    </h2>
                    <p className="text-zinc-500 text-xs md:text-sm tracking-[0.2em] uppercase mt-4 md:mt-0 max-w-xs text-right">
                        Comprehensive design & tech solutions
                    </p>
                </div>

                <div className="grid grid-cols-1">
                    {SERVICES.map((service) => (
                        <motion.div
                            key={service.id}
                            className="group relative border-b border-white/5 py-8 md:py-12 cursor-pointer"
                            onMouseEnter={() => setHoveredService(service.id)}
                            onMouseLeave={() => setHoveredService(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: parseInt(service.id) * 0.1 }}
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 relative z-10 transition-transform duration-500 group-hover:translate-x-4">
                                <div className="flex items-baseline gap-6 md:gap-12">
                                    <span className="text-emerald-500/50 text-sm md:text-base font-mono group-hover:text-emerald-400 transition-colors">
                                        {service.id}
                                    </span>
                                    <h3 className="text-2xl md:text-5xl font-bold uppercase tracking-tight group-hover:text-emerald-500 transition-colors duration-300">
                                        {service.name}
                                    </h3>
                                </div>
                                <p className="text-zinc-500 text-xs md:text-lg max-w-md group-hover:text-zinc-300 transition-colors duration-300">
                                    {service.description}
                                </p>
                            </div>

                            {/* Hover Background Effect */}
                            <motion.div
                                className="absolute inset-0 bg-white/[0.02] -z-0"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: hoveredService === service.id ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ originY: 0 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
