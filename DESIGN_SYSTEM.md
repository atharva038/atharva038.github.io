# 🎨 Metro Portfolio - Professional Design System

## 📐 8px Spacing Scale

All spacing follows a consistent 8px base unit system for visual harmony:

```css
--spacing-1: 8px    /* Micro spacing - icons, borders */
--spacing-2: 16px   /* Small gaps - list items, inline elements */
--spacing-3: 24px   /* Medium gaps - card padding (small) */
--spacing-4: 32px   /* Standard gaps - card padding (medium) */
--spacing-5: 40px   /* Modal padding */
--spacing-6: 48px   /* Large gaps - section breaks */
--spacing-8: 64px   /* XL gaps - major sections (mobile) */
--spacing-12: 96px  /* XXL gaps - major sections (tablet) */
--spacing-16: 128px /* XXXL gaps - major sections (desktop) */
```

## 📏 Layout Constraints

### Maximum Widths
```css
--max-width-content: 1280px  /* Main content container */
--max-width-narrow: 960px    /* Narrow content (cards, forms) */
--max-width-text: 70ch       /* Optimal reading width */
```

### Grid System
```css
Desktop: 12-column grid
Tablet:  8-column grid
Mobile:  4-column grid

Gutter:
  Desktop: 24px (--gutter-desktop)
  Mobile:  16px (--gutter-mobile)
```

## 🎯 Section Padding Rules

### Vertical Spacing (Responsive)
```
Desktop (1024px+):  96px–128px  (spacing-12 to spacing-16)
Tablet (768-1023):  64px–96px   (spacing-8 to spacing-12)
Mobile (< 768px):   48px–64px   (spacing-6 to spacing-8)
```

### Card & Modal Padding
```
Cards:  24px–32px (spacing-3 to spacing-4)
Modals: 32px–40px (spacing-4 to spacing-5)
```

## 📝 Typography System

### Line Heights
```css
--line-height-tight: 1.25     /* Headings */
--line-height-normal: 1.6     /* Body text */
--line-height-relaxed: 1.75   /* Long-form content */
```

### Font Sizes (Responsive)
```
Hero H1:
  Mobile:  48px
  Desktop: 96px

H2 Titles:
  Mobile:  24px
  Desktop: 40px

Body Text:
  Mobile:  16px
  Desktop: 20px

Small Text:
  Mobile:  14px
  Desktop: 16px

Labels:
  Mobile:  10px
  Desktop: 12px
```

### Heading Spacing
```
Margin-bottom: 16px–24px (spacing-2 to spacing-3)
```

### Paragraph Spacing
```
Line-height: 1.6–1.75
Max-width: 70ch
Gap between paragraphs: 16px (spacing-2)
```

## 🧱 Alignment Principles

### Text Alignment Rules
✅ **Center-align:**
- Hero headlines
- CTAs (Call-to-Action buttons)
- Section labels
- Terminal/Station identifiers

✅ **Left-align:**
- Body paragraphs
- Lists
- Form labels
- Multi-line text blocks

❌ **Avoid:**
- Random centering of body text
- Right-aligned primary content
- Inconsistent alignment patterns

### Vertical Rhythm
```
Maintain consistent spacing between related elements:
- Icon + Text: 8px–16px gap
- Title + Subtitle: 16px–24px gap
- Section breaks: 48px–96px gap
```

### Horizontal Alignment
```
Align elements to the same vertical axis:
- Cards in a grid
- Text and icons in lists
- Buttons and form fields
```

## 🎨 Component Spacing

### Buttons
```
Padding:
  Mobile:  spacing-3 (24px) horizontal, spacing-2 (16px) vertical
  Desktop: spacing-4 (32px) horizontal, spacing-3 (24px) vertical

Gap between icon and text: spacing-1 to spacing-2 (8-16px)
```

### Cards
```
Padding: spacing-4 to spacing-8 (32-64px)
Gap between cards: spacing-3 to spacing-4 (24-32px)
Border radius: 24px (rounded-3xl)
```

### Forms
```
Input padding: spacing-2 to spacing-3 (16-24px)
Field gap: spacing-3 (24px)
Label margin: spacing-1 (8px)
```

## 🚫 Anti-Patterns to Avoid

❌ **Don't:**
- Use random padding values (e.g., 13px, 27px, 41px)
- Create uneven margins between sections
- Stretch text edge-to-edge without containers
- Mix left/center alignment inconsistently
- Add excessive full-width sections
- Float elements without proper alignment
- Use arbitrary spacing not in the 8px scale

✅ **Do:**
- Always use spacing variables from the 8px system
- Maintain consistent section padding
- Use max-width containers (1280px)
- Keep text within readable widths (70ch)
- Align related elements consistently
- Test responsive spacing on all breakpoints

## 📱 Responsive Breakpoints

```css
Mobile:  < 768px
Tablet:  768px - 1023px
Desktop: 1024px+
```

## 🎯 Usage Examples

### Section Layout
```tsx
<section style={{
  paddingTop: isMobile ? 'var(--spacing-8)' : 'var(--spacing-12)',
  paddingBottom: isMobile ? 'var(--spacing-8)' : 'var(--spacing-12)',
  paddingLeft: 'var(--gutter-mobile)',
  paddingRight: 'var(--gutter-mobile)',
}}>
  <div style={{ maxWidth: 'var(--max-width-content)' }}>
    {/* Content */}
  </div>
</section>
```

### Card Component
```tsx
<div style={{
  padding: isMobile ? 'var(--spacing-4)' : 'var(--spacing-6)',
  maxWidth: 'var(--max-width-narrow)',
  marginBottom: 'var(--spacing-4)',
}}>
  {/* Card content */}
</div>
```

### Typography
```tsx
<h1 style={{
  fontSize: isMobile ? '48px' : '96px',
  lineHeight: 'var(--line-height-tight)',
  marginBottom: 'var(--spacing-3)',
}}>
  Heading
</h1>

<p style={{
  fontSize: isMobile ? '16px' : '20px',
  lineHeight: 'var(--line-height-relaxed)',
  maxWidth: 'var(--max-width-text)',
}}>
  Body text with optimal reading width
</p>
```

## 🎭 Animation & Motion

```
Duration:
  Fast:   200-300ms (micro interactions)
  Normal: 400-600ms (standard transitions)
  Slow:   800-1200ms (complex animations)

Easing:
  Standard: ease-in-out
  Enter:    ease-out
  Exit:     ease-in
```

---

**Last Updated:** December 25, 2025  
**Version:** 1.0.0
