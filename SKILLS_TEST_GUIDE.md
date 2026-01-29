# Skills Station Quick Test Guide

## 🎯 What to Test

### ✅ Visual Check
1. **Refresh browser** at `localhost:3000`
2. **Click "ENTER"** to start journey
3. **Scroll/Navigate to Skills Station** (Station 01)
4. **Verify metro lines appear** with colored indicators

### ✅ Metro Lines Check
Should see **4 horizontal lines**:
- **Blue line** (FRONTEND LINE) - 6 stations
- **Green line** (BACKEND LINE) - 3 stations  
- **Yellow line** (DATABASE LINE) - 2 stations
- **Purple line** (TOOLS LINE) - 4 stations

---

## 🖱️ Interaction Tests

### Desktop Hover Tests
1. **Hover over a line** → Line should highlight (20% → 60% opacity)
2. **Hover over a station node** → Should:
   - Scale up (1 → 1.3)
   - Show enhanced glow
   - Display skill label below
   - Show pulsing ring animation

### Click/Tap Tests
3. **Click any station node** → Modal should open showing:
   - Skill name (large)
   - Description
   - Experience level
   - Project reference
   - "GOT IT" button

4. **Click "GOT IT" or backdrop** → Modal should close

### View Toggle Test
5. **Click "SHOW LIST VIEW"** → Should:
   - Switch to grid of cards
   - Show all skills as chips
   - Button text changes to "← SHOW MAP VIEW"

6. **Click "← SHOW MAP VIEW"** → Should return to metro map

---

## 📱 Mobile Tests

### Responsive Behavior
7. **Resize browser to <768px** → Should show:
   - Smaller station nodes (14px)
   - Labels always visible (not just hover)
   - Same animations
   - Tap to open modal

---

## 🎬 Animation Tests

### Entry Animations (when you reach Skills Station)
8. **Watch the sequence**:
   - Header fades in from top (0.2s)
   - Lines draw from left to right (staggered)
   - Station nodes pop in one by one
   - Should feel smooth, not jarring

### Line Drawing
9. **Verify lines animate** from left → right (scaleX animation)
10. **Check stagger timing** - each line starts slightly after previous

### Station Entrance
11. **Verify nodes appear** with scale + opacity animation
12. **Check stagger** - stations appear one after another on same line

---

## 🎨 Visual Quality Checks

### Colors
- [ ] **Blue** (#00a8e8) - Frontend Line
- [ ] **Green** (#00d68f) - Backend Line
- [ ] **Yellow** (#ffd700) - Database Line
- [ ] **Purple** (#a55eea) - Tools Line

### Spacing
- [ ] Lines have **64px gap** between them
- [ ] Stations evenly distributed on lines
- [ ] Labels positioned **8px below** nodes
- [ ] Clean, professional spacing throughout

### Typography
- [ ] Heading: Large, bold, metro font
- [ ] Line names: Uppercase, letter-spaced
- [ ] Skill labels: Small, clean, readable

---

## 🐛 Common Issues to Check

### Issue: Modal not opening
**Fix**: Check browser console for errors

### Issue: Hover not working
**Fix**: Ensure you're on desktop (>768px width)

### Issue: Lines not drawing
**Fix**: Make sure you've scrolled to Skills Station (currentStation === 1)

### Issue: Animations stuttering
**Fix**: Check performance tab in DevTools

---

## 💡 What You Should See

### Map View (Default)
```
THE ROUTES I'VE MASTERED
Every product I build travels through these lines.

[SHOW LIST VIEW →]

● FRONTEND LINE
○───○───○───○───○───○
HTML CSS JS React Next Tail

● BACKEND LINE  
○───○───○
Node Express REST

● DATABASE LINE
○───○
Mongo PostgreSQL

● TOOLS LINE
○───○───○───○
Git GitHub Docker CI/CD
```

### List View (Toggle)
```
THE ROUTES I'VE MASTERED

[← SHOW MAP VIEW]

┌─────────────────┐  ┌─────────────────┐
│ ● FRONTEND LINE │  │ ● BACKEND LINE  │
│ [HTML] [CSS]    │  │ [Node] [Express]│
│ [JS] [React]... │  │ [REST APIs]     │
└─────────────────┘  └─────────────────┘

┌─────────────────┐  ┌─────────────────┐
│ ● DATABASE LINE │  │ ● TOOLS LINE    │
│ [MongoDB]       │  │ [Git] [GitHub]  │
│ [PostgreSQL]    │  │ [Docker][CI/CD] │
└─────────────────┘  └─────────────────┘
```

### Modal (Click Any Skill)
```
┌─────────────────────────────────┐
│  REACT                     ×    │
│                                 │
│  DESCRIPTION                    │
│  Component architecture & hooks │
│                                 │
│  EXPERIENCE LEVEL               │
│  Advanced                       │
│                                 │
│  USED IN                        │
│  Dashboard Systems              │
│                                 │
│  [GOT IT]                       │
└─────────────────────────────────┘
```

---

## ⚡ Performance Expectations

- **Initial load**: <100ms
- **Animation FPS**: 60fps (smooth)
- **Hover response**: Instant (<16ms)
- **Modal open**: <300ms
- **View toggle**: <200ms

---

## ♿ Accessibility Tests

### Keyboard Navigation
13. **Tab through stations** → Should highlight each node
14. **Press Enter on node** → Should open modal
15. **Press Esc** → Should close modal
16. **Tab in modal** → Should focus button

### Screen Reader (Optional)
17. Use VoiceOver (Mac) or NVDA (Windows)
18. Should announce: "Skill name, station, clickable"

---

## 🎯 Success Criteria

You'll know it's working perfectly when:

- [x] All 4 lines visible with correct colors
- [x] Stations distributed evenly on lines
- [x] Lines draw smoothly from left to right
- [x] Stations pop in with stagger effect
- [x] Hover highlights lines and nodes (desktop)
- [x] Labels appear on hover (desktop) or always (mobile)
- [x] Clicking opens modal with skill details
- [x] Modal closes on button click or backdrop click
- [x] List view toggle works both ways
- [x] Animations are smooth (60fps)
- [x] No console errors
- [x] Responsive on mobile (<768px)

---

## 📞 Quick Fixes

### If lines don't appear:
```bash
# Check if at correct station
console.log(currentStation) // Should be 1
```

### If animations lag:
- Close other browser tabs
- Check GPU acceleration in browser settings
- Reduce animation complexity if needed

### If colors wrong:
- Check CSS variables in `globals.css`
- Verify line colors in `SKILL_LINES` array

---

## 🚀 Next Actions

Once everything works:
1. ✅ Customize skill data with YOUR skills
2. ✅ Update descriptions to match your experience
3. ✅ Add real project references
4. ✅ Adjust experience levels honestly
5. ✅ Test on different devices
6. ✅ Show to friends for feedback

---

**Test Time**: ~5 minutes  
**Expected Result**: 🟢 All features working  
**Wow Factor**: ⭐⭐⭐⭐⭐ Portfolio standout
