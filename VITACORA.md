# Piri Piri - Vitácora de Desarrollo

## Proyecto
Sitio web para restaurante Piri Piri utilizando el framework Lumos para Webflow.

---

## 2026-01-15 - Sesión de Trabajo

### Resumen
Configuración del sistema tipográfico con la fuente Neulis Neue y ajustes de botones siguiendo el sistema de diseño.

---

### 1. Sistema Tipográfico - Neulis Neue

**Problema:** La fuente Paytone One no tenía variante itálica, lo cual era necesario para el estilo de marca.

**Solución:** Se reemplazó Paytone One por Neulis Neue como fuente primaria.

**Archivos modificados:**
- `css/piripiri-custom.css` - Declaraciones @font-face y overrides
- `home.html` - Removido Paytone One del cargador de Google Fonts

**Fuentes agregadas en @font-face:**
| Peso | Estilo | Archivo |
|------|--------|---------|
| 400 (Regular) | Normal | `fonnts.com-Neulis_Neue_Regular.otf` |
| 400 (Regular) | Italic | `fonnts.com-Neulis_Neue_Italic.otf` |
| 500 (Medium) | Normal | `fonnts.com-Neulis_Neue_Medium.otf` |
| 500 (Medium) | Italic | `fonnts.com-Neulis_Neue_Medium_Italic.otf` |
| 700 (Bold) | Normal | `fonnts.com-Neulis_Neue_Bold.otf` |
| 700 (Bold) | Italic | `fonnts.com-Neulis_Neue_Bold_Italic.otf` |
| 900 (Black) | Normal | `fonnts.com-Neulis_Neue_Black.otf` |
| 900 (Black) | Italic | `fonnts.com-Neulis_Neue_Black_Italic.otf` |

**Ubicación de fuentes:** `resources/fonts/Nulis/`

**Variable CSS override:**
```css
:root {
  --_typography---font--primary-family: "Neulis Neue", sans-serif;
  --_typography---font--primary-black: 900;
}
```

---

### 2. Pesos Tipográficos por Estilo de Texto

Se configuraron overrides para que los headings usen pesos más pesados de Neulis Neue:

| Clase | Peso | Valor |
|-------|------|-------|
| `.u-text-style-display` | Black | 900 |
| `.u-text-style-h1` | Black | 900 |
| `.u-text-style-h2` | Black | 900 |
| `.u-text-style-h3` | Bold | 700 |
| `.u-text-style-h4` | Bold | 700 |
| `.u-text-style-h5` | Bold | 700 |

**Código CSS:**
```css
.u-text-style-display {
  --_text-style---font-weight: 900;
  font-weight: 900 !important;
}
/* ... similar para h1-h5 */
```

---

### 3. Sistema de Botones

#### 3.1 Texto de Botones
Se configuró `.button_main_text` para usar la fuente primaria con estilo bold italic:

```css
.button_main_text {
  font-family: var(--_typography---font--primary-family);
  font-weight: 900 !important;
  font-style: italic;
  text-transform: uppercase;
}
```

#### 3.2 Botón Primario
- Mantiene el estilo 3D con sombra (sin cambios del default Lumos)
- Fondo sólido con color de marca

#### 3.3 Botón Secundario (Outline)
Se creó un estilo outline para botones secundarios:

```css
.button_main_element:where(.w-variant-e85564cd-af30-a478-692b-71732aefb3ab) {
  --_button-style---background: transparent;
  --_button-style---border: var(--_theme---text);
  --_button-style---text: var(--_theme---text);
  --_button-style---background-hover: var(--_theme---text);
  --_button-style---border-hover: var(--_theme---text);
  --_button-style---text-hover: var(--_theme---background);
  box-shadow: none;
}
```

**Comportamiento:**
- Estado normal: Fondo transparente, borde visible
- Estado hover: Fondo sólido, texto invertido

---

### 4. Botón de Menú (Navegación)

**Estructura HTML actualizada:**
```html
<div data-wf--button-main--variant="secondary" class="button_main_wrap u-radius-round" data-trigger="hover focus">
  <button class="button_main_element w-variant-e85564cd-af30-a478-692b-71732aefb3ab" aria-label="Abrir menú">
    <svg class="button_main_icon" ...><!-- hamburger icon --></svg>
    <div class="button_main_text u-text-style-main">MENÚ</div>
  </button>
</div>
```

**Características:**
- Usa el componente `button_main` de Lumos (no `button_toggle`)
- Variante secundaria (outline) con clase `.w-variant-e85564cd-af30-a478-692b-71732aefb3ab`
- Forma pill con `u-radius-round`
- Contiene icono hamburger + texto "MENÚ"

---

### 5. Estructura de Archivos Relevantes

```
Piri Piri/
├── css/
│   ├── piripiri.css          # CSS base de Lumos (no modificar)
│   └── piripiri-custom.css   # Overrides y customizaciones
├── resources/
│   └── fonts/
│       └── Nulis/            # Archivos de fuente Neulis Neue
└── home.html                 # Página principal
```

---

### 6. Convenciones del Sistema Lumos

#### Variables CSS importantes:
- `--_typography---font--primary-family` - Familia de fuente primaria
- `--_typography---font--primary-bold` - Peso 700
- `--_typography---font--primary-black` - Peso 900 (custom)
- `--_text-style---font-weight` - Peso de texto por estilo
- `--_button-style---*` - Variables de estilo de botón

#### Clases de variante de botón:
- Primary: Sin clase adicional (default)
- Secondary: `.w-variant-e85564cd-af30-a478-692b-71732aefb3ab`

#### Data attributes:
- `data-wf--button-main--variant="primary|secondary"` - Variante de botón
- `data-trigger="hover focus"` - Triggers de interacción

---

### 7. Pendientes / Próximos Pasos

- [ ] Revisar comportamiento responsive de botones
- [ ] Verificar que todos los componentes usan las fuentes correctamente
- [ ] Implementar más secciones de la página
- [ ] Validar en diferentes navegadores

---

### 8. Notas Técnicas

1. **!important en font-weight:** Necesario para override de las variables CSS de Lumos que tienen alta especificidad.

2. **Formato OTF:** Las fuentes Neulis Neue están en formato OpenType (.otf), declaradas con `format("opentype")`.

3. **font-display: swap:** Asegura que el texto sea visible mientras la fuente carga.

4. **Estructura de botón Lumos:**
   ```
   .button_main_wrap (contenedor)
     └── .button_main_element (elemento clickeable)
           ├── .button_main_icon (opcional)
           └── .button_main_text (texto)
   ```
