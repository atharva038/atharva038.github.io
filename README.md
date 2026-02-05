# Skill → Proof → Product Portfolio

A calm-tech, system-driven interactive developer portfolio that proves skills through real products.

## Concept

Users select a capability → See proof of skills → Explore real products built using those skills.

**No scrolling required to understand value.**

## Tech Stack

- React 19 + Vite
- Tailwind CSS
- Framer Motion
- Local JSON data layer

## Features

- **Capability-driven navigation**: Focus on what you can do, not generic sections
- **Dynamic filtering**: Skills and products update based on selected capability
- **Product-grade design**: Minimal, calm, and powerful
- **Instant value**: Understand strengths in under 10 seconds

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── data/            # JSON data sources
│   ├── capabilities.json
│   ├── skills.json
│   └── products.json
├── App.jsx          # Main application
└── index.css        # Global styles
```

## Customization

Edit the JSON files in `src/data/` to customize:

- **capabilities.json**: Your main skill categories
- **skills.json**: Detailed breakdown of each skill
- **products.json**: Real products you've built

## Design Philosophy

- Calm-tech aesthetic
- Dark-first theme
- Clear visual hierarchy
- Motion = state change feedback only
- No gimmicks, just clarity

## Deploy

This portfolio is optimized for GitHub Pages deployment.

```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

---

Built with React + Vite + Tailwind + Framer Motion
