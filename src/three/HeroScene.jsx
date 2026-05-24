// src/three/HeroScene.jsx — Full-screen immersive canvas for the Hero section
// Theme-adaptive: lerps lighting, fog, particles between dark↔light mode

import { useRef, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import FloatingOrb from './FloatingOrb';
import ParticleField from './ParticleField';
import { SCENE, SCENE_DARK, SCENE_LIGHT } from './SceneConfig';
import { useTheme } from '../context/ThemeContext';

// ─── Thin wireframe torus ring ─────────────────────────────
function AbstractRing({ mouseRef }) {
  const meshRef = useRef(null);
  const cfg = SCENE.ring;

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * cfg.rotationSpeed * 40;
    meshRef.current.rotation.y = t * cfg.rotationSpeed * 25;

    if (mouseRef?.current) {
      const { x, y } = mouseRef.current;
      meshRef.current.position.x = cfg.position[0] + x * 0.15;
      meshRef.current.position.y = cfg.position[1] - y * 0.1;
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={cfg.position} scale={cfg.scale}>
        <torusGeometry args={[1, 0.012, 16, 120]} />
        <meshBasicMaterial
          color={cfg.color}
          transparent
          opacity={cfg.opacity}
          depthWrite={false}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

// ─── Second decorative ring — offset ──────────────────────
function SecondRing({ mouseRef }) {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.z = t * 0.04;
    meshRef.current.rotation.x = -t * 0.025;

    if (mouseRef?.current) {
      const { x, y } = mouseRef.current;
      meshRef.current.position.x = -3.5 + x * 0.08;
      meshRef.current.position.y = -1.4 - y * 0.06;
    }
  });

  return (
    <Float speed={0.4} rotationIntensity={0.15} floatIntensity={0.2}>
      <mesh ref={meshRef} position={[-3.5, -1.4, -3.5]} scale={[1.1, 1.1, 0.03]}>
        <torusGeometry args={[1, 0.008, 12, 90]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.04}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

// ─── Smooth camera drift on mouse ─────────────────────────
function CameraRig({ mouseRef }) {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!mouseRef?.current) return;
    const { x, y } = mouseRef.current;

    target.current.x += (x * 0.3 - target.current.x) * 0.025;
    target.current.y += (-y * 0.2 - target.current.y) * 0.025;

    camera.position.x = SCENE.camera.position[0] + target.current.x;
    camera.position.y = SCENE.camera.position[1] + target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Adaptive lighting rig — lerps between dark/light targets ──
function AdaptiveLighting({ isDark }) {
  const ambientRef  = useRef(null);
  const pointARef   = useRef(null);
  const pointBRef   = useRef(null);
  const fogColor    = useRef(new THREE.Color(SCENE_DARK.fog.color));
  const { scene }   = useThree();

  useFrame(() => {
    const target = isDark ? SCENE_DARK : SCENE_LIGHT;
    const speed  = 0.04; // lerp factor — smooth ~1s transition

    // Ambient intensity lerp
    if (ambientRef.current) {
      ambientRef.current.intensity +=
        (target.ambient.intensity - ambientRef.current.intensity) * speed;
    }

    // Point light A intensity lerp
    if (pointARef.current) {
      pointARef.current.intensity +=
        (target.pointA.intensity - pointARef.current.intensity) * speed;
    }

    // Point light B intensity lerp
    if (pointBRef.current) {
      pointBRef.current.intensity +=
        (target.pointB.intensity - pointBRef.current.intensity) * speed;
    }

    // Fog color lerp
    if (scene.fog) {
      const targetFogColor = new THREE.Color(target.fog.color);
      fogColor.current.lerp(targetFogColor, speed);
      scene.fog.color.copy(fogColor.current);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={SCENE.ambient.intensity} color={SCENE.ambient.color} />
      <pointLight
        ref={pointARef}
        position={SCENE.pointA.position}
        intensity={SCENE.pointA.intensity}
        color={SCENE.pointA.color}
        distance={SCENE.pointA.distance}
      />
      <pointLight
        ref={pointBRef}
        position={SCENE.pointB.position}
        intensity={SCENE.pointB.intensity}
        color={SCENE.pointB.color}
        distance={SCENE.pointB.distance}
      />
    </>
  );
}

// ─── Scene contents ────────────────────────────────────────
function SceneContents({ mouseRef, isDark }) {
  const cfg = SCENE;

  return (
    <>
      {/* Fog for cinematic depth */}
      <fog attach="fog" args={[cfg.fog.color, cfg.fog.near, cfg.fog.far]} />

      {/* Adaptive lighting — smoothly transitions with theme */}
      <AdaptiveLighting isDark={isDark} />

      {/* 3D Objects */}
      <FloatingOrb mouseRef={mouseRef} isDark={isDark} />
      <AbstractRing mouseRef={mouseRef} />
      <SecondRing mouseRef={mouseRef} />
      <ParticleField mouseRef={mouseRef} isDark={isDark} />

      {/* Camera rig */}
      <CameraRig mouseRef={mouseRef} />
    </>
  );
}

// ─── Main exported scene ───────────────────────────────────
export default function HeroScene() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const { isDark } = useTheme();

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
    <div className="three-canvas-wrapper" aria-hidden="true">
      <Canvas
        dpr={SCENE.dpr}
        camera={{
          fov: SCENE.camera.fov,
          near: SCENE.camera.near,
          far: SCENE.camera.far,
          position: SCENE.camera.position,
        }}
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
          <SceneContents mouseRef={mouseRef} isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
}
