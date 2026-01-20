# Piri Piri - Variables Configuration Guide

**Date Created:** 2025-11-18
**Purpose:** Define all CSS variables for the Piri Piri website following Lumos framework conventions

---

## Instructions

This document is your worksheet for defining all design tokens. Fill in each section with your brand values from your Illustrator design. Once completed, I'll update the CSS file with these values.

---

## 1. COLOR SYSTEM

The Lumos framework uses **three theme modes**: Light, Dark, and Brand. Each theme automatically switches colors for backgrounds, text, buttons, and borders.

### Core Color Swatches

These are the foundation colors that feed into all three themes:

#### Primary Brand Color
The main brand color that generates all color variations (100-900 scale).

```
--swatch--brand-500: #c6fb50
```

**Current value:** `#c6fb50` (lime green)
**Your value:** `_______________`

**Note:** The framework automatically generates lighter (100-400) and darker (600-900) variations using `color-mix()`.

---

#### Light Swatches

```
--swatch--light-100: white     ← Brightest (usually white)
--swatch--light-200: #ebebeb   ← Light gray
```

**Your values:**
- Light 100: `_______________`
- Light 200: `_______________`

---

#### Dark Swatches

```
--swatch--dark-800: #2f2b2d    ← Dark gray
--swatch--dark-900: #1f1d1e    ← Darkest (almost black)
```

**Your values:**
- Dark 800: `_______________`
- Dark 900: `_______________`

---

#### Brand Text Color
Text color used on brand-colored backgrounds (must have good contrast with brand-500).

```
--swatch--brand-text: var(--swatch--dark-900)
```

**Your value:** `_______________` (usually `--swatch--dark-900` or `--swatch--light-100`)

---

### Theme Configurations

The swatches above automatically populate three theme modes. Here's how each theme uses them:

#### 🤍 LIGHT THEME (`.u-theme-light`)

| Property | Value | Description |
|----------|-------|-------------|
| **Background** | `--swatch--light-200` | Main background color |
| **Text** | `--swatch--dark-900` | Main text color |
| **Background 2** | `--swatch--light-100` | Secondary/card backgrounds |
| **Border** | `--swatch--dark-900` @ 20% opacity | Subtle borders |
| **Heading Accent** | `--swatch--brand-600` | Accent for headings |
| **Link Hover** | `--_theme---text` | Link underline on hover |
| **Selection Background** | `--swatch--brand-300` | Text selection highlight |
| **Selection Text** | `--swatch--brand-text` | Selected text color |

**Primary Button:**
- Background: `--swatch--brand-500`
- Text: `--swatch--brand-text`
- Hover Background: `--_theme---text` (dark-900)
- Hover Text: `--_theme---background` (light-200)

**Secondary Button:**
- Background: `transparent`
- Border: `--_theme---border`
- Text: `--_theme---text`
- Hover: Inverts to solid background

---

#### 🖤 DARK THEME (`.u-theme-dark`)

| Property | Value | Description |
|----------|-------|-------------|
| **Background** | `--swatch--dark-900` | Main background color |
| **Text** | `--swatch--light-100` | Main text color |
| **Background 2** | `--swatch--dark-800` | Secondary/card backgrounds |
| **Border** | `--swatch--light-100` @ 20% opacity | Subtle borders |
| **Heading Accent** | `--swatch--brand-500` | Accent for headings |
| **Link Hover** | `--swatch--brand-500` | Link underline on hover |
| **Selection Background** | `--swatch--brand-300` | Text selection highlight |
| **Selection Text** | `--swatch--brand-text` | Selected text color |

**Primary Button:**
- Background: `--swatch--brand-500`
- Text: `--swatch--brand-text`
- Hover Background: `--_theme---text` (light-100)
- Hover Text: `--_theme---background` (dark-900)

**Secondary Button:**
- Background: `transparent`
- Border: `--_theme---border`
- Text: `--_theme---text`
- Hover: Inverts to solid background

---

#### ⚡ BRAND THEME (`.u-theme-brand`)

| Property | Value | Description |
|----------|-------|-------------|
| **Background** | `--swatch--brand-500` | Main background (your brand color!) |
| **Text** | `--swatch--brand-text` | Main text color |
| **Background 2** | `--swatch--brand-600` | Secondary/card backgrounds (darker brand) |
| **Border** | `--swatch--brand-text` @ 20% opacity | Subtle borders |
| **Heading Accent** | `brand-text` mixed with 20% white | Lighter accent for headings |
| **Link Hover** | `--_theme---text` | Link underline on hover |
| **Selection Background** | `--swatch--brand-300` | Text selection highlight |
| **Selection Text** | `--swatch--brand-text` | Selected text color |

