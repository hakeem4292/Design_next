"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "motion/react";

const CoreMorph = () => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [distort, setDistort] = useState(0.4);
    const [speed, setSpeed] = useState(2);
    const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            };
        };

        const handleScroll = () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            setDistort(0.4 + scrollPercent * 0.6);
            setSpeed(2 + scrollPercent * 4);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Slow rotation
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.005;

        // Subtle follow mouse
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mousePos.current.x * 0.5, 0.1);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mousePos.current.y * 0.5, 0.1);
    });

    return (
        <Float speed={speed} rotationIntensity={2} floatIntensity={2}>
            <Sphere ref={meshRef} args={[1, 64, 64]}>
                <MeshDistortMaterial
                    color="#10b981" // emerald-500
                    speed={speed}
                    distort={distort}
                    radius={1}
                />
            </Sphere>
        </Float>
    );
};

const HUD = () => {
    const [status, setStatus] = useState("SYNCED");
    const [load, setLoad] = useState(42);

    useEffect(() => {
        const interval = setInterval(() => {
            const statuses = ["SYNCED", "ANALYZING", "PROCESSING", "STABLE", "OPTIMIZING"];
            setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
            setLoad(Math.floor(Math.random() * 60) + 20);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-end p-3 md:p-6 font-mono text-[8px] md:text-[10px] text-emerald-500/80 uppercase tracking-widest md:tracking-[0.2em]">
            <div className="flex justify-between items-end border-b border-emerald-500/20 pb-1 md:pb-2 mb-1 md:mb-2">
                <div>
                    <div className="flex items-center gap-1 md:gap-2">
                        <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        AI CORE
                    </div>
                    <div className="hidden sm:block">STATUS: {status}</div>
                </div>
                <div className="text-right">
                    <div>LOAD: {load}%</div>
                    <div className="hidden sm:block">LATENCY: 12ms</div>
                </div>
            </div>
            <div className="flex justify-between text-[6px] md:text-[8px] text-emerald-500/40">
                <div className="truncate">LINK_ESTABLISHED</div>
                <div className="hidden sm:block">SECURE_ACTIVE</div>
            </div>
        </div>
    );
};

export default function AICore() {
    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-24 h-24 md:w-48 md:h-48 z-40 group cursor-pointer">{/* Z-index lowered to 40 so navbar (z-50) appears on top */}
            {/* Background Glow */}
            <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-2xl md:blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700"></div>

            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
                <CoreMorph />
            </Canvas>

            <HUD />

            {/* Hover Expansion Effect */}
            <div className="absolute inset-0 border border-emerald-500/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-1000"></div>
            <div className="absolute inset-0 border border-emerald-500/5 rounded-full scale-125 group-hover:scale-150 transition-transform duration-1000"></div>
        </div>
    );
}
