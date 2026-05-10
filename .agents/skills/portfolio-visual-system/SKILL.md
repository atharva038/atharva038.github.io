---
name: portfolio-visual-system
description: Create, refine, debug, and validate the visual system for this Claude Code Folio portfolio. Use when working on dark/light/blkdev themes, CSS color tokens, Tailwind theme variables, glass effects, gradients, magnetic button styling, background textures, theme switching, contrast, 3D model palettes, and making new UI match the existing design across files such as src/index.css, ThemeProvider.tsx, ThemeToggle.tsx, theme-context.ts, MagneticButton.tsx, SpotlightBackground.tsx, noise-texture.ts, and three-system-core.ts.
---

# Portfolio Visual System

## Overview

Use this skill to keep the portfolio visually coherent as new sections, components, themes, and effects are added. Treat `src/index.css` theme variables as the source of truth for DOM styling, and keep Three.js palettes aligned through `three-system-core.ts`.

## Quick Workflow

1. Inspect the component being changed and the relevant visual tokens in `src/index.css`.
2. Read `references/visual-system-map.md` when changing theme tokens, glass styles, gradients, button styling, backgrounds, or 3D palettes; it maps key files, token roles, audit steps, recipes, and validation checks.
3. Reuse existing CSS variables and utility classes before adding new colors or one-off effects.
4. Test all active themes: `light`, `dark`, and `blkdev`.
5. Verify with `npm run build` and `npm run lint`; for visual changes, inspect desktop/mobile screenshots and browser console output.

## Visual Identity

The portfolio should feel strategic, precise, technical, and founder-builder oriented. Prefer high-contrast editorial structure, restrained glass, tactical yellow accents, clean monochrome surfaces, and crisp interaction states.

Avoid generic portfolio styling: rainbow gradients, soft pastel sections, floating decorative blobs, oversized marketing cards, unrelated neon cyberpunk effects, and one-off colors that bypass tokens.

## Token Rules

- Prefer existing CSS variables such as `--theme-background`, `--theme-foreground`, `--theme-electric`, `--glass-bg`, `--glass-border`, and `--text-gradient-*`.
- Add new tokens only when a value is used across multiple components or is part of a theme-level concept.
- When adding a token, define it for `:root/.light`, `.dark`, and `.blkdev`.
- Keep Tailwind `@theme` mappings aligned when a token should be available as a utility color.
- Keep 3D palette changes in `MODEL_PALETTES` visually compatible with matching DOM theme tokens.
- Do not hard-code theme-specific colors inside components unless there is a narrow, documented reason.

## Surface And Glass Rules

- Use `.glass`, `.glass-panel`, and `.glass-button` before inventing new panel styles.
- Keep borders visible enough in all themes.
- Use blur carefully; `light` and `blkdev` intentionally use little or no glass blur while `dark` supports stronger glassmorphism.
- Avoid nesting card-like glass surfaces inside other cards.
- Preserve stable dimensions and spacing so hover, shadow, and magnetic motion do not shift layout.

## Gradient And Texture Rules

- Use `text-gradient-heading` for heading text that should inherit theme gradients.
- Keep gradients subtle and token-driven.
- Use background textures only when they improve depth without reducing readability.
- Avoid decorative orbs, bokeh blobs, and large single-hue gradient washes.
- Check that texture/noise effects do not muddy text contrast on mobile.

## Contrast And Accessibility

For every visual change:

- Check text/background contrast in all active themes.
- Verify focus states remain visible for buttons, links, menus, and theme controls.
- Ensure hover-only styling has an equivalent active/focus state.
- Avoid relying on color alone for selected, disabled, error, or success states.
- Inspect icon-only controls for accessible names when visual styling changes.

## Validation

Run:

```bash
npm run build
npm run lint
```

For meaningful visual changes, inspect:

- Desktop around `1440x900`
- Mobile around `390x844`
- `light`, `dark`, and `blkdev` themes
- Hero, navigation, project cards/modal, skills, contact, and any changed component
- Browser console for runtime styling/theme errors

Look for low contrast, washed-out accents, broken focus states, text clipping, layout shift on hover, inconsistent shadows, excessive blur, and one-off colors.

## Screenshot Baseline

For theme-wide or shared visual changes, capture before/after screenshots when possible:

- Hero in each theme
- Project grid and open project modal
- Contact form
- Theme dropdown/menu
- A glass button and magnetic button state

Store temporary screenshots outside the repo unless the user asks to commit visual baselines.

## References

- `references/visual-system-map.md`: project-specific theme map, token roles, audit commands, recipes, contrast checks, and visual guardrails.
