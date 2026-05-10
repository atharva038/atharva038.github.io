# QA Scenarios

Use this reference to choose checks based on what changed. Keep it current with the portfolio's common QA scenarios: copy/data, component/layout, Three.js, contact form, accessibility/SEO, link checking, visual regression, automated smoke tests, and deployment readiness.

## Copy Or Data Change

Relevant files often include `src/data/portfolio-data.ts`, `README.md`, and public metadata files.

Run:

- `npm run build`

Inspect:

- Project cards and modals still render.
- No missing image paths.
- External URLs pass `curl -I -L <url>` or a link-checker when network access is available.
- Text does not overflow cards on mobile.

## Component Or Layout Change

Relevant files often include `src/components/*.tsx` and `src/index.css`.

Run:

- `npm run build`
- `npm run lint`

Inspect:

- Desktop and mobile layouts.
- Header navigation.
- Section spacing.
- Text wrapping inside buttons, cards, and panels.
- Dark and light theme if colors changed.
- Before/after screenshots for hero, projects, and contact if the change is visual.

## Three.js Change

Relevant files often include `src/components/ui/Global3DBackground.tsx`, `Section3DModels.tsx`, `Hero3DChessPiece.tsx`, and `three-system*.ts`.

Run:

- `npm run build`
- Browser console check

Inspect:

- Canvas is not blank.
- Scene is framed on desktop and mobile.
- Scroll-linked objects enter and exit cleanly.
- Background does not obscure text.
- Motion is not distracting.
- Before/after screenshots show no major framing drift.

## Contact Form Change

Relevant files often include `src/components/Contact.tsx` and environment/config references.

Run:

- `npm run build`
- `npm run lint`

Inspect:

- Required field behavior.
- Button disabled/loading states.
- Error and success states.
- No real email submission unless explicitly requested.

## Automated Smoke Test

Run or create a lightweight browser smoke test when interaction behavior changes.

Inspect:

- Page loads without console errors.
- Owner name is visible in the hero.
- Header links move to the intended sections.
- Project modal opens and closes.
- Contact fields render and can receive input without submitting.

## Link Check

Relevant files often include `src/data/portfolio-data.ts`, `README.md`, and SEO metadata.

Run when network access is available:

- `curl -I -L <url>` for changed external links
- A small link-checker script if several links changed

Inspect:

- No 4xx/5xx responses.
- No redirect loops.
- Redirect target is the expected domain.
- Social/profile links resolve to the intended page.

## Accessibility And SEO Change

Relevant files often include `index.html`, `src/components/Navbar.tsx`, `src/components/ProjectModal.tsx`, `src/components/Contact.tsx`, and public metadata assets.

Inspect:

- Keyboard Tab order through header, cards, modals, theme controls, and form.
- Visible focus states.
- Accessible names for icon-only buttons.
- Real images have useful alt text.
- Form fields have labels or aria labels.
- Axe, Lighthouse, or browser accessibility panel when available.

## Visual Regression Change

Use for layout, theme, animation, or Three.js changes.

Inspect before/after screenshots for:

- Hero desktop and mobile
- Skills section
- Projects grid
- Open project modal
- Contact form
- Light and dark theme when relevant

## Deployment Change

Relevant files often include `package.json`, `vite.config.ts`, `public/CNAME`, `public/sitemap.xml`, and `public/robots.txt`.

Run:

- `npm run build`

Inspect:

- `dist` build path is produced.
- Base path is correct for the hosting target.
- Custom domain files remain present when needed.
- Sitemap, robots, Open Graph assets, and public image paths remain correct.
- Deployment scripts in `package.json` still match the hosting flow.