**Primary Button (INVERTED):**
- Background: `--swatch--brand-text` (text becomes button bg!)
- Text: `--swatch--brand-500` (brand becomes text!)
- Hover Background: `brand-text` mixed with 10% white
- Hover Text: `--swatch--brand-500`

**Secondary Button:**
- Background: `transparent`
- Border: `--_theme---border`
- Text: `--_theme---text`
- Hover: Inverts to solid background

---

### Summary: Your Color Decisions

Fill in these **5 core colors** and all three themes will automatically work:

| Swatch | Purpose | Your Value |
|--------|---------|------------|
| `--swatch--brand-500` | Primary brand color | `_______________` |
| `--swatch--brand-text` | Text on brand backgrounds | `_______________` |
| `--swatch--light-100` | Brightest light | `_______________` |
| `--swatch--light-200` | Light gray | `_______________` |
| `--swatch--dark-800` | Dark gray | `_______________` |
| `--swatch--dark-900` | Darkest color | `_______________` |

**Questions to consider:**
- [ ] Do you want all three themes active, or just Light + Dark?
- [ ] Should we remove the Brand theme if you won't use full-brand sections?
- [ ] Is your brand color bright (use dark text) or dark (use light text)?

---

## 2. TYPOGRAPHY SYSTEM

### Font Family

**Primary Font:**
```
--_typography---font--primary-family: system-ui, -apple-system, ...
```

**Options:**
- [ ] Use system fonts (current setting)
- [ ] Custom font from Google Fonts or upload
  - Font name: `_______________`
  - Font weights needed: `_______________`
  - Font URL (if Google Fonts): `_______________`

---

### Font Weights

```
--_typography---font--primary-regular: 400
--_typography---font--primary-medium: 500
--_typography---font--primary-bold: 700
```

**Your values:**
- Regular weight: `_______________`
- Medium weight: `_______________`
- Bold weight: `_______________`

---

### Font Size Scale (Mobile → Desktop)

Current fluid typography values use `clamp(min, fluid, max)`:

```
--_typography---font-size--display:     clamp(4rem → 7rem)
--_typography---font-size--h1:          clamp(3rem → 5rem)
--_typography---font-size--h2:          clamp(2.5rem → 4rem)
--_typography---font-size--h3:          clamp(2.25rem → 3rem)
--_typography---font-size--h4:          clamp(1.75rem → 2rem)
--_typography---font-size--h5:          clamp(1.375rem → 1.5rem)
--_typography---font-size--h6:          clamp(1rem → 1.125rem)
--_typography---font-size--text-large:  clamp(1.125rem → 1.25rem)
--_typography---font-size--text-main:   clamp(1rem → 1.125rem)
--_typography---font-size--text-small:  clamp(0.875rem → 1rem)
```

**Your values (in rem):**

| Style | Min (Mobile 320px) | Max (Desktop 1440px+) |
|-------|-------------------|----------------------|
| Display | `_______` | `_______` |
| H1 | `_______` | `_______` |
| H2 | `_______` | `_______` |
| H3 | `_______` | `_______` |
| H4 | `_______` | `_______` |
| H5 | `_______` | `_______` |
| H6 | `_______` | `_______` |
| Text Large | `_______` | `_______` |
| Text Main | `_______` | `_______` |
| Text Small | `_______` | `_______` |

---

### Line Heights

```
--_typography---line-height--small: 1      (100% - tight)
--_typography---line-height--medium: 1.1   (110% - headings)
--_typography---line-height--large: 1.3    (130% - subheadings)
--_typography---line-height--huge: 1.5     (150% - body text)
```

**Your values:**
- Small: `_______________`
- Medium: `_______________`
- Large: `_______________`
- Huge: `_______________`

---

### Letter Spacing

```
--_typography---letter-spacing--tight: -0.03em   (for large headings)
--_typography---letter-spacing--normal: 0em      (for body text)
```

**Your values:**
- Tight: `_______________`
- Normal: `_______________`

---

### Line Height Trim
Amount of extra space to remove from top/bottom of text for precise alignment.

```
--_typography---font--primary-trim-top: 0.33em
--_typography---font--primary-trim-bottom: 0.38em
```

