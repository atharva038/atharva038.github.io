import * as THREE from "three";

export const getBishopPoints = () => {
  const points = [];

  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.85, 0));
  points.push(new THREE.Vector2(0.85, 0.2));
  points.push(new THREE.Vector2(0.75, 0.3));

  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const x = 0.75 * Math.pow(1 - t, 2) + 0.3 * 2 * (1 - t) * t + 0.2 * Math.pow(t, 2);
    const y = 0.3 * Math.pow(1 - t, 2) + 1.2 * 2 * (1 - t) * t + 1.8 * Math.pow(t, 2);
    points.push(new THREE.Vector2(x, y));
  }

  points.push(new THREE.Vector2(0.4, 1.85));
  points.push(new THREE.Vector2(0.4, 1.95));
  points.push(new THREE.Vector2(0.15, 2.0));

  for (let i = 0; i <= 15; i++) {
    const t = i / 15;
    const x = 0.45 * Math.sin(t * Math.PI);
    const y = 2.0 + t * 0.9;
    points.push(new THREE.Vector2(x, y));
  }

  points.push(new THREE.Vector2(0.08, 2.9));
  points.push(new THREE.Vector2(0.08, 3.0));
  points.push(new THREE.Vector2(0, 3.05));

  return points;
};
