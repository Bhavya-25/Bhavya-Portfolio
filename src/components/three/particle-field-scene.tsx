"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COLUMNS = 46;
const ROWS = 26;
const SPACING = 0.22;

function ParticleGrid() {
  const points = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const pointer = useRef({ x: 9999, y: 9999 });

  const { geometry, basePositions } = useMemo(() => {
    const count = COLUMNS * ROWS;
    const positions = new Float32Array(count * 3);
    let i = 0;
    for (let x = 0; x < COLUMNS; x++) {
      for (let y = 0; y < ROWS; y++) {
        positions[i * 3] = (x - COLUMNS / 2) * SPACING;
        positions[i * 3 + 1] = (y - ROWS / 2) * SPACING;
        positions[i * 3 + 2] = 0;
        i++;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: geo, basePositions: positions.slice() };
  }, []);

  useFrame((state) => {
    if (!points.current) return;

    pointer.current.x = (state.pointer.x * viewport.width) / 2;
    pointer.current.y = (state.pointer.y * viewport.height) / 2;

    const positionAttr = points.current.geometry.attributes.position;
    const array = positionAttr.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < array.length / 3; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];

      const dx = bx - pointer.current.x;
      const dy = by - pointer.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const ripple = Math.sin(dist * 3 - t * 1.5) * 0.05 * Math.exp(-dist * 0.9);
      const repel = Math.max(0, 1 - dist / 1.1) * 0.35;

      array[i * 3] = bx + (dx / (dist || 1)) * repel;
      array[i * 3 + 1] = by + (dy / (dist || 1)) * repel;
      array[i * 3 + 2] = ripple + repel * 0.4;
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial color="#ff7a42" size={0.028} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

export function ParticleFieldScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      className="!absolute inset-0"
    >
      <ParticleGrid />
    </Canvas>
  );
}

export default ParticleFieldScene;
