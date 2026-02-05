# Mobile Testing Checklist

## 🧪 Test on These Breakpoints

### 📱 Mobile (320px - 640px)
- [ ] Hero text readable and not cut off
- [ ] Capability cards stack vertically (1 column)
- [ ] Touch targets are large enough (min 44x44px)
- [ ] No horizontal scrolling
- [ ] Theme toggle accessible in top-right
- [ ] Product cards stack nicely
- [ ] Modal fills screen properly

### 📱 Tablet (640px - 1024px)
- [ ] Capability cards show 2 columns
- [ ] Content panels readable
- [ ] Modal centered with padding
- [ ] Footer layout responsive

### 💻 Desktop (1024px+)
- [ ] Capability cards show 5 columns
- [ ] 3-column layout for skills/proof/products
- [ ] Hero text large and impactful
- [ ] Hover states work smoothly

## 🔍 Interaction Tests

### Touch Interactions
- [ ] Tap capability card → smooth selection
- [ ] Tap product card → modal opens
- [ ] Tap outside modal → modal closes
- [ ] Theme toggle works with tap
- [ ] No accidental double-taps

### Animations
- [ ] Cards enter with stagger
- [ ] Selection indicator slides smoothly
- [ ] Content fades in/out
- [ ] Modal scales in/out
- [ ] No janky animations

### Theme Toggle
- [ ] Toggle works immediately
- [ ] No flash on page load
- [ ] Theme persists after reload
- [ ] All colors update correctly
- [ ] Status badges remain readable

## 🐛 Common Mobile Issues to Check

- [ ] Text not wrapping → add `break-words`
- [ ] Buttons too small → use `touch-manipulation`
- [ ] Content overflowing → check `overflow-x: hidden`
- [ ] Fonts too small → use responsive sizes
- [ ] Modal not scrollable → add overflow handling
- [ ] Images stretching → check aspect-ratio
- [ ] Z-index conflicts → review stacking context

## 🎯 User Flow Test

1. **First Visit**
   - [ ] Hero is eye-catching
   - [ ] Instructions clear
   - [ ] Cards look interactive

2. **Select Capability**
   - [ ] Card highlights clearly
   - [ ] Content appears smoothly
   - [ ] Layout doesn't break

3. **View Product**
   - [ ] Modal readable on small screen
   - [ ] Can scroll through content
   - [ ] Close button easy to tap

4. **Toggle Theme**
   - [ ] Switch is obvious
   - [ ] Transition is smooth
   - [ ] Preference saved

5. **Scroll to Bottom**
   - [ ] About section visible
   - [ ] Footer doesn't overlap
   - [ ] All content accessible

## 🌐 Browser Testing

### iOS Safari
- [ ] Theme toggle works
- [ ] Animations smooth
- [ ] Touch events responsive
- [ ] No rubber-band scroll issues

### Chrome Mobile
- [ ] Dark mode applies correctly
- [ ] Fonts render properly
- [ ] No layout shifts

### Firefox Mobile
- [ ] All features work
- [ ] Colors consistent
- [ ] Animations perform well

## 📏 Accessibility

- [ ] Text contrast meets WCAG AA
- [ ] Focus states visible
- [ ] Touch targets 44x44px minimum
- [ ] Can navigate with keyboard
- [ ] Screen reader friendly

## ✅ Final Checklist

- [ ] No horizontal scroll on any device
- [ ] All text readable at all sizes
- [ ] Buttons work on first tap
- [ ] Modal closes reliably
- [ ] Theme persists across sessions
- [ ] Performance feels snappy
- [ ] No console errors
- [ ] Looks intentional, not broken

---

## 🔧 Quick Fixes

**If text overflows:**
```jsx
className="break-words line-clamp-2"
```

**If buttons feel unresponsive:**
```jsx
className="touch-manipulation active:scale-95"
```

**If horizontal scroll appears:**
```css
body { overflow-x: hidden; }
```

**If modal doesn't scroll:**
```jsx
className="overflow-y-auto max-h-[90vh]"
```
