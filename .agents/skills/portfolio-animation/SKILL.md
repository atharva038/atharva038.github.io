---
name: portfolio-animation
description: Create, refine, debug, and performance-tune animations in this Claude Code Folio portfolio. Use when working on Framer Motion variants, scroll reveals, hover/tap interactions, magnetic buttons, theme transitions, loading/entrance motion, reduced-motion behavior, section choreography, or animation-related files such as MagneticButton.tsx, global-ripple.tsx, ThemeProvider.tsx, ThemeToggle.tsx, SectionController.tsx, LazyOnVisible.tsx, and animated React components.
---

# Portfolio Animation

## Overview

Use this skill to keep the portfolio's motion polished, fast, and intentional. Motion should support the chess-strategy identity: precise, responsive, confident, and calm rather than noisy or decorative.

## Quick Workflow

1. Inspect the component being animated and any existing motion helpers near it.
2. Read `references/animation-map.md` when changing shared animation patterns or motion-heavy sections; it must map the project's animation files, common recipes, audit commands, and guardrails.
3. Audit existing Framer Motion patterns before introducing new animation systems.
4. Keep DOM animation separate from Three.js scene animation unless the task intentionally coordinates both.
5. Add or preserve a reduced-motion fallback for every new animation.
6. Verify with `npm run build` and `npm run lint`; for visual changes, inspect desktop and mobile behavior in the browser.

## Existing Pattern Audit

Before creating a new animation pattern:

- Search for existing Framer Motion usage with `rg "framer-motion|motion\\.|variants|whileHover|whileTap|useReducedMotion|AnimatePresence" src`.
- Inspect nearby components first, then shared surfaces such as `MagneticButton.tsx`, `global-ripple.tsx`, `ThemeProvider.tsx`, `ThemeToggle.tsx`, `SectionController.tsx`, and `LazyOnVisible.tsx`.
- Check `src/index.css` for existing transition utilities, reduced-motion CSS, and theme transition rules.
- Reuse timing, easing, variant names, and interaction patterns when the behavior is similar.
- Add a new helper or abstraction only when at least two call sites genuinely need it or the local component would become hard to read.

## Motion Principles

- Use motion to clarify hierarchy, state, navigation, or interactivity.
- Keep timing crisp: most UI transitions should feel complete within `150ms` to `450ms`.
- Use subtle distance and opacity for reveals; avoid huge flying movements.
- Use spring motion for tactile interactions such as cards, buttons, toggles, and magnetic controls.
- Avoid animating layout-critical properties in ways that cause text overlap or page jump.
- Prefer `transform` and `opacity` over animating expensive layout properties.
- Keep repeated section animations consistent so the portfolio feels designed, not assembled.

## Framer Motion Rules

- Use `framer-motion` for React component animation.
- Define shared variants when multiple elements follow the same timing.
- Use `whileHover`, `whileTap`, and `transition` for local interactions.
- Use viewport-triggered animation carefully; do not make content inaccessible before animation runs.
- Avoid React state updates on every pointer move unless throttled or contained inside an existing helper.
- Keep animations deterministic enough that QA can reproduce them.

## Reduced Motion

All new animations must include a reduced-motion fallback. When adding or revising animation:

- Use Framer Motion's `useReducedMotion`, CSS `@media (prefers-reduced-motion: reduce)`, or an equivalent existing project pattern.
- Reduce travel distance and disable looping motion for users who prefer less motion.
- Keep essential state changes visible even when animation is reduced.
- Do not rely on animation alone to communicate success, error, active state, or navigation.
- Test with `prefers-reduced-motion: reduce` enabled when the change affects entrance, scroll, looped, or page-level motion.

## Performance Checklist

- Animate `transform` and `opacity` where possible.
- Avoid animating large blurred shadows, filters, or backdrop effects repeatedly.
- Keep infinite animations rare and lightweight.
- Avoid starting many viewport observers for simple repeated list items if one section-level pattern is enough.
- Check mobile touch behavior for hover-only assumptions.
- Ensure animations do not fight the fixed Three.js background or global ripple layer.

## Validation

Run for animation code changes:

```bash
npm run build
npm run lint
```

`npm run build` catches TypeScript issues from Framer Motion props and variants because this project builds with `tsc -b`. `npm run lint` catches hook and React usage mistakes that often appear in animation work.

For visual animation changes, also inspect:

- Desktop around `1440x900`
- Mobile around `390x844`
- Light and dark theme when color or theme transitions changed
- Console output for animation/runtime warnings
- Reduced motion mode for entrance, scroll, looped, or page-level motion

Look for layout shift, stutter, stuck hidden content, hover states that fail on touch, overlapping text, and distracting repeated motion.

## Animation Smoke Test

For meaningful animation changes, perform a lightweight browser smoke test:

- Load the page fresh and confirm entrance animations finish with content visible.
- Scroll from hero through footer and confirm no section stays hidden or jumps.
- Hover and tap changed interactive elements; verify touch behavior still works without hover.
- Toggle theme if animation touches colors, overlays, or global transitions.
- Enable reduced motion and confirm movement is removed or simplified while state changes remain clear.
- Capture screenshots before and after the animated state when the change affects a critical hero, modal, nav, or project card interaction.

## References

- `references/animation-map.md`: project-specific animation surfaces, audit commands, common recipes, reduced-motion expectations, and guardrails.
