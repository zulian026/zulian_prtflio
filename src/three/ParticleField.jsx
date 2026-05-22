// src/three/ParticleField.jsx — GPU-efficient ambient particle system

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SCENE } from './SceneConfig';

export default function ParticleField({ mouseRef }) {
  const pointsRef = useRef(null);
  const cfg = SCENE.particles;

  // Generate positions once
  const { positions, randoms } = useMemo(() => {
    const count = cfg.count;
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute in a sphere volume, biased toward edges
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.cbrt(Math.random()) * cfg.spread;

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 3; // push slightly back

      rnd[i] = Math.random();
    }

    return { positions: pos, randoms: rnd };
  }, [cfg.count, cfg.spread]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;

    // Slow global rotation — makes it feel alive without jarring motion
    pointsRef.current.rotation.y = t * cfg.driftSpeed * 60;
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.06;

    // Subtle mouse parallax
    if (mouseRef?.current) {
      const { x, y } = mouseRef.current;
      pointsRef.current.position.x = x * 0.12;
      pointsRef.current.position.y = y * 0.08;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={cfg.color}
        size={cfg.size}
        sizeAttenuation
        transparent
        opacity={cfg.opacity}
        depthWrite={false}
        fog
      />
    </points>
  );
}
