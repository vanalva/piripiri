# Piri Piri Design System Analysis

**Date:** 2025-11-18
**Source:** Homepage screenshots + color palette
**Status:** 🔍 Analysis in progress

---

## COLOR PALETTE ANALYSIS

### From Color Palette Screenshot:

#### 🔥 Orange Family (Primary Brand)
- **Orange Lightest:** `#ffede9`
- **Orange Lighter:** `#ffdcd3`
- **Brand 500 (Primary):** `#ff5224` ✨ MAIN BRAND COLOR
- **Orange Dark:** `#cc411c`
- **Orange Darker:** `#66200e`
- **Orange Darkest:** `#4c180a`
- **Orange Light:** `#ff8565`

#### 🌸 Orchid Family (Secondary/Accent)
- **Orchid Lightest:** `#fcf1fb`
- **Orchid Lighter:** `#f9e4f8`
- **Orchid Light:** `#eca3e9`
- **Brand Secondary 500:** `#e57ce0` ✨ SECONDARY BRAND COLOR
- **Orchid Dark:** `#b763b3`
- **Orchid Darker:** `#5b3159`
- **Orchid Darkest:** `#442543`

#### 🌿 Green Accent
- **Freshy:** `#12a438`

#### 🏆 Gold Accent
- **Gold Wings:** `#f29100`

#### 📄 Parchment/Neutral Family (Light Theme)
- **Parchment Lightest:** `#fdfbfa`
- **Parchment Lighter:** `#fbf8f5`
- **Parchment Light:** `#f3e7dc`
- **Parchment:** `#efdece`
- **Parchment Darker:** `#5f5852`

#### 🖤 Heavy Metal Family (Dark Theme)
- **Heavy Metal Lightest:** `#e8e8e8`
- **Heavy Metal Lighter:** `#d1d1d1`
- **Parchment Darkest:** `#47423d`
- **Heavy Metal Light:** `#60605f`
- **Heavy Metal:** `#1d1d1b`
- **Heavy Metal Darker:** `#0b0b0a`
- **Parchment Dark:** `#bfb1a4`
- **Heavy Metal Darkest:** `#080808`
- **Heavy Metal Dark:** `#171715`

---

## LUMOS VARIABLE MAPPING

### Core Swatches Structure:

```css
/* BRAND - Orange (Primary) */
--swatch--brand-100: #ffede9;
--swatch--brand-200: #ffdcd3;
--swatch--brand-300: #ff8565;
--swatch--brand-400: (generated);
--swatch--brand-500: #ff5224; /* PRIMARY */
--swatch--brand-600: #cc411c;
--swatch--brand-700: #66200e;
--swatch--brand-800: #4c180a;
--swatch--brand-900: (darkest);

/* ORCHID - Purple (Secondary Brand) */
--swatch--orchid-100: #fcf1fb;
--swatch--orchid-200: #f9e4f8;
--swatch--orchid-300: #eca3e9;
--swatch--orchid-400: (generated);
--swatch--orchid-500: #e57ce0; /* SECONDARY BRAND */
--swatch--orchid-600: #b763b3;
--swatch--orchid-700: #5b3159;
--swatch--orchid-800: #442543;
--swatch--orchid-900: (darkest);

/* LIGHT - Parchment/Cream */
--swatch--light-100: #fdfbfa; /* Brightest */
--swatch--light-200: #fbf8f5;
--swatch--light-300: #f3e7dc;
--swatch--light-400: #efdece; /* Parchment main */
--swatch--light-500: #bfb1a4;
--swatch--light-600: #5f5852;
--swatch--light-700: #47423d;

/* DARK - Heavy Metal/Black */
--swatch--dark-100: #e8e8e8;
--swatch--dark-200: #d1d1d1;
--swatch--dark-300: #60605f;
--swatch--dark-700: #1d1d1b;
--swatch--dark-800: #171715;
--swatch--dark-850: #0b0b0a;
--swatch--dark-900: #080808; /* Darkest */

/* ACCENT COLORS */
--swatch--green: #12a438; /* Freshy green */
--swatch--gold: #f29100; /* Gold Wings */
```

### Brand Text Color Decision:
**For orange brand backgrounds (`#ff5224`):**
- The orange is vibrant and bright
- **Best contrast:** Dark text (`--swatch--dark-900` = `#080808`)
- ✅ `--swatch--brand-text: var(--swatch--dark-900);`

---

## TYPOGRAPHY ANALYSIS

### Font Families:

