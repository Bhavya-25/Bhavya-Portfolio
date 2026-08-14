"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TechGlobeSceneProps {
  accentHex: string;
  reducedMotion: boolean;
}

interface RingConfig {
  radius: number;
  tiltX: number;
  tiltZ: number;
  speed: number;
}

const RINGS: RingConfig[] = [
  { radius: 1.7, tiltX: 0.12, tiltZ: 0.04, speed: 0.16 },
  { radius: 2.15, tiltX: -0.28, tiltZ: 0.32, speed: -0.11 },
  { radius: 2.6, tiltX: 0.4, tiltZ: -0.22, speed: 0.08 },
];

const MARKERS = [
  { ring: 0, phase: 0, speedMul: 1 },
  { ring: 0, phase: Math.PI, speedMul: 1.2 },
  { ring: 1, phase: 0.8, speedMul: 0.9 },
  { ring: 1, phase: 3.6, speedMul: 1.1 },
  { ring: 2, phase: 1.8, speedMul: 1 },
];

function ringPoints(radius: number): THREE.Vector3[] {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
  return curve.getPoints(96).map((p) => new THREE.Vector3(p.x, 0, p.y));
}

function Ring({
  config,
  color,
  reducedMotion,
}: {
  config: RingConfig;
  color: string;
  reducedMotion: boolean;
}) {
  const pivot = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setFromPoints(ringPoints(config.radius));
    return geo;
  }, [config.radius]);

  useFrame((_, delta) => {
    if (reducedMotion || !pivot.current) return;
    pivot.current.rotation.y += delta * config.speed;
  });

  return (
    <group rotation={[config.tiltX, 0, config.tiltZ]}>
      <group ref={pivot}>
        <lineLoop geometry={geometry}>
          <lineBasicMaterial color={color} transparent opacity={0.3} />
        </lineLoop>
      </group>
    </group>
  );
}

function Marker({
  marker,
  color,
  reducedMotion,
}: {
  marker: (typeof MARKERS)[number];
  color: string;
  reducedMotion: boolean;
}) {
  const config = RINGS[marker.ring];
  const pivot = useRef<THREE.Group>(null);
  const angle = useRef(marker.phase);

  useFrame((_, delta) => {
    if (!pivot.current) return;
    if (!reducedMotion) {
      angle.current += delta * config.speed * marker.speedMul * 1.6;
    }
    pivot.current.rotation.y = angle.current;
  });

  return (
    <group rotation={[config.tiltX, 0, config.tiltZ]}>
      <group ref={pivot}>
        <mesh position={[config.radius, 0, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
}

function Core({ color, reducedMotion }: { color: string; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !group.current) return;
    group.current.rotation.y += delta * 0.12;
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.55}
          roughness={0.45}
          metalness={0.1}
        />
      </mesh>
      <mesh scale={1.18}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.22}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.42}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.09}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export function TechGlobeScene({ accentHex, reducedMotion }: TechGlobeSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 1.1, 6.2], fov: 42 }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 2, 4]} intensity={30} color="#fff3ea" />
      <Core color={accentHex} reducedMotion={reducedMotion} />
      {RINGS.map((ring, i) => (
        <Ring key={i} config={ring} color={accentHex} reducedMotion={reducedMotion} />
      ))}
      {MARKERS.map((marker, i) => (
        <Marker key={i} marker={marker} color={accentHex} reducedMotion={reducedMotion} />
      ))}
    </Canvas>
  );
}

export default TechGlobeScene;
