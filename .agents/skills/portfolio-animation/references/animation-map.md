# Animation Map

Use this reference when changing animation behavior in the portfolio.

This file should stay current with the repo's main animation surfaces, audit commands, common recipes, reduced-motion expectations, and guardrails. If a referenced file is renamed or a shared pattern is introduced, update this map in the same change.

## Stack

- React + TypeScript
- Framer Motion
- Tailwind CSS transitions
- React Three Fiber for canvas animation

## Key Files

- `src/components/ui/MagneticButton.tsx`: tactile pointer-following button behavior.
- `src/components/ui/global-ripple.tsx`: global click/ripple feedback.
- `src/components/ThemeProvider.tsx`: theme state and transition coordination.
- `src/components/ThemeToggle.tsx`: theme selector interaction.
- `src/components/SectionController.tsx`: section behavior and scroll coordination.
- `src/components/LazyOnVisible.tsx`: visibility-triggered rendering or reveals.
- `src/components/ui/Global3DBackground.tsx`: Three.js scroll choreography; use the `threejs-portfolio-scene` skill for deep 3D changes.
- `src/index.css`: global transitions, theme styles, and responsive motion-related CSS.

## Audit Commands

Use these before introducing new patterns:

```bash
rg "framer-motion|motion\\.|variants|whileHover|whileTap|useReducedMotion|AnimatePresence" src
rg "transition|animate-|prefers-reduced-motion|@keyframes" src/index.css src/components
```

Inspect the closest matching component before creating a new abstraction.

## Common Recipes

### Add a section reveal

1. Check whether the section already uses Framer Motion or `LazyOnVisible`.
2. Use a small opacity/translate reveal.
3. Stagger child items only when it improves scanning.
4. Keep the final layout identical to the non-animated layout.
5. Add a reduced-motion fallback that renders content immediately or with minimal opacity-only change.
6. Verify mobile does not leave content hidden after scroll.

### Add hover motion

1. Use `whileHover` and `whileTap` for Framer Motion components.
2. Keep scale subtle, usually near `1.01` to `1.04`.
3. Preserve focus styles for keyboard users.
4. Ensure cards and buttons do not resize their containers.
5. Confirm touch users still get clear pressed, active, or focus feedback.

### Coordinate with Three.js

1. Let Three.js handle canvas objects through `useFrame`.
2. Let Framer Motion handle DOM elements.
3. Avoid scroll listeners in multiple places for the same effect unless unavoidable.
4. Check that DOM reveals do not hide text behind background models.

### Theme transition

1. Keep theme changes responsive and readable.
2. Avoid long blocking transition overlays.
3. Test both directions: light to dark and dark to light.
4. Check text contrast mid-transition if an overlay is used.

## Reduced Motion Expectations

- Entrance and scroll reveals should render content immediately or use an opacity-only transition.
- Hover/tap animations should keep state styling even when scale or movement is removed.
- Infinite or looped decorative motion should stop or become static.
- Theme transitions should remain quick and readable without sweeping motion.

## Smoke Test

- Fresh load: content becomes visible and no animation gets stuck.
- Scroll: sections enter cleanly and no hidden state persists.
- Interaction: hover, tap, focus, and keyboard behavior still communicate state.
- Mobile: touch interactions work without hover.
- Reduced motion: movement is removed or simplified and content remains accessible.

## Guardrails

- Do not add animation that delays access to primary content.
- Do not make hover effects the only indication of interactivity.
- Do not animate every element in a section independently if it creates noise.
- Do not create infinite decorative loops unless they are lightweight and clearly part of the experience.
- Do not use animation to compensate for unclear layout or weak hierarchy.
