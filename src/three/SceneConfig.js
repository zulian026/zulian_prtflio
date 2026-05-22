// src/three/SceneConfig.js — Shared config for all 3D scenes

export const SCENE = {
  // Canvas
  dpr: [0.5, 1.5],
  camera: {
    fov: 60,
    near: 0.1,
    far: 100,
    position: [0, 0, 5],
  },

  // Fog — adds cinematic depth
  fog: {
    color: '#0a0a0a',
    near: 6,
    far: 18,
  },

  // Lights
  ambient: {
    intensity: 0.15,
    color: '#ffffff',
  },
  pointA: {
    position: [4, 4, 4],
    intensity: 1.2,
    color: '#ffffff',
    distance: 18,
  },
  pointB: {
    position: [-4, -3, 2],
    intensity: 0.4,
    color: '#aaaacc',
    distance: 14,
  },

  // Orb
  orb: {
    position: [2.8, 0.3, -1],
    scale: 1.65,
    color: '#ffffff',
    metalness: 0.0,
    roughness: 0.0,
    distort: 0.38,
    speed: 0.7,
    opacity: 0.07,
  },

  // Ring
  ring: {
    position: [-2.4, 1.2, -2.5],
    scale: [1.8, 1.8, 0.04],
    color: '#ffffff',
    opacity: 0.06,
    rotationSpeed: 0.0025,
  },

  // Particles
  particles: {
    count: 280,
    spread: 9,
    size: 0.018,
    opacity: 0.22,
    color: '#ffffff',
    driftSpeed: 0.00015,
  },
};
