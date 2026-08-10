"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Float, Text } from "@react-three/drei";
import { damp } from "maath/easing";
import * as THREE from "three";
import { HotspotOverlay, HOTSPOTS, type HotspotId } from "./HotspotOverlay";

type EngineeringSceneProps = {
  mouse: MutableRefObject<{ x: number; y: number }>;
  scrollProgress: number;
  isMobile: boolean;
  activeHotspot: HotspotId | null;
  onHotspotSelect: (id: HotspotId) => void;
};

function dimFor(active: HotspotId | null, zone: HotspotId) {
  if (!active) return 1;
  return active === zone ? 1 : 0.22;
}

/** Zone A — multi-story glass spine + elevator + escalator */
function BuildingCore({
  simplified,
  intensity,
}: {
  simplified: boolean;
  intensity: number;
}) {
  const cab = useRef<THREE.Group>(null);
  const escalator = useRef<THREE.Group>(null);
  const floors = useMemo(() => [-1.5, -0.5, 0.5, 1.5], []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (cab.current) {
      cab.current.position.y = Math.sin(t * 0.5) * 1.05;
    }
    if (escalator.current) {
      escalator.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          child.position.y = ((t * 0.35 + i * 0.18) % 1.4) - 0.7;
        }
      });
    }
  });

  return (
    <group>
      {/* Transparent shaft frame */}
      {[-0.95, 0.95].map((x) => (
        <mesh key={`f-${x}`} position={[x, 0, 0]}>
          <boxGeometry args={[0.07, 4.4, 1.35]} />
          <meshStandardMaterial
            color="#475569"
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.35 + intensity * 0.65}
          />
        </mesh>
      ))}
      <mesh position={[0, 0, -0.7]}>
        <boxGeometry args={[1.9, 4.4, 0.06]} />
        <meshPhysicalMaterial
          color="#0f172a"
          metalness={0.6}
          roughness={0.25}
          transparent
          opacity={0.55}
          transmission={simplified ? 0 : 0.25}
        />
      </mesh>

      {/* Floor plates + blueprint text */}
      {floors.map((y, i) => (
        <group key={y} position={[0, y, 0]}>
          <mesh>
            <boxGeometry args={[1.85, 0.05, 1.3]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.35} />
          </mesh>
          {/* Blueprint grid lines */}
          {!simplified &&
            [-0.5, 0, 0.5].map((gz) => (
              <mesh key={gz} position={[0, 0.04, gz]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1.6, 0.01]} />
                <meshBasicMaterial color="#38bdf8" transparent opacity={0.45 * intensity} />
              </mesh>
            ))}
          {!simplified && i === 2 && (
            <Billboard position={[1.15, 0.25, 0.2]}>
              <Text fontSize={0.07} color="#7dd3fc" anchorX="left" maxWidth={1.3}>
                LOAD BEARING: 98% OPTIMAL
              </Text>
            </Billboard>
          )}
          {!simplified && i === 1 && (
            <Billboard position={[1.15, 0.25, 0.2]}>
              <Text fontSize={0.065} color="#38bdf8" anchorX="left" maxWidth={1.3}>
                STRUCTURAL GRID: 4M × 4M
              </Text>
            </Billboard>
          )}
        </group>
      ))}

      {/* Rails */}
      {[-0.5, 0.5].map((x) => (
        <mesh key={x} position={[x, 0, 0.25]}>
          <boxGeometry args={[0.03, 4.1, 0.03]} />
          <meshStandardMaterial color="#e2e8f0" metalness={1} roughness={0.12} />
        </mesh>
      ))}

      {/* Elevator cab */}
      <group ref={cab} position={[0, 0, 0.1]}>
        <mesh>
          <boxGeometry args={[0.78, 1.05, 0.78]} />
          <meshStandardMaterial color="#1e293b" metalness={0.88} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.05, 0.4]}>
          <planeGeometry args={[0.55, 0.75]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            transparent
            opacity={0.4}
            roughness={0.1}
            metalness={0.25}
            transmission={simplified ? 0 : 0.4}
            emissive="#0284c7"
            emissiveIntensity={0.3 * intensity}
          />
        </mesh>
        <mesh position={[0, 0.42, 0.2]}>
          <boxGeometry args={[0.5, 0.12, 0.04]} />
          <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.3} />
        </mesh>
        {!simplified && (
          <Billboard position={[0, 0.42, 0.28]}>
            <Text fontSize={0.055} color="#7dd3fc" anchorX="center">
              LEVEL: 4 · OPERATIONAL
            </Text>
          </Billboard>
        )}
        <mesh position={[0, 0.48, 0.15]}>
          <boxGeometry args={[0.55, 0.03, 0.06]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={2.4 * intensity}
          />
        </mesh>
        {!simplified && (
          <pointLight position={[0, 0.15, 0.15]} color="#38bdf8" intensity={1.2 * intensity} distance={3} />
        )}
      </group>

      {/* Escalator (side) */}
      <group position={[1.25, -0.15, 0.15]} rotation={[0, 0, -0.55]}>
        <mesh>
          <boxGeometry args={[0.35, 2.2, 0.55]} />
          <meshStandardMaterial color="#334155" metalness={0.75} roughness={0.3} />
        </mesh>
        <group ref={escalator}>
          {Array.from({ length: simplified ? 4 : 7 }).map((_, i) => (
            <mesh key={i} position={[0, i * 0.18 - 0.6, 0.22]}>
              <boxGeometry args={[0.28, 0.05, 0.28]} />
              <meshStandardMaterial
                color="#94a3b8"
                metalness={0.85}
                roughness={0.2}
                emissive="#0284c7"
                emissiveIntensity={0.15 * intensity}
              />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

/** Zone B — orbiting smart systems ring + CCTV */
function SmartSystemsRing({
  simplified,
  intensity,
}: {
  simplified: boolean;
  intensity: number;
}) {
  const ring = useRef<THREE.Group>(null);
  const scan = useRef<THREE.Mesh>(null);
  const head = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ring.current) ring.current.rotation.y = t * 0.22;
    if (head.current) head.current.rotation.y = Math.sin(t * 0.8) * 0.5;
    if (scan.current) {
      const mat = scan.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (0.1 + Math.sin(t * 2.4) * 0.05) * intensity;
    }
  });

  const icons = useMemo(
    () =>
      [
        { label: "CLIMATE", color: "#38bdf8" },
        { label: "LIGHT", color: "#fbbf24" },
        { label: "FIRE", color: "#fb7185" },
        { label: "ACCESS", color: "#34d399" },
      ] as const,
    []
  );

  return (
    <group>
      <group ref={ring} rotation={[0.15, 0, 0.1]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.05, 0.015, 8, simplified ? 48 : 96]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#0284c7"
            emissiveIntensity={1.5 * intensity}
            transparent
            opacity={0.3 + 0.7 * intensity}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.3, 0.4, 0]}>
          <torusGeometry args={[2.35, 0.01, 8, simplified ? 40 : 80]} />
          <meshStandardMaterial
            color="#d97706"
            emissive="#d97706"
            emissiveIntensity={1.2 * intensity}
            transparent
            opacity={0.3 + 0.7 * intensity}
          />
        </mesh>

        {!simplified &&
          icons.map((icon, i) => {
            const a = (i / icons.length) * Math.PI * 2;
            return (
              <group key={icon.label} position={[Math.cos(a) * 2.05, 0.05, Math.sin(a) * 2.05]}>
                <mesh>
                  <boxGeometry args={[0.22, 0.22, 0.06]} />
                  <meshStandardMaterial
                    color="#0f172a"
                    emissive={icon.color}
                    emissiveIntensity={0.8 * intensity}
                    metalness={0.6}
                    roughness={0.3}
                  />
                </mesh>
                <Billboard position={[0, 0.22, 0]}>
                  <Text fontSize={0.06} color={icon.color} anchorX="center">
                    {icon.label}
                  </Text>
                </Billboard>
              </group>
            );
          })}
      </group>

      {/* CCTV cluster */}
      <group position={[1.45, 1.35, 0.55]}>
        <mesh position={[-0.4, 0, 0]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.85, 0.06, 0.06]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
        <group ref={head}>
          <mesh>
            <sphereGeometry args={[0.2, simplified ? 14 : 28, simplified ? 12 : 20]} />
            <meshStandardMaterial color="#0f172a" metalness={0.75} roughness={0.22} />
          </mesh>
          <mesh position={[0, 0, 0.2]}>
            <circleGeometry args={[0.045, 20]} />
            <meshStandardMaterial
              color="#d97706"
              emissive="#d97706"
              emissiveIntensity={2.8 * intensity}
            />
          </mesh>
          {!simplified && (
            <mesh ref={scan} position={[0, -0.3, 0.5]} rotation={[0.9, 0, 0]}>
              <coneGeometry args={[0.5, 1.0, 28, 1, true]} />
              <meshBasicMaterial
                color="#f59e0b"
                transparent
                opacity={0.14}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
          )}
          <pointLight
            position={[0, 0, 0.3]}
            color="#d97706"
            intensity={0.95 * intensity}
            distance={2.8}
          />
        </group>
        {/* Bullet cam */}
        <mesh position={[0.35, -0.35, 0.1]} rotation={[0.3, -0.4, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.28, 12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.25} />
        </mesh>
      </group>
    </group>
  );
}

