# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Clean build and dependencies
npm run clean

# Clean and reinstall dependencies
npm run reinstall
```

## Project Architecture

This is a React + Vite portfolio/business website for ItayOst with the following architecture:

### Core Stack
- **React 18.3** - UI framework
- **Vite 5.3** - Build tool and dev server
- **Framer Motion 11** - Animation library
- **Lucide React** - Icon library

### Project Structure
The application follows a component-based architecture with:

- **`/src/components/`** - React components organized by feature
  - Each component has its own folder with `.jsx` and `.css` files
  - Common components in `/common/` (Button, SectionTitle, ParticleBackground)
  - Main sections: Hero, Services, Portfolio, Features, Process, Contact, Footer
  - WhatsAppFAB - Floating action button for WhatsApp contact

- **`/src/data/`** - Static data modules
  - services.js, portfolio.js, features.js, process.js
  - Each exports arrays of objects with content for respective sections

- **`/src/hooks/`** - Custom React hooks
  - `useIntersectionObserver` - Scroll-triggered animations (one-time trigger by default)
  - `useMouseParallax` - Mouse movement parallax effects
  - `useScrollParallax` - Scroll-based parallax effects

- **`/src/utils/`** - Utility modules
  - `constants.js` - Site configuration, colors, breakpoints, contact info
  - `animations.js` - Framer Motion animation variants

### Key Architectural Patterns

1. **Component Organization**: Each major section is a self-contained component with its own styles
2. **Data Separation**: Content is separated from components in `/data/` modules
3. **Animation System**: Uses Framer Motion with centralized animation variants
4. **Configuration**: Site-wide config in `SITE_CONFIG` object (utils/constants.js)
5. **Language**: Mixed Hebrew/English content (RTL support needed)
6. **Responsive Design**: Mobile-first approach with defined breakpoints
7. **Performance**: Components use React.memo() for optimization, anti-flickering CSS techniques

### Important Configuration

**Site Config** (src/utils/constants.js):
- Email: itayost1@gmail.com
- Phone: 054-4994417
- Social links: LinkedIn, Instagram, Facebook, WhatsApp
- Live URL: https://www.itayost.com/

**Color Scheme**:
- Primary: #0A192F (dark blue)
- Secondary: #64FFDA (cyan accent)
- Accent: #8892B0 (gray)
- Light: #CCD6F6 (light gray)
- White: #E6F1FF (off-white)

### Development Notes

1. **No TypeScript**: Project uses JavaScript with JSX
2. **No Testing Setup**: No test framework currently configured
3. **ESLint Configured**: Use `npm run lint` before commits
4. **Vite Dev Server**: Runs on http://localhost:5173
5. **Production Build**: Outputs to `/dist/` directory
6. **Hebrew Content**: Site contains Hebrew text - maintain RTL support where needed
7. **Deployment**: Vercel deployment configured

### Component Flow

```
App.jsx
├── Navbar
├── Hero (landing section with typewriter effect)
├── Services (service offerings grid)
├── Portfolio (project showcase)
├── Features (key features)
├── Process (work process timeline)
├── Contact (contact form/info)
├── Footer
└── WhatsAppFAB (floating button)
```

Each section component typically:
1. Imports data from `/src/data/`
2. Uses `useIntersectionObserver` for scroll animations
3. Applies Framer Motion animations on visibility
4. Has responsive CSS with mobile-first approach

### Performance Considerations

- Components wrapped with React.memo() for optimization
- CSS uses `backface-visibility: hidden` to prevent flickering
- Parallax effects disabled on mobile for performance
- Images currently not optimized (needs WebP conversion and lazy loading)

### Known Issues to Address

- Portfolio images are not optimized (using PNG directly)
- No lazy loading for images
- Missing testimonials section
- No dark/light mode toggle
- No analytics integration
- Limited SEO content

### When Making Changes

1. **Hebrew/RTL**: All new components must support RTL layout
2. **Mobile First**: Test all features on mobile devices first
3. **Animations**: Use Framer Motion, disable heavy animations on mobile
4. **Performance**: Apply React.memo() to new components, use anti-flickering CSS
5. **Accessibility**: Include ARIA labels, ensure keyboard navigation works