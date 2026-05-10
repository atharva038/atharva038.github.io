import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { useTheme, type Theme } from "@/components/theme-context";

interface LiquidWipeOverlayProps {
  transitionId: string | null;
  onCovered: () => void;
  onComplete: () => void;
  onError: () => void;
}

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uDeepColor;
  uniform vec3 uMidColor;
  uniform vec3 uRimColor;
  uniform vec3 uAccentColor;
  uniform float uAlpha;
  uniform float uRimStrength;
  uniform float uNoiseStrength;
  uniform float uShimmerStrength;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.03;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 p = (uv - 0.5) * aspect;

    float dist = length(p);
    float angle = atan(p.y, p.x);
    float organic = fbm(vec2(angle * 1.8 + uTime * 0.16, dist * 5.5 - uTime * 0.26));
    float fine = fbm(uv * 18.0 + vec2(uTime * 0.09, -uTime * 0.13));
    float edgeNoise = ((organic - 0.5) * 0.16 + (fine - 0.5) * 0.035) * uNoiseStrength;

    float radius = mix(-0.08, 1.1, uProgress);
    float edge = radius + edgeNoise;
    float mask = smoothstep(edge + 0.055, edge - 0.055, dist);

    float rim = smoothstep(edge + 0.045, edge, dist) * smoothstep(edge - 0.09, edge - 0.015, dist);
    float innerRipple = sin((dist - radius) * 42.0 - uTime * 5.8) * 0.5 + 0.5;
    float shimmer = fbm(uv * 9.0 + vec2(uTime * 0.12, uTime * 0.08));

    vec3 color = mix(uDeepColor, uMidColor, shimmer * 0.55 + uv.y * 0.25);
    color += uRimColor * rim * (0.22 + innerRipple * 0.18) * uRimStrength;
    color += uAccentColor * rim * 0.14 * uShimmerStrength;
    color += uAccentColor * pow(shimmer, 4.0) * 0.04 * uShimmerStrength;
    color += vec3(1.0) * pow(rim, 2.0) * 0.08;

    float alpha = mask * uAlpha;
    alpha += rim * 0.18;
    alpha = clamp(alpha, 0.0, uAlpha);

    gl_FragColor = vec4(color, alpha);
  }
`;

const THEME_WIPE_PALETTES: Record<Theme, {
  deep: string;
  mid: string;
  rim: string;
  accent: string;
  alpha: number;
  rimStrength: number;
  noiseStrength: number;
  shimmerStrength: number;
}> = {
  light: {
    deep: "#f8f6f2",
    mid: "#d8d0c1",
    rim: "#c5a059",
    accent: "#0a0a0a",
    alpha: 0.965,
    rimStrength: 0.72,
    noiseStrength: 0.78,
    shimmerStrength: 0.55,
  },
  dark: {
    deep: "#050505",
    mid: "#17191c",
    rim: "#f4f4f5",
    accent: "#38c7f0",
    alpha: 0.988,
    rimStrength: 0.58,
    noiseStrength: 1.0,
    shimmerStrength: 0.82,
  },
  blkdev: {
    deep: "#0d0d0d",
    mid: "#1a1a1a",
    rim: "#f5d000",
    accent: "#59f59a",
    alpha: 0.992,
    rimStrength: 0.92,
    noiseStrength: 1.22,
    shimmerStrength: 0.7,
  },
};

function getWebGLContext(canvas: HTMLCanvasElement) {
  const contextOptions: WebGLContextAttributes = {
    alpha: true,
    antialias: false,
    premultipliedAlpha: true,
    powerPreference: "high-performance",
  };

  return (
    canvas.getContext("webgl2", contextOptions) ||
    canvas.getContext("webgl", contextOptions) ||
    canvas.getContext("experimental-webgl", contextOptions)
  );
}

export default function LiquidWipeOverlay({
  transitionId,
  onCovered,
  onComplete,
  onError,
}: LiquidWipeOverlayProps) {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const frameRef = useRef(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const activeRef = useRef(false);
  const themeRef = useRef(theme);
  const onCoveredRef = useRef(onCovered);
  const onCompleteRef = useRef(onComplete);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onCoveredRef.current = onCovered;
    onCompleteRef.current = onComplete;
    onErrorRef.current = onError;
  }, [onCovered, onComplete, onError]);

  useEffect(() => {
    themeRef.current = theme;
    const material = materialRef.current;
    if (!material) return;

    const palette = THEME_WIPE_PALETTES[theme];
    material.uniforms.uDeepColor.value.set(palette.deep);
    material.uniforms.uMidColor.value.set(palette.mid);
    material.uniforms.uRimColor.value.set(palette.rim);
    material.uniforms.uAccentColor.value.set(palette.accent);
    material.uniforms.uAlpha.value = palette.alpha;
    material.uniforms.uRimStrength.value = palette.rimStrength;
    material.uniforms.uNoiseStrength.value = palette.noiseStrength;
    material.uniforms.uShimmerStrength.value = palette.shimmerStrength;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = getWebGLContext(canvas);
    if (!context) return undefined;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      context: context as WebGLRenderingContext,
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const palette = THEME_WIPE_PALETTES[themeRef.current];
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uDeepColor: { value: new THREE.Color(palette.deep) },
        uMidColor: { value: new THREE.Color(palette.mid) },
        uRimColor: { value: new THREE.Color(palette.rim) },
        uAccentColor: { value: new THREE.Color(palette.accent) },
        uAlpha: { value: palette.alpha },
        uRimStrength: { value: palette.rimStrength },
        uNoiseStrength: { value: palette.noiseStrength },
        uShimmerStrength: { value: palette.shimmerStrength },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    const handleResize = () => {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      if (activeRef.current) renderer.render(scene, camera);
    };

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      timelineRef.current?.kill();
      activeRef.current = false;
      onErrorRef.current();
    };

    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    materialRef.current = material;

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("webglcontextlost", handleContextLost, false);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      timelineRef.current?.kill();
      material.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!transitionId) return undefined;

    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const material = materialRef.current;

    if (!renderer || !scene || !camera || !material) {
      onErrorRef.current();
      return undefined;
    }

    let covered = false;
    activeRef.current = true;
    material.uniforms.uProgress.value = 0;
    material.uniforms.uTime.value = 0;
    renderer.render(scene, camera);

    const render = () => {
      if (!activeRef.current) return;
      material.uniforms.uTime.value += 0.016;
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(render);
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(render);

    timelineRef.current?.kill();
    timelineRef.current = gsap
      .timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          activeRef.current = false;
          if (frameRef.current) cancelAnimationFrame(frameRef.current);
          material.uniforms.uProgress.value = 0;
          renderer.clear();
          onCompleteRef.current();
        },
      })
      .to(material.uniforms.uProgress, {
        value: 1,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          if (covered) return;
          covered = true;
          onCoveredRef.current();
        },
      })
      .to({}, { duration: 0.08 })
      .to(material.uniforms.uProgress, {
        value: 0,
        duration: 0.62,
        ease: "power3.inOut",
      });

    return () => {
      timelineRef.current?.kill();
    };
  }, [transitionId]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-liquid-theme={theme}
      className="fixed inset-0 h-screen w-screen"
      style={{
        zIndex: 9999,
        pointerEvents: "none",
        visibility: transitionId ? "visible" : "hidden",
      }}
    />
  );
}
