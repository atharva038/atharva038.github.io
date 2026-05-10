# Portfolio Three.js Map

Use this reference when modifying this portfolio's 3D layer. Keep it current with key files, scroll choreography, verification recipes, shared-geometry patterns, and runtime WebGL guardrails.

## Stack

- Vite + React + TypeScript
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- Framer Motion for DOM animation
- Tailwind CSS v4 for layout and theme styling

## Key Files

- `src/components/ui/Global3DBackground.tsx`: fixed full-screen background canvas and scroll choreography.
- `src/components/ui/three-system.tsx`: shared canvas/lights abstractions such as `ResponsiveCanvas` and `SceneLights`.
- `src/components/ui/three-system-core.ts`: theme palettes and low-level Three.js utilities.
- `src/components/ui/Hero3DChessPiece.tsx`: hero chess king model.
- `src/components/ui/Section3DModels.tsx`: section-themed 3D models such as skill tokens, timeline markers, project modules, and terminal cube.
- `src/components/ui/ChessGeometries.ts`: geometry construction helpers for chess pieces.
- `src/components/ui/chess-pieces.tsx`: chess piece render components.
- `src/components/ModelsGallery.tsx`: user-facing model showcase.
- `src/components/MiniChess.tsx`: chess interaction surface using chess libraries.

## Current Global Scene Choreography

`Global3DBackground.tsx` renders a fixed canvas behind page content. `ScrollController` keeps refs for the hero king and section-specific models, then updates positions and rotations inside `useFrame`.

Existing scroll windows:

- Hero king: roughly `0.00` to `0.15`
- Skills model: centered near `0.25`
- Experience model: centered near `0.45`
- Projects model: centered near `0.65`
- Contact model: centered near `0.95`

When adding a new section, give it a dedicated ref, a centered scroll progress value, desktop/mobile positioning, and an initial hidden position to avoid first-paint flashes.

## Common Edit Recipes

### Add a section model

1. Create a focused component in `Section3DModels.tsx`.
2. Reuse theme palette helpers and existing material patterns.
3. Import the component in `Global3DBackground.tsx`.
4. Add a ref and mount a scaled `<group>`.
5. Add scroll-position logic in `useFrame`.
6. Verify the object enters and exits without covering text.

### Improve mobile performance

1. Reduce object scale or count below `768px`.
2. Avoid expensive transparent material stacks.
3. Prefer fewer meshes and shared geometries.
4. Keep `ResponsiveCanvas` behavior intact.
5. Check that mobile still renders; do not rely only on desktop screenshots.
6. Hard-refresh at a mobile viewport and capture an early screenshot to catch blank first paint.

### Tune theme materials

1. Start from `useThemeModelPalette`.
2. Test `light`, `dark`, and `blkdev` themes.
3. Check object visibility at the canvas opacity used in `Global3DBackground`.
4. Avoid colors that make the entire portfolio read as a single hue family.

`blkdev` is the dark industrial BLK/DEV mode: near-black surfaces, white text, tactical yellow accent, minimal blur, and high contrast. 3D materials should keep the yellow accent legible without turning the whole scene into a yellow glow.

### Verify canvas first paint

1. Use a mobile viewport around `390x844`.
2. Hard refresh with cache disabled; use Slow 3G throttling when textures, lazy loading, or Suspense behavior changed.
3. Capture screenshots shortly after load and after settling.
4. Confirm visible nonblank pixels in the expected canvas area.
5. Check browser console for WebGL, shader, context-loss, and asset-loading errors.

### Add repeated tokens with shared resources

Prefer shared geometry/material instances for repeated simple meshes:

```tsx
const tokenGeometry = useMemo(() => new THREE.IcosahedronGeometry(0.28, 1), []);
const tokenMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: palette.accent }), [palette.accent]);
```

Then map repeated objects with stable keys and pass the shared instances:

```tsx
{tokens.map((token) => <mesh key={token.id} geometry={tokenGeometry} material={tokenMaterial} position={token.position} />)}
```

Use `instancedMesh` when object count is high enough that individual meshes become a performance risk.

## Runtime WebGL Checks

- `npm run build` validates TypeScript and bundling, but custom shader syntax and many material problems compile only in the browser.
- Inspect the browser console after load and while scrolling affected sections.
- Treat messages containing `THREE.WebGLProgram`, `shader`, `VALIDATE_STATUS`, `gl.getShaderInfoLog`, `WebGL context lost`, or uniform errors as blockers until explained.
- For shader changes, test at least one light theme and one dark theme pass because uniforms and colors may differ by theme.

## Asset Pipeline

- Prefer procedural geometry in `Section3DModels.tsx`, `Hero3DChessPiece.tsx`, `ChessGeometries.ts`, and `chess-pieces.tsx`.
- If importing runtime assets, use `public/models/` for optimized `.glb` files unless the build requires `src/assets`.
- Keep source/export files out of runtime paths unless the user asks to preserve them.
- Optimize geometry, textures, materials, and animation tracks before commit.
- Load with Drei/R3F patterns inside `Suspense` and ensure a fallback/error boundary keeps the portfolio readable.
- Verify mobile hard refresh and slow network loading; check Network for 404s and Console for loader/WebGL errors.
- Record asset source/license in the final notes.

## Error Boundary Expectations

- Canvas failures should not blank the whole portfolio.
- Before adding custom shaders, async assets, or complex material logic, check whether the canvas parent has an error boundary or visible fallback.
- If no boundary exists and the change is risky, add a local boundary around the 3D surface or recommend one in the QA report.
- Keep the fallback quiet: page content should remain readable even if WebGL fails.

## Guardrails

- Do not place text inside the 3D background; DOM content should remain accessible and selectable.
- Do not let the background canvas capture pointer events unless the task is explicitly interactive.
- Do not create a separate global canvas without a clear reason.
- Do not add unoptimized GLB/texture assets casually; use simple geometry for decorative or symbolic objects.
- Do not drive frame animation through React state every frame.
- Do not add generic starfields, random particle storms, floating sphere clouds, bokeh fields, or unrelated sci-fi tunnels; keep visual motifs tied to chess, systems, code, product-building, or tactical structure.
