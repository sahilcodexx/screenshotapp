"use client"

import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

function ParticleShape() {
  const pointsRef = useRef<THREE.Points>(null!)

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.4
      pointsRef.current.rotation.x += delta * 0.2
    }
  })

  // Generate particles forming an abstract flame / helix shape
  const count = 700
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const u = Math.random() * Math.PI * 2
    const v = Math.random() * Math.PI - Math.PI / 2
    const radius = 1.2 + Math.sin(u * 4) * 0.3

    positions[i * 3] = radius * Math.cos(v) * Math.cos(u)
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2.8
    positions[i * 3 + 2] = radius * Math.cos(v) * Math.sin(u)

    // Purple to Pink gradient color
    colors[i * 3] = 0.7 + Math.random() * 0.3 // R
    colors[i * 3 + 1] = 0.2 + Math.random() * 0.3 // G
    colors[i * 3 + 2] = 0.9 + Math.random() * 0.1 // B
  }

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </Float>
  )
}

export function ConsistencyParticleVisual() {
  return (
    <div className="relative h-48 w-full flex items-center justify-center overflow-hidden select-none">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }}>
          <ambientLight intensity={1} />
          <ParticleShape />
        </Canvas>
      </div>
      {/* Radial soft purple glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-purple-950/90 via-transparent to-transparent" />
    </div>
  )
}
