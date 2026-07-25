"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;

  float t = uTime * 0.08;

  vec2 q = vec2(0.0);
  q.x = fbm(uv + t);
  q.y = fbm(uv + vec2(1.0, 0.0) + t * 0.7);

  vec2 r = vec2(0.0);
  r.x = fbm(uv + q + vec2(1.7, 9.2) + t * 0.15);
  r.y = fbm(uv + q + vec2(8.3, 2.8) + t * 0.12);

  float f = fbm(uv + r);

  float mask = smoothstep(0.25, 0.55, f);

  vec3 pink = vec3(1.0, 0.05, 0.35);
  vec3 lightPink = vec3(1.0, 0.3, 0.5);
  vec3 magenta = vec3(0.8, 0.0, 0.6);

  float blend = smoothstep(0.3, 0.6, f);
  vec3 color = mix(pink, lightPink, blend);
  color = mix(color, magenta, smoothstep(0.5, 0.7, f));

  vec3 finalColor = mix(vec3(0.0), color, mask * 0.85);

  float glow = mask * 0.15 * (0.5 + 0.5 * sin(f * 20.0 + t * 2.0));
  finalColor += vec3(1.0, 0.05, 0.35) * glow;

  gl_FragColor = vec4(finalColor, mask * 0.9);
}
`

function FluidPlane() {
  const ref = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  )

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

export default function FluidBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <FluidPlane />
      </Canvas>
    </div>
  )
}
