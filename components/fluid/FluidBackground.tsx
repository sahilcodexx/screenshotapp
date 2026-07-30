"use client"

/**
 * Interactive WebGL fluid background.
 * - Moody magenta atmospheric base (reference look)
 * - Navier–Stokes fluid with mouse velocity + dye splats
 * - Bright hot-white trails on pointer move
 */

import { useEffect, useRef } from "react"

const BASE_VERT = /* glsl */ `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPosition;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;
uniform vec2 texelSize;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

const CLEAR_FRAG = /* glsl */ `#version 300 es
precision mediump float;
precision mediump sampler2D;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uTexture;
uniform float value;
void main() {
  fragColor = value * texture(uTexture, vUv);
}`

const SPLAT_FRAG = /* glsl */ `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
void main() {
  vec2 p = vUv - point.xy;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  vec3 base = texture(uTarget, vUv).xyz;
  fragColor = vec4(base + splat, 1.0);
}`

const ADVECT_FRAG = /* glsl */ `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform vec2 dyeTexelSize;
uniform float dt;
uniform float dissipation;
vec4 bilerp(sampler2D sam, vec2 uv, vec2 tsize) {
  vec2 st = uv / tsize - 0.5;
  vec2 iuv = floor(st);
  vec2 fuv = fract(st);
  vec4 a = texture(sam, (iuv + vec2(0.5, 0.5)) * tsize);
  vec4 b = texture(sam, (iuv + vec2(1.5, 0.5)) * tsize);
  vec4 c = texture(sam, (iuv + vec2(0.5, 1.5)) * tsize);
  vec4 d = texture(sam, (iuv + vec2(1.5, 1.5)) * tsize);
  return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}
void main() {
  vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
  fragColor = dissipation * bilerp(uSource, coord, dyeTexelSize);
  fragColor.a = 1.0;
}`

const DIVERGENCE_FRAG = /* glsl */ `#version 300 es
precision mediump float;
precision mediump sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 fragColor;
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) { L = -C.x; }
  if (vR.x > 1.0) { R = -C.x; }
  if (vT.y > 1.0) { T = -C.y; }
  if (vB.y < 0.0) { B = -C.y; }
  float div = 0.5 * (R - L + T - B);
  fragColor = vec4(div, 0.0, 0.0, 1.0);
}`

const CURL_FRAG = /* glsl */ `#version 300 es
precision mediump float;
precision mediump sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 fragColor;
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  float vorticity = R - L - T + B;
  fragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}`

const VORTICITY_FRAG = /* glsl */ `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 fragColor;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
void main() {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 vel = texture(uVelocity, vUv).xy;
  fragColor = vec4(vel + force * dt, 0.0, 1.0);
}`

const PRESSURE_FRAG = /* glsl */ `#version 300 es
precision mediump float;
precision mediump sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 fragColor;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float divergence = texture(uDivergence, vUv).x;
  float pressure = (L + R + B + T - divergence) * 0.25;
  fragColor = vec4(pressure, 0.0, 0.0, 1.0);
}`

const GRADIENT_SUBTRACT_FRAG = /* glsl */ `#version 300 es
precision mediump float;
precision mediump sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 fragColor;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B);
  fragColor = vec4(velocity, 0.0, 1.0);
}`

const DISPLAY_FRAG = /* glsl */ `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p * 2.02;
    a *= 0.5;
  }
  return v;
}

float softEllipse(vec2 uv, vec2 c, vec2 r) {
  vec2 d = (uv - c) / r;
  return exp(-dot(d, d));
}

