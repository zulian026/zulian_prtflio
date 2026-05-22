// src/three/LoadingScene.jsx — Cinematic loading screen 3D background
// Visually distinct from HeroScene: centered crystal orb with glass feel.
// Supports a cinematic dissolve sequence triggered via dissolveRef prop.

import { useRef, useMemo, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// ─── Config ────────────────────────────────────────────────
const CFG = {
  dpr: [0.5, 1.4],
  camera: { fov: 55, near: 0.1, far: 60, position: [0, 0, 5.5] },
  fog: { color: '#0a0a0a', near: 5, far: 20 },

  // Central orb — large, centered, glass-like feel
  orb: {
    scale: 1.9,
    distort: 0.28,
    speed: 0.45,
    opacity: 0.09,
  },

  // Wireframe shell — gives icosahedron / crystal faceted look
  shell: {
    scale: 2.05,
    opacity: 0.04,
  },

  // Second smaller satellite orb — adds depth
  satellite: {
    position: [-2.2, -0.8, -2],
    scale: 0.7,
    distort: 0.45,
    speed: 0.6,
    opacity: 0.05,
  },

  // Particles
  particles: {
    count: 220,
    spread: 7,
    size: 0.016,
    opacity: 0.18,
  },
};

// ─── Ease helpers ──────────────────────────────────────────
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const easeOut   = (t) => 1 - (1 - t) * (1 - t);
const lerp      = (a, b, t) => a + (b - a) * t;

// ─── Central Crystal Orb ───────────────────────────────────
function CrystalOrb({ mouseRef, dissolveRef, onDissolveComplete }) {
  const meshRef  = useRef(null);
  const shellRef = useRef(null);
  const progress = useRef(0); // 0 → 1 over dissolve duration
  const notified = useRef(false);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const t = performance.now() / 1000;

    if (!dissolveRef.current) {
      // ── Normal idle rotation ──────────────────────────────
      meshRef.current.rotation.y = t * 0.06;
      meshRef.current.rotation.x = Math.sin(t * 0.09) * 0.08;

      if (shellRef.current) {
        shellRef.current.rotation.y = -t * 0.04;
        shellRef.current.rotation.z = t * 0.025;
      }

      // Gentle mouse parallax
      if (mouseRef?.current) {
        const { x, y } = mouseRef.current;
        meshRef.current.position.x += (x * 0.2 - meshRef.current.position.x) * 0.04;
        meshRef.current.position.y += (y * 0.15 - meshRef.current.position.y) * 0.04;
      }
    } else {
      // ── Cinematic dissolve ────────────────────────────────
      progress.current = Math.min(1, progress.current + delta / 1.1);
      const p  = easeOut(progress.current);
      const pi = easeInOut(progress.current);

      // Orb swells and fades — like a dying star
      const orbScale = lerp(CFG.orb.scale, CFG.orb.scale * 1.4, pi);
      meshRef.current.scale.setScalar(orbScale);
      meshRef.current.material.opacity = CFG.orb.opacity * (1 - p);

      // Continue rotation — cinematic feel
      meshRef.current.rotation.y += delta * 0.12;
      meshRef.current.rotation.x += delta * 0.04;

      // Shell expands outward and fades
      if (shellRef.current) {
        const shellScale = lerp(CFG.shell.scale, CFG.shell.scale * 1.6, pi);
        shellRef.current.scale.setScalar(shellScale);
        shellRef.current.material.opacity = CFG.shell.opacity * (1 - p);
        shellRef.current.rotation.y += delta * 0.08;
      }

      // Signal completion once
      if (progress.current >= 1 && !notified.current) {
        notified.current = true;
        onDissolveComplete?.();
      }
    }
  });

  return (
    <Float speed={0.6} rotationIntensity={0.2} floatIntensity={0.35} floatingRange={[-0.06, 0.06]}>
      {/* Core distorted sphere */}
      <mesh ref={meshRef} position={[0, 0, 0]} scale={CFG.orb.scale} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#ffffff"
          metalness={0.0}
          roughness={0.05}
          distort={CFG.orb.distort}
          speed={CFG.orb.speed}
          transparent
          opacity={CFG.orb.opacity}
          depthWrite={false}
        />
      </mesh>

      {/* Wireframe icosahedron shell — crystal lattice feel */}
      <mesh ref={shellRef} position={[0, 0, 0]} scale={CFG.shell.scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={CFG.shell.opacity}
          wireframe
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

// ─── Satellite Orb — depth accent ──────────────────────────
function SatelliteOrb({ mouseRef, dissolveRef }) {
  const meshRef  = useRef(null);
  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const t = performance.now() / 1000;

    if (!dissolveRef.current) {
      meshRef.current.rotation.y = t * 0.09;
      meshRef.current.rotation.z = Math.sin(t * 0.07) * 0.15;

      if (mouseRef?.current) {
        const { x, y } = mouseRef.current;
        meshRef.current.position.x = CFG.satellite.position[0] + x * 0.1;
        meshRef.current.position.y = CFG.satellite.position[1] - y * 0.07;
      }
    } else {
      progress.current = Math.min(1, progress.current + delta / 0.85);
      const p = easeOut(progress.current);
      meshRef.current.material.opacity = CFG.satellite.opacity * (1 - p);
      meshRef.current.scale.setScalar(lerp(CFG.satellite.scale, CFG.satellite.scale * 1.3, p));
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={0.4} rotationIntensity={0.25} floatIntensity={0.3}>
      <mesh ref={meshRef} position={CFG.satellite.position} scale={CFG.satellite.scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color="#ffffff"
          metalness={0.0}
          roughness={0.1}
          distort={CFG.satellite.distort}
          speed={CFG.satellite.speed}
          transparent
          opacity={CFG.satellite.opacity}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

// ─── Thin Orbit Ring ───────────────────────────────────────
function OrbitRing({ mouseRef, dissolveRef }) {
  const meshRef  = useRef(null);
  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const t = performance.now() / 1000;

    if (!dissolveRef.current) {
      meshRef.current.rotation.x = Math.PI / 2 + t * 0.03;
      meshRef.current.rotation.z = t * 0.018;

      if (mouseRef?.current) {
        const { x } = mouseRef.current;
        meshRef.current.rotation.y = x * 0.15;
      }
    } else {
      progress.current = Math.min(1, progress.current + delta / 0.75);
      const p = easeOut(progress.current);
      meshRef.current.material.opacity = 0.05 * (1 - p);
      // Ring expands outward
      const s = lerp(2.5, 3.8, p);
      meshRef.current.scale.set(s, s, 0.01);
      meshRef.current.rotation.z += delta * 0.06;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={[2.5, 2.5, 0.01]}>
      <torusGeometry args={[1, 0.007, 12, 100]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.05} depthWrite={false} />
    </mesh>
  );
}

// ─── Ambient Particle System — burst-scatter on dissolve ───
function LoadingParticles({ mouseRef, dissolveRef }) {
  const pointsRef = useRef(null);
  const progress  = useRef(0);

  const { positions, velocities } = useMemo(() => {
    const count     = CFG.particles.count;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = (0.5 + Math.random() * 0.5) * CFG.particles.spread;

      const px = r * Math.sin(phi) * Math.cos(theta);
      const py = r * Math.sin(phi) * Math.sin(theta);
      const pz = r * Math.cos(phi) - 2;

      positions[i * 3]     = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      // Outward velocity — normalized direction * random speed
      const mag = Math.sqrt(px * px + py * py + pz * pz) || 1;
      const spd = 1.5 + Math.random() * 2.5;
      velocities[i * 3]     = (px / mag) * spd;
      velocities[i * 3 + 1] = (py / mag) * spd + (Math.random() - 0.5) * 0.8;
      velocities[i * 3 + 2] = (pz / mag) * spd;
    }

    return { positions, velocities };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const t = performance.now() / 1000;

    if (!dissolveRef.current) {
      // Normal slow rotation
      pointsRef.current.rotation.y = t * 0.008;
      pointsRef.current.rotation.x = Math.sin(t * 0.04) * 0.04;

      if (mouseRef?.current) {
        const { x, y } = mouseRef.current;
        pointsRef.current.position.x += (x * 0.08 - pointsRef.current.position.x) * 0.03;
        pointsRef.current.position.y += (y * 0.06 - pointsRef.current.position.y) * 0.03;
      }
    } else {
      // ── Particle scatter dissolve ──────────────────────────
      progress.current = Math.min(1, progress.current + delta / 1.3);
      const p = easeOut(progress.current);

      // Scatter positions CPU-side (only 220 particles, acceptable)
      const attr = pointsRef.current.geometry.attributes.position;
      for (let i = 0; i < CFG.particles.count; i++) {
        attr.array[i * 3]     += velocities[i * 3]     * delta * p * 1.4;
        attr.array[i * 3 + 1] += velocities[i * 3 + 1] * delta * p * 1.4;
        attr.array[i * 3 + 2] += velocities[i * 3 + 2] * delta * p * 0.6;
      }
      attr.needsUpdate = true;

      // Fade out
      pointsRef.current.material.opacity = CFG.particles.opacity * (1 - p);
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#ffffff"
        size={CFG.particles.size}
        sizeAttenuation
        transparent
        opacity={CFG.particles.opacity}
        depthWrite={false}
        fog
      />
    </points>
  );
}

// ─── Camera Pull-back Rig ──────────────────────────────────
function CameraRig({ dissolveRef }) {
  const { camera } = useThree();
  const progress   = useRef(0);

  useFrame((_, delta) => {
    if (!dissolveRef.current) return;
    progress.current = Math.min(1, progress.current + delta / 1.1);
    const p = easeInOut(progress.current);
    // Pull camera back + tilt down slightly — cinematic retreat
    camera.position.z = lerp(5.5, 7.0, p);
    camera.position.y = lerp(0, -0.3, p);
  });

  return null;
}

// ─── Inner Scene Contents ──────────────────────────────────
function SceneContents({ mouseRef, dissolveRef, onDissolveComplete }) {
  return (
    <>
      <fog attach="fog" args={[CFG.fog.color, CFG.fog.near, CFG.fog.far]} />

      {/* Lights — centered for uniform soft glow */}
      <ambientLight intensity={0.08} color="#ffffff" />
      <pointLight position={[0, 3, 3]} intensity={1.0} color="#ffffff" distance={16} />
      <pointLight position={[-3, -2, 1]} intensity={0.35} color="#9999bb" distance={12} />
      <pointLight position={[3, 1, -2]} intensity={0.25} color="#ffffff" distance={10} />

      <CrystalOrb
        mouseRef={mouseRef}
        dissolveRef={dissolveRef}
        onDissolveComplete={onDissolveComplete}
      />
      <SatelliteOrb mouseRef={mouseRef} dissolveRef={dissolveRef} />
      <OrbitRing mouseRef={mouseRef} dissolveRef={dissolveRef} />
      <LoadingParticles mouseRef={mouseRef} dissolveRef={dissolveRef} />
      <CameraRig dissolveRef={dissolveRef} />
    </>
  );
}

// ─── Exported Canvas Component ─────────────────────────────
export default function LoadingScene({ dissolveRef, onDissolveComplete }) {
  const mouseRef = useRef({ x: 0, y: 0 });

  // Internal fallback ref if none provided
  const _dissolveRef = useRef(false);
  const activeDissolveRef = dissolveRef || _dissolveRef;

  const onMouseMove = useCallback((e) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: -(e.clientY / window.innerHeight - 0.5) * 2,
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        dpr={CFG.dpr}
        camera={CFG.camera}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'low-power',
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContents
            mouseRef={mouseRef}
            dissolveRef={activeDissolveRef}
            onDissolveComplete={onDissolveComplete}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
