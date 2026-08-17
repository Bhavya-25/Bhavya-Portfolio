"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface AboutParticlePortraitSceneProps {
  reducedMotion: boolean;
}

const POINT_COUNT = 900;
const ASSEMBLE_SECONDS = 1.8;

/** True inside a rough head + shoulders bust silhouette, analytic — no
 * texture/image sampling needed, matches this repo's convention of
 * generating Three.js compositions procedurally (see hero-scene.tsx). */
function insideSilhouette(x: number, y: number): boolean {
  const headDx = x;
  const headDy = (y - 1.05) / 1.25;
  if ((headDx * headDx) / (0.42 * 0.42) + (headDy * headDy) / (0.5 * 0.5) <= 1) return true;

  if (y >= 0.42 && y <= 0.72 && Math.abs(x) <= 0.16) return true;

  if (y < 0.5) {
    const shoulderWidth = 0.55 + (0.5 - y) * 0.62;
    const shoulderTop = 0.5;
    const shoulderBottom = -0.95;
    if (y >= shoulderBottom && y <= shoulderTop && Math.abs(x) <= shoulderWidth) {
      // Rounded top edge so shoulders don't look like a flat slab.
      const edgeY = shoulderTop - 0.18;
      if (y > edgeY) {
        const t = (y - edgeY) / (shoulderTop - edgeY);
        return Math.abs(x) <= shoulderWidth * (0.4 + 0.6 * (1 - t));
      }
      return true;
    }
  }

  return false;
}

interface PointSet {
  targets: Float32Array;
  starts: Float32Array;
  delays: Float32Array;
}

function generatePoints(): PointSet {
  const targets = new Float32Array(POINT_COUNT * 3);
  const starts = new Float32Array(POINT_COUNT * 3);
  const delays = new Float32Array(POINT_COUNT);

  let i = 0;
  let guard = 0;
  while (i < POINT_COUNT && guard < POINT_COUNT * 200) {
    guard++;
    const x = (Math.random() - 0.5) * 1.8;
    const y = (Math.random() - 0.5) * 2.6 + 0.2;
    if (!insideSilhouette(x, y)) continue;

    const z = (Math.random() - 0.5) * 0.5;
    targets[i * 3] = x;
    targets[i * 3 + 1] = y;
    targets[i * 3 + 2] = z;

    // Scattered starting position — a loose sphere well outside the
    // silhouette bounds, so the assemble motion reads as "particles
    // arriving" rather than a subtle jiggle.
    const radius = 3.2 + Math.random() * 2.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    starts[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    starts[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    starts[i * 3 + 2] = radius * Math.cos(phi) * 0.6;

    delays[i] = Math.random() * 0.45;
    i++;
  }

  return { targets, starts, delays };
}

const POINTS = generatePoints();

function easeOutCubic(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - clamped, 3);
}

function ParticlePortrait({ reducedMotion }: { reducedMotion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const clock = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    // Start from the scattered positions — the assemble tween below writes
    // into this same array every frame until settled.
    geo.setAttribute("position", new THREE.BufferAttribute(POINTS.starts.slice(), 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = positionAttr.array as Float32Array;

    if (reducedMotion) {
      // Skip the assemble animation entirely — jump straight to the final
      // silhouette so there's no motion for reduced-motion visitors.
      array.set(POINTS.targets);
      positionAttr.needsUpdate = true;
      return;
    }

    clock.current += delta;
    let stillAnimating = false;

    for (let i = 0; i < POINT_COUNT; i++) {
      const localT = (clock.current - POINTS.delays[i]) / ASSEMBLE_SECONDS;
      const eased = easeOutCubic(localT);
      if (localT < 1) stillAnimating = true;

      const idx = i * 3;
      array[idx] = THREE.MathUtils.lerp(POINTS.starts[idx], POINTS.targets[idx], eased);
      array[idx + 1] = THREE.MathUtils.lerp(POINTS.starts[idx + 1], POINTS.targets[idx + 1], eased);
      array[idx + 2] = THREE.MathUtils.lerp(POINTS.starts[idx + 2], POINTS.targets[idx + 2], eased);
    }
    positionAttr.needsUpdate = true;

    if (points.current) {
      // Once settled, idle motion is a group-level pointer parallax offset
      // (cheap — one transform, not per-point), same technique as
      // hero-scene.tsx's NodeSystem, but a positional drift rather than a
      // rigid rotation so it reads as "reactive" rather than "spinning".
      pointer.current.x = THREE.MathUtils.lerp(
        pointer.current.x,
        (state.pointer.x * viewport.width) / 40,
        0.05
      );
      pointer.current.y = THREE.MathUtils.lerp(
        pointer.current.y,
        (state.pointer.y * viewport.height) / 40,
        0.05
      );
      points.current.position.x = pointer.current.x;
      points.current.position.y = pointer.current.y * 0.5;
      points.current.rotation.y = stillAnimating ? 0 : Math.sin(clock.current * 0.15) * 0.06;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#d94f1e"
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

export function AboutParticlePortraitScene({ reducedMotion }: AboutParticlePortraitSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 4.4], fov: 40 }}
      className="!absolute inset-0"
    >
      <ParticlePortrait reducedMotion={reducedMotion} />
    </Canvas>
  );
}

export default AboutParticlePortraitScene;
