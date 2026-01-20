# Piri Piri - Final Variable Configuration

**Date:** 2025-11-18
**Status:** ✅ Ready for CSS implementation
**Based on:** Homepage design analysis + color palette

---

## 1. COLOR SYSTEM - FILLED VALUES

### Core Color Swatches

#### 🔥 PRIMARY BRAND COLOR - Orange

```css
--swatch--brand-100: #ffede9;
--swatch--brand-200: #ffdcd3;
--swatch--brand-300: #ff8565;
--swatch--brand-500: #ff5224;  /* ✨ PRIMARY BRAND */
--swatch--brand-600: #cc411c;
--swatch--brand-700: #66200e;
--swatch--brand-800: #4c180a;
--swatch--brand-text: var(--swatch--dark-900);  /* Dark text on orange */
```

---

#### 🌸 SECONDARY BRAND COLOR - Orchid/Purple

```css
--swatch--orchid-100: #fcf1fb;
--swatch--orchid-200: #f9e4f8;
--swatch--orchid-300: #eca3e9;
--swatch--orchid-500: #e57ce0;  /* ✨ SECONDARY BRAND */
--swatch--orchid-600: #b763b3;
--swatch--orchid-700: #5b3159;
--swatch--orchid-800: #442543;
--swatch--orchid-text: var(--swatch--dark-900);  /* Dark text on purple */
```

---

#### 📄 LIGHT THEME - Parchment/Cream

```css
--swatch--light-100: #fdfbfa;  /* Brightest - white substitute */
--swatch--light-200: #fbf8f5;  /* Very light parchment */
--swatch--light-300: #f3e7dc;  /* Light parchment */
--swatch--light-400: #efdece;  /* Main parchment background */
--swatch--light-500: #bfb1a4;  /* Medium parchment */
--swatch--light-600: #5f5852;  /* Dark parchment text */
--swatch--light-700: #47423d;  /* Darkest parchment */
```

---

#### 🖤 DARK THEME - Heavy Metal/Black

```css
--swatch--dark-100: #e8e8e8;  /* Lightest gray (for text on dark) */
--swatch--dark-200: #d1d1d1;  /* Light gray */
--swatch--dark-300: #60605f;  /* Medium gray */
--swatch--dark-700: #1d1d1b;  /* Dark charcoal */
--swatch--dark-800: #171715;  /* Darker charcoal */
--swatch--dark-850: #0b0b0a;  /* Almost black */
--swatch--dark-900: #080808;  /* Pure black (darkest) */
```

---

#### 🎨 ACCENT COLORS

```css
--swatch--green: #12a438;     /* Freshy green */
--swatch--gold: #f29100;      /* Gold Wings */
--swatch--transparent: transparent;
```

---

### Theme Configurations

#### 🤍 LIGHT THEME (Parchment)

```css
.u-theme-light {
  --_theme---background: var(--swatch--light-400);        /* #efdece */
  --_theme---text: var(--swatch--dark-900);               /* #080808 */
  --_theme---background-2: var(--swatch--light-100);      /* #fdfbfa */
  --_theme---border: var(--swatch--dark-900-o20);         /* Black @ 20% */
  --_theme---heading-accent: var(--swatch--brand-600);    /* #cc411c */
  --_theme---text-link--border-hover: var(--swatch--brand-500);
  --_theme---selection--background: var(--swatch--brand-300);
  --_theme---selection--text: var(--swatch--brand-text);
}
```

#### 🖤 DARK THEME (Heavy Metal)

```css
.u-theme-dark {
  --_theme---background: var(--swatch--dark-900);         /* #080808 */
  --_theme---text: var(--swatch--light-100);              /* #fdfbfa */
  --_theme---background-2: var(--swatch--dark-800);       /* #171715 */
  --_theme---border: var(--swatch--light-100-o20);        /* White @ 20% */
  --_theme---heading-accent: var(--swatch--brand-500);    /* #ff5224 */
  --_theme---text-link--border-hover: var(--swatch--brand-500);
  --_theme---selection--background: var(--swatch--brand-300);
  --_theme---selection--text: var(--swatch--brand-text);
}
```

