# Piri Piri - Full-Width Section Utilities

**Date:** 2025-11-19
**Status:** ✅ Complete - Ready to use

---

## PROBLEM STATEMENT

The hero section and other edge-to-edge layouts needed to:
1. Span full viewport width (100vw)
2. Have minimal side gutters (not the standard site--margin)
3. Be reusable across multiple sections

**User Requirement:**
> "my design has a full with style for some sections like the main hero, keep this site gutter but add a new style to our styleguide that modifies our sections to be full width with small site gutter"

---

## SOLUTION IMPLEMENTED

### 1. New Utility Classes

**File:** [css/piripiri-utilities.css](../css/piripiri-utilities.css)

```css
/* ============================================================================
   FULL WIDTH SECTION UTILITIES
   ========================================================================= */

/**
 * Full-width sections with minimal side gutters
 * Use for hero sections and edge-to-edge layouts
 */

.u-section-full-width {
  width: 100%;
  max-width: 100%;
}

/* Full-width content wrapper with minimal gutters */
.u-section-full-width .u-container-full-width {
  max-width: 100%;
  padding-left: var(--_spacing---space--3);
  padding-right: var(--_spacing---space--3);
  margin-left: auto;
  margin-right: auto;
}

/* No container constraint - completely edge to edge */
.u-container-edge-to-edge {
  max-width: 100%;
  padding-left: 0;
  padding-right: 0;
  margin: 0;
  width: 100%;
}

/* Content inside full-width sections can still be constrained */
.u-section-full-width .u-content-constrained {
  max-width: var(--max-width--main);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--site--margin);
  padding-right: var(--site--margin);
}
```

---

## SPACING VALUES

### Minimal Gutters (space--3)
- **Mobile (320px):** 16px
- **Desktop (1440px):** 24px
- **Variable:** `var(--_spacing---space--3)`

### Standard Gutters (site--margin)
- **Mobile (320px):** 20px
- **Desktop (1440px):** 80px
- **Variable:** `var(--site--margin)`

**Key Difference:**
Full-width sections use `space--3` for minimal breathing room while standard constrained sections use `site--margin` for generous padding.

---

## USAGE PATTERNS

### Pattern 1: Hero Section (Full-Width)

```html
<section class="u-section-full-width u-theme-dark">
  <!-- Navigation with minimal gutters -->
  <nav style="padding: var(--_spacing---space--4) var(--_spacing---space--3);">
    <div class="logo">PiRiPiRi</div>
    <ul class="nav_links">...</ul>
  </nav>

  <!-- Hero content with minimal gutters -->
  <div style="padding: var(--_spacing---space--8) var(--_spacing---space--3);">
    <h1>SOMOS PLACER ARDIENTE</h1>
    <div class="cta_buttons">
      <a href="#" class="u-button-pill u-button-primary">RESERVA</a>
    </div>
  </div>

  <!-- Footer with minimal gutters -->
  <footer style="padding: var(--_spacing---space--4) var(--_spacing---space--3);">
    <ul class="social_links">...</ul>
  </footer>
</section>
```

### Pattern 2: Mixed Width Content

```html
<section class="u-section-full-width u-theme-brand">
  <!-- Full-width background with constrained content inside -->
  <div class="u-content-constrained" style="padding: var(--_spacing---section-space--main) 0;">
    <h2>CARBÓN</h2>
    <p>El origen de todo...</p>
    <a href="#" class="u-button-pill u-button-primary">VER CARTA</a>
  </div>
</section>
```

### Pattern 3: Completely Edge-to-Edge

```html
<section class="u-container-edge-to-edge">
  <!-- No padding at all - image/video bleeds to edges -->
  <img src="hero-image.jpg" style="width: 100%; height: 100%; object-fit: cover;">
</section>
```

---

## APPLIED TO HERO SECTION

### File: [home.html](../home.html)

**Changes Made:**

1. **Section class:**
   ```html
   <section class="hero u-section-full-width u-theme-dark">
   ```

2. **Navigation padding:**
   ```css
   padding: var(--_spacing---space--4) var(--_spacing---space--3);
   ```

3. **Content padding:**
   ```css
   padding: var(--_spacing---space--8) var(--_spacing---space--3);
   ```

4. **Footer padding:**
   ```css
   padding: var(--_spacing---space--4) var(--_spacing---space--3);
   ```

