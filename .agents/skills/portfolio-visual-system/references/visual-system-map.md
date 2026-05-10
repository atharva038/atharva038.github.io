# Visual System Map

Use this reference when modifying the portfolio visual system. Keep it current with theme files, token roles, shared surface classes, 3D palette bridges, recipes, and validation checks.

## Key Files

- `src/index.css`: primary theme tokens, Tailwind `@theme` mappings, glass utilities, gradient text, base styles, theme option styling.
- `src/components/ThemeProvider.tsx`: applies `light`, `dark`, and `blkdev` classes to the document root and persists theme choice.
- `src/components/theme-context.ts`: theme type and context.
- `src/components/ThemeToggle.tsx`: theme selector UI and active/hover states.
- `src/components/ui/MagneticButton.tsx`: shared tactile button wrapper; visual styling usually comes from passed classes plus `.glass-button`.
- `src/components/SpotlightBackground.tsx`: spotlight/background layer behavior.
- `src/components/ui/three-system-core.ts`: `MODEL_PALETTES` for theme-aware 3D materials.
- `src/lib/noise-texture.ts`: generated texture/noise support.

## Active Themes

- `light`: BLK/DEV editorial light mode. Warm white background, black text, yellow accent, hard shadow/blocky border feel.
- `blkdev`: dark industrial mode. Near-black surfaces, white text, yellow accent, minimal blur, tighter contrast.
- `dark`: midnight glass mode. Near-black background, translucent glass, soft white accents, stronger blur.

All theme-level changes must be checked in all three.

## Token Roles

- `--theme-background`: page background.
- `--theme-foreground`: primary text.
- `--theme-accent`, `--theme-accent-muted`, `--theme-accent-dim`: text and subtle accent hierarchy.
- `--theme-electric`: strongest accent, usually yellow in BLK/DEV modes.
- `--theme-surface`, `--theme-surface-light`: component surface backgrounds.
- `--theme-border`, `--theme-border-hover`: visible boundaries.
- `--glass-*`: shared glass/card/button visual primitives.
- `--text-gradient-*`: heading gradient stops.
- `--spotlight-color`: spotlight/background accent.

## Audit Commands

Use before adding new visual values:

```bash
rg "#[0-9A-Fa-f]{3,8}|rgba?\\(|hsla?\\(" src
rg "--theme-|--glass-|text-gradient|glass-panel|glass-button|theme-option" src
rg "light|dark|blkdev|MODEL_PALETTES|useThemeModelPalette" src
```

Prefer moving repeated hard-coded colors into theme tokens.

## Common Recipes

### Add a theme token

1. Confirm the value represents a reusable concept, not a one-off style.
2. Add the token to `:root/.light`, `.dark`, and `.blkdev`.
3. Add a Tailwind `@theme` mapping only if components should use utility classes for it.
4. Update component styles to use the token.
5. Test all themes and mobile contrast.

### Style a new card or panel

1. Start with `.glass` or `.glass-panel`.
2. Use existing spacing, border radius, and border patterns from nearby components.
3. Keep shadow and hover effects stable so layout does not shift.
4. Avoid placing a full card inside another card.
5. Verify text remains readable over the 3D/background layer.

### Style a button

1. Start from `.glass-button` or the existing magnetic button composition.
2. Include hover, active/tap, focus, disabled, and loading states when relevant.
3. Use icons from the existing icon library when the action has a familiar symbol.
4. Ensure text fits on mobile and does not wrap awkwardly.

### Align 3D palette with DOM themes

1. Update `MODEL_PALETTES` in `three-system-core.ts`.
2. Match accents to theme tokens conceptually, especially `--theme-electric`.
3. Test 3D visibility at the opacity used by `Global3DBackground`.
4. Use the `threejs-portfolio-scene` skill for deeper model/material work.

## Contrast Checks

- Check normal text, muted text, active nav/menu items, buttons, cards, and form fields.
- Test light text on glass surfaces in `dark`.
- Test yellow accent text/background combinations in `light` and `blkdev`.
- Check focus rings and selected states.
- If a color combination feels borderline, change the token or add a clearer state indicator.

## Guardrails

- Do not create one-off color palettes in individual components.
- Do not dominate the UI with a new hue family.
- Do not use large decorative orbs, bokeh fields, or generic gradient backgrounds.
- Do not overuse blur; this portfolio has both editorial hard-shadow themes and glass themes.
- Do not reduce contrast to make the design feel softer.
- Do not change 3D palettes without checking matching DOM theme surfaces.