/** Zone C — maintenance base + telemetry */
function MaintenanceBase({
  simplified,
  intensity,
}: {
  simplified: boolean;
  intensity: number;
}) {
  const gearA = useRef<THREE.Mesh>(null);
  const gearB = useRef<THREE.Mesh>(null);
  const pulse = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (gearA.current) gearA.current.rotation.z = t * 0.8;
    if (gearB.current) gearB.current.rotation.z = -t * 1.1;
    if (pulse.current) {
      const s = 1 + Math.sin(t * 2) * 0.12;
      pulse.current.scale.set(s, 1, s);
      const mat = pulse.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.25 + Math.sin(t * 2) * 0.15;
    }
  });

  return (
    <group position={[0, -2.15, 0]}>
      <mesh>
        <cylinderGeometry args={[1.05, 1.25, 0.28, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.28} />
      </mesh>

      <mesh ref={gearA} position={[-0.35, 0.22, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.05, 8, simplified ? 12 : 20]} />
        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.95}
          roughness={0.15}
          emissive="#0284c7"
          emissiveIntensity={0.35 * intensity}
        />
      </mesh>
      <mesh ref={gearB} position={[0.4, 0.22, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.04, 8, simplified ? 10 : 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.12} />
      </mesh>

      {/* Hydraulic pistons */}
      {[-0.7, 0.7].map((x) => (
        <mesh key={x} position={[x, 0.35, 0.45]}>
          <cylinderGeometry args={[0.05, 0.05, 0.55, 10]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Circuit pulse ring */}
      <mesh ref={pulse} position={[0, 0.16, 0]}>
        <torusGeometry args={[0.75, 0.02, 8, 48]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </mesh>

      {/* Diagnostic nodes */}
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.85, 0.2, Math.sin(a) * 0.85]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial
              color="#d97706"
              emissive="#d97706"
              emissiveIntensity={1.8 * intensity}
            />
          </mesh>
        );
      })}

      {!simplified && (
        <Float speed={1.1} floatIntensity={0.2}>
          <Billboard position={[-1.35, 0.85, 0.4]}>
            <Text fontSize={0.075} color="#7dd3fc" anchorX="left" maxWidth={1.6} lineHeight={1.35}>
              {`PREDICTIVE MAINT: 99.7% UPTIME\nSENSOR DIAG: OK\nLAST INSPECT: 2 HRS AGO`}
            </Text>
          </Billboard>
        </Float>
      )}
    </group>
  );
}

