// src/three/SceneConfig.js — Shared config for all 3D scenes
// Exports base SCENE + theme-specific overrides

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

// Dark mode overrides — cinematic deep black
export const SCENE_DARK = {
  fog: { color: '#0a0a0a', near: 6, far: 18 },
  ambient: { intensity: 0.15, color: '#ffffff' },
  pointA: { intensity: 1.2, color: '#ffffff' },
  pointB: { intensity: 0.4, color: '#aaaacc' },
  orb: { opacity: 0.07, color: '#ffffff' },
  particles: { opacity: 0.22, color: '#ffffff' },
};

// Light mode overrides — soft editorial white
export const SCENE_LIGHT = {
  fog: { color: '#f7f7f5', near: 6, far: 16 },
  ambient: { intensity: 0.5, color: '#f0f0f0' },
  pointA: { intensity: 0.6, color: '#ffffff' },
  pointB: { intensity: 0.2, color: '#ccccdd' },
  orb: { opacity: 0.04, color: '#555555' },
  particles: { opacity: 0.10, color: '#999999' },
};
