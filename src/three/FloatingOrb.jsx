// src/three/FloatingOrb.jsx — Distorted floating sphere

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import { SCENE, SCENE_DARK, SCENE_LIGHT } from './SceneConfig';

export default function FloatingOrb({ mouseRef, isDark = true }) {
  const meshRef = useRef(null);
  const matRef  = useRef(null);
  const cfg = SCENE.orb;

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.elapsedTime;

    // Subtle idle drift
    meshRef.current.rotation.y = t * 0.08;
    meshRef.current.rotation.z = Math.sin(t * 0.15) * 0.12;

    // Mouse parallax — gentle camera tilt
    if (mouseRef?.current) {
      const { x, y } = mouseRef.current;
      meshRef.current.position.x = cfg.position[0] + x * 0.25;
      meshRef.current.position.y = cfg.position[1] + y * 0.18;
    }

    // Lerp opacity between theme targets
    if (matRef.current) {
      const targetOpacity = isDark ? SCENE_DARK.orb.opacity : SCENE_LIGHT.orb.opacity;
      matRef.current.opacity += (targetOpacity - matRef.current.opacity) * 0.04;
    }
  });

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.3}
      floatIntensity={0.4}
      floatingRange={[-0.08, 0.08]}
    >
      <mesh
        ref={meshRef}
        position={cfg.position}
        scale={cfg.scale}
        castShadow
      >
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          ref={matRef}
          color={cfg.color}
          metalness={cfg.metalness}
          roughness={cfg.roughness}
          distort={cfg.distort}
          speed={cfg.speed}
          transparent
          opacity={cfg.opacity}
          depthWrite={false}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

