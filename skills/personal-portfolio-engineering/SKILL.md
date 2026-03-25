---
name: personal-portfolio-engineering
description: Build engineering-architected personal portfolio websites with modular CSS (ITCSS + BEM) and JavaScript (ES6+ class-based components). Includes advanced effects like custom cursor, floating particles, theme toggle, radar charts, and scroll animations. Use when creating high-quality, interactive personal portfolio sites with professional code organization and modern visual effects.
---

# Personal Portfolio Engineering

This skill provides a complete engineering-architected template for building high-quality personal portfolio websites.

## Features

### CSS Architecture (ITCSS + BEM)
- **Design Tokens**: Centralized color, spacing, typography variables
- **Base**: CSS Reset and global styles
- **Utilities**: Atomic utility classes
- **Components**: BEM-named reusable components
- **Layouts**: Page-level layout patterns
- **Animations**: Keyframe animations

### JavaScript Architecture
- **EventBus**: Publish-subscribe event system for component communication
- **StateManager**: Reactive state management
- **Component Base Class**: Lifecycle management for UI components
- **Modular Components**: Independent, reusable UI components

### Advanced Visual Effects
- **Custom Cursor**: Dual-element follow system with hover effects
- **Floating Particles**: Starfield background with twinkling, connections, mouse interaction
- **Theme Toggle**: Light/Dark mode with localStorage persistence
- **Radar Chart**: SVG-based skill visualization with animation
- **Word Cloud**: Dynamic floating tags with collision avoidance
- **Scroll Animations**: Fade-in and stagger effects

## Usage

### Step 1: Copy Base Template

Copy all files from `assets/` to project directory:

```
cp -r assets/css/ ./
cp -r assets/js/ ./
cp assets/index.html ./
```

### Step 2: Customize Content

Edit `js/config.js` to personalize:

```javascript
const CONFIG = {
  profile: {
    name: 'Your Name',
    title: 'Your Title',
    company: 'Your Company',
    // ...
  },
  skills: [
    { name: 'Skill Name', value: 90 },
    // ...
  ],
  projects: ['Project 1', 'Project 2'],
  education: [...],
  // ...
};
```

### Step 3: Customize Styles

Edit `css/design-tokens.css` to change theme:

```css
:root {
  --color-purple-500: #your-primary-color;
  --color-purple-300: #your-secondary-color;
  // ...
}
```

### Step 4: Add Assets

Replace `avatar.jpg` with personal photo.

## Architecture Details

### CSS Naming Conventions

| Prefix | Usage | Example |
|--------|-------|---------|
| `u-*` | Utility classes | `.u-container`, `.u-text-center` |
| `c-*` | Components | `.c-card`, `.c-button` |
| `l-*` | Layouts | `.l-hero`, `.l-about` |
| `a-*` | Animations | `.a-fade-in`, `.a-hover-lift` |
| `js-*` | JavaScript hooks | `.js-scroll-animate` |

### JavaScript Component Pattern

```javascript
class MyComponent {
  constructor(element, options = {}) {
    this.element = element;
    this.options = { ...options };
    this.init();
  }

  init() {
    // Initialization logic
  }

  destroy() {
    // Cleanup logic
  }
}
```

### Theme System

Default dark theme. Toggle button in bottom-left corner.

To force light theme by default:
1. Edit `index.html`: change `<html data-theme="dark">` to `<html data-theme="light">`
2. Edit `js/components/ThemeToggle.js`: change `defaultTheme: 'dark'` to `'light'`

## File Structure

```
.
├── index.html                 # Main entry
├── css/
│   ├── design-tokens.css      # Design system variables
│   ├── base.css               # Reset & globals
│   ├── utilities.css          # Utility classes
│   ├── components.css         # UI components
│   ├── layouts.css            # Page layouts
│   ├── animations.css         # Keyframes
│   └── main.css               # Entry point
└── js/
    ├── core/
    │   ├── EventBus.js        # Event system
    │   ├── StateManager.js    # State management
    │   └── Component.js       # Base class
    ├── utils/
    │   ├── dom.js             # DOM utilities
    │   ├── math.js            # Math helpers
    │   └── detect.js          # Environment detection
    ├── components/
    │   ├── Cursor.js          # Custom cursor
    │   ├── ThemeToggle.js     # Theme switcher
    │   ├── Parallax.js        # Parallax scrolling
    │   ├── RadarChart.js      # SVG radar chart
    │   ├── WordCloud.js       # Tag cloud
    │   ├── Gallery.js         # Image carousel
    │   ├── ScrollAnimations.js # Scroll triggers
    │   └── FloatingParticles.js # Background particles
    ├── config.js              # Data configuration
    └── app.js                 # Application entry
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

Mobile: Custom cursor disabled, simplified effects for performance.

## Performance Notes

- Uses `will-change` for GPU acceleration
- Respects `prefers-reduced-motion`
- Passive event listeners for scroll
- Mobile-optimized (disables heavy effects)