vec3 baseAtmosphere(vec2 uv, float t) {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  vec2 warp = vec2(
    fbm(p * 1.2 + vec2(t * 0.08, 0.3)),
    fbm(p * 1.2 + vec2(1.7, t * 0.06))
  );
  vec2 wp = p + (warp - 0.5) * 0.16;

  float lightA = softEllipse(wp, vec2(-0.38, 0.36), vec2(0.90, 0.72));
  float lightB = softEllipse(wp, vec2(0.00, 0.10),  vec2(1.00, 0.75));
  float lightC = softEllipse(wp, vec2(0.48, 0.20),  vec2(0.60, 0.50));
  float core   = softEllipse(wp, vec2(-0.32, 0.42), vec2(0.30, 0.26));

  float rightDark = smoothstep(-0.15, 1.05, wp.x);
  float topBias   = smoothstep(-0.55, 0.45, wp.y);

  float glow = lightA * 0.88 + lightB * 0.48 + lightC * 0.16 + core * 0.32;
  glow *= mix(0.42, 1.0, topBias);
  glow *= mix(1.0, 0.38, rightDark * 0.9);
  glow *= mix(0.90, 1.06, fbm(wp * 1.8 + t * 0.04));
  glow = clamp(glow, 0.0, 1.0);

  vec3 c0 = vec3(0.008, 0.000, 0.012);
  vec3 c1 = vec3(0.10,  0.01,  0.07);
  vec3 c2 = vec3(0.28,  0.02,  0.18);
  vec3 c3 = vec3(0.48,  0.05,  0.28);
  vec3 c4 = vec3(0.70,  0.10,  0.38);
  vec3 c5 = vec3(0.88,  0.28,  0.52);

  vec3 col = c0;
  col = mix(col, c1, smoothstep(0.00, 0.12, glow));
  col = mix(col, c2, smoothstep(0.08, 0.30, glow));
  col = mix(col, c3, smoothstep(0.25, 0.52, glow));
  col = mix(col, c4, smoothstep(0.45, 0.75, glow));
  col = mix(col, c5, smoothstep(0.68, 1.00, glow));
  col += vec3(0.14, 0.03, 0.08) * core * 0.45;

  float bottom = pow(smoothstep(0.0, 0.44, uv.y), 1.08);
  col = mix(c0, col, bottom);

  float vigX = smoothstep(0.0, 0.14, uv.x) * smoothstep(0.0, 0.14, 1.0 - uv.x);
  col *= 0.75 + 0.25 * vigX;

  vec2 sp = uv * vec2(aspect, 1.0) * 50.0;
  vec2 si = floor(sp);
  float star = step(0.9968, hash21(si));
  star *= smoothstep(0.065, 0.0, length(fract(sp) - 0.5));
  float starMask = smoothstep(0.03, 0.16, glow) * smoothstep(0.50, 0.18, glow);
  float tw = 0.55 + 0.45 * sin(t * 2.0 + hash21(si) * 6.28);
  col += vec3(1.0, 0.9, 0.95) * star * starMask * tw * 0.65;

  return col;
}

