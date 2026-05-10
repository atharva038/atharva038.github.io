import * as THREE from "three";

export const getQueenPoints = () => {
  const points = [];

  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(1.1, 0));
  points.push(new THREE.Vector2(1.1, 0.25));
  points.push(new THREE.Vector2(0.95, 0.35));
  points.push(new THREE.Vector2(0.95, 0.5));

  for (let i = 0; i <= 15; i++) {
    const t = i / 15;
    const x = 0.95 * Math.pow(1 - t, 2) + 0.25 * 2 * (1 - t) * t + 0.35 * Math.pow(t, 2);
    const y = 0.5 * Math.pow(1 - t, 2) + 1.5 * 2 * (1 - t) * t + 2.4 * Math.pow(t, 2);
    points.push(new THREE.Vector2(x, y));
  }

  points.push(new THREE.Vector2(0.6, 2.45));
  points.push(new THREE.Vector2(0.6, 2.55));
  points.push(new THREE.Vector2(0.3, 2.6));
  points.push(new THREE.Vector2(0.7, 3.1));
  points.push(new THREE.Vector2(0.6, 3.1));
  points.push(new THREE.Vector2(0.2, 2.7));
  points.push(new THREE.Vector2(0, 2.7));

  return points;
};
