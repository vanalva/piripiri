# Piri Piri - Button Style Update

**Date:** 2025-11-18
**Status:** ✅ Buttons updated to match design

---

## CHANGES MADE

### 1. Button Visual Design Updated

**Old Design:**
- Rounded corners
- Simple hover state with translateY
- Basic border

**New Design (Matching Screenshot):**
- **Flat appearance** on normal state
- **Growing orange shadow** on hover (6px drop)
- **Lift effect** - button moves up as shadow grows
- **Pill-shaped** with full border-radius
- **Italic bold text** for all buttons
- **Thick border** (3px) for better definition

### 2. CSS Changes

#### [css/piripiri-variables.css](../css/piripiri-variables.css)

Added font style variables:
```css
/* Font Styles */
--_typography---font-style--normal: normal;
--_typography---font-style--italic: italic;
```

#### [css/piripiri-utilities.css](../css/piripiri-utilities.css)

**Updated Button Styles:**
```css
.u-button-pill {
  border-radius: var(--radius--round);
  padding: var(--_spacing---space--3) var(--_spacing---space--6);
  border: var(--border-width--thick) solid var(--swatch--light-100);
  background-color: var(--swatch--dark-900);
  color: var(--swatch--light-100);
  font-weight: var(--_typography---font--primary-bold);
  font-style: italic;  /* NEW */
  box-shadow: 0 0 0 0 var(--swatch--brand-500);  /* Initial flat state */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.u-button-pill:hover {
  box-shadow: 0 6px 0 0 var(--swatch--brand-500);  /* Growing shadow */
  transform: translateY(-6px);  /* Lift up */
}
```

**Primary Button (Orange):**
- Background: Orange (#ff5224)
- Text: Dark
- Shadow on hover: Darker orange (#cc411c)

**Secondary Button (Outlined):**
- Background: Transparent
- Border: White/Dark (theme-dependent)
- Shadow on hover: Orange

**Added Utility Classes:**
```css
.u-weight-bold { font-weight: var(--_typography---font--primary-bold); }
.u-weight-medium { font-weight: var(--_typography---font--primary-medium); }
.u-weight-regular { font-weight: var(--_typography---font--primary-regular); }

.u-italic { font-style: italic; }
.u-not-italic { font-style: normal; }

/* Combo class for typical Piri Piri headings */
.u-heading-style {
  font-weight: var(--_typography---font--primary-black);
  font-style: italic;
}
```

---

### 3. Styleguide Updated

**File:** [Page Reference/piri-piri---somos-fuego.webflow/styleguide.html](../Page%20Reference/piri-piri---somos-fuego.webflow/styleguide.html)

**Added:**
1. Import links for Piri Piri CSS files
2. New "Piri Piri Buttons" section showing:
   - Light theme buttons
   - Dark theme buttons
   - Brand theme (orange) buttons
   - Orchid theme (purple) buttons
3. Renamed original Lumos buttons to "Lumos Buttons (Original)"

**Button Examples Added:**
```html
<a href="#" class="u-button-pill u-button-primary u-button-medium">RESERVA YA</a>
<a href="#" class="u-button-pill u-button-secondary u-button-medium">PIDE YA</a>
<a href="#" class="u-button-pill u-button-primary u-button-large">VER CARTA</a>
```

---

## BUTTON ANATOMY

### Normal State:
```
┌──────────────────┐
│   RESERVA YA     │  ← Dark background, white text
└──────────────────┘     White 3px border, italic bold
                          No shadow (flat)
```

### Hover State:
```
┌──────────────────┐
│   RESERVA YA     │  ← Lifts up 6px
└──────────────────┘
        ▼▼▼▼▼▼▼▼▼▼
     Orange shadow     ← 6px orange shadow appears
```

---

## DESIGN PATTERNS OBSERVED

From the screenshots you sent, I noticed:

### Typography Style:
1. **All major headings** → Italic Black (900 weight, italic)
   - "SOMOS PLACER ARDIENTE"
   - "QUEMAMOS AL POLLO"
   - "CARBÓN", "SALSEO"

2. **All buttons** → Italic Bold (700 weight, italic, uppercase)
   - "RESERVA YA"
   - "PIDE YA"
   - "VER CARTA"
   - "LLÁMANOS"

3. **Body text** → Regular (400 weight, normal style)

### Button Usage:
- **Primary (Orange):** Main CTAs, most important actions
- **Secondary (Outlined):** Alternative actions, less emphasis

---

## HOW TO USE

### Basic Button:
```html
<a href="#" class="u-button-pill u-button-primary u-button-medium">
  RESERVA
</a>
```

### Secondary Button:
```html
<a href="#" class="u-button-pill u-button-secondary u-button-medium">
  LLÁMANOS
</a>
```

### Large Button:
```html
<a href="#" class="u-button-pill u-button-primary u-button-large">
  VER CARTA COMPLETA
</a>
```

### Heading with Italic Black Style:
```html
<h1 class="u-heading-style" style="font-size: var(--_typography---font-size--h1);">
  QUEMAMOS AL POLLO
</h1>
```

Or using individual utilities:
```html
<h1 class="u-weight-black u-italic" style="font-size: var(--_typography---font-size--h1);">
  QUEMAMOS AL POLLO
</h1>
```

---

## THEME COMPATIBILITY

Buttons automatically adapt to all four themes:

### Light Theme (Parchment):
- Primary: Orange bg, dark text
- Secondary: Dark border/text, orange shadow on hover

### Dark Theme (Heavy Metal):
- Primary: Orange bg, dark text
- Secondary: Light border/text, orange shadow on hover

### Brand Theme (Orange):
- Primary: Dark bg, light text (inverted)
- Secondary: Dark border/text, orange shadow

### Orchid Theme (Purple):
- Primary: Dark bg, light text
- Secondary: Dark border/text, orange shadow

---

## NEXT STEPS

1. ✅ Buttons match your design screenshot
2. ✅ Italic styles added for headings/buttons
3. ✅ Styleguide updated with examples
4. ⏳ Add font files for final rendering
5. ⏳ Test hover animations in browser
6. ⏳ Start building actual homepage sections

---

**Status:** ✅ Complete - Ready to test
**View:** Open styleguide.html in browser to see all button variations
