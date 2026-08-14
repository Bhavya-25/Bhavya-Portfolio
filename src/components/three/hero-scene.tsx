"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface HeroSceneProps {
  reducedMotion: boolean;
}

const NODE_COUNT = 14;

// Generated once at module load — not during render — so the composition is
// stable across re-renders without tripping React's render-purity checks.
function generateNodePositions(): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const radius = 1.6 + Math.random() * 0.9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) * 0.7,
        radius * Math.cos(phi) * 0.6
      )
    );
  }
  return positions;
}

const NODE_POSITIONS = generateNodePositions();

/** A loose cluster of nodes and connecting edges — an abstract stand-in for a
 * system of interfaces and data, not decoration for its own sake. */
function NodeSystem({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const nodes = NODE_POSITIONS;

  const edges = useMemo(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    nodes.forEach((node, i) => {
      const next = nodes[(i + 1) % nodes.length];
      pairs.push([node, next]);
      if (i % 3 === 0) {
        const jump = nodes[(i + 5) % nodes.length];
        pairs.push([node, jump]);
      }
    });
    return pairs;
  }, [nodes]);

  const edgeGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const points = edges.flatMap(([a, b]) => [a, b]);
    geometry.setFromPoints(points);
    return geometry;
  }, [edges]);

  useFrame((state, delta) => {
    if (!group.current) return;

    if (!reducedMotion) {
      group.current.rotation.y += delta * 0.08;

      pointer.current.x = THREE.MathUtils.lerp(
        pointer.current.x,
        (state.pointer.x * viewport.width) / 24,
        0.04
      );
      pointer.current.y = THREE.MathUtils.lerp(
        pointer.current.y,
        (state.pointer.y * viewport.height) / 24,
        0.04
      );

      group.current.rotation.x = -pointer.current.y * 0.3;
      group.current.rotation.z = pointer.current.x * 0.15;
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial color="#d94f1e" transparent opacity={0.35} />
      </lineSegments>
      {nodes.map((position, i) => (
        <mesh key={i} position={position}>
          <icosahedronGeometry args={[i % 4 === 0 ? 0.09 : 0.055, 0]} />
          <meshStandardMaterial
            color={i % 4 === 0 ? "#d94f1e" : "#17140f"}
            roughness={0.35}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HeroScene({ reducedMotion }: HeroSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.65} />
      <pointLight position={[3, 2, 4]} intensity={40} color="#fff3ea" />
      <NodeSystem reducedMotion={reducedMotion} />
    </Canvas>
  );
}

export default HeroScene;
