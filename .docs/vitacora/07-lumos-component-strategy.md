# Piri Piri - Lumos Component & Utility Strategy

**Date:** 2025-01-15
**Status:** Active Strategy

---

## STRATEGY OVERVIEW

Build the Piri Piri website locally using the Lumos framework architecture, maximizing reuse of existing components and utilities for eventual Webflow import.

**Core Principles:**
1. **Reuse over reinvent** - Use existing Lumos components (sliders, cards, buttons) instead of creating custom ones
2. **Utility-first styling** - Apply visual styles through utility classes, not custom CSS
3. **Centralized CSS** - Keep styles in `piripiri.css` (Webflow export) and `piripiri-custom.css` (custom utilities)
4. **Webflow compatibility** - All classes must exist in CSS files for import tool compatibility

---

## FILE ARCHITECTURE

### CSS Files

| File | Purpose | Source |
|------|---------|--------|
| `css/piripiri.css` | Main Lumos framework + Webflow export | Webflow (source of truth) |
| `css/piripiri-custom.css` | Custom utilities filling Lumos gaps | Local development |
| `css/normalize.css` | Browser reset | Webflow |
| `css/webflow.css` | Webflow runtime styles | Webflow |

### Reference Files

| File | Purpose |
|------|---------|
| `example-components.html` | Lumos component reference (sliders, cards, buttons, etc.) |
| `styleguide.html` | Visual design system documentation |

---

## NAMING CONVENTIONS

### Lumos Standard Patterns

| Type | Pattern | Example |
|------|---------|---------|
| Components | `component_element` (underscores) | `slider_wrap`, `card_primary_element` |
| Utilities | `u-property-value` (dashes) | `u-flex-vertical-nowrap`, `u-padding-6` |
| States | `is-state` | `is-active`, `is-secondary` |
| Variants | `data-wf--component--variant` | `data-wf--slider--variant="crop-left"` |

### CSS Variables

| Type | Pattern | Example |
|------|---------|---------|
| Spacing | `--_spacing---space--{1-8}` | `--_spacing---space--4` |
| Colors | `--swatch--{name}` | `--swatch--brand-500`, `--swatch--hierba` |
| Typography | `--_typography---{property}` | `--_typography---font-size--h4` |
| Theme | `--_theme---{property}` | `--_theme---background` |

---

## COMPONENT REUSE STRATEGY

### Slider Component

**Lumos Structure:**
```html
<div data-wf--slider--variant="crop-left" class="slider_wrap" data-slider="component">
  <div style="--lg: 3; --md: 2; --sm: 1.2;" class="slider_offset">
    <div class="slider_element swiper" data-speed="600" data-follow-finger="true" data-mousewheel="true">
      <div class="slider_list swiper-wrapper">
        <!-- Slides go here -->
      </div>
    </div>
  </div>
</div>
```

**Key Classes:**
- `slider_wrap` - Outer container
- `slider_offset` - Responsive breakpoints via CSS variables
- `slider_element` - Swiper instance
- `slider_list` - Swiper wrapper

**Responsive Variables:**
- `--lg` - Desktop (3+ slides)
- `--md` - Tablet (2 slides)
- `--sm` - Mobile (1.2 slides for peek effect)

### Card Component

**Lumos Structure:**
```html
<div data-wf--card-primary--variant="default" class="card_primary_wrap">
  <div data-trigger="hover focus" class="card_primary_group">
    <div class="card_primary_element">
      <div class="card_primary_visual">
        <img class="card_primary_image" />
      </div>
      <div class="card_primary_content">
        <h3 class="card_primary_title">Title</h3>
        <div class="card_primary_text">Content</div>
      </div>
    </div>
  </div>
</div>
```

**Adapting Cards:**
When the default card layout doesn't match the design, keep the component structure but override with utility classes:
```html
<div class="card_primary_element u-flex-vertical-nowrap u-padding-6 u-bg-brand">
  <!-- Custom layout using utilities -->
</div>
```

---

## CUSTOM UTILITIES (piripiri-custom.css)

### Color Utilities

**Brand Swatches:**
| Variable | Hex | Utility Classes |
|----------|-----|-----------------|
| `--swatch--brand-500` | #ff5224 | `.u-bg-brand`, `.u-text-brand` |
| `--swatch--orchid-500` | #e57ce0 | `.u-bg-orchid`, `.u-text-orchid` |
| `--swatch--gold` | #f29100 | `.u-bg-gold`, `.u-text-gold` |
| `--swatch--hierba` | #12a438 | `.u-bg-hierba`, `.u-text-hierba` |

**Dark/Light Swatches:**
- `.u-bg-dark-700`, `.u-bg-dark-800`, `.u-bg-dark-900`
- `.u-bg-light-100`, `.u-bg-light-200`, `.u-bg-light-300`, `.u-bg-light-400`
- `.u-text-dark-900`, `.u-text-light-100`

### Layout Utilities

**Borders:**
```css
.u-border-main          /* Full border */
.u-border-top-main      /* Top only */
.u-border-bottom-main   /* Bottom only */
.u-border-color-brand   /* Brand color border */
.u-border-color-light   /* Light color border */
```

