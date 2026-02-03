"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

const LogoCube = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Create the specific "U DIGITAL STUDIO" texture
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // 1. White Background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw "U"
      ctx.fillStyle = "black";
      ctx.font = "bold 220px Arial";
      ctx.textAlign = "center";
      ctx.fillText("U", 256, 280);

      // 3. Draw "TM"
      ctx.font = "bold 40px Arial";
      ctx.fillText("TM", 365, 200);

      // 4. Draw "DIGITAL STUDIO"
      ctx.font = "bold 55px Arial";
      ctx.fillText("DIGITAL", 256, 360);
      ctx.fillText("STUDIO", 256, 420);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16; // Keep text sharp
    return tex;
  }, []);

  // Animation loop to match the video rotation
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.7;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3.8, 3.8, 3.8]} />
      {/* 
        Three.js Material indices:
        0: Right, 1: Left, 2: Top, 3: Bottom, 4: Front, 5: Back
      */}
      {[...Array(6)].map((_, i) => {
        const isFreeSide = i === 2 || i === 3;
        return (
          <meshBasicMaterial
            key={i}
            attach={`material-${i}`}
            map={isFreeSide ? null : texture}
            color="white"
            visible={!isFreeSide}
            side={THREE.DoubleSide}
          />
        );
      })}
    </mesh>
  );
};

export default function Scene() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />

        <LogoCube />

        {/* Optional: Allows user to rotate with mouse like the video exploration */}
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* Tailwind Overlay (Optional) */}
      {/* <div className="absolute bottom-10 text-white/20 uppercase tracking-widest pointer-events-none">
        3D Interaction Active
      </div> */}
    </div>
  );
}