"use client"

import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

function PointCloudSphere() {
  const globeRef = useRef<THREE.Group>(null!)

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.25
    }
  })

  // Create point cloud globe sphere
  const radius = 1.6
  const count = 1200
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count)
    const theta = Math.sqrt(count * Math.PI) * phi

    const x = radius * Math.cos(theta) * Math.sin(phi)
    const y = radius * Math.sin(theta) * Math.sin(phi)
    const z = radius * Math.cos(phi)

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    // Soft lavender to violet point colors
    colors[i * 3] = 0.75 + Math.random() * 0.25
    colors[i * 3 + 1] = 0.5 + Math.random() * 0.4
    colors[i * 3 + 2] = 0.95 + Math.random() * 0.05
  }

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={globeRef}>
        <points>
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
            size={0.035}
            vertexColors
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Pulsing location pin 1 (San Francisco) */}
        <mesh position={[-0.8, 0.9, 1.1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ec4899" />
        </mesh>

        {/* Pulsing location pin 2 (London) */}
        <mesh position={[0.6, 1.2, 0.8]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#8b5cf6" />
        </mesh>

        {/* Pulsing location pin 3 (Tokyo) */}
        <mesh position={[1.2, 0.4, -0.7]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
      </group>
    </Float>
  )
}

export function GlobalGlobeVisual() {
  return (
    <div className="relative h-64 w-full flex items-center justify-center overflow-hidden select-none">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, -0.2, 3.5], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <PointCloudSphere />
        </Canvas>
      </div>

      {/* Subtle bottom gradient vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-950/90 via-transparent to-transparent" />
    </div>
  )
}
