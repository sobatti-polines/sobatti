# Design System: SobatTi

## 1. Visual Theme & Atmosphere

SobatTi's website communicates trust and energy through a dual-accent palette of deep blue and vibrant orange. The design uses Accent Blue (`#024885`) — a rich, professional blue — as the primary brand color, complemented by Accent Orange (`#EB6003`) for highlights and secondary CTAs. This combination balances reliability with dynamic energy, perfect for an IT mentoring and project coaching platform.

The button system uses a distinctive 56px radius for pill-shaped CTAs with hover transitions to lighter variants. The design alternates between white content sections and dark (`#0a0b0d`, `#282b31`) feature sections, creating a professional, modern interface.

**Key Characteristics:**
- Accent Blue (`#024885`) as primary brand color
- Accent Orange (`#EB6003`) as secondary highlight color
- Four-font proprietary family: Display, Sans, Text, Icons
- 56px radius pill buttons with hover transitions
- Near-black (`#0a0b0d`) dark sections + white light sections
- 1.00 line-height on display headings — ultra-tight
- Cool gray secondary surface (`#eef0f3`) with subtle tint
- `text-transform: lowercase` on some button labels — unusual

## 2. Color Palette & Roles

### Primary
- **Accent Blue** (`#024885`): Primary brand, links, CTA borders
- **Accent Orange** (`#EB6003`): Secondary accent, highlight CTAs
- **Pure White** (`#ffffff`): Primary light surface
- **Near Black** (`#0a0b0d`): Text, dark section backgrounds
- **Cool Gray Surface** (`#eef0f3`): Secondary button background

### Interactive
- **Hover Blue** (`#0361b0`): Blue button hover background
- **Hover Orange** (`#ff7a1a`): Orange button hover background
- **Link Blue** (`#024885`): Link color
- **Muted Blue** (`rgba(91,97,110,0.2)`): Border color at 20% opacity

### Surface
- **Dark Card** (`#282b31`): Dark button/card backgrounds
- **Light Surface** (`rgba(247,247,247,0.88)`): Subtle surface

## 3. Typography Rules

### Font Families
- **Display**: `CoinbaseDisplay` — hero headlines
- **UI / Sans**: `CoinbaseSans` — buttons, headings, nav
- **Body**: `CoinbaseText` — reading text
- **Icons**: `CoinbaseIcons` — icon font

### Hierarchy

| Role | Font | Size | Weight | Line Height | Notes |
|------|------|------|--------|-------------|-------|
| Display Hero | CoinbaseDisplay | 80px | 400 | 1.00 (tight) | Maximum impact |
| Display Secondary | CoinbaseDisplay | 64px | 400 | 1.00 | Sub-hero |
| Display Third | CoinbaseDisplay | 52px | 400 | 1.00 | Third tier |
| Section Heading | CoinbaseSans | 36px | 400 | 1.11 (tight) | Feature sections |
| Card Title | CoinbaseSans | 32px | 400 | 1.13 | Card headings |
| Feature Title | CoinbaseSans | 18px | 600 | 1.33 | Feature emphasis |
| Body Bold | CoinbaseSans | 16px | 700 | 1.50 | Strong body |
| Body Semibold | CoinbaseSans | 16px | 600 | 1.25 | Buttons, nav |
| Body | CoinbaseText | 18px | 400 | 1.56 | Standard reading |
| Body Small | CoinbaseText | 16px | 400 | 1.50 | Secondary reading |
| Button | CoinbaseSans | 16px | 600 | 1.20 | +0.16px tracking |
| Caption | CoinbaseSans | 14px | 600–700 | 1.50 | Metadata |
| Small | CoinbaseSans | 13px | 600 | 1.23 | Tags |

## 4. Component Stylings

### Buttons

**Primary Pill (56px radius)**
- Background: `#eef0f3` or `#282b31`
- Radius: 56px
- Border: `1px solid` matching background
- Hover: `#0361b0` (hover blue)
- Focus: `2px solid black` outline

**Full Pill (100000px radius)**
- Used for maximum pill shape

**Blue Bordered**
- Border: `1px solid #024885`
- Background: transparent

**Orange Bordered**
- Border: `1px solid #EB6003`
- Background: transparent

### Cards & Containers
- Radius: 8px–40px range
- Borders: `1px solid rgba(91,97,110,0.2)`

## 5. Layout Principles

### Spacing System
- Base: 8px
- Scale: 1px, 3px, 4px, 5px, 6px, 8px, 10px, 12px, 15px, 16px, 20px, 24px, 25px, 32px, 48px

### Border Radius Scale
- Small (4px–8px): Article links, small cards
- Standard (12px–16px): Cards, menus
- Large (24px–32px): Feature containers
- XL (40px): Large buttons/containers
- Pill (56px): Primary CTAs
- Full (100000px): Maximum pill

## 6. Depth & Elevation

Minimal shadow system — depth from color contrast between dark/light sections.

## 7. Do's and Don'ts

### Do
- Use Accent Blue (#024885) for primary interactive elements
- Use Accent Orange (#EB6003) for secondary highlights and CTAs
- Apply 56px radius for all CTA buttons
- Use CoinbaseDisplay for hero headings only
- Alternate dark (#0a0b0d) and white sections

### Don't
- Don't use the blue decoratively — it's functional only
- Don't use sharp corners on CTAs — 56px minimum

## 8. Responsive Behavior

Breakpoints: 400px, 576px, 640px, 768px, 896px, 1280px, 1440px, 1600px

## 9. Agent Prompt Guide

### Quick Color Reference
- Brand Primary: Accent Blue (`#024885`)
- Brand Secondary: Accent Orange (`#EB6003`)
- Background: White (`#ffffff`)
- Dark surface: `#0a0b0d`
- Secondary surface: `#eef0f3`
- Hover Blue: `#0361b0`
- Hover Orange: `#ff7a1a`
- Text: `#0a0b0d`

### Example Component Prompts
- "Create hero: white background. CoinbaseDisplay 80px, line-height 1.00. Pill CTA (#eef0f3, 56px radius). Hover: #0361b0."
- "Build dark section: #0a0b0d background. CoinbaseDisplay 64px white text. Blue accent link (#024885) or orange highlight (#EB6003)."
