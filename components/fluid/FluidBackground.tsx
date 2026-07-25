"use client"

import { useEffect, useRef } from "react"

const vertexSrc = `#version 300 es
in vec2 a_position;
in vec2 a_uv;
out vec2 vUv;
void main() {
  vUv = a_uv;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

const fragmentSrc = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform float uTime;
uniform vec2 uResolution;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), f.x),
             mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p); p = p * 2.0 + vec2(100.0); a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.05;

  vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(1.0, 0.0) + t * 0.6));
  vec2 r = vec2(fbm(uv + q + vec2(1.7, 9.2) + t * 0.12),
                fbm(uv + q + vec2(8.3, 2.8) + t * 0.1));
  float f = fbm(uv + r);

  float mask = smoothstep(0.12, 0.5, f);

  vec3 col = mix(vec3(1.0, 0.04, 0.35), vec3(1.0, 0.25, 0.5), smoothstep(0.25, 0.6, f));
  col = mix(col, vec3(0.8, 0.0, 0.5), smoothstep(0.5, 0.7, f));

  float a = mask * 0.55;
  vec3 finalCol = col * a;
  float g = mask * 0.06 * (0.5 + 0.5 * sin(f * 15.0 + t * 3.0));
  finalCol += vec3(1.0, 0.05, 0.35) * g;

  fragColor = vec4(finalCol, a + g * 2.0);
}`

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    })
    if (!gl) return

    let animId = 0
    const startTime = performance.now()

    const vs = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vs, vertexSrc)
    gl.compileShader(vs)

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fs, fragmentSrc)
    gl.compileShader(fs)

    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const verts = new Float32Array([-1,-1, 1,-1, -1,1, 1,1])
    const uvs = new Float32Array([0,0, 1,0, 0,1, 1,1])
    const idx = new Uint16Array([0,1,2, 2,1,3])

    const vb = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vb)
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)
    const ploc = gl.getAttribLocation(prog, "a_position")
    gl.enableVertexAttribArray(ploc)
    gl.vertexAttribPointer(ploc, 2, gl.FLOAT, false, 0, 0)

    const ub = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, ub)
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW)
    const uvoc = gl.getAttribLocation(prog, "a_uv")
    gl.enableVertexAttribArray(uvoc)
    gl.vertexAttribPointer(uvoc, 2, gl.FLOAT, false, 0, 0)

    const ib = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW)

    const timeLoc = gl.getUniformLocation(prog, "uTime")
    const resLoc = gl.getUniformLocation(prog, "uResolution")

    const resize = () => {
      const w = container.clientWidth * window.devicePixelRatio
      const h = container.clientHeight * window.devicePixelRatio
      canvas.width = w
      canvas.height = h
      canvas.style.width = container.clientWidth + "px"
      canvas.style.height = container.clientHeight + "px"
      gl.viewport(0, 0, w, h)
      gl.uniform2f(resLoc, w, h)
    }

    const draw = () => {
      gl.uniform1f(timeLoc, (performance.now() - startTime) / 1000)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
