"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GridMotion.css';

gsap.registerPlugin(ScrollTrigger);

interface GridMotionProps {
    items?: string[];
    gradientColor?: string;
}

const GridMotion = ({ items = [], gradientColor = 'black' }: GridMotionProps) => {
    const gridRef = useRef(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const mouseXRef = useRef(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // 1. Mouse/Touch Parallax Logic
        const handleMouseMove = (e: MouseEvent) => {
            mouseXRef.current = e.clientX;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                mouseXRef.current = e.touches[0].clientX;
            }
        };

        const updateMotion = () => {
            const isMobile = window.innerWidth < 768;
            const maxMoveAmount = isMobile ? 100 : 200;

            rowRefs.current.forEach((row, index) => {
                if (row) {
                    const direction = index % 2 === 0 ? 1 : -1;
                    const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;
                    gsap.to(row, {
                        x: moveAmount,
                        duration: 1.5,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                }
            });
        };

        const ticker = gsap.ticker.add(updateMotion);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);

        // 2. Scroll-triggered Parallax for Rows
        rowRefs.current.forEach((row, index) => {
            if (row) {
                const direction = index % 2 === 0 ? 1 : -1;
                gsap.fromTo(row,
                    { x: direction * (isMobile ? 100 : 200) },
                    {
                        x: -direction * (isMobile ? 100 : 200),
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        }
                    }
                );
            }
        });

        // 3. Section-wide Scale (Subtle Zoom-in effect)
        gsap.fromTo(".gridMotion-container",
            { scale: 1 },
            {
                scale: isMobile ? 1.25 : 1.1,
                opacity: 1,
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top top",
                    end: `+=${isMobile ? 1800 : 1200}`,
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                }
            }
        );

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('resize', checkMobile);
            gsap.ticker.remove(ticker);
        };
    }, []);

    return (
        <div className="noscroll" ref={gridRef}>
            <section className="intro" style={{ background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)` }}>
                <div className="gridMotion-container">
                    {[...Array(isMobile ? 2 : 4)].map((_, rowIndex) => (
                        <div key={rowIndex} className="row" ref={el => { rowRefs.current[rowIndex] = el }}>
                            {[...Array(isMobile ? 5 : 7)].map((_, itemIndex) => {
                                const itemsPerRow = isMobile ? 5 : 7;
                                const content = items[rowIndex * itemsPerRow + itemIndex];
                                return (
                                    <div key={itemIndex} className="row__item">
                                        <div className="row__item-inner">
                                            {content && (content.startsWith('http') || content.startsWith('/') || content.startsWith('./')) ? (
                                                <div className="row__item-img" style={{ backgroundImage: `url(${content})` }} />
                                            ) : (
                                                <div className="p-4 text-white font-bold">{content}</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default GridMotion;