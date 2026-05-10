import * as THREE from "three";

export const getPawnPoints = () => {
  const points = [];

  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.9, 0));
  points.push(new THREE.Vector2(0.9, 0.2));
  points.push(new THREE.Vector2(0.8, 0.25));
  points.push(new THREE.Vector2(0.8, 0.4));

  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const x = 0.8 * Math.pow(1 - t, 2) + 0.4 * 2 * (1 - t) * t + 0.3 * Math.pow(t, 2);
    const y = 0.4 * Math.pow(1 - t, 2) + 0.8 * 2 * (1 - t) * t + 1.2 * Math.pow(t, 2);
    points.push(new THREE.Vector2(x, y));
  }

  points.push(new THREE.Vector2(0.45, 1.2));
  points.push(new THREE.Vector2(0.45, 1.3));
  points.push(new THREE.Vector2(0.25, 1.35));

  const headRadius = 0.55;
  const headCenterY = 1.8;
  for (let i = 0; i <= 10; i++) {
    const angle = -Math.PI / 2 + (i / 10) * Math.PI;
    points.push(new THREE.Vector2(Math.cos(angle) * headRadius, headCenterY + Math.sin(angle) * headRadius));
  }

  points.push(new THREE.Vector2(0, headCenterY + headRadius));
  return points;
};
