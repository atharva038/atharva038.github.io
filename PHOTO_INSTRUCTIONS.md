# Add Your Profile Photo

To add your profile photo to the About section:

1. **Add your photo to the public folder:**
   - Place your photo in: `public/profile.jpg` (or `.png`, `.webp`)
   - Recommended size: 256x256px or larger (square)
   - Keep file size under 500KB

2. **Update the photo path in About.jsx:**

Replace this line in `src/components/About.jsx`:
```jsx
src="/api/placeholder/128/128"
```

With:
```jsx
src="/effective-portfolio/profile.jpg"
```

3. **Alternative: Use a URL**
If you prefer to host your photo elsewhere (like GitHub, LinkedIn):
```jsx
src="https://your-url.com/photo.jpg"
```

## Current Placeholder

The component shows a 👨‍💻 emoji as fallback if the image doesn't load.
