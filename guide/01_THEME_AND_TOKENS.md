# 01. Theme & Tokens (Tailwind v4 + OKLCH)

**Role:** Design Systems Engineer
**Context:** This is the **Source of Truth** for the application design system. 

## 1. Global CSS (app/globals.css)

In Tailwind v4, we do not use `tailwind.config.js` for colors. We use CSS variables and the `@theme` directive.

**Copy this exactly into your `app/globals.css`:**

```css
@import "tailwindcss";

@plugin "tailwindcss-animate";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  /* 
     COLOR PALETTE: OKLCH (Zinc-based Technical)
     L = Lightness, C = Chroma, H = Hue
  */
  
  /* Backgrounds */
  --background: 100% 0 0;              /* White */
  --foreground: 20% 0.02 286;          /* Zinc 900 */

  /* Surface Structure */
  --card: 100% 0 0;
  --card-foreground: 20% 0.02 286;
  --popover: 100% 0 0;
  --popover-foreground: 20% 0.02 286;

  /* Brand / Interaction */
  --primary: 20% 0.02 286;             /* Zinc 900 */
  --primary-foreground: 98% 0 0;       /* White */

  --secondary: 96% 0.003 286;          /* Zinc 100 */
  --secondary-foreground: 20% 0.02 286;

  --muted: 96% 0.003 286;
  --muted-foreground: 55% 0.01 286;    /* Zinc 500 */

  --accent: 96% 0.003 286;             /* Hover States */
  --accent-foreground: 20% 0.02 286;

  --destructive: 59% 0.20 22;          /* Red 600 */
  --destructive-foreground: 98% 0 0;

  /* Boundaries */
  --border: 92% 0.005 286;             /* Zinc 200 */
  --input: 92% 0.005 286;
  --ring: 20% 0.02 286;

  /* Geometry - The "Technical" Radius */
  --radius: 0.375rem; /* 6px - The Sweet Spot */
}

.dark {
  /* Dark Mode Mappings (Optional) */
  --background: 20% 0.02 286;
  --foreground: 98% 0 0;
  /* ... etc ... */
}

@theme {
  /* 1. Map CSS Variables to Tailwind Utility Classes */
  --color-background: oklch(var(--background));
  --color-foreground: oklch(var(--foreground));
  
  --color-card: oklch(var(--card));
  --color-card-foreground: oklch(var(--card-foreground));
  
  --color-popover: oklch(var(--popover));
  --color-popover-foreground: oklch(var(--popover-foreground));
  
  --color-primary: oklch(var(--primary));
  --color-primary-foreground: oklch(var(--primary-foreground));
  
  --color-secondary: oklch(var(--secondary));
  --color-secondary-foreground: oklch(var(--secondary-foreground));
  
  --color-muted: oklch(var(--muted));
  --color-muted-foreground: oklch(var(--muted-foreground));
  
  --color-accent: oklch(var(--accent));
  --color-accent-foreground: oklch(var(--accent-foreground));
  
  --color-destructive: oklch(var(--destructive));
  --color-destructive-foreground: oklch(var(--destructive-foreground));
  
  --color-border: oklch(var(--border));
  --color-input: oklch(var(--input));
  --color-ring: oklch(var(--ring));

  /* 2. Radius Configuration */
  --radius-lg: var(--radius);            /* 6px */
  --radius-md: calc(var(--radius) - 2px); /* 4px */
  --radius-sm: calc(var(--radius) - 4px); /* 2px */
  
  /* 3. Safe Area Spacing */
  --spacing-safe-top: env(safe-area-inset-top);
  --spacing-safe-bottom: env(safe-area-inset-bottom);
  
  /* 4. Font Settings */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}

/* 
   UTILITIES
   "Native Feel" adjustments
*/
@layer utilities {
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .tap-highlight-transparent {
    -webkit-tap-highlight-color: transparent;
  }
}
```