**Instructions:**
1. Use the [Line Height Trim Calculator](https://lineheighttrim.info/) with your font
2. Enter values here:
   - Trim top: `_______________`
   - Trim bottom: `_______________`

---

## 3. SPACING SYSTEM

### Space Scale (Mobile → Desktop)

Used for margins, padding within sections:

```
--_spacing---space--1: clamp(0.375rem → 0.5rem)     [6px → 8px]
--_spacing---space--2: clamp(0.625rem → 0.75rem)    [10px → 12px]
--_spacing---space--3: clamp(0.875rem → 1rem)       [14px → 16px]
--_spacing---space--4: clamp(1.25rem → 1.5rem)      [20px → 24px]
--_spacing---space--5: clamp(1.75rem → 2rem)        [28px → 32px]
--_spacing---space--6: clamp(2rem → 2.5rem)         [32px → 40px]
--_spacing---space--7: clamp(2.25rem → 3rem)        [36px → 48px]
--_spacing---space--8: clamp(2.5rem → 4rem)         [40px → 64px]
```

**Your values (in rem):**

| Level | Min (Mobile) | Max (Desktop) |
|-------|-------------|---------------|
| Space 1 | `_______` | `_______` |
| Space 2 | `_______` | `_______` |
| Space 3 | `_______` | `_______` |
| Space 4 | `_______` | `_______` |
| Space 5 | `_______` | `_______` |
| Space 6 | `_______` | `_______` |
| Space 7 | `_______` | `_______` |
| Space 8 | `_______` | `_______` |

---

### Section Spacing (Mobile → Desktop)

Used for top/bottom padding of major sections:

```
--_spacing---section-space--none: 0px
--_spacing---section-space--small: clamp(3rem → 5rem)      [48px → 80px]
--_spacing---section-space--main: clamp(4rem → 7rem)       [64px → 112px]
--_spacing---section-space--large: clamp(5.5rem → 10rem)   [88px → 160px]
--_spacing---section-space--page-top: clamp(10rem → 14rem) [160px → 224px]
```

**Your values (in rem):**

| Level | Min (Mobile) | Max (Desktop) |
|-------|-------------|---------------|
| Small | `_______` | `_______` |
| Main | `_______` | `_______` |
| Large | `_______` | `_______` |
| Page Top | `_______` | `_______` |

---

## 4. LAYOUT VARIABLES

### Viewport Constraints

```
--site--viewport-min: 20    [320px minimum viewport]
--site--viewport-max: 90    [1440px maximum content width]
```

**Your values:**
- Min viewport (rem): `_______________` (default: 20 = 320px)
- Max viewport (rem): `_______________` (default: 90 = 1440px)

---

### Margins and Gutters

```
--site--margin: clamp(1rem → 3rem)     [16px → 48px side margins]
--site--gutter: clamp(1rem → 2rem)     [16px → 32px gap between columns]
```

**Your values (in rem):**
- Margin (min → max): `_______` → `_______`
- Gutter (min → max): `_______` → `_______`

---

### Grid System

```
--site--column-count: 12
```

**Your value:** `_______________` (usually 12)

---

### Border Radius

```
--radius--main: 1rem     [16px - standard rounded corners]
--radius--small: 0.5rem  [8px - small rounded corners]
--radius--round: 100vw   [fully rounded pills/circles]
```

**Your values (in rem):**
- Main radius: `_______________`
- Small radius: `_______________`

---

### Border Width

```
--border-width--main: 0.094rem   [~1.5px]
```

**Your value:** `_______________`

---

## 5. NAVIGATION VARIABLES

```
--nav--height: 4rem                              [64px navigation height]
--nav--spacing-outer-vertical: var(--site--margin)
--nav--spacing-outer-horizontal: var(--site--margin)
--nav--spacing-inner-horizontal: var(--_spacing---space--5)
--nav--radius: var(--radius--small)
--nav--banner-height: 2.4rem                     [38.4px announcement banner]
```

**Your values:**
- Nav height: `_______________`
- Nav radius: `_______________` (or use `--radius--small`)
- Banner height: `_______________` (if using announcement banner)

---

## 6. BUTTON VARIABLES

```
--button-size--medium: 3rem   [48px button height]
--button-size--large: 5rem    [80px large button height]
```

**Your values:**
- Medium button: `_______________`
- Large button: `_______________`

---

## NEXT STEPS

Once you've filled out this document:

1. **Review with your design** - Make sure all values match your Illustrator mockups
2. **Send this back to me** - I'll update the CSS file with your values
3. **Test in styleguide** - We'll verify everything looks correct
4. **Begin building pages** - Start creating sections with your brand system

---

## QUESTIONS TO CONSIDER

Before finalizing, think about:

- [ ] Do you have a custom font, or should we use system fonts?
- [ ] What's your primary brand color? (This drives the entire color system)
- [ ] Do you need dark mode? (We can keep/remove dark theme variants)
- [ ] Are your spacing values tight or generous?
- [ ] Do you prefer sharp corners or rounded?
- [ ] What's your content max-width? (Desktop layout constraint)

---

**Status:** 🟡 Awaiting your brand values
**Last Updated:** 2025-11-18
