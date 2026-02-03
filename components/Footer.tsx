"use client";
import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const SOCIAL_LINKS = [
    { name: "GitHub", icon: Github, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" },
    { name: "Twitter", icon: Twitter, url: "#" },
  ];

  return (
    <footer className="w-full bg-black border-t border-white/5 pt-20 pb-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          {/* Left: Contact */}
          <div>
            <p className="text-zinc-600 text-xs tracking-wider uppercase mb-4">Get In Touch</p>
            <a
              href="mailto:hello@studio.com"
              className="text-4xl md:text-5xl font-bold text-white hover:text-zinc-400 transition-colors inline-flex items-center gap-3 group"
            >
              hello@studio.com
              <Mail className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <p className="text-zinc-500 mt-6">
              Based in San Francisco, CA
              <br />
              Working with clients worldwide
            </p>
          </div>

          {/* Right: Navigation */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Links</h3>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
                <li><a href="#case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dribbble</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <p className="text-zinc-600 text-sm">
            © {currentYear} Portfolio. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map(({ name, icon: Icon, url }) => (
              <motion.a
                key={name}
                href={url}
                whileHover={{ y: -2 }}
                className="text-zinc-600 hover:text-white transition-colors"
                aria-label={name}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          <div className="flex gap-6 text-xs text-zinc-600">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}