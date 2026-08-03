"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ElevatorCabin() {
  const cabin = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!cabin.current) return;
    cabin.current.position.y = Math.sin(clock.elapsedTime * 0.45) * 1.4;
  });

  return (
    <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.15}>
      <group ref={cabin} position={[0, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.4, 1.8, 1.4]} />
          <meshStandardMaterial
            color="#1a2332"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0, 0, 0.71]}>
          <planeGeometry args={[1.05, 1.35]} />
          <meshPhysicalMaterial
            color="#4aa8ff"
            transparent
            opacity={0.35}
            metalness={0.2}
            roughness={0.1}
            transmission={0.4}
          />
        </mesh>
        <mesh position={[0, -0.95, 0]}>
          <boxGeometry args={[1.5, 0.08, 1.5]} />
          <meshStandardMaterial color="#c5ced8" metalness={0.9} roughness={0.2} />
        </mesh>
        <pointLight position={[0, 0.4, 0]} intensity={1.2} color="#4aa8ff" distance={4} />
      </group>
    </Float>
  );
}

function Shaft() {
  const rails = useMemo(
    () =>
      [-0.95, 0.95].map((x) => (
        <mesh key={x} position={[x, 0, -0.2]}>
          <boxGeometry args={[0.06, 8, 0.06]} />
          <meshStandardMaterial color="#8b9aab" metalness={1} roughness={0.2} />
        </mesh>
      )),
    []
  );

  return (
    <group>
      {rails}
      {[-3, -1.5, 0, 1.5, 3].map((y) => (
        <mesh key={y} position={[0, y, -0.85]}>
          <boxGeometry args={[2.8, 0.04, 0.3]} />
          <meshStandardMaterial color="#12243a" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      <mesh position={[0, 0, -1.2]}>
        <planeGeometry args={[4, 9]} />
        <meshStandardMaterial color="#06101c" metalness={0.3} roughness={0.8} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#1b8fff" />
      <Shaft />
      <ElevatorCabin />
      <Environment preset="city" />
      <fog attach="fog" args={["#06101c", 6, 16]} />
    </>
  );
}

export function ElevatorCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [2.8, 0.4, 5.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        className="!absolute inset-0"
      >
        <Scene />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/40" />
    </div>
  );
}