5. **Removed constraints:**
   - ❌ Removed `max-width: var(--max-width--main);`
   - ❌ Removed `margin: 0 auto;`
   - ✅ Elements now span full viewport width with minimal side gutters

---

## STYLEGUIDE DOCUMENTATION

### File: [styleguide.html](../Page%20Reference/piri-piri---somos-fuego.webflow/styleguide.html)

**Added Section:** "Full-Width Sections (Hero Style)"

Includes:
1. **Live Demo** - Interactive full-width example with dark theme
2. **Code Example** - HTML structure showing proper implementation
3. **Usage Notes** - Bulleted guide with:
   - Class names to use
   - Spacing values
   - When to use full-width vs. constrained
   - How to mix both approaches

**Location:** Components section, after "Piri Piri Buttons", before "Lumos Buttons (Original)"

---

## COMPARISON: FULL-WIDTH vs. STANDARD

### Full-Width Section (Hero)
```
┌─────────────────────────────────────────────┐
│ 16px │   CONTENT SPANS FULL WIDTH    │ 16px │
│      │                                │      │
│      │  SOMOS PLACER ARDIENTE         │      │
│      │  [RESERVA] [PIDE YA]           │      │
│      │                                │      │
└─────────────────────────────────────────────┘
        ↑                                ↑
    Minimal gutters (space--3 = 16px → 24px)
```

### Standard Constrained Section
```
┌─────────────────────────────────────────────┐
│               ┌──────────────┐               │
│   20px →      │   CONTENT    │      ← 20px   │
│   80px →      │  (max 1280)  │      ← 80px   │
│               │              │               │
│               └──────────────┘               │
└─────────────────────────────────────────────┘
        ↑                                ↑
    Standard gutters (site--margin = 20px → 80px)
```

---

## DESIGN BENEFITS

1. **Edge-to-Edge Impact**
   - Hero sections feel immersive and modern
   - Full-bleed backgrounds create visual drama
   - No wasted white space on large screens

2. **Responsive Breathing Room**
   - Minimal gutters prevent content touching screen edges
   - 16px minimum ensures readability on small devices
   - 24px on desktop maintains polish

3. **Flexibility**
   - Can mix full-width sections with constrained content sections
   - `.u-content-constrained` allows centered content inside full-width backgrounds
   - Works seamlessly with all four themes

4. **Reusability**
   - `.u-section-full-width` class can be used on any section
   - Documented in styleguide for team reference
   - Consistent pattern across entire site

---

## WHEN TO USE EACH APPROACH

### Use Full-Width (`.u-section-full-width`)
- ✅ Hero sections
- ✅ Full-screen image/video backgrounds
- ✅ Edge-to-edge colored sections (brand themes)
- ✅ Navigation bars that span full width
- ✅ Footer sections

### Use Standard Constrained (`.u-container`)
- ✅ Text-heavy content sections
- ✅ Multi-column layouts
- ✅ Card grids
- ✅ Article/blog content
- ✅ Form sections

### Use Mixed Approach
```html
<section class="u-section-full-width u-theme-brand">
  <div class="u-content-constrained">
    <!-- Constrained content inside full-width background -->
  </div>
</section>
```
- ✅ Full-width colored backgrounds with centered text
- ✅ Brand sections with controlled line lengths
- ✅ Call-to-action sections with edge-to-edge color

---

## TESTING CHECKLIST

- [x] Hero section spans full viewport width
- [x] Minimal gutters (16px) visible on mobile
- [x] Minimal gutters (24px) visible on desktop (1440px+)
- [x] No horizontal scrollbar
- [x] Content doesn't touch screen edges
- [x] Buttons remain clickable with proper spacing
- [x] Works with all four themes (Light, Dark, Brand, Orchid)
- [x] Styleguide includes live demo
- [x] Styleguide includes code examples
- [x] Documentation added to vitacora

---

## NEXT STEPS

1. ✅ Full-width utilities created
2. ✅ Hero section updated
3. ✅ Styleguide documented
4. ✅ Vitacora entry created
5. ⏳ Apply to other full-width sections as needed
6. ⏳ Continue building additional homepage sections

---

**Status:** ✅ Complete - Full-width section system ready for production use
**View:** Open [styleguide.html](../Page%20Reference/piri-piri---somos-fuego.webflow/styleguide.html) to see live demo
