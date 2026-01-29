# 🚇 Metro Portfolio - A Journey Through My Career

An interactive, experience-driven personal portfolio website with the concept of a **"Metro Journey Through My Career"**. The website feels like riding a metro train through different stations, each representing a section of the portfolio.

## ✨ Features

### 🎭 Interactive Experience
- **Horizontal Scroll Journey** - Navigate through the portfolio like a metro ride (desktop)
- **Vertical Scroll** - Mobile-optimized experience with smooth scrolling
- **3D Metro Train** - Low-poly stylized train built with Three.js (desktop only)
- **Station-based Sections** - Each section is a unique "station" in your journey

### 🛤️ Stations (Sections)
1. **Start Station** - Introduction with metro gate opening animation
2. **Skills Station** - Skills displayed as metro route boards
3. **Projects Central** - Main junction with project cards as sub-stations
4. **Achievements Junction** - Billboard-style startup/hackathon achievements
5. **Experience Line** - Year-based timeline showing career progression
6. **Final Terminal** - Contact section with train doors opening animation

### 🎨 Visual Design
- Dark theme with metro-inspired accent colors
- Electric blue, yellow, green palette
- Clean sans-serif typography
- Station board style headings
- Smooth animations and transitions

### ⚡ Performance
- Lazy-loaded 3D components
- WebGL fallback for unsupported browsers
- Mobile 2D SVG fallback
- Reduced motion support
- Optimized bundle splitting

### ♿ Accessibility
- Keyboard navigation support
- Reduced motion preference detection
- Skip journey option
- Screen reader friendly

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js + React Three Fiber + @react-three/drei
- **Animations:** GSAP + ScrollTrigger + Framer Motion
- **State Management:** Zustand
- **Language:** TypeScript

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎮 Controls

### Desktop
- **Scroll** - Move through stations
- **Arrow Keys** - Navigate between stations
- **Mini-map** - Click to jump to any station
- **Skip Journey** - Jump to contact section

### Mobile
- **Swipe/Scroll** - Navigate vertically through stations
- **Tap** - Interact with elements

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles and CSS variables
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main page component
├── components/
│   ├── MetroPortfolio.tsx    # Main portfolio orchestrator
│   ├── stations/             # Station (section) components
│   │   ├── IntroStation.tsx
│   │   ├── SkillsStation.tsx
│   │   ├── ProjectsStation.tsx
│   │   ├── AchievementsStation.tsx
│   │   ├── TimelineStation.tsx
│   │   └── ContactStation.tsx
│   ├── three/                # 3D components
│   │   ├── Scene.tsx
│   │   └── MetroTrain.tsx
│   └── ui/                   # UI components
│       ├── MiniMap.tsx
│       ├── ProjectModal.tsx
│       └── LoadingScreen.tsx
├── data/
│   └── portfolio.ts          # Portfolio content data
├── hooks/
│   └── useScroll.ts          # Scroll and responsive hooks
└── store/
    └── useMetroStore.ts      # Global state management
```

## 🎨 Customization

### Update Personal Info
Edit `src/data/portfolio.ts` to update:
- Skills and skill categories
- Projects with details
- Achievements and milestones
- Timeline/experience
- Contact information

### Color Scheme
Modify CSS variables in `src/app/globals.css`:
```css
:root {
  --metro-blue: #00a8e8;
  --metro-yellow: #ffd700;
  --metro-green: #00d68f;
}
```

## 📱 Responsive Design

- **Desktop (>768px):** Full 3D experience with horizontal scrolling
- **Mobile (<768px):** 2D experience with vertical scrolling, 3D disabled

## 🔧 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Made with ❤️ and 🚇 by Atharva Joshi
