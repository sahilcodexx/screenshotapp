"use client"

import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function AnimatedBlob() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.8}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#ec4899"
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

export function ShaderCardVisual() {
  return (
    <div className="relative h-44 w-full rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden select-none">
      <div className="absolute inset-0 z-0 opacity-70">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ec4899" />
          <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#8b5cf6" />
          <AnimatedBlob />
        </Canvas>
      </div>

      {/* Overlay gradient mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 flex h-full flex-col justify-end p-4">
        <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-pink-400">
          GPU Hardware Accelerated
        </span>
        <h4 className="text-sm font-bold text-white mt-0.5">
          WebGL 3D Engine & Shader Shutter
        </h4>
      </div>
    </div>
  )
}