#### 🔥 BRAND THEME (Orange Fire)

```css
.u-theme-brand {
  --_theme---background: var(--swatch--brand-500);        /* #ff5224 */
  --_theme---text: var(--swatch--brand-text);             /* #080808 */
  --_theme---background-2: var(--swatch--brand-600);      /* #cc411c */
  --_theme---border: var(--swatch--brand-text-o20);       /* Dark @ 20% */
  --_theme---heading-accent: var(--swatch--light-100);
  --_theme---button-primary--background: var(--swatch--dark-900);  /* Inverted */
  --_theme---button-primary--text: var(--swatch--brand-500);
}
```

#### 🌸 ORCHID THEME (Purple - for "SALSEO" section)

```css
.u-theme-orchid {
  --_theme---background: var(--swatch--orchid-500);       /* #e57ce0 */
  --_theme---text: var(--swatch--orchid-text);            /* #080808 */
  --_theme---background-2: var(--swatch--orchid-600);     /* #b763b3 */
  --_theme---border: var(--swatch--orchid-text-o20);
  --_theme---heading-accent: var(--swatch--light-100);
}
```

---

## 2. TYPOGRAPHY SYSTEM - FILLED VALUES

### Font Families

```css
--_typography---font--primary-family: 'Neullis Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--_typography---font--display-family: 'Salsita', 'Comic Sans MS', cursive;
```

**Font Files Location:** `resources/fonts/`
- `NeullisNeue-Regular.woff2`
- `NeullisNeue-Medium.woff2`
- `NeullisNeue-Bold.woff2`
- `NeullisNeue-Black.woff2`
- `Salsita-Regular.woff2`

---

### Font Weights

```css
--_typography---font--primary-regular: 400;
--_typography---font--primary-medium: 500;
--_typography---font--primary-bold: 700;
--_typography---font--primary-black: 900;
```

---

### Font Sizes (Fluid clamp values)

Based on design measurements:

```css
/* Min viewport: 20rem (320px) → Max viewport: 90rem (1440px) */

--_typography---font-size--display: clamp(3rem, calc(3rem + ((6 - 3) / (90 - 20)) * (100vw - 20rem)), 6rem);
/* Display: 48px → 96px | Salsita outline text */

--_typography---font-size--h1: clamp(2.5rem, calc(2.5rem + ((5 - 2.5) / (90 - 20)) * (100vw - 20rem)), 5rem);
/* H1: 40px → 80px | "SOMOS PLACER ARDIENTE" */

--_typography---font-size--h2: clamp(2rem, calc(2rem + ((4 - 2) / (90 - 20)) * (100vw - 20rem)), 4rem);
/* H2: 32px → 64px | "QUEMAMOS AL POLLO" */

--_typography---font-size--h3: clamp(1.75rem, calc(1.75rem + ((3 - 1.75) / (90 - 20)) * (100vw - 20rem)), 3rem);
/* H3: 28px → 48px | "CARBÓN", "SALSEO" */

--_typography---font-size--h4: clamp(1.5rem, calc(1.5rem + ((2 - 1.5) / (90 - 20)) * (100vw - 20rem)), 2rem);
/* H4: 24px → 32px | "PERO NO TE EQUIVOQUES" */

--_typography---font-size--h5: clamp(1.25rem, calc(1.25rem + ((1.5 - 1.25) / (90 - 20)) * (100vw - 20rem)), 1.5rem);
/* H5: 20px → 24px */

--_typography---font-size--h6: clamp(1.125rem, calc(1.125rem + ((1.25 - 1.125) / (90 - 20)) * (100vw - 20rem)), 1.25rem);
/* H6: 18px → 20px */

--_typography---font-size--text-large: clamp(1.125rem, calc(1.125rem + ((1.25 - 1.125) / (90 - 20)) * (100vw - 20rem)), 1.25rem);
/* Large text: 18px → 20px */

--_typography---font-size--text-main: clamp(1rem, calc(1rem + ((1.125 - 1) / (90 - 20)) * (100vw - 20rem)), 1.125rem);
/* Main text: 16px → 18px */

--_typography---font-size--text-small: clamp(0.875rem, calc(0.875rem + ((1 - 0.875) / (90 - 20)) * (100vw - 20rem)), 1rem);
/* Small text: 14px → 16px */
```