void main() {
  vec3 base = baseAtmosphere(vUv, uTime);
  vec3 dye = texture(uTexture, vUv).rgb;
  float lum = max(dye.r, max(dye.g, dye.b));
  // Hot white-pink crescent trails (matches reference mouse fluid)
  vec3 hot = mix(dye * vec3(1.2, 0.5, 0.85), vec3(1.0, 0.96, 0.98), smoothstep(0.4, 1.4, lum));
  vec3 color = base + hot * 1.2;
  color = mix(color, hot * 0.85 + base * 0.3, smoothstep(0.55, 1.8, lum) * 0.5);
  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`

// ─────────────────────────────────────────────────────────────

type GL = WebGL2RenderingContext

type FBO = {
  texture: WebGLTexture
  fbo: WebGLFramebuffer
  width: number
  height: number
  texelSizeX: number
  texelSizeY: number
  attach: (id: number) => number
}

type DoubleFBO = {
  width: number
  height: number
  texelSizeX: number
  texelSizeY: number
  read: FBO
  write: FBO
  swap: () => void
}

type Program = {
  program: WebGLProgram
  uniforms: Record<string, WebGLUniformLocation | null>
  bind: () => void
}

const CONFIG = {
  simResolution: 128,
  dyeResolution: 512,
  densityDissipation: 0.972,
  velocityDissipation: 0.98,
  pressure: 0.8,
  pressureIterations: 18,
  curl: 28,
  splatRadius: 0.015,
  splatForce: 6500,
}

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    }) as GL | null
    if (!gl) return

    gl.getExtension("EXT_color_buffer_float")
    gl.getExtension("OES_texture_float_linear")
    gl.clearColor(0, 0, 0, 1)

    function compileShader(type: number, source: string) {
      const shader = gl!.createShader(type)!
      gl!.shaderSource(shader, source)
      gl!.compileShader(shader)
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("Shader error:", gl!.getShaderInfoLog(shader))
      }
      return shader
    }

    function createProgram(vs: string, fs: string): Program {
      const program = gl!.createProgram()!
      gl!.attachShader(program, compileShader(gl!.VERTEX_SHADER, vs))
      gl!.attachShader(program, compileShader(gl!.FRAGMENT_SHADER, fs))
      gl!.linkProgram(program)
      if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
        console.error("Link error:", gl!.getProgramInfoLog(program))
      }
      const uniforms: Record<string, WebGLUniformLocation | null> = {}
      const n = gl!.getProgramParameter(program, gl!.ACTIVE_UNIFORMS) as number
      for (let i = 0; i < n; i++) {
        const info = gl!.getActiveUniform(program, i)
        if (info) uniforms[info.name] = gl!.getUniformLocation(program, info.name)
      }
      return {
        program,
        uniforms,
        bind() {
          gl!.useProgram(program)
        },
      }
    }

    const buffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      gl.STATIC_DRAW
    )
    const vao = gl.createVertexArray()!
    gl.bindVertexArray(vao)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    function blit(target: FBO | null, clear = false) {
      if (target == null) {
        gl!.viewport(0, 0, gl!.drawingBufferWidth, gl!.drawingBufferHeight)
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null)
      } else {
        gl!.viewport(0, 0, target.width, target.height)
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, target.fbo)
      }
      if (clear) {
        gl!.clearColor(0, 0, 0, 1)
        gl!.clear(gl!.COLOR_BUFFER_BIT)
      }
      gl!.bindVertexArray(vao)
      gl!.drawArrays(gl!.TRIANGLE_FAN, 0, 4)
    }

    function createFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      filter: number
    ): FBO {
      gl!.activeTexture(gl!.TEXTURE0)
      const texture = gl!.createTexture()!
      gl!.bindTexture(gl!.TEXTURE_2D, texture)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, filter)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, filter)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE)
      gl!.texImage2D(gl!.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null)

      const fbo = gl!.createFramebuffer()!
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo)
      gl!.framebufferTexture2D(
        gl!.FRAMEBUFFER,
        gl!.COLOR_ATTACHMENT0,
        gl!.TEXTURE_2D,
        texture,
        0
      )
      gl!.viewport(0, 0, w, h)
      gl!.clear(gl!.COLOR_BUFFER_BIT)

      const tex = texture
      return {
        texture: tex,
        fbo,
        width: w,
        height: h,
        texelSizeX: 1 / w,
        texelSizeY: 1 / h,
        attach(id: number) {
          gl!.activeTexture(gl!.TEXTURE0 + id)
          gl!.bindTexture(gl!.TEXTURE_2D, tex)
          return id
        },
      }
    }

    function createDoubleFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      filter: number
    ): DoubleFBO {
      let fbo1 = createFBO(w, h, internalFormat, format, type, filter)
      let fbo2 = createFBO(w, h, internalFormat, format, type, filter)
      return {
        width: w,
        height: h,
        texelSizeX: 1 / w,
        texelSizeY: 1 / h,
        get read() {
          return fbo1
        },
        set read(v: FBO) {
          fbo1 = v
        },
        get write() {
          return fbo2
        },
        set write(v: FBO) {
          fbo2 = v
        },
        swap() {
          const tmp = fbo1
          fbo1 = fbo2
          fbo2 = tmp
        },
      }
    }

    function supportRenderTextureFormat(
      internalFormat: number,
      format: number,
      type: number
    ) {
      const texture = gl!.createTexture()!
      gl!.bindTexture(gl!.TEXTURE_2D, texture)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.NEAREST)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.NEAREST)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE)
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE)
      gl!.texImage2D(gl!.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null)
      const fbo = gl!.createFramebuffer()!
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo)
      gl!.framebufferTexture2D(
        gl!.FRAMEBUFFER,
        gl!.COLOR_ATTACHMENT0,
        gl!.TEXTURE_2D,
        texture,
        0
      )
      const status = gl!.checkFramebufferStatus(gl!.FRAMEBUFFER)
      gl!.deleteTexture(texture)
      gl!.deleteFramebuffer(fbo)
      return status === gl!.FRAMEBUFFER_COMPLETE
    }

    let rgba = { internalFormat: gl.RGBA16F, format: gl.RGBA }
    let rg = { internalFormat: gl.RG16F, format: gl.RG }
    let r = { internalFormat: gl.R16F, format: gl.RED }
    let texType: number = gl.HALF_FLOAT

    if (!supportRenderTextureFormat(rgba.internalFormat, rgba.format, texType)) {
      rgba = { internalFormat: gl.RGBA, format: gl.RGBA } as typeof rgba
      rg = { internalFormat: gl.RGBA, format: gl.RGBA } as typeof rg
      r = { internalFormat: gl.RGBA, format: gl.RGBA } as typeof r
      texType = gl.UNSIGNED_BYTE
    }

    const clearProgram = createProgram(BASE_VERT, CLEAR_FRAG)
    const splatProgram = createProgram(BASE_VERT, SPLAT_FRAG)
    const advectionProgram = createProgram(BASE_VERT, ADVECT_FRAG)
    const divergenceProgram = createProgram(BASE_VERT, DIVERGENCE_FRAG)
    const curlProgram = createProgram(BASE_VERT, CURL_FRAG)
    const vorticityProgram = createProgram(BASE_VERT, VORTICITY_FRAG)
    const pressureProgram = createProgram(BASE_VERT, PRESSURE_FRAG)
    const gradSubtractProgram = createProgram(BASE_VERT, GRADIENT_SUBTRACT_FRAG)
    const displayProgram = createProgram(BASE_VERT, DISPLAY_FRAG)

    let dye!: DoubleFBO
    let velocity!: DoubleFBO
    let divergence!: FBO
    let curl!: FBO
    let pressure!: DoubleFBO

    function getResolution(resolution: number) {
      let aspectRatio = gl!.drawingBufferWidth / Math.max(gl!.drawingBufferHeight, 1)
      if (aspectRatio < 1) aspectRatio = 1 / aspectRatio
      const min = Math.round(resolution)
      const max = Math.round(resolution * aspectRatio)
      if (gl!.drawingBufferWidth > gl!.drawingBufferHeight) {
        return { width: max, height: min }
      }
      return { width: min, height: max }
    }

    function initFramebuffers() {
      const simRes = getResolution(CONFIG.simResolution)
      const dyeRes = getResolution(CONFIG.dyeResolution)
      const filtering =
        texType === gl!.HALF_FLOAT || texType === gl!.FLOAT ? gl!.LINEAR : gl!.NEAREST

      dye = createDoubleFBO(
        dyeRes.width,
        dyeRes.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering
      )
      velocity = createDoubleFBO(
        simRes.width,
        simRes.height,
        rg.internalFormat,
        rg.format,
        texType,
        filtering
      )
      divergence = createFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl!.NEAREST
      )
      curl = createFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl!.NEAREST
      )
      pressure = createDoubleFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl!.NEAREST
      )
    }

    function step(dt: number) {
      gl!.disable(gl!.BLEND)

      curlProgram.bind()
      gl!.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl!.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0))
      blit(curl)

      vorticityProgram.bind()
      gl!.uniform2f(
        vorticityProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      )
      gl!.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0))
      gl!.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1))
      gl!.uniform1f(vorticityProgram.uniforms.curl, CONFIG.curl)
      gl!.uniform1f(vorticityProgram.uniforms.dt, dt)
      blit(velocity.write)
      velocity.swap()

      divergenceProgram.bind()
      gl!.uniform2f(
        divergenceProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      )
      gl!.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0))
      blit(divergence)

      clearProgram.bind()
      gl!.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0))
      gl!.uniform1f(clearProgram.uniforms.value, CONFIG.pressure)
      blit(pressure.write)
      pressure.swap()

      pressureProgram.bind()
      gl!.uniform2f(
        pressureProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      )
      gl!.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0))
      for (let i = 0; i < CONFIG.pressureIterations; i++) {
        gl!.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1))
        blit(pressure.write)
        pressure.swap()
      }

      gradSubtractProgram.bind()
      gl!.uniform2f(
        gradSubtractProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      )
      gl!.uniform1i(gradSubtractProgram.uniforms.uPressure, pressure.read.attach(0))
      gl!.uniform1i(gradSubtractProgram.uniforms.uVelocity, velocity.read.attach(1))
      blit(velocity.write)
      velocity.swap()

      advectionProgram.bind()
      gl!.uniform2f(
        advectionProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      )
      gl!.uniform2f(
        advectionProgram.uniforms.dyeTexelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      )
      const velocityId = velocity.read.attach(0)
      gl!.uniform1i(advectionProgram.uniforms.uVelocity, velocityId)
      gl!.uniform1i(advectionProgram.uniforms.uSource, velocityId)
      gl!.uniform1f(advectionProgram.uniforms.dt, dt)
      gl!.uniform1f(advectionProgram.uniforms.dissipation, CONFIG.velocityDissipation)
      blit(velocity.write)
      velocity.swap()

      gl!.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY)
      gl!.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0))
      gl!.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1))
      gl!.uniform1f(advectionProgram.uniforms.dissipation, CONFIG.densityDissipation)
      blit(dye.write)
      dye.swap()
    }

    function correctRadius(radius: number) {
      const aspectRatio = canvas!.width / Math.max(canvas!.height, 1)
      if (aspectRatio > 1) return radius * aspectRatio
      return radius
    }

    function splat(
      x: number,
      y: number,
      dx: number,
      dy: number,
      color: [number, number, number]
    ) {
      splatProgram.bind()
      gl!.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0))
      gl!.uniform1f(splatProgram.uniforms.aspectRatio, canvas!.width / Math.max(canvas!.height, 1))
      gl!.uniform2f(splatProgram.uniforms.point, x, y)
      gl!.uniform3f(splatProgram.uniforms.color, dx, dy, 0)
      gl!.uniform1f(splatProgram.uniforms.radius, correctRadius(CONFIG.splatRadius / 100))
      blit(velocity.write)
      velocity.swap()

      gl!.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0))
      gl!.uniform3f(splatProgram.uniforms.color, color[0], color[1], color[2])
      blit(dye.write)
      dye.swap()
    }

    function render() {
      const t = (performance.now() - startTime) / 1000
      displayProgram.bind()
      gl!.uniform1i(displayProgram.uniforms.uTexture, dye.read.attach(0))
      gl!.uniform1f(displayProgram.uniforms.uTime, t)
      gl!.uniform2f(
        displayProgram.uniforms.uResolution,
        gl!.drawingBufferWidth,
        gl!.drawingBufferHeight
      )
      blit(null)
    }

    // ── pointer (window-level so UI doesn't block fluid) ─────
    type Ptr = {
      texcoordX: number
      texcoordY: number
      prevTexcoordX: number
      prevTexcoordY: number
      deltaX: number
      deltaY: number
      moved: boolean
      color: [number, number, number]
      active: boolean
    }

    const ptr: Ptr = {
      texcoordX: 0,
      texcoordY: 0,
      prevTexcoordX: 0,
      prevTexcoordY: 0,
      deltaX: 0,
      deltaY: 0,
      moved: false,
      color: [8, 2, 4.5],
      active: false,
    }

    function hotColor(): [number, number, number] {
      // High intensity so display shader blooms to white-pink crescent
      const mixT = Math.random()
      return [
        (0.9 + mixT * 0.2) * 10.0,
        (0.2 + mixT * 0.35) * 10.0,
        (0.45 + mixT * 0.3) * 10.0,
      ]
    }

    function correctDeltaX(delta: number) {
      const aspectRatio = canvas!.width / Math.max(canvas!.height, 1)
      if (aspectRatio < 1) return delta * aspectRatio
      return delta
    }
    function correctDeltaY(delta: number) {
      const aspectRatio = canvas!.width / Math.max(canvas!.height, 1)
      if (aspectRatio > 1) return delta / aspectRatio
      return delta
    }

    function scaleByPixelRatio(input: number) {
      return Math.floor(input * Math.min(window.devicePixelRatio || 1, 2))
    }

    function onPointerMove(e: PointerEvent | MouseEvent) {
      const rect = container!.getBoundingClientRect()
      // Only react when pointer is over the hero area
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        ptr.active = false
        return
      }

      const posX = scaleByPixelRatio(e.clientX - rect.left)
      const posY = scaleByPixelRatio(e.clientY - rect.top)
      const x = posX / Math.max(canvas!.width, 1)
      const y = 1.0 - posY / Math.max(canvas!.height, 1)

      if (!ptr.active) {
        ptr.active = true
        ptr.texcoordX = x
        ptr.texcoordY = y
        ptr.prevTexcoordX = x
        ptr.prevTexcoordY = y
        ptr.color = hotColor()
        ptr.deltaX = 0
        ptr.deltaY = 0
        ptr.moved = false
        return
      }

      ptr.prevTexcoordX = ptr.texcoordX
      ptr.prevTexcoordY = ptr.texcoordY
      ptr.texcoordX = x
      ptr.texcoordY = y
      ptr.deltaX = correctDeltaX(ptr.texcoordX - ptr.prevTexcoordX)
      ptr.deltaY = correctDeltaY(ptr.texcoordY - ptr.prevTexcoordY)
      ptr.moved = Math.abs(ptr.deltaX) > 0 || Math.abs(ptr.deltaY) > 0
      // Refresh color occasionally so trails vary
      if (Math.random() < 0.04) ptr.color = hotColor()
    }

    function onPointerLeave() {
      ptr.active = false
      ptr.moved = false
    }

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.floor(container!.clientWidth * dpr)
      const h = Math.floor(container!.clientHeight * dpr)
      if (w < 2 || h < 2) return false
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w
        canvas!.height = h
        canvas!.style.width = container!.clientWidth + "px"
        canvas!.style.height = container!.clientHeight + "px"
        initFramebuffers()
        return true
      }
      return false
    }

    function multipleSplats(amount: number) {
      for (let i = 0; i < amount; i++) {
        const color = hotColor()
        // Bias ambient splats toward upper-left like the light source
        const x = Math.random() * 0.55 + 0.05
        const y = Math.random() * 0.55 + 0.3
        const dx = 800 * (Math.random() - 0.5)
        const dy = 800 * (Math.random() - 0.5)
        splat(x, y, dx, dy, color)
      }
    }

    const startTime = performance.now()
    let lastTime = startTime
    let lastAmbient = 0
    let animId = 0

    resizeCanvas()
    initFramebuffers()
    multipleSplats(4)

    function applyInputs() {
      if (ptr.moved) {
        ptr.moved = false
        splat(
          ptr.texcoordX,
          ptr.texcoordY,
          ptr.deltaX * CONFIG.splatForce,
          ptr.deltaY * CONFIG.splatForce,
          ptr.color
        )
      }
    }

    function frame() {
      const now = performance.now()
      let dt = Math.min((now - lastTime) / 1000, 0.016666)
      lastTime = now

      resizeCanvas()
      applyInputs()

      if (now - lastAmbient > 4000) {
        lastAmbient = now
        multipleSplats(1)
      }

      step(dt)
      render()
      animId = requestAnimationFrame(frame)
    }

    // Window-level so nav/buttons don't block the fluid interaction
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave)
    window.addEventListener("blur", onPointerLeave)
    window.addEventListener("resize", resizeCanvas)

    animId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
      window.removeEventListener("blur", onPointerLeave)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full" aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
