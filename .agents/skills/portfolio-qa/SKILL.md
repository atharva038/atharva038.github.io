---
name: portfolio-qa
description: Verify changes to this Claude Code Folio portfolio before shipping. Use when checking build health, lint/type errors, responsive layout, visual regressions, console errors, broken links, contact form behavior, theme switching, Three.js canvas rendering, accessibility basics, SEO metadata, or deployment readiness for this Vite React TypeScript portfolio.
---

# Portfolio QA

## Overview

Use this skill as the project-local preflight for portfolio changes. Scale the checks to the risk of the change: tiny copy edits need lighter checks, while layout, theme, Three.js, form, or routing changes need browser verification.

## Quick Workflow

1. Inspect what changed with `git status --short` and focused file reads.
2. Read `references/qa-scenarios.md` for change-type checklists; it covers copy/data, component/layout, Three.js, contact form, accessibility/SEO, link, visual regression, and deployment scenarios.
3. Run the cheapest relevant static checks first.
4. For UI changes, run the app and inspect representative desktop and mobile views.
5. Capture console errors, broken links, accessibility issues, and obvious visual regressions.
6. Report failures with file paths, commands, and concise reproduction notes.

## Static Checks

Run these for most code changes:

```bash
npm run build
npm run lint
```

If only prose/data changed, `npm run build` is usually the minimum useful check because the app is TypeScript and data-driven.

## Automated Smoke Tests

When browser tooling is available, add or run a lightweight Playwright smoke check for important user flows:

- Page loads without console errors.
- Hero renders the owner's name from `src/data/portfolio-data.ts`.
- Navigation links scroll to sections.
- At least one project card opens and closes its modal.
- Contact form renders fields and submit control without sending a real message.

If no automated test exists yet, a one-off Playwright script is acceptable for verification. Prefer turning repeated smoke checks into a committed test or script once the same check is useful more than once.

## Browser Checks

Use browser verification for any change touching:

- Components under `src/components`
- Styles in `src/index.css`
- Theme files
- Three.js files under `src/components/ui`
- Project data that affects cards, modals, links, or images
- Contact form behavior

Check at least:

- Desktop: around `1440x900`
- Mobile: around `390x844`
- Light and dark theme when colors, background, text, cards, buttons, or 3D materials changed

Look for:

- Console errors or warnings caused by the change
- Text overflow, clipping, or overlap
- Broken responsive navigation
- Images missing or stretched
- Project modal scroll/close behavior
- Theme transition issues
- Three.js blank canvas, bad framing, or excessive motion
- Buttons and links that look clickable but do nothing

## Manual Interaction Checklist

- Navigate through header links.
- Open and close at least one project modal if project cards changed.
- Toggle theme if theme, color, background, or UI component styling changed.
- Test contact form fields if contact code changed; do not send a real message unless the user asks.
- Scroll from hero to footer if scroll animation, section layout, or 3D background changed.
- Check external links in `src/data/portfolio-data.ts` with `curl -I -L <url>` or a link-checker script when network access is available; watch for 4xx/5xx responses, redirect loops, and unexpected domains.

## Accessibility Workflow

For user-facing changes:

1. Keyboard test: start at the top of the page and press Tab through the header, hero actions, project cards, modals, theme controls, and contact form.
2. Confirm focus is visible, order is logical, no trap occurs, and Escape/close behavior works for modals or menus.
3. Inspect accessible names for icon-only buttons and controls.
4. Verify meaningful alt text for real images and labels or aria labels for form fields.
5. Run axe, Lighthouse, or the browser accessibility panel when available; record any violations that remain.

## Visual Regression Baseline

For layout, theme, animation, or Three.js changes, compare before/after screenshots when possible. Critical baseline views:

- Hero at desktop and mobile widths
- Skills section
- Projects grid
- Open project modal
- Contact form
- Light and dark theme when colors or theme behavior changed

Store temporary screenshots outside the repo unless the user asks to commit baselines. If this QA skill is used repeatedly for the same views, propose a small Playwright screenshot script.

## SEO And Deployment Readiness

Deployment readiness means more than a passing build. Verify:

- `npm run build` completes and produces `dist`.
- `vite.config.ts` base path matches the hosting target.
- `public/CNAME`, `public/sitemap.xml`, `public/robots.txt`, and Open Graph assets remain present and correct.
- Public image paths referenced by data/components exist under `public`.
- `package.json` deployment scripts still match the intended hosting flow.
- Page title, description, canonical/metadata, and social preview assets match the portfolio.

## Reporting Format

Report QA results as:

- Checks run
- Pass/fail status
- Issues found with file references or reproduction notes
- Checks not run and why

Do not hide failed checks. If a command cannot run because dependencies or browser tools are unavailable, say that plainly and continue with the next useful check.

## References

- `references/qa-scenarios.md`: focused checklists for common portfolio change types, including static checks, browser smoke tests, link checks, accessibility, visual regression, and deployment readiness.