---

### Line Heights

```css
--_typography---line-height--small: 1;        /* Tight - Display/Salsita text */
--_typography---line-height--medium: 1.1;     /* Headings */
--_typography---line-height--large: 1.3;      /* Subheadings */
--_typography---line-height--huge: 1.5;       /* Body text */
```

---

### Letter Spacing

```css
--_typography---letter-spacing--tight: -0.02em;   /* Large headings */
--_typography---letter-spacing--normal: 0em;      /* Body text */
```

---

### Line Height Trim (Neullis Neue)

**Note:** These values need to be calculated with the actual font file using [lineheighttrim.info](https://lineheighttrim.info/)

```css
--_typography---font--primary-trim-top: 0.3em;      /* Placeholder - calculate with font */
--_typography---font--primary-trim-bottom: 0.35em;  /* Placeholder - calculate with font */
```

**Action required:** Upload Neullis Neue font to trim calculator

---

## 3. SPACING SYSTEM - FILLED VALUES

### Space Scale (within sections)

```css
--_spacing---space--1: clamp(0.5rem, calc(0.5rem + ((0.75 - 0.5) / (90 - 20)) * (100vw - 20rem)), 0.75rem);
/* 8px → 12px */

--_spacing---space--2: clamp(0.75rem, calc(0.75rem + ((1 - 0.75) / (90 - 20)) * (100vw - 20rem)), 1rem);
/* 12px → 16px */

--_spacing---space--3: clamp(1rem, calc(1rem + ((1.5 - 1) / (90 - 20)) * (100vw - 20rem)), 1.5rem);
/* 16px → 24px */

--_spacing---space--4: clamp(1.5rem, calc(1.5rem + ((2 - 1.5) / (90 - 20)) * (100vw - 20rem)), 2rem);
/* 24px → 32px */

--_spacing---space--5: clamp(2rem, calc(2rem + ((2.5 - 2) / (90 - 20)) * (100vw - 20rem)), 2.5rem);
/* 32px → 40px */

--_spacing---space--6: clamp(2.5rem, calc(2.5rem + ((3 - 2.5) / (90 - 20)) * (100vw - 20rem)), 3rem);
/* 40px → 48px */

--_spacing---space--7: clamp(3rem, calc(3rem + ((4 - 3) / (90 - 20)) * (100vw - 20rem)), 4rem);
/* 48px → 64px */

--_spacing---space--8: clamp(4rem, calc(4rem + ((5 - 4) / (90 - 20)) * (100vw - 20rem)), 5rem);
/* 64px → 80px */
```

---

### Section Spacing (top/bottom padding)

```css
--_spacing---section-space--none: 0px;

--_spacing---section-space--small: clamp(3rem, calc(3rem + ((4 - 3) / (90 - 20)) * (100vw - 20rem)), 4rem);
/* 48px → 64px */

--_spacing---section-space--main: clamp(4rem, calc(4rem + ((6 - 4) / (90 - 20)) * (100vw - 20rem)), 6rem);
/* 64px → 96px */

--_spacing---section-space--large: clamp(5rem, calc(5rem + ((8 - 5) / (90 - 20)) * (100vw - 20rem)), 8rem);
/* 80px → 128px */

--_spacing---section-space--page-top: clamp(8rem, calc(8rem + ((12 - 8) / (90 - 20)) * (100vw - 20rem)), 12rem);
/* 128px → 192px | For first section with nav offset */
```

---

## 4. LAYOUT VARIABLES - FILLED VALUES

### Viewport Constraints

```css
--site--viewport-min: 20;    /* 320px minimum */
--site--viewport-max: 90;    /* 1440px maximum content width */
```

---

### Margins and Gutters

```css
--site--margin: clamp(1rem, calc(1rem + ((3 - 1) / (90 - 20)) * (100vw - 20rem)), 3rem);
/* Side margins: 16px → 48px */

--site--gutter: clamp(1rem, calc(1rem + ((2 - 1) / (90 - 20)) * (100vw - 20rem)), 2rem);
/* Grid gaps: 16px → 32px */
```

---

### Grid System

```css
--site--column-count: 12;
```

---

### Max Widths

```css
--max-width--main: calc(var(--site--viewport-max) * 1rem);  /* 1440px */
--max-width--small: 50rem;                                   /* 800px */
--max-width--full: 100%;
```

---

### Border Radius

```css
--radius--main: 1.5rem;      /* 24px - Images, cards */
--radius--small: 0.75rem;    /* 12px - Smaller elements */
--radius--round: 100vw;      /* Pill buttons */
```

---

### Border Width

```css
--border-width--main: 0.125rem;   /* 2px - Button strokes */
--border-width--thick: 0.1875rem; /* 3px - Emphasis */
```

---

## 5. NAVIGATION VARIABLES - FILLED VALUES

```css
--nav--height: 4.5rem;                                /* 72px */
--nav--spacing-outer-vertical: var(--site--margin);
--nav--spacing-outer-horizontal: var(--site--margin);
--nav--spacing-inner-horizontal: var(--_spacing---space--5);
--nav--radius: var(--radius--small);
--nav--banner-height: 0rem;                           /* No banner currently */
```

---

## 6. BUTTON VARIABLES - FILLED VALUES

```css
--button-size--medium: 3rem;    /* 48px height */
--button-size--large: 3.5rem;   /* 56px height */
```

### Button Style Variables

```css
/* Primary Button - Orange */
--_button-primary---background: var(--swatch--brand-500);
--_button-primary---text: var(--swatch--light-100);
--_button-primary---border: var(--swatch--brand-500);
--_button-primary---background-hover: var(--swatch--brand-600);
--_button-primary---border-hover: var(--swatch--brand-600);

/* Secondary Button - Outlined */
--_button-secondary---background: transparent;
--_button-secondary---text: var(--_theme---text);
--_button-secondary---border: currentColor;
--_button-secondary---background-hover: var(--_theme---text);
--_button-secondary---text-hover: var(--_theme---background);
--_button-secondary---border-hover: var(--_theme---text);
```

---

## 7. CUSTOM ADDITIONS

### Salsita Outline Text Effect

```css
/* For decorative outline text like "somos fuego" */
--text-outline---width: 0.125rem;           /* 2px stroke */
--text-outline---color: currentColor;
```

**CSS Implementation:**
```css
.text-outline {
  -webkit-text-stroke: var(--text-outline---width) var(--text-outline---color);
  -webkit-text-fill-color: transparent;
  paint-order: stroke fill;
}
```

---

## FONT LOADING

### CSS @font-face declarations needed:

```css
@font-face {
  font-family: 'Neullis Neue';
  src: url('../resources/fonts/NeullisNeue-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Neullis Neue';
  src: url('../resources/fonts/NeullisNeue-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Neullis Neue';
  src: url('../resources/fonts/NeullisNeue-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Neullis Neue';
  src: url('../resources/fonts/NeullisNeue-Black.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Salsita';
  src: url('../resources/fonts/Salsita-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

---

## SUMMARY CHECKLIST

- ✅ All colors mapped from palette to Lumos structure
- ✅ Four theme modes defined (Light, Dark, Brand, Orchid)
- ✅ Typography system with two font families
- ✅ Fluid spacing scale (8 levels + 4 section levels)
- ✅ Layout variables (viewport, margins, gutters)
- ✅ Border radius and widths
- ✅ Navigation and button sizing
- ✅ Custom Salsita outline text effect
- ⏳ Font files need to be added to `resources/fonts/`
- ⏳ Line height trim values need calculation with actual font

---

## NEXT ACTIONS

1. **Add font files** to `resources/fonts/` directory
2. **Calculate line-height trim** values with actual Neullis Neue font
3. **Apply all variables** to main CSS file
4. **Test styleguide** with new brand values
5. **Begin building** homepage sections

**Status:** ✅ Ready for CSS implementation
**Date Completed:** 2025-11-18
