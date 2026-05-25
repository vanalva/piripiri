#!/usr/bin/env node
/**
 * Webflow → LUMOS site builder
 * Processes Webflow-exported HTML into clean pages using the LUMOS framework.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE = path.join(ROOT, 'site');
const TEMPLATE = path.join(ROOT, 'piripiri');
const CSS_DIR = path.join(ROOT, 'css');

// ─── Site-level CSS overrides (appended to site.css) ─────────────────────────
const SITE_OVERRIDES_CSS = `
/* ─── u-text-style-tiny utility ─── */
.u-text-style-tiny {
  font-family: var(--_text-style---font-family);
  font-size: var(--_text-style---font-size);
  line-height: var(--_text-style---line-height);
  font-weight: var(--_text-style---font-weight);
  letter-spacing: var(--_text-style---letter-spacing);
  --_text-style---font-family: var(--_typography---font--secondary-family);
  --_text-style---font-size: var(--_typography---font-size--text-tiny);
  --_text-style---line-height: var(--_typography---line-height--huge);
  --_text-style---font-weight: var(--_typography---font--primary-regular);
  --_text-style---letter-spacing: var(--_typography---letter-spacing--normal);
  --_text-style---margin-bottom: var(--_spacing---space--3);
  --_text-style---text-wrap: pretty;
}
`;

// ─── Known variant UUID → semantic name mappings ──────────────────────────────
const VARIANT_MAP = {
  'dd866659-1d7d-6447-6461-66ca86ca367f': 'overlap',
  '23049969-09ac-2789-520b-3c6ae895bbc6': 'desktop',
  'caa8b8e9-e8ec-6eb3-4526-30f19f7326f5': 'bottom',
  '46933b79-cf19-81b4-bc00-8af5c19b08b3': 'hidden',
  '433d40c6-c261-f13f-c899-61d2cadf150f': 'h2',
  'e359d2da-de19-6775-b122-3e06f925f39e': 'page-top',
  '60a7ad7d-02b0-6682-95a5-2218e6fd1490': 'main',
  '27d05669-180c-3169-9b64-0eda31f8d4d3': 'wide-16-9',
  '1c3f028b-116e-d4eb-db7f-8484491bbf2e': 'left',
  '490ac534-1fb5-5322-5b2f-0dc20ea2f909': 'horizontal',
  '8ffc88d1-7ba2-15f6-9b67-306f6d86c1bd': 'button',
  '31f8ed75-2c88-945a-a737-1b9b50b4494b': 'contain',
  '7c7eb163-b37d-338d-2369-5eae7e6d458a': 'h4',
  '792802b6-ccdb-f982-5023-5fa970cf03d0': 'h1',
  'e8e97384-daa0-7ce7-bc12-14efcd69bcd4': 'bold',
  '25bf08d9-3196-322b-5616-019ac7f0f4f7': 'brand',
  '857e5430-97c7-deb6-3c1a-d3063f9fe2c7': 'dark',
  '4fee4cc0-701f-2817-944f-2c0261b9c2f3': 'breakout',
  '6bb5e515-55a9-1fc8-d29b-ff898d8b40f7': 'breakout-reversed',
  '58b19052-6f23-ab5e-5e89-54288af57e85': 'full',
  '560ed4d9-9e8c-5c39-4619-fc154cdf9f19': 'full-reversed',
  '329f6899-ba0f-e4db-0449-3c5b8ba4f388': 'contain-reversed',
  'ebfcdcb1-ac53-1b15-fcb9-eaeda25808f5': 'card',
  '701c4b6c-37cf-de59-d80d-80a1822c4994': 'h3',
  '41c609dc-9c80-9eef-75df-03bf0eea00b4': 'display',
  '625d5df4-ad91-f7dc-9e2f-2e69f3fd7400': 'link',
  '4972adff-107c-1f37-d19c-526a2bf55c28': 'cover',
  // Additional variant mappings discovered from HTML context
  'abed2e46-044e-db8d-e420-f41a8503c278': 'full-screen',
  'ab355ea0-b722-2f23-3507-f0290f710e57': 'secondary-medium',
  'e85564cd-af30-a478-692b-71732aefb3ab': 'secondary',
  '05ff758a-80c8-4344-649b-149f87b62cc9': 'toggle',
  '14c165fa-7397-02ef-8dc0-6e307b6c980f': 'grid-2-column',
  '3970b3f9-2fa6-52d8-098a-2260caaa12bb': 'secondary-large',
  '51efa20c-c7be-48fe-973a-11367f19d622': 'cover',
  '5fdb0361-c340-58a0-00d3-b0e0b17257ad': 'grid-3-column',
  '6c75cae2-0734-1bbf-191f-bfe0f8ed1797': 'secondary-large',
  '7198e0ca-f9f4-9662-3fe9-d7114404c9cb': 'primary-large',
  'b4d321b1-05d4-6b05-8ab2-dfbc2f41ee4e': 'dark',
  'b8ee48da-439e-7156-5d2e-5b4f080e200e': 'crop-left',
  'bb0688d1-65b6-14b6-81e5-21e2cd39bbda': 'secondary-medium',
  'bb2c68bd-fd74-aa1e-69b0-e84595dd4ec8': 'brand',
  'bfb8c45c-dbfa-13cc-2dfc-0c02a34504e4': 'default',
  'c144d67f-2c62-4dbf-0fd8-0b6056b717ec': 'secondary-medium',
  'c18f59b8-0331-9f8c-c106-08818710cc20': 'radio',
  'c6d40e5e-3298-1af4-067d-37896ebd2a45': 'secondary-large',
  'ccbf2df7-16d0-30d7-0afb-0df098785596': 'flex-horizontal',
  'ce8c84b8-072d-28eb-fa41-e255213771e0': 'side-panel',
  'd47b6b31-1410-4123-4cbe-47472b6d649d': 'primary-large',
  'd7d7e32c-ac47-de0c-eb2d-07f19dfa19d2': 'primary-large',
  'da648fa9-bbba-c8cb-e549-1d22cb8af97b': 'stacked',
  'e3978449-fef8-38a6-7f29-4e26ca4f8f53': 'button',
  'f3a81397-d460-3add-9beb-5ec7af47907a': 'light',
};

// ─── Step 0: Discover additional variant mappings from HTML files ──────────────
function discoverVariantMappings() {
  const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
  // Pattern: element has both w-variant-UUID in class and data-wf--*="value" attribute
  const wfAttrRe = /data-wf--[a-zA-Z0-9_-]+="([^"]+)"/g;
  const variantClassRe = /w-variant-([a-f0-9-]{36})/g;

  for (const file of htmlFiles) {
    const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
    // Find elements with both w-variant and data-wf-- attributes
    // Simple tag-level matching
    const tagRe = /<[^>]+>/g;
    let match;
    while ((match = tagRe.exec(html)) !== null) {
      const tag = match[0];
      // Check if tag has w-variant
      const variants = [...tag.matchAll(/w-variant-([a-f0-9-]{36})/g)];
      if (!variants.length) continue;
      // Check if tag has data-wf-- attribute
      const wfAttrs = [...tag.matchAll(/data-wf--[a-zA-Z0-9_-]+="([^"]+)"/g)];
      if (!wfAttrs.length) continue;
      // Map each variant UUID to the data-wf-- value
      for (const v of variants) {
        const uuid = v[1];
        if (!VARIANT_MAP[uuid]) {
          // Use the value of the first data-wf-- attribute
          VARIANT_MAP[uuid] = wfAttrs[0][1];
        }
      }
    }
  }

  // Report discovered mappings
  const total = Object.keys(VARIANT_MAP).length;
  console.log(`  Found ${total} variant mappings (27 known + ${total - 27} discovered)`);
}

// ─── Step 1: Create site/ directory structure ─────────────────────────────────
function createSiteDir() {
  if (!fs.existsSync(SITE)) fs.mkdirSync(SITE);
  console.log('  Created site/ directory');
}

// ─── Step 2: Copy lumos.css ──────────────────────────────────────────────────
function copyLumos() {
  fs.copyFileSync(path.join(TEMPLATE, 'lumos.css'), path.join(SITE, 'lumos.css'));
  console.log('  Copied lumos.css');
}

// ─── Step 3: Extract site-specific CSS ────────────────────────────────────────
function extractSiteCSS() {
  const piripiriCSS = fs.readFileSync(path.join(CSS_DIR, 'piripiri.css'), 'utf8');
  const customCSS = fs.readFileSync(path.join(CSS_DIR, 'piripiri-custom.css'), 'utf8');

  // Parse piripiri.css into blocks (rules, @media, etc.)
  const siteRules = [];
  const interactionRules = [];

  // Tokenize CSS into rule blocks
  const blocks = parseCSS(piripiriCSS);

  for (const block of blocks) {
    if (block.type === 'rule') {
      // Check if selector is site-specific (not purely u-*, c-*, w-* framework classes)
      if (isSiteSpecificRule(block.selector)) {
        let css = rewriteVariantSelectors(block.full);
        siteRules.push(css);
      }
    } else if (block.type === 'media') {
      // For @media blocks, filter rules inside
      const innerBlocks = parseCSS(block.body);
      const siteInner = [];
      for (const inner of innerBlocks) {
        if (inner.type === 'rule' && isSiteSpecificRule(inner.selector)) {
          siteInner.push(rewriteVariantSelectors(inner.full));
        }
      }
      if (siteInner.length) {
        siteRules.push(`${block.prelude} {\n${siteInner.join('\n')}\n}`);
      }
    } else if (block.type === 'root') {
      // :root block — strip --wf-* and --w- variables, keep the rest
      const cleaned = cleanRootBlock(block.full);
      if (cleaned) siteRules.push(cleaned);
    } else if (block.type === 'fontface') {
      // @font-face — always site-specific
      siteRules.push(block.full);
    }
  }

  // Write site.css: site-specific from piripiri.css + piripiri-custom.css
  const siteCSSContent = [
    '/* Site-specific styles extracted from Webflow export */',
    '',
    ...siteRules,
    '',
    '/* ─── Custom utilities and fonts (piripiri-custom.css) ─── */',
    '',
    rewriteVariantSelectors(customCSS),
    '',
    SITE_OVERRIDES_CSS,
  ].join('\n')
    // Fix font paths: ../resources/ → resources/ (now co-located in site/)
    .replace(/\.\.\/resources\//g, 'resources/')
    // Patch font family variables
    .replace('--_typography---font--secondary-family: Manrope, sans-serif;', '--_typography---font--secondary-family: Montserrat, sans-serif;')
    // Patch line-height variables directly in the extracted :root block
    .replace('--_typography---line-height--small: 1;', '--_typography---line-height--small: 0.95;')
    .replace('--_typography---line-height--medium: 1.1;', '--_typography---line-height--medium: 1;')
    .replace('--_typography---line-height--large: 1.3;', '--_typography---line-height--large: 1.15;')
    .replace('--_typography---line-height--huge: 1.5;', '--_typography---line-height--huge: 1.25;')
    // Patch text size variables
    .replace(
      /--_typography---font-size--text-small:\s*clamp\([^;]+;/,
      '--_typography---font-size--text-small: clamp(.8125 * 1rem, ((.8125 - ((.875 - .8125) / (var(--site--viewport-max) - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((.875 - .8125) / (var(--site--viewport-max) - var(--site--viewport-min))) * 100vw), .875 * 1rem);'
    )
    // text-main: 1rem → 1.375rem
    .replace(
      /--_typography---font-size--text-main:\s*clamp\([^;]+;/,
      '--_typography---font-size--text-main: clamp(1 * 1rem, ((1 - ((1.375 - 1) / (var(--site--viewport-max) - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((1.375 - 1) / (var(--site--viewport-max) - var(--site--viewport-min))) * 100vw), 1.375 * 1rem);'
    )
    // text-large: 1.25rem → 1.875rem
    .replace(
      /--_typography---font-size--text-large:\s*clamp\([^;]+;/,
      '--_typography---font-size--text-large: clamp(1.25 * 1rem, ((1.25 - ((1.875 - 1.25) / (var(--site--viewport-max) - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((1.875 - 1.25) / (var(--site--viewport-max) - var(--site--viewport-min))) * 100vw), 1.875 * 1rem);'
    )
    // Headings: tighter max values to reduce vw sensitivity
    .replace(
      /--_typography---font-size--display:\s*clamp\([^;]+;/,
      '--_typography---font-size--display: clamp(4 * 1rem, ((4 - ((5.5 - 4) / (var(--site--viewport-max) - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((5.5 - 4) / (var(--site--viewport-max) - var(--site--viewport-min))) * 100vw), 5.5 * 1rem);'
    )
    .replace(
      /--_typography---font-size--h1:\s*clamp\([^;]+;/,
      '--_typography---font-size--h1: clamp(3 * 1rem, ((3 - ((4 - 3) / (var(--site--viewport-max) - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((4 - 3) / (var(--site--viewport-max) - var(--site--viewport-min))) * 100vw), 4 * 1rem);'
    )
    .replace(
      /--_typography---font-size--h2:\s*clamp\([^;]+;/,
      '--_typography---font-size--h2: clamp(2.5 * 1rem, ((2.5 - ((3.25 - 2.5) / (var(--site--viewport-max) - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((3.25 - 2.5) / (var(--site--viewport-max) - var(--site--viewport-min))) * 100vw), 3.25 * 1rem);'
    )
    .replace(
      /--_typography---font-size--h3:\s*clamp\([^;]+;/,
      '--_typography---font-size--h3: clamp(2 * 1rem, ((2 - ((2.5 - 2) / (var(--site--viewport-max) - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((2.5 - 2) / (var(--site--viewport-max) - var(--site--viewport-min))) * 100vw), 2.5 * 1rem);'
    )
    // Patch element spacing variables (full formula replacement)
    .replace(
      '--_spacing---space--6: clamp(2 * 1rem, ((2 - ((2.5 - 2) / (var(--site--viewport-max)  - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((2.5 - 2) / (var(--site--viewport-max)  - var(--site--viewport-min))) * 100vw), 2.5 * 1rem);',
      '--_spacing---space--6: clamp(1.5 * 1rem, ((1.5 - ((2 - 1.5) / (var(--site--viewport-max)  - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((2 - 1.5) / (var(--site--viewport-max)  - var(--site--viewport-min))) * 100vw), 2 * 1rem);'
    )
    .replace(
      '--_spacing---space--7: clamp(2.25 * 1rem, ((2.25 - ((3 - 2.25) / (var(--site--viewport-max)  - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((3 - 2.25) / (var(--site--viewport-max)  - var(--site--viewport-min))) * 100vw), 3 * 1rem);',
      '--_spacing---space--7: clamp(1.75 * 1rem, ((1.75 - ((2.5 - 1.75) / (var(--site--viewport-max)  - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((2.5 - 1.75) / (var(--site--viewport-max)  - var(--site--viewport-min))) * 100vw), 2.5 * 1rem);'
    )
    .replace(
      '--_spacing---space--8: clamp(2.5 * 1rem, ((2.5 - ((4 - 2.5) / (var(--site--viewport-max)  - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((4 - 2.5) / (var(--site--viewport-max)  - var(--site--viewport-min))) * 100vw), 4 * 1rem);',
      '--_spacing---space--8: clamp(2 * 1rem, ((2 - ((3 - 2) / (var(--site--viewport-max)  - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((3 - 2) / (var(--site--viewport-max)  - var(--site--viewport-min))) * 100vw), 3 * 1rem);'
    )
    // Patch section spacing variables (full formula replacement)
    .replace(
      '--_spacing---section-space--small: clamp(3 * 1rem, ((3 - ((5 - 3) / (var(--site--viewport-max)  - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((5 - 3) / (var(--site--viewport-max)  - var(--site--viewport-min))) * 100vw), 5 * 1rem);',
      '--_spacing---section-space--small: clamp(2 * 1rem, ((2 - ((3.5 - 2) / (var(--site--viewport-max)  - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((3.5 - 2) / (var(--site--viewport-max)  - var(--site--viewport-min))) * 100vw), 3.5 * 1rem);'
    )
    .replace(
      '--_spacing---section-space--main: clamp(4 * 1rem, ((4 - ((7 - 4) / (var(--site--viewport-max)  - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((7 - 4) / (var(--site--viewport-max)  - var(--site--viewport-min))) * 100vw), 7 * 1rem);',
      '--_spacing---section-space--main: clamp(3 * 1rem, ((3 - ((5 - 3) / (var(--site--viewport-max)  - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((5 - 3) / (var(--site--viewport-max)  - var(--site--viewport-min))) * 100vw), 5 * 1rem);'
    )
    .replace(
      '--_spacing---section-space--large: clamp(5.5 * 1rem, ((5.5 - ((10 - 5.5) / (var(--site--viewport-max)  - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((10 - 5.5) / (var(--site--viewport-max)  - var(--site--viewport-min))) * 100vw), 10 * 1rem);',
      '--_spacing---section-space--large: clamp(4 * 1rem, ((4 - ((7 - 4) / (var(--site--viewport-max)  - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((7 - 4) / (var(--site--viewport-max)  - var(--site--viewport-min))) * 100vw), 7 * 1rem);'
    )
    .replace(
      '--_spacing---section-space--page-top: clamp(10 * 1rem, ((10 - ((14 - 10) / (var(--site--viewport-max)  - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((14 - 10) / (var(--site--viewport-max)  - var(--site--viewport-min))) * 100vw), 14 * 1rem);',
      '--_spacing---section-space--page-top: clamp(7 * 1rem, ((7 - ((10 - 7) / (var(--site--viewport-max)  - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((10 - 7) / (var(--site--viewport-max)  - var(--site--viewport-min))) * 100vw), 10 * 1rem);'
    )
    // Add text-tiny variable after text-small
    .replace(
      '--_typography---font-size--text-small:',
      '--_typography---font-size--text-tiny: clamp(.6875 * 1rem, ((.6875 - ((.75 - .6875) / (var(--site--viewport-max) - var(--site--viewport-min)) * var(--site--viewport-min))) * 1rem + ((.75 - .6875) / (var(--site--viewport-max) - var(--site--viewport-min))) * 100vw), .75 * 1rem);\n  --_typography---font-size--text-small:'
    );

  fs.writeFileSync(path.join(SITE, 'site.css'), siteCSSContent, 'utf8');
  console.log(`  Extracted ${siteRules.length} site-specific CSS blocks → site.css`);
}

function parseCSS(css) {
  const blocks = [];
  let i = 0;
  const len = css.length;

  while (i < len) {
    // Skip whitespace
    while (i < len && /\s/.test(css[i])) i++;
    if (i >= len) break;

    // Check for comments
    if (css[i] === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      i = end === -1 ? len : end + 2;
      continue;
    }

    // Check for @media / @supports / @container / @layer
    if (css[i] === '@') {
      const atStart = i;
      // Read the at-rule prelude up to { or ;
      let depth = 0;
      let prelude = '';
      while (i < len && css[i] !== '{' && css[i] !== ';') {
        prelude += css[i];
        i++;
      }
      prelude = prelude.trim();

      if (css[i] === ';') {
        // At-rule without block (e.g., @import)
        blocks.push({ type: 'atrule', full: prelude + ';' });
        i++;
        continue;
      }

      if (css[i] === '{') {
        // At-rule with block
        const bodyStart = i + 1;
        depth = 1;
        i++;
        while (i < len && depth > 0) {
          if (css[i] === '{') depth++;
          else if (css[i] === '}') depth--;
          i++;
        }
        const body = css.substring(bodyStart, i - 1);

        if (prelude.startsWith('@font-face')) {
          blocks.push({ type: 'fontface', full: css.substring(atStart, i) });
        } else if (prelude.startsWith('@media') || prelude.startsWith('@supports') || prelude.startsWith('@container') || prelude.startsWith('@layer')) {
          blocks.push({ type: 'media', prelude, body, full: css.substring(atStart, i) });
        } else {
          blocks.push({ type: 'atrule', full: css.substring(atStart, i) });
        }
      }
      continue;
    }

    // Regular rule: selector { declarations }
    const ruleStart = i;
    let selector = '';
    while (i < len && css[i] !== '{') {
      selector += css[i];
      i++;
    }
    selector = selector.trim();

    if (css[i] === '{') {
      let depth = 1;
      i++;
      while (i < len && depth > 0) {
        if (css[i] === '{') depth++;
        else if (css[i] === '}') depth--;
        i++;
      }
      const full = css.substring(ruleStart, i);

      if (selector === ':root' || selector === 'html') {
        blocks.push({ type: 'root', selector, full });
      } else {
        blocks.push({ type: 'rule', selector, full });
      }
    }
  }

  return blocks;
}

function isSiteSpecificRule(selector) {
  if (!selector) return false;
  // A rule is site-specific if its selector contains any class that is NOT
  // .u-*, .c-*, .w-*, or standard pseudo-selectors/elements
  // Check if ANY class in the selector is site-specific
  const classes = selector.match(/\.([a-zA-Z_][a-zA-Z0-9_-]*)/g) || [];
  if (!classes.length) {
    // No classes at all — could be element selector, :root, etc.
    // Keep these as site-specific if they're not already handled by lumos
    return false;
  }

  // If ALL classes are framework classes, this is NOT site-specific
  const hasSiteClass = classes.some(cls => {
    const name = cls.substring(1); // remove leading .
    return !name.startsWith('u-') &&
           !name.startsWith('c-') &&
           !name.startsWith('w-') &&
           !name.startsWith('wf-');
  });

  return hasSiteClass;
}

function rewriteVariantSelectors(css) {
  // Replace .w-variant-UUID with [data-style="semantic-name"]
  // Also handle :where(.w-variant-UUID)
  css = css.replace(/:where\(\.w-variant-([a-f0-9-]{36})\)/g, (match, uuid) => {
    const name = VARIANT_MAP[uuid];
    return name ? `[data-style="${name}"]` : match;
  });
  css = css.replace(/\.w-variant-([a-f0-9-]{36})/g, (match, uuid) => {
    const name = VARIANT_MAP[uuid];
    return name ? `[data-style="${name}"]` : match;
  });
  return css;
}

function cleanRootBlock(css) {
  // Parse the :root block and remove --wf-* and --w- variables
  const match = css.match(/(:root|html)\s*\{([\s\S]*)\}/);
  if (!match) return null;

  const selector = match[1];
  const body = match[2];
  const lines = body.split('\n');
  const kept = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Skip --wf-* and --w- system variables
    if (trimmed.startsWith('--wf-') || trimmed.startsWith('--w-')) continue;
    // Skip empty lines
    if (!trimmed) continue;
    kept.push(line);
  }

  if (!kept.length) return null;
  return `${selector} {\n${kept.join('\n')}\n}`;
}

// ─── Step 4: Extract interaction CSS ──────────────────────────────────────────
function extractInteractionCSS() {
  const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
  const interactionBlocks = new Set();

  for (const file of htmlFiles) {
    const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
    // Find all <style> blocks
    const styleRe = /<style[^>]*>([\s\S]*?)<\/style>/g;
    let match;
    while ((match = styleRe.exec(html)) !== null) {
      const content = match[1].trim();
      if (!content) continue;
      // Keep interaction CSS: @container queries, [data-state], [data-trigger],
      // focus states, margin-trim, line-clamp, etc.
      // Also keep cursor styles, modal styles, etc.
      // Skip purely framework-reset CSS that's already in lumos.css
      if (isInteractionCSS(content)) {
        interactionBlocks.add(content);
      }
    }
  }

  if (interactionBlocks.size) {
    const interactionsCSS = [
      '/* Interaction CSS extracted from embedded <style> blocks */',
      '',
      ...[...interactionBlocks],
    ].join('\n\n');
    fs.writeFileSync(path.join(SITE, 'interactions.css'), interactionsCSS, 'utf8');
    console.log(`  Extracted ${interactionBlocks.size} interaction CSS blocks → interactions.css`);
    return true;
  }
  return false;
}

function isInteractionCSS(content) {
  // Identify CSS that should be kept as interaction/custom CSS
  // Skip the generic Webflow resets (box-sizing, button resets, etc.)
  // that are already in lumos.css
  const lumosResetPatterns = [
    'box-sizing: border-box',
    '.w-embed:before',
    '.w-richtext:before',
    'background-color: var(--_theme---background)',
    'button:not(:disabled)',
    '.wf-empty',
    'padding: 0',
    'cursor: pointer',
  ];

  // If this is just the basic Webflow reset block, skip
  const isReset = lumosResetPatterns.some(p => content.includes(p)) &&
    !content.includes('@container') &&
    !content.includes('[data-state]') &&
    !content.includes('[data-trigger]') &&
    !content.includes('[data-menu') &&
    !content.includes('[data-modal') &&
    !content.includes('cursor: url') &&
    !content.includes('::backdrop') &&
    !content.includes('line-clamp') &&
    !content.includes('margin-trim');

  // Keep responsive grid styles (they're LUMOS framework embedded CSS)
  if (content.includes('data-wf--grid--variant') ||
      content.includes('data-medium-columns') ||
      content.includes('data-small-columns') ||
      content.includes('--_responsive---')) {
    return true;
  }

  // Keep cursor, modal, menu interaction styles
  if (content.includes('cursor: url') ||
      content.includes('::backdrop') ||
      content.includes('[data-menu') ||
      content.includes('[data-modal') ||
      content.includes('[data-state]') ||
      content.includes('[data-trigger]') ||
      content.includes('@container') ||
      content.includes('margin-trim') ||
      content.includes('line-clamp')) {
    return true;
  }

  return !isReset;
}

// ─── Step 5: Copy assets ─────────────────────────────────────────────────────
function copyAssets() {
  const dirs = ['images', 'resources', 'sandbox'];
  for (const dir of dirs) {
    const src = path.join(ROOT, dir);
    const dst = path.join(SITE, dir);
    if (fs.existsSync(src)) {
      copyDirSync(src, dst);
      console.log(`  Copied ${dir}/`);
    }
  }
}

function copyDirSync(src, dst) {
  if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, dstPath);
    } else {
      fs.copyFileSync(srcPath, dstPath);
    }
  }
}

// ─── Step 6: Process HTML files ──────────────────────────────────────────────
function processHTMLFiles(hasInteractions) {
  const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
  let processed = 0;

  for (const file of htmlFiles) {
    // Skip piripiri/ template files
    if (file === 'build-site.js') continue;

    let html = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const originalSize = html.length;

    // Determine output filename
    let outName = file;
    if (file === 'home.html') outName = 'index.html'; // home.html → site/index.html

    // Skip duplicate index.html if home.html exists
    if (file === 'index.html' && fs.existsSync(path.join(ROOT, 'home.html'))) {
      console.log(`  Skipping ${file} (duplicate of home.html)`);
      continue;
    }

    html = processHTML(html, hasInteractions);
    fs.writeFileSync(path.join(SITE, outName), html, 'utf8');
    const ratio = ((1 - html.length / originalSize) * 100).toFixed(1);
    console.log(`  ${file} → site/${outName} (${ratio}% smaller)`);
    processed++;
  }
  return processed;
}

function processHTML(html, hasInteractions) {
  // 1. Clean <!DOCTYPE> comment
  html = html.replace(/<!--\s+This site was created in Webflow\..*?-->\s*/g, '');
  html = html.replace(/<!--\s+Last Published:.*?-->\s*/g, '');

  // 2. Clean <html> attributes
  html = html.replace(/<html([^>]*)>/i, (match, attrs) => {
    attrs = attrs.replace(/\s*data-wf-page="[^"]*"/g, '');
    attrs = attrs.replace(/\s*data-wf-site="[^"]*"/g, '');
    attrs = attrs.replace(/\s*data-wf-domain="[^"]*"/g, '');
    attrs = attrs.replace(/\s*data-wf-status="[^"]*"/g, '');
    return `<html${attrs}>`;
  });

  // 3. Remove <meta name="generator" content="Webflow">
  html = html.replace(/\s*<meta\s+content="Webflow"\s+name="generator"\s*\/?>\s*/gi, '\n');
  html = html.replace(/\s*<meta\s+name="generator"\s+content="Webflow"\s*\/?>\s*/gi, '\n');

  // 4. Replace CSS links
  // Remove normalize.css and webflow.css
  html = html.replace(/\s*<link[^>]*href="css\/normalize\.css"[^>]*>\s*/g, '\n');
  html = html.replace(/\s*<link[^>]*href="css\/webflow\.css"[^>]*>\s*/g, '\n');

  // Replace piripiri.css with lumos.css + site.css
  html = html.replace(
    /\s*<link[^>]*href="css\/piripiri\.css"[^>]*>/g,
    '\n  <link href="lumos.css" rel="stylesheet" type="text/css">\n  <link href="site.css" rel="stylesheet" type="text/css">'
  );

  // Remove piripiri-custom.css (merged into site.css)
  html = html.replace(/\s*<link[^>]*href="css\/piripiri-custom\.css"[^>]*>\s*/g, '\n');

  // Add interactions.css if it exists
  if (hasInteractions && !html.includes('interactions.css')) {
    html = html.replace(
      /<link href="site\.css"[^>]*>/,
      '$&\n  <link href="interactions.css" rel="stylesheet" type="text/css">'
    );
  }

  // 5. Remove Webflow WebFont loader script (keep the Google Fonts <link> tags)
  html = html.replace(/\s*<script src="https:\/\/ajax\.googleapis\.com\/ajax\/libs\/webfont[^"]*"[^>]*><\/script>\s*/g, '\n');
  html = html.replace(/\s*<script[^>]*>WebFont\.load\(\{[\s\S]*?\}\);<\/script>\s*/g, '\n');

  // 6. Remove Webflow touch detection script
  html = html.replace(/\s*<script[^>]*>!function\(o,c\)\{var n=c\.documentElement[\s\S]*?\}[\s\S]*?<\/script>\s*/g, '\n');

  // 7. Remove webflow.js and jquery scripts
  html = html.replace(/\s*<script\s+src="(js\/webflow\.js|https:\/\/[^"]*jquery[^"]*|https:\/\/[^"]*webflow[^"]*)"[^>]*><\/script>\s*/g, '\n');

  // 8. Remove Webflow.push scripts
  html = html.replace(/\s*<script[^>]*>[\s\S]*?Webflow\.push[\s\S]*?<\/script>\s*/g, '\n');

  // 9. Remove data-w-id attributes (IX2 interaction IDs)
  html = html.replace(/\s+data-w-id="[^"]*"/g, '');

  // 10. Remove data-wf--* variant descriptor attributes
  html = html.replace(/\s+data-wf--[a-zA-Z0-9_-]+="[^"]*"/g, '');

  // 11. Remove w-webflow-badge
  html = html.replace(/<a[^>]*class="[^"]*w-webflow-badge[^"]*"[^>]*>[\s\S]*?<\/a>/g, '');
  // Also remove the wrapper div if it exists
  html = html.replace(/<div[^>]*class="[^"]*w-webflow-badge[^"]*"[^>]*>[\s\S]*?<\/div>/g, '');

  // 12. Rewrite w-variant-UUID classes → data-style attribute
  // Pattern: class="... w-variant-UUID ..." → class="..." data-style="name"
  html = html.replace(/<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*?)>/g, (match, tag, attrs) => {
    // Check if attrs contain w-variant classes
    const variantRe = /\bw-variant-([a-f0-9-]{36})\b/g;
    const variants = [...attrs.matchAll(variantRe)];
    if (!variants.length) return match;

    // Get the first variant's semantic name
    let semanticName = null;
    for (const v of variants) {
      const name = VARIANT_MAP[v[1]];
      if (name) {
        semanticName = name;
        break;
      }
    }

    // Remove all w-variant-UUID from class attribute
    let newAttrs = attrs.replace(/\s*\bw-variant-[a-f0-9-]{36}\b/g, '');

    // Clean up extra spaces in class attribute
    newAttrs = newAttrs.replace(/class="([^"]*)"/g, (m, classes) => {
      const cleaned = classes.replace(/\s+/g, ' ').trim();
      return cleaned ? `class="${cleaned}"` : '';
    });

    // Add data-style if we have a semantic name and it's not already there
    if (semanticName && !newAttrs.includes('data-style=')) {
      newAttrs += ` data-style="${semanticName}"`;
    }

    return `<${tag}${newAttrs}>`;
  });

  // 13. Remove embedded <style> blocks that have been extracted to interactions.css
  // or are covered by lumos.css. Keep only truly unique page-specific styles.
  html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/g, (match, content) => {
    const trimmed = content.trim();
    if (!trimmed) return '';
    // Remove if it's a Webflow reset block (with or without responsive grid CSS)
    if (isExtractedCSS(trimmed)) {
      return '';
    }
    // Rewrite variant selectors in remaining CSS
    const rewritten = rewriteVariantSelectors(content);
    if (rewritten !== content) {
      return match.replace(content, rewritten);
    }
    return match;
  });

  // 14. Remove data-wf-page-id and data-wf-element-id attributes
  html = html.replace(/\s+data-wf-page-id="[^"]*"/g, '');
  html = html.replace(/\s+data-wf-element-id="[^"]*"/g, '');

  // 15. Clean up empty w-embed divs that only had Webflow reset styles
  html = html.replace(/<div class="w-embed">\s*<\/div>/g, '');
  html = html.replace(/<div class="u-position-fixed">\s*<div class="w-embed">\s*<\/div>\s*<\/div>/g, '');
  // Clean nested empty containers
  html = html.replace(/<div class="u-position-fixed">\s*<\/div>/g, '');

  // 16. Remove orphaned "Webflow JS" comments
  html = html.replace(/\s*<!--\s*Webflow\s*JS\s*-->\s*/gi, '\n');

  // 17. Clean up excessive blank lines
  html = html.replace(/\n{3,}/g, '\n\n');

  return html;
}

function isExtractedCSS(content) {
  // Remove any <style> block that has already been extracted to interactions.css
  // or is covered by lumos.css (Webflow resets, responsive grid CSS, etc.)
  //
  // Keep: page-specific modal/cursor/menu CSS that's unique per page
  // Remove: Webflow resets, responsive breakpoint CSS, generic framework CSS

  // Webflow reset indicators — these blocks are in lumos.css
  const isResetBlock = content.includes('box-sizing: border-box') &&
    content.includes('.w-embed:before');

  // Responsive grid CSS — extracted to interactions.css
  const isResponsiveBlock = content.includes('data-medium-columns') ||
    content.includes('data-small-columns') ||
    content.includes('--_responsive---');

  // Remove if it's a reset block (even if it contains responsive CSS,
  // since that's been extracted to interactions.css)
  if (isResetBlock) return true;

  // Remove if it's purely responsive grid CSS
  if (isResponsiveBlock && !content.includes('cursor: url') &&
      !content.includes('::backdrop') &&
      !content.includes('[data-menu')) {
    return true;
  }

  return false;
}

// ─── Main ────────────────────────────────────────────────────────────────────
function main() {
  console.log('Building clean site from Webflow export...\n');

  console.log('Step 0: Discovering variant mappings...');
  discoverVariantMappings();

  console.log('\nStep 1: Creating site/ directory...');
  createSiteDir();

  console.log('\nStep 2: Copying lumos.css...');
  copyLumos();

  console.log('\nStep 3: Extracting site-specific CSS...');
  extractSiteCSS();

  console.log('\nStep 4: Extracting interaction CSS...');
  const hasInteractions = extractInteractionCSS();

  console.log('\nStep 5: Copying images...');
  copyAssets();

  console.log('\nStep 6: Processing HTML files...');
  const processed = processHTMLFiles(hasInteractions);

  console.log(`\nDone! Processed ${processed} pages → site/`);
}

main();
