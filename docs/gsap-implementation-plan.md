# GSAP Implementation Plan

This document is the working plan for adding GSAP to the portfolio with high polish and low motion debt. The site already uses Framer Motion for component motion, Lenis for smooth scrolling, and Three.js for background scenes, so GSAP should own timeline orchestration and scroll-scrubbed animation instead of replacing everything.

## Motion Ownership

- GSAP: scroll timelines, pinned/scrubbed moments, multi-element entrance sequences, marquee loops, and DOM-to-Three.js coordination.
- Framer Motion: local React state transitions, hover/tap feedback, modals, button microinteractions, and small conditional UI.
- Three.js: canvas object animation through React Three Fiber and `useFrame`.
- CSS: simple color transitions, hover colors, theme tokens, reduced-motion baseline rules.

## Guardrails

- Respect `prefers-reduced-motion` for every GSAP animation.
- Animate `transform`, `opacity`, and clip-like reveal properties where possible.
- Avoid animating layout properties that can cause text overlap or page jump.
- Avoid competing scroll listeners; keep Lenis and ScrollTrigger synced through the shared smooth-scroll setup.
- Use one reusable GSAP setup layer, not scattered plugin registration.
- Clean up GSAP contexts on React unmount.
- Keep mobile motion lighter than desktop motion.

## Phase 1: GSAP Foundation

Status: complete

Files:
- `src/lib/gsap.ts`
- `src/hooks/useGsapContext.ts`
- `src/components/SmoothScroll.tsx`

Implementation:
- Centralize `gsap` and `ScrollTrigger` registration.
- Add a shared reduced-motion query helper.
- Add a React hook that wraps `gsap.context()` and automatically reverts animations on unmount.
- Update existing Lenis/ScrollTrigger integration to import from the shared foundation.

Acceptance:
- `npm run build` passes.
- `npm run lint` passes.
- Existing smooth scrolling still works.
- No duplicate GSAP registration appears in app code.

## Phase 2: Projects Showcase Reveal

Status: complete

Files:
- `src/components/projects/ProjectsGrid.tsx`
- `src/components/ProjectCard.tsx`
- optional: `src/components/Projects.tsx`

Implementation:
- Replace the current repeated Framer viewport reveals in `ProjectsGrid` with one GSAP section timeline.
- Add stable selectors/data attributes for featured and standard project cards.
- Stagger cards with subtle `y`, `opacity`, and scale depth.
- Keep card hover/tap behavior in existing React/Framer/CSS patterns.
- Add reduced-motion behavior that renders cards immediately.

Motion details:
- Featured top card: `opacity: 0 -> 1`, `y: 36 -> 0`, `scale: 0.985 -> 1`.
- Middle cards: stagger by `0.08s`, smaller `y` travel.
- Bottom featured card: enters after grid cards but before section leaves viewport.

Acceptance:
- No card stays hidden if JavaScript timing is interrupted.
- Mobile cards reveal without excessive travel.
- Project modal still opens from every card.

## Phase 3: Experience Timeline Draw

Status: complete

Files:
- `src/components/Experience.tsx`
- `src/components/experience/ExperienceTimelineItem.tsx`

Implementation:
- Replace the Framer line height animation with a GSAP `ScrollTrigger` timeline.
- Draw the vertical line as the section scrolls through the viewport.
- Reveal timeline items in sequence.
- Add active/current item emphasis when each item enters the center band.
- Keep click-to-expand details with Framer Motion because it is state-driven.

Motion details:
- Timeline fill uses `scaleY` from top origin instead of `height`.
- Items reveal with `x: -24`, `opacity`, and small icon scale.
- Reduced motion shows the full line and all items immediately.

Acceptance:
- Timeline line aligns with nodes at desktop and mobile sizes.
- Expanding items does not break ScrollTrigger after layout changes.
- `ScrollTrigger.refresh()` runs when expanded content changes if needed.

## Phase 4: Hero Entrance Timeline

Status: complete

Files:
- `src/components/Hero.tsx`
- `src/components/hero/DarkHeroLayout.tsx`
- `src/components/hero/LightHeroLayout.tsx`
- `src/components/hero/HeroStatusBar.tsx`

Implementation:
- Build one hero entrance timeline per visual layout.
- Animate headline, support copy, CTAs, status indicators, and chess visual as a coordinated opening.
- Keep the timeline short and readable; primary content should be available quickly.

Motion details:
- Headline: masked or line-based reveal if markup supports it cleanly.
- CTAs: staggered opacity and `y`.
- Chess visual: subtle scale/rotate only.
- Reduced motion: no travel; content appears immediately.

Acceptance:
- First viewport remains stable with no content overlap.
- Light and dark hero layouts both feel intentional.
- Mobile hero remains fast and legible.

## Phase 5: Skills Marquee Upgrade

Status: complete

Files:
- `src/components/Skills.tsx`
- `src/components/skills/SkillsMarqueeRow.tsx`

Implementation:
- Use GSAP for seamless infinite horizontal loops.
- Pause or slow the row on hover/focus.
- Optionally modulate loop speed slightly by scroll velocity.
- Disable loop motion for reduced-motion users.

Motion details:
- Rows move at different speeds.
- Reverse alternating rows if the current layout supports it.
- No layout shift when images load.

Acceptance:
- Loop is seamless on desktop and mobile.
- Hover pause works without trapping pointer behavior.
- Reduced motion keeps skills visible and static.

## Phase 6: Navigation Transition Polish

Status: planned

Files:
- `src/App.tsx`
- `src/components/Navbar.tsx`

Implementation:
- Consider replacing the current Framer page-transition overlay with a GSAP timeline only if it improves timing.
- Keep hash navigation fast: cover, jump, reveal.
- Do not block content longer than necessary.

Acceptance:
- Reduced motion jumps immediately.
- Browser history/hash behavior remains correct.
- No section is obscured after transition completes.

## Phase 7: Three.js Scroll Sync

Status: planned

Files:
- `src/components/ui/Global3DBackground.tsx`
- `src/components/ui/Section3DModels.tsx`

Implementation:
- Convert manual page-progress mapping into section-aware GSAP/ScrollTrigger control only after DOM timelines are stable.
- Keep actual mesh animation in Three.js.
- Use GSAP to set target values or section states, not to fight `useFrame`.

Acceptance:
- Canvas remains nonblank.
- Desktop and mobile framing remain correct.
- Reduced motion lowers or disables scroll-driven movement.

## Verification Checklist

- Run `npm run build`.
- Run `npm run lint`.
- Inspect desktop around `1440x900`.
- Inspect mobile around `390x844`.
- Test light and dark themes when visuals are touched.
- Test reduced motion for every new GSAP phase.
- Check console for ScrollTrigger or React warnings.
