import * as THREE from 'three';

// -----------------------------------------------------------------------------
// Pawn Profile (Skills)
// -----------------------------------------------------------------------------
export const getPawnPoints = () => {
  const points = [];
  // Base
  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.9, 0));
  points.push(new THREE.Vector2(0.9, 0.2));
  points.push(new THREE.Vector2(0.8, 0.25));
  points.push(new THREE.Vector2(0.8, 0.4));
  
  // Body (Bezier curve for the waist)
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const x = 0.8 * Math.pow(1 - t, 2) + 0.4 * 2 * (1 - t) * t + 0.3 * Math.pow(t, 2);
    const y = 0.4 * Math.pow(1 - t, 2) + 0.8 * 2 * (1 - t) * t + 1.2 * Math.pow(t, 2);
    points.push(new THREE.Vector2(x, y));
  }
  
  // Collar
  points.push(new THREE.Vector2(0.45, 1.2));
  points.push(new THREE.Vector2(0.45, 1.3));
  points.push(new THREE.Vector2(0.25, 1.35));
  
  // Head (Sphere)
  const headRadius = 0.55;
  const headCenterY = 1.8;
  for (let i = 0; i <= 10; i++) {
    const angle = -Math.PI / 2 + (i / 10) * Math.PI;
    points.push(new THREE.Vector2(Math.cos(angle) * headRadius, headCenterY + Math.sin(angle) * headRadius));
  }
  
  points.push(new THREE.Vector2(0, headCenterY + headRadius));
  return points;
};

// -----------------------------------------------------------------------------
// Rook Profile (Projects) - Heavy/Brutalist
// -----------------------------------------------------------------------------
export const getRookPoints = () => {
  const points = [];
  // Base (Slimmer)
  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.8, 0));
  points.push(new THREE.Vector2(0.8, 0.3));
  points.push(new THREE.Vector2(0.65, 0.4));
  
  // Taller, tapered body
  points.push(new THREE.Vector2(0.55, 2.0));
  
  // Collar
  points.push(new THREE.Vector2(0.7, 2.1));
  points.push(new THREE.Vector2(0.7, 2.3));
  
  // Top
  points.push(new THREE.Vector2(0.45, 2.3));
  points.push(new THREE.Vector2(0.45, 2.2)); // Inner depression
  points.push(new THREE.Vector2(0, 2.2));
  
  return points;
};

// -----------------------------------------------------------------------------
// Bishop Profile (Experience) - Slender/Strategic
// -----------------------------------------------------------------------------
export const getBishopPoints = () => {
  const points = [];
  // Base
  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.85, 0));
  points.push(new THREE.Vector2(0.85, 0.2));
  points.push(new THREE.Vector2(0.75, 0.3));
  
  // Tall slender body
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const x = 0.75 * Math.pow(1 - t, 2) + 0.3 * 2 * (1 - t) * t + 0.2 * Math.pow(t, 2);
    const y = 0.3 * Math.pow(1 - t, 2) + 1.2 * 2 * (1 - t) * t + 1.8 * Math.pow(t, 2);
    points.push(new THREE.Vector2(x, y));
  }
  
  // Collar
  points.push(new THREE.Vector2(0.4, 1.85));
  points.push(new THREE.Vector2(0.4, 1.95));
  points.push(new THREE.Vector2(0.15, 2.0));
  
  // Elongated teardrop head
  for (let i = 0; i <= 15; i++) {
    const t = i / 15;
    const x = 0.45 * Math.sin(t * Math.PI); // width
    const y = 2.0 + t * 0.9; // height
    points.push(new THREE.Vector2(x, y));
  }
  
  // Top tiny sphere
  points.push(new THREE.Vector2(0.08, 2.9));
  points.push(new THREE.Vector2(0.08, 3.0));
  points.push(new THREE.Vector2(0, 3.05));
  
  return points;
};

// -----------------------------------------------------------------------------
// Queen Profile (Contact) - Majestic/Powerful
// -----------------------------------------------------------------------------
export const getQueenPoints = () => {
  const points = [];
  // Base
  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(1.1, 0));
  points.push(new THREE.Vector2(1.1, 0.25));
  points.push(new THREE.Vector2(0.95, 0.35));
  points.push(new THREE.Vector2(0.95, 0.5));
  
  // Long elegant body
  for (let i = 0; i <= 15; i++) {
    const t = i / 15;
    const x = 0.95 * Math.pow(1 - t, 2) + 0.25 * 2 * (1 - t) * t + 0.35 * Math.pow(t, 2);
    const y = 0.5 * Math.pow(1 - t, 2) + 1.5 * 2 * (1 - t) * t + 2.4 * Math.pow(t, 2);
    points.push(new THREE.Vector2(x, y));
  }
  
  // Rings/Collar
  points.push(new THREE.Vector2(0.6, 2.45));
  points.push(new THREE.Vector2(0.6, 2.55));
  points.push(new THREE.Vector2(0.3, 2.6));
  
  // Flared Coronet
  points.push(new THREE.Vector2(0.7, 3.1)); // Wide flair out
  points.push(new THREE.Vector2(0.6, 3.1)); 
  points.push(new THREE.Vector2(0.2, 2.7)); // Inner depression
  
  // Central core
  points.push(new THREE.Vector2(0, 2.7));
  
  return points;
};
