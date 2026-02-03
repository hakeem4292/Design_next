"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800"
];

export default function PortfolioGrid() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const wrappers = gsap.utils.toArray(".portfolio-wrapper");

        wrappers.forEach((wrapper: any) => {
            // Entry/Scroll Animation
            gsap.fromTo(wrapper,
                { scale: 0.9, opacity: 0, y: 50 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: wrapper,
                        start: "top 95%",
                        end: "top 70%",
                        scrub: 1,
                    }
                }
            );
        });
    }, { scope: containerRef });

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget.querySelector(".portfolio-card");
        const img = e.currentTarget.querySelector("img");

        gsap.to(card, {
            scale: 1.05,
            duration: 0.5,
            ease: "power3.out",
            boxShadow: "0 30px 60px -12px rgba(16, 185, 129, 0.25)",
            borderColor: "rgba(16, 185, 129, 0.4)"
        });

        if (img) {
            gsap.to(img, {
                scale: 1.1,
                filter: "grayscale(0%) brightness(1.1)",
                duration: 0.8,
                ease: "power2.out"
            });
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget.querySelector(".portfolio-card");
        const img = e.currentTarget.querySelector("img");

        gsap.to(card, {
            scale: 1,
            duration: 0.5,
            ease: "power3.inOut",
            boxShadow: "0 0px 0px rgba(0,0,0,0)",
            borderColor: "rgba(255, 255, 255, 0.05)"
        });

        if (img) {
            gsap.to(img, {
                scale: 1,
                filter: "grayscale(100%) brightness(1.0)",
                duration: 0.6,
                ease: "power2.inOut"
            });
        }
    };

    return (
        <div ref={containerRef} className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {images.map((url, i) => (
                <div
                    key={i}
                    className="portfolio-wrapper h-full"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="portfolio-card cursor-pointer w-full aspect-[4/5] bg-zinc-900 rounded-[3rem] overflow-hidden border border-white/5 relative">
                        <img
                            src={url}
                            className="w-full h-full object-cover grayscale origin-center"
                            alt="Project"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