#### Primary Font: **Neullis Neue**
- **Usage:** Headings, body text, buttons, navigation
- **Appears to be:** Custom sans-serif, modern, clean
- **Weights observed:**
  - Regular (400) - Body text
  - Medium (500) - ?
  - Bold/Black (700-900) - Large headings like "QUEMAMOS AL POLLO", "CONTACTO"
- **Letter spacing:** Appears slightly tight on large headings
- **Location:** `resources/fonts/` (to be added)

#### Display Font: **Salsita**
- **Usage:** Decorative/graffiti style for specific headings
- **Seen in:**
  - "somos fuego" (outline style)
  - "PLATOS ESTRELLA" (outline style)
  - "BAO...ESTO ES FACIL" (outline style)
  - "SOMOS FUEGO ♥♥♥" (filled outline style at bottom)
  - Hand-drawn casual script: "El club secreto de los devoradores de alas"
- **Style:** Outline/stroke style (not filled), bubbly graffiti aesthetic
- **Location:** `resources/fonts/` (to be added)

---

## TYPOGRAPHY SCALE OBSERVATIONS

From the screenshots, measuring relative sizes:

### Display/Hero Text:
- **"SOMOS PLACER ARDIENTE"** - Extremely large, bold, white
  - Estimated: 80-120px desktop → 40-60px mobile
  - Font: Neullis Neue Bold
  - Line height: Tight (1.0-1.1)
  - Letter spacing: Tight (-0.02em to -0.03em)

### Large Decorative:
- **"somos fuego"** (Salsita outline) - Very large
  - Estimated: 60-100px desktop → 30-50px mobile
  - Font: Salsita (outline style)
  - Line height: 1.0

### Section Headings:
- **"QUEMAMOS AL POLLO"** - Large, black, bold
  - Estimated: 48-72px desktop → 32-48px mobile
  - Font: Neullis Neue Black
  - Line height: 1.1

- **"CARBÓN", "SALSEO"** - Medium-large headings
  - Estimated: 32-48px desktop → 24-32px mobile
  - Font: Neullis Neue Bold

### Subheadings:
- **"PERO NO TE EQUIVOQUES"** - Bold italic
  - Estimated: 24-32px desktop → 20-24px mobile
  - Font: Neullis Neue Bold Italic

### Body Text:
- Paragraph text (descriptions)
  - Estimated: 16-18px desktop → 16px mobile
  - Font: Neullis Neue Regular
  - Line height: 1.5

### Small Text:
- Navigation, labels
  - Estimated: 14-16px
  - Font: Neullis Neue Regular/Medium

---

## BUTTON ANALYSIS

### Primary Button Style ("RESERVA", "PIDE YA", "VER CARTA"):
- **Background:** Orange `#ff5224`
- **Text:** White or Dark (needs verification)
- **Border:** 2-3px stroke
- **Border radius:** Full rounded pill shape (`100vw`)
- **Padding:** Generous horizontal (40-60px), vertical (12-16px)
- **Font:** Neullis Neue Bold
- **Text transform:** Uppercase
- **Hover state:** Likely inverts or darkens

### Secondary/Outlined Button ("LLÁMANOS"):
- **Background:** Transparent
- **Border:** 2-3px white stroke
- **Text:** White
- **Border radius:** Full rounded pill
- **Hover:** Likely fills with white, text becomes dark

### Button Combinations:
- Often paired side by side
- Icons integrated (arrow icons visible on some buttons)

---

## LAYOUT & SPACING OBSERVATIONS

### Section Spacing:
- **Large vertical padding** on major sections
  - Estimated: 80-120px desktop → 48-64px mobile
- Alternating color sections (orange → cream → black → purple)

### Content Width:
- Max content width appears to be around **1200-1400px**
- Side margins: Generous (40-60px on desktop)

### Grid Patterns:
- **2-column layouts** for text + image sections
- **Image grids:** 2x2, horizontal scrollers for food photos
- **Cards:** Rounded corners, shadow effects on some

### Component Spacing:
- **Heading to paragraph:** Medium gap (24-32px)
- **Between sections:** Large gap (64-96px)
- **Card grids:** Medium gap (24-32px)

### Border Radius:
- **Buttons:** Full pill (`100vw`)
- **Images:** Medium rounded (`16-24px`)
- **Cards:** Medium rounded (`16-24px`)
- **Sections:** Sometimes rounded on edges when full-width colored blocks

---

## THEME USAGE OBSERVATIONS

### Light Theme (Parchment):
- Background: `#efdece` or `#fdfbfa`
- Text: Dark `#080808` or `#1d1d1b`
- Used for "RESERVA TU MESA" section

### Dark Theme (Black):
- Background: `#080808`, `#1d1d1b`, `#0b0b0a`
- Text: White/Cream `#fdfbfa`
- Used for "ÚNETE AL CLUB", footer, contrast sections

