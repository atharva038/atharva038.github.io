import * as THREE from "three";

export const getRookPoints = () => {
  const points = [];

  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.8, 0));
  points.push(new THREE.Vector2(0.8, 0.3));
  points.push(new THREE.Vector2(0.65, 0.4));
  points.push(new THREE.Vector2(0.55, 2.0));
  points.push(new THREE.Vector2(0.7, 2.1));
  points.push(new THREE.Vector2(0.7, 2.3));
  points.push(new THREE.Vector2(0.45, 2.3));
  points.push(new THREE.Vector2(0.45, 2.2));
  points.push(new THREE.Vector2(0, 2.2));

  return points;
};
