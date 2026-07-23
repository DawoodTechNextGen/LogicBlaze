# Synex Home 01 - Custom Logo Color Scheme Design Guide

![Synex Custom Logo Palette Banner](https://img.shields.gradient.is/synex-logo-theme?primary=005ba3&secondary=1fa7e6&text=LogicBlaze+Logo+Color+System)

This document specifies the updated **Synex Home 01** design language integrated with your brand's custom logo color palette.

---

## 🎨 1. Logo Color Palette & Design Tokens

### Core Brand Colors

| Color | Hex Code | Role / Usage |
| :--- | :--- | :--- |
| **Electric Cyan** | `#1fa7e6` | Primary Highlight Accent, Hover States, Glowing Borders, Stepper Numbers |
| **Royal Blue** | `#005ba3` | Primary Gradient Start, Brand Accent, Interactive Buttons |
| **Deep Navy** | `#081b33` | Primary Text Color, Headline Typography, Hero Background Accent |
| **Dark Ocean Blue** | `#0d3356` | Body Copy Text, Subtitle Typography |
| **Midnight Obsidian**| `#0e0d21` | Dark Footer Background, Navbar Blur Highlights |
| **Dark Indigo** | `#1e144a` | Mockup Container Gradient, Dark Card Surfaces |
| **Amethyst Purple** | `#3d1e6d` | Secondary Gradient Accent, Glow Shadows |
| **Dark Violet** | `#130a24` | Footer Base & Deep Background Layer |

---

### CSS Custom Variables (`:root`)

```css
:root {
  /* Logo Palette Mapping */
  --logo-deep-navy: #081b33;
  --logo-royal-blue: #005ba3;
  --logo-electric-cyan: #1fa7e6;
  --logo-ocean-blue: #0d3356;
  --logo-midnight: #0e0d21;
  --logo-dark-indigo: #1e144a;
  --logo-purple: #3d1e6d;
  --logo-dark-violet: #130a24;

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #005ba3 0%, #1fa7e6 100%);
  --gradient-purple-cyan: linear-gradient(135deg, #3d1e6d 0%, #1fa7e6 100%);
  --gradient-dark-hero: linear-gradient(135deg, #081b33 0%, #1e144a 50%, #3d1e6d 100%);

  /* Neutrals & Surfaces */
  --bg-page: #F4F7FC;
  --bg-surface: #FFFFFF;
  --bg-subtle: #EBF3FA;
  --bg-dark: var(--logo-midnight);

  /* Typography */
  --text-main: var(--logo-deep-navy);
  --text-body: var(--logo-ocean-blue);
  --text-muted: #4A6585;

  /* Shadows & Glows */
  --shadow-glow: 0 10px 25px -5px rgba(31, 167, 230, 0.4);
  --shadow-purple-glow: 0 10px 25px -5px rgba(61, 30, 109, 0.35);
}
```

---

## 📐 2. Updated Components & Visual Design

### 2.1 Primary Action Button (Brand Gradient)
Uses Royal Blue (`#005ba3`) to Electric Cyan (`#1fa7e6`) gradient with cyan ambient glow shadow:

```css
.btn-primary {
  background: linear-gradient(135deg, #005ba3 0%, #1fa7e6 100%);
  color: #FFFFFF;
  box-shadow: 0 10px 25px -5px rgba(31, 167, 230, 0.4);
  border-radius: 9999px;
  padding: 14px 32px;
  font-weight: 700;
}
```

### 2.2 Feature & Value Cards
White cards on slate-ice background (`#F4F7FC`) with Electric Cyan hover borders:

```css
.feature-card:hover {
  transform: translateY(-6px);
  border-color: #1fa7e6;
  box-shadow: 0 16px 36px -4px rgba(8, 27, 51, 0.12);
}
```

### 2.3 Dark Footer & Mockup Container
Utilizes Midnight Obsidian (`#0e0d21`) and Dark Violet (`#130a24`) gradient:

```css
.footer {
  background: linear-gradient(180deg, #0e0d21 0%, #130a24 100%);
  color: #FFFFFF;
}
```

---

## 📂 3. Workspace File Locations

- **[style.css](file:///d:/LB/LogicBlaze/style.css)**: Updated with logo color tokens & components.
- **[index.html](file:///d:/LB/LogicBlaze/index.html)**: Live Synex Home 01 template applying the logo color palette.
- **[README.md](file:///d:/LB/LogicBlaze/README.md)**: Updated design documentation for your logo palette.

---

*Updated for LogicBlaze | Synex Home 01 Custom Logo Theme v2.0*
