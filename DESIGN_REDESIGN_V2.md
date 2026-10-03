# SHRI NIRAV KHIMAT BHAVAN — WEBSITE REDESIGN SPECIFICATION (V2)
*Premium Jain Pilgrimage & Dharamshala Visual Experience*

---

## 1. Executive Summary & Design Vision
The website for **Shri Nirav Khimat Bhavan** (Palitana, Gujarat) is rebuilt from the ground up to establish an authentic, high-end, and deeply spiritual visual identity. Rather than appearing as a generic hotel or basic CRUD booking utility, the new design delivers a **cinematic pilgrimage journey** inspired by the serenity, architectural dignity, and spiritual reverence of sacred Mount Shatrunjaya.

### Key Visual Pillars
1. **Heritage Architecture & Jain Reverence:** Warm earth tones (`#3A2418`, `#241A15`, `#6B4630`), Antique Gold (`#C7A15A`), Warm Sandstone (`#9B7049`), and Pure Ivory (`#F8F3E8`, `#FFFDF8`).
2. **Typography Hierarchy:**
   - Display: `Cormorant Garamond` (fluid clamp responsive scale from 32px to 80px).
   - Body & Interface: `Inter` / `DM Sans` with clean tracking and contrast.
3. **Intentional Framer Motion:**
   - Soft scale reveals (`1.08 -> 1`), subtle parallax, staggered text entrances, and seamless header transitions.
   - Respects user accessibility (`prefers-reduced-motion` via `useReducedMotion`).
4. **Dynamic Data Parity:**
   - 100% connected to Supabase / in-memory store for room inventory, dynamic pricing, live availability, and booking transactions.
   - Contact numbers, Bhojanshala schedules, and policies are configurable.

---

## 2. Page & Component Layout Architecture

```
Landing Page Architecture (app/(site)/page.tsx)
 ├── 00. Header (Transparent -> Frosted Ivory on scroll + Fullscreen Mobile Drawer)
 ├── 01. Cinematic Hero (100svh, full viewport visual, typography reveal, scroll indicator)
 ├── 02. The Vihar (Asymmetrical narrative: "A PLACE TO PAUSE", key dimensions)
 ├── 03. Palitana Yatra ("PALITANA — WHERE THE JOURNEY BEGINS", parallax visual)
 ├── 04. Rooms Showcase (Editorial room presentation, dynamic rates, room details modal)
 ├── 05. Availability Search Bar (Seamless real-time search widget)
 ├── 06. Interactive Facilities (01-07 Typographic list with hover image reveal)
 ├── 07. Bhojanshala ("A MEAL IS PART OF THE JOURNEY", dynamic meal schedules)
 ├── 08. Editorial Gallery (Irregular masonry layout with whitespace & lightbox modal)
 ├── 09. Pilgrim Reflections (Minimalist editorial testimonial carousel)
 ├── 10. Palitana Guide ("BEFORE THE FIRST STEP", yatra preparation guide)
 ├── 11. Location & Transit ("FIND YOUR WAY TO PALITANA", address, directions, phone/WhatsApp)
 ├── 12. Final Cinematic CTA ("YOUR JOURNEY BEGINS HERE", direct booking trigger)
 └── 13. Sophisticated Footer (Clean, elegant footer with trust info and navigation)
```

---

## 3. Brand & Typography Tokens (`tailwind.config.ts`)

| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `brand.deep` | `#3A2418` | Primary Earth Brown / High Contrast Headings |
| `brand.charcoal` | `#241A15` | Dark Backgrounds / Cinematic Overlays |
| `brand.warmBrown` | `#6B4630` | Sub-headings, borders, accent elements |
| `brand.sandstone` | `#9B7049` | Secondary accents, icons, dividers |
| `brand.gold` | `#C7A15A` | Antique gold highlights, badges, active indicators |
| `brand.ivory` | `#F8F3E8` | Primary background, editorial surfaces |
| `brand.warmWhite` | `#FFFDF8` | Crisp elevated cards, modals |
| `brand.lightSand` | `#F1E8DA` | Soft inputs, pill tags, subtle borders |
| `font-serif` | Cormorant Garamond | Editorial display headings & numbers |
| `font-sans` | Inter, system-ui | Interface text, inputs, labels, metadata |

---

## 4. Preservation of Core Logic & Security
- **No breaking changes** to `/api/availability`, `/api/bookings/hold`, `/api/payments/verify`, `/api/admin/*`.
- 10-minute atomic hold mechanism preserved.
- Razorpay server-side verification preserved.
- Admin dashboard, room block calendar, and audit logs remain intact.
