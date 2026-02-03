"use client";
import { motion } from "motion/react";

export default function Footer() {
  const SOCIAL_LINKS = [
    { name: "Instagram", url: "#" },
    { name: "Twitter", url: "#" },
    { name: "LinkedIn", url: "#" },
    { name: "Dribbble", url: "#" },
  ];

  return (
    <footer className="w-full bg-[#060606] border-t border-white/5 pt-16 md:pt-32 pb-8 md:pb-12 px-6 md:px-20 relative overflow-hidden">
      {/* Background Display Text */}
      <div className="absolute top-10 left-0 w-full flex justify-center opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[35vw] md:text-[25vw] font-black uppercase tracking-tighter leading-none">
          Studio
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end mb-24 md:mb-32">
          <div>
            <h3 className="text-zinc-500 text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 md:mb-8">Let's Connect</h3>
            <a
              href="mailto:hello@udigital.studio"
              className="text-3xl sm:text-4xl md:text-7xl font-bold text-white hover:text-emerald-500 transition-colors duration-500 break-all leading-tight"
            >
              hello@udigital.studio
            </a>
          </div>

          <div className="flex flex-col md:items-end gap-10 md:gap-12">
            <div className="flex flex-wrap gap-6 md:gap-8 md:justify-end">
              {SOCIAL_LINKS.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  className="text-zinc-400 hover:text-white text-xs tracking-widest uppercase transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <p className="text-zinc-600 text-xs tracking-widest uppercase">
              Based locally • Operating Globally
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 gap-8 text-[10px] tracking-[0.3em] text-zinc-700 uppercase">
          <div className="flex gap-8">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
          <p>© 2026 U Digital Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}