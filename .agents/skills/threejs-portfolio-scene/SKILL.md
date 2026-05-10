---
name: threejs-portfolio-scene
description: Create, modify, debug, and performance-tune Three.js and React Three Fiber scenes for this Claude Code Folio portfolio. Use when working on scroll-aware 3D backgrounds, chess-piece models, section-specific 3D objects, cameras, lighting, shaders/materials, responsive canvas behavior, mobile Three.js performance, or project files such as Global3DBackground.tsx, Hero3DChessPiece.tsx, Section3DModels.tsx, ChessGeometries.ts, three-system.tsx, and three-system-core.ts.
---

# Three.js Portfolio Scene

## Overview

Use this skill to evolve this portfolio's 3D identity without breaking its speed, layout, or theme system. Favor the existing React Three Fiber architecture, reusable geometry helpers, and scroll-driven scene choreography before introducing new systems.

## Quick Workflow

1. Inspect the target scene files and `src/components/ui/three-system-core.ts` before changing behavior.
2. Read `references/portfolio-threejs-map.md` when the task touches this portfolio's 3D architecture or section choreography; it maps key files, scroll windows, verification recipes, shared-geometry patterns, and runtime WebGL guardrails.
3. Keep new 3D work inside the established canvas and model system unless the user asks for a separate scene.
4. Check whether the canvas path is protected by an error boundary or graceful fallback before adding risky WebGL, shader, or asset-loading code.
5. Verify with `npm run build`; for visual changes, run the app and inspect desktop and mobile screenshots or browser views.
6. Check console errors, shader/WebGL runtime errors, blank canvas risk, object framing, pointer-event behavior, and reduced opacity/background layering.

## Implementation Rules

- Use `@react-three/fiber`, `@react-three/drei`, and `three`; do not hand-roll a second render loop outside Fiber.
- Keep the global background `pointer-events-none` unless deliberately building an interactive foreground canvas.
- Use refs and `useFrame` for animation; avoid React state updates inside frame loops except for rare, throttled UI handoffs.
- Reuse theme palette helpers from `three-system-core.ts` so 3D materials follow `light`, `dark`, and `blkdev` themes.
- Keep materials readable at the existing background opacity; avoid low-contrast objects that disappear behind content.
- For scroll choreography, damp movement with `THREE.MathUtils.damp` and guard against `document.body.scrollHeight - window.innerHeight` being zero.
- On mobile, simplify positions, scale, and opacity before removing the 3D scene entirely.
- Dispose or memoize expensive geometries/materials when creating many objects; prefer shared helpers for repeated mesh patterns.
- Keep imports tree-shakeable and avoid large external 3D libraries unless the task clearly requires them.

## Scene Design Guidance

Match this portfolio's chess-strategy identity. Prefer precise, architectural, mechanical, holographic, or tactical visual motifs over decorative blobs or generic space effects.

Avoid motifs that weaken the identity: generic starfields, floating sphere clouds, random particle storms, soft bokeh fields, unrelated sci-fi tunnels, or decorative geometry that does not support chess, systems, craft, strategy, code, or product-building.

When adding a new section model:

1. Define the object in `Section3DModels.tsx` or a narrowly named sibling if it grows large.
2. Mount it from `Global3DBackground.tsx` or the local section component, depending on whether it should scroll globally or belong to a section.
3. Give it a clear scroll window, mobile position, and stable scale.
4. Test that it hints at the section's theme without covering text.

## Performance Checklist

- Keep background scenes visually rich but low-poly enough for laptops and phones.
- Use `Suspense fallback={null}` around lazy 3D content.
- Avoid texture-heavy assets unless optimized and necessary.
- Prefer instancing or mapped arrays with shared geometry/materials for repeated tokens.
- Check canvas renders on mobile widths and does not produce a blank first paint: capture a mobile screenshot, inspect the canvas region, and confirm console output is clean.
- Respect reduced-motion patterns in the app if introduced or already present.

## Asset Pipeline

Prefer procedural geometry for background and section visuals. If a task requires imported 3D assets:

- Store runtime assets under `public/models/` unless there is a deliberate reason to import through `src/assets`.
- Prefer optimized `.glb` files.
- Compress geometry/textures and remove unused tracks/materials before committing.
- Load assets through established React Three Fiber or Drei patterns with `Suspense` and an error boundary/fallback.
- Test hard refresh, mobile, slow network, and browser console output for 404, memory, WebGL, or loader errors.
- Document asset source and license in the implementation notes.

## Runtime Safety

- Check whether `ResponsiveCanvas` or the parent route is wrapped in an error boundary before adding custom shaders, async model loading, or complex material code.
- If no boundary exists and the change increases WebGL failure risk, add or recommend a local error boundary/fallback so a canvas crash does not blank the whole portfolio.
- Listen for runtime console errors from Three.js and WebGL; shader syntax and material compilation problems often appear only after the browser renders, not during `npm run build`.
- Watch for messages containing `THREE.WebGLProgram`, `shader`, `VALIDATE_STATUS`, `WebGL context lost`, `gl.getShaderInfoLog`, or material uniform errors.

## Validation

Run:

```bash
npm run build
```

For meaningful visual changes, also run a local dev server and inspect at least:

- Desktop around `1440x900`
- Mobile around `390x844`
- `light`, `dark`, and `blkdev` themes if materials or colors changed
- Slow network or hard-refresh mobile load when the change affects first paint, lazy assets, textures, or Suspense boundaries

Look for console errors, missing WebGL context, blank canvas, layout overlap, excessive motion, and unreadable section text.

## Canvas First-Paint Check

For mobile or background-canvas changes:

1. Open a mobile viewport around `390x844`.
2. Hard refresh with cache disabled, or throttle to Slow 3G in DevTools when available.
3. Capture a screenshot shortly after load and again after the page settles.
4. Confirm the canvas area is not blank unless intentionally hidden by opacity or reduced-motion logic.
5. Check console logs for WebGL, shader, context-loss, and asset-loading errors.
6. If using Playwright, sample the canvas screenshot pixels or compare before/after screenshots for the hero and first section.

## References

- `references/portfolio-threejs-map.md`: current repo map, component roles, verification recipes, shared-geometry examples, and common edit recipes for this portfolio's 3D system.