export function EngineeringScene({
  mouse,
  scrollProgress,
  isMobile,
  activeHotspot,
  onHotspotSelect,
}: EngineeringSceneProps) {
  const hub = useRef<THREE.Group>(null);
  const tilt = useRef(new THREE.Vector2(0, 0));

  const elevI = dimFor(activeHotspot, "elevator");
  const cctvI = dimFor(activeHotspot, "cctv");
  const maintI = dimFor(activeHotspot, "maintenance");

  useFrame((_, delta) => {
    if (!hub.current) return;

    // Continuous slow spin (slows when a zone is focused)
    const spinSpeed = activeHotspot ? 0.05 : 0.12;
    hub.current.rotation.y += delta * spinSpeed;

    // Cursor parallax with maath damping
    damp(tilt.current, "x", mouse.current.x * 0.28, 0.35, delta);
    damp(tilt.current, "y", mouse.current.y * 0.2, 0.35, delta);

    hub.current.rotation.x = -tilt.current.y + scrollProgress * 0.18;
    hub.current.rotation.z = tilt.current.x * 0.12;
    hub.current.position.y = -scrollProgress * 0.3;
  });

  return (
    <group ref={hub}>
      <ambientLight intensity={0.4} color="#0f172a" />
      <directionalLight position={[4, 7, 3]} intensity={1.3} color="#f8fafc" />
      <pointLight position={[-2.2, 2.2, 2]} intensity={1.15} color="#0284c7" distance={9} />
      <pointLight position={[2.6, 1.4, 1.8]} intensity={0.95} color="#d97706" distance={8} />

      <group visible={elevI > 0.15}>
        <BuildingCore simplified={isMobile} intensity={elevI} />
      </group>
      <group visible={cctvI > 0.15}>
        <SmartSystemsRing simplified={isMobile} intensity={cctvI} />
      </group>
      <group visible={maintI > 0.15}>
        <MaintenanceBase simplified={isMobile} intensity={maintI} />
      </group>

      {/* Soft material dimming via opacity groups isn't perfect; scale intensity on emissives */}
      <HotspotOverlay
        hotspot={HOTSPOTS[0]}
        active={activeHotspot === "elevator"}
        dimmed={!!activeHotspot && activeHotspot !== "elevator"}
        onSelect={onHotspotSelect}
        position={[0.85, 0.35, 0.85]}
      />
      <HotspotOverlay
        hotspot={HOTSPOTS[1]}
        active={activeHotspot === "cctv"}
        dimmed={!!activeHotspot && activeHotspot !== "cctv"}
        onSelect={onHotspotSelect}
        position={[1.75, 1.55, 0.7]}
      />
      <HotspotOverlay
        hotspot={HOTSPOTS[2]}
        active={activeHotspot === "maintenance"}
        dimmed={!!activeHotspot && activeHotspot !== "maintenance"}
        onSelect={onHotspotSelect}
        position={[-0.15, -1.75, 0.95]}
      />
    </group>
  );
}