### Brand Theme (Orange):
- Background: `#ff5224`
- Text: Dark `#080808` or White (context dependent)
- Used for "CARBÓN" section, major CTAs
- High impact, fiery aesthetic

### Orchid Theme (Purple - Secondary):
- Background: `#e57ce0` or lighter `#eca3e9`
- Text: Dark `#080808`
- Used for "SALSEO" section
- Complementary accent color

---

## SPECIAL DESIGN ELEMENTS

### Outline Text Effect:
- **Salsita font** uses stroke/outline style (not filled)
- Text has thick stroke outline only
- Seen in "somos fuego", "PLATOS ESTRELLA", "BAO...ESTO ES FACIL"
- CSS approach: `-webkit-text-stroke` or SVG text

### Icon Style:
- **Fire/flame icons** - Bold, graphic, silhouette style
- **Chicken illustration** - Hand-drawn, detailed, integrated with flames
- **Hearts** - Simple, filled shapes
- All icons appear to be custom illustrations

### Photography Style:
- High contrast, vibrant colors
- Food photography with dramatic lighting
- People enjoying food - energetic, youthful vibe
- Grunge/film grain texture on some images

### Decorative Elements:
- Hand-drawn hearts (♥)
- Fire flame graphics
- Graffiti-style text overlays
- Textured backgrounds

---

## COMPONENT INVENTORY

### From Screenshots:

1. **Hero Section**
   - Large heading + decorative text
   - CTA buttons
   - Background image (people eating)
   - Small framed image (menu visual)

2. **Colored Info Cards** ("CARBÓN", "SALSEO")
   - Icon
   - Heading
   - Body text
   - Solid colored backgrounds
   - Full-width or contained

3. **Food Gallery Carousel**
   - Horizontal scrolling images
   - Navigation arrows
   - Dot indicators
   - "PLATOS ESTRELLA" decorative heading

4. **Text + Image Sections**
   - 2-column layout
   - Image on left/right alternating
   - Chicken illustration with flames
   - "VER CARTA" CTA button

5. **Photo Collage** ("SOMOS FUEGO ♥♥♥")
   - 3-4 images in decorative layout
   - Rounded corners
   - Overlay text

6. **Location Card**
   - Photo + info overlay
   - Dark overlay card
   - Address, directions
   - CTA buttons ("LLÁMANOS", "RESERVA")

7. **Club Signup Section** ("ÚNETE AL CLUB")
   - Dark background
   - Illustration (fish character)
   - QR code
   - Wallet integration buttons
   - Decorative ribbon banner

8. **Testimonials Carousel**
   - Cards with reviews
   - Star ratings
   - Google branding
   - Horizontal scroll

9. **Footer**
   - Logo
   - Navigation links
   - Social media icons
   - Large decorative "PIRIPIRI" text
   - "VOLVER ARRIBA" button
   - Copyright info

10. **Contact Form** ("CONTACTO", "BAO...ESTO ES FACIL")
    - Input fields (nombre, apellido, email, teléfono)
    - Message textarea
    - Dark background
    - Orange accent details

---

## PROPOSED LUMOS VARIABLE VALUES

### Summary Table:

| Variable | Value | Notes |
|----------|-------|-------|
| `--swatch--brand-500` | `#ff5224` | Primary orange |
| `--swatch--brand-text` | `var(--swatch--dark-900)` | Dark text on orange |
| `--swatch--light-100` | `#fdfbfa` | Brightest parchment |
| `--swatch--light-200` | `#efdece` | Main parchment bg |
| `--swatch--dark-800` | `#1d1d1b` | Secondary dark |
| `--swatch--dark-900` | `#080808` | Darkest black |
| `--_typography---font--primary-family` | `'Neullis Neue', sans-serif` | Main font |
| `--_typography---font--display-family` | `'Salsita', cursive` | Decorative font |
| `--radius--main` | `1.5rem` (24px) | Medium rounded |
| `--radius--round` | `100vw` | Pill buttons |
| `--border-width--main` | `0.125rem` (2px) | Button strokes |

---

## NEXT STEPS

1. ✅ Folder structure created
2. ⏳ Map all colors to proper Lumos variable structure
3. ⏳ Create custom secondary color families (Orchid, Green, Gold)
4. ⏳ Define complete typography scale
5. ⏳ Set spacing variables based on measurements
6. ⏳ Update `01-variables-configuration.md` with final values
7. ⏳ Prepare CSS file updates
8. ⏳ Add font files to `resources/fonts/`

---

**Status:** Analysis complete, ready for variable configuration