**Border Radius:**
```css
.u-radius-main          /* Standard radius */
.u-radius-small         /* Small radius */
.u-radius-large         /* Large radius */
.u-radius-round         /* Pill shape */
.u-radius-top-main      /* Top corners only */
.u-radius-bottom-main   /* Bottom corners only */
```

**Shadows:**
```css
.u-shadow-small         /* 0 2px 8px */
.u-shadow-main          /* 0 4px 16px */
.u-shadow-large         /* 0 8px 24px */
```

### Interaction Utilities

**Transitions:**
```css
.u-transition-color-main        /* 0.2s color */
.u-transition-transform-slow    /* 0.3s transform */
.u-transition-all-main          /* 0.2s all */
```

**Hover States:**
```css
.u-hover-color-brand:hover      /* Text turns brand color */
.u-hover-translate-y-up-1       /* Lift effect */
```

### Misc Utilities

```css
.u-list-style-none      /* Remove list bullets */
.u-text-decoration-none /* Remove underlines */
.u-cursor-pointer       /* Clickable cursor */
.u-select-none          /* Prevent text selection */
.u-scrollbar-hide       /* Hide scrollbars */
.u-font-style-normal    /* Remove italic from address */
```

---

## INLINE STYLES POLICY

### Keep Inline (Component-Specific)
Only use inline styles for truly unique, non-reusable properties:
- Responsive `clamp()` values
- Complex `calc()` expressions
- One-off positioning values

**Example:**
```css
.brand_card .card_primary_element {
  min-height: clamp(400px, 50vh, 500px);
}
.brand_card_icon {
  width: clamp(50px, 8vw, 80px);
}
```

### Move to Utilities (Reusable)
All standard CSS properties should have utility classes:
- Colors, backgrounds
- Spacing (padding, margin, gap)
- Borders, shadows, radius
- Flex/grid properties
- Typography styles
- Transitions, transforms

---

## JAVASCRIPT STRATEGY

### Use Lumos Scripts
Reuse JavaScript from `example-components.html` for standard components:

**Slider Initialization:**
```javascript
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-slider='component']").forEach((component) => {
    const swiperElement = component.querySelector(".slider_element");
    new Swiper(swiperElement, {
      slidesPerView: "auto",
      // ... standard Lumos config
    });
  });
});
```

### External Libraries
Same versions as Lumos:
- **Swiper:** `https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js`
- **GSAP:** `https://cdn.prod.website-files.com/gsap/3.14.2/gsap.min.js`
- **jQuery:** Webflow's CDN version

---

## APPLIED EXAMPLE: Brand Values Slider

### Before (Custom Implementation)
```html
<section class="brand_values">
  <div class="brand_values_swiper">
    <article class="brand_card brand_card--carbon">
      <!-- Custom structure -->
    </article>
  </div>
</section>

<script>
  // 200+ lines of custom drag/scroll JavaScript
</script>
```

### After (Lumos Components)
```html
<section class="brand_values u-width-full u-padding-block-8 u-theme-dark u-bg-dark-900">
  <div data-wf--slider--variant="crop-left" class="slider_wrap" data-slider="component">
    <div style="--lg: 3; --md: 2; --sm: 1.2;" class="slider_offset">
      <div class="slider_element swiper" data-speed="600" data-mousewheel="true">
        <div class="slider_list swiper-wrapper">

          <div class="card_primary_wrap brand_card">
            <div class="card_primary_group">
              <div class="card_primary_element u-flex-vertical-nowrap u-padding-6 u-radius-main u-shadow-large u-bg-brand">
                <!-- Content using utility classes -->
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

<script>
  // ~50 lines using standard Swiper initialization
</script>
```

**Benefits:**
- Reuses `slider_*` component structure
- Reuses `card_primary_*` component structure
- Visual styling through utility classes
- Standard Swiper library (same as Lumos)
- Webflow-compatible class names and data attributes

---

## WEBFLOW IMPORT COMPATIBILITY

### Data Attributes
Preserve these for Webflow component recognition:
- `data-wf--slider--variant`
- `data-wf--card-primary--variant`
- `data-slider="component"`
- `data-trigger="hover focus"`
- `data-slot=""`

### Class Requirements
All classes used in HTML must exist in CSS files:
1. Check `piripiri.css` for existing Lumos utilities
2. Add missing utilities to `piripiri-custom.css`
3. Never use classes that don't exist in stylesheets

---

## CHECKLIST FOR NEW SECTIONS

When building new sections:

1. **Check example-components.html** for existing components
2. **Identify closest Lumos component** (slider, card, button, etc.)
3. **Keep component structure** (wrap, group, element, content)
4. **Style with utilities** from piripiri.css or piripiri-custom.css
5. **Only inline truly unique styles** (clamp, calc, one-off values)
6. **Reuse Lumos JavaScript** for interactions
7. **Preserve data attributes** for Webflow compatibility

---

## NEXT STEPS

1. Continue building home.html sections using this strategy
2. Document new custom utilities as they're created
3. Keep piripiri-custom.css organized by category
4. Reference example-components.html before creating new patterns
5. Test Webflow import compatibility periodically

---

**Status:** Active Strategy
**Last Updated:** 2025-01-15
