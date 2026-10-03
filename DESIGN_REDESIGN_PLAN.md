# Nirav Khimat Vihar — Master Visual & UX Redesign Plan

**Document Version:** 2.0  
**Design Target:** High-End Digital Yatra & Luxury Spiritual Pilgrimage Destination Experience  
**Aesthetic Benchmark:** Cinematic visual storytelling, generous whitespace, large editorial typography, layered image compositions, and intentional Framer Motion choreography (inspired by destination portals such as Nilkanthdham).

---

## 1. Critique of Previous UI vs New Visual Direction

### 1.1 Identified Issues in Previous UI
- **Template Feel:** Standard 3-column card layouts and centered text made it look like a typical hotel/motel website rather than an evocative pilgrimage sanctuary in sacred Palitana.
- **Hero Stagnation:** Standard fixed banner with basic buttons lacked cinematic depth, viewport grandeur, and emotional resonance.
- **Flat Layouts:** Sections lacked layered depth, visual rhythm, and alternating contrast between deep charcoal-brown cinematic zones and spacious ivory editorial spreads.
- **Generic Components:** Search bar and facility icons felt like generic bootstrap widgets rather than custom-crafted brand elements.

### 1.2 The New Cinematic Pilgrimage Identity
- **Atmosphere:** Serene, contemplative, dignified, authentic Jain hospitality, luxurious and timeless.
- **Contrasting Color Architecture:**
  - **Deep Earth Brown:** `#3A2418` (Cinematic dark sections, dramatic contrast)
  - **Dark Charcoal Brown:** `#241A15` (Deepest backgrounds, text on ivory)
  - **Warm Sandstone:** `#9B7049` (Borders, subtle tags, accents)
  - **Muted Antique Gold:** `#C7A15A` (Key highlights, crest accents, glowing badges)
  - **Ivory:** `#F8F3E8` (Main editorial background, warm, peaceful)
  - **Warm White:** `#FFFDF8` (Card backgrounds, elevated editorial surfaces)
- **Typography Pairing:**
  - **Display / Editorial Headings:** `Playfair Display` & `Cormorant Garamond` with high tracking, generous line-height, and bold editorial statement titles.
  - **UI / Body:** `Inter` / `DM Sans` for razor-sharp legibility across all viewport sizes.

---

## 2. Scroll Storytelling & Section Architecture

```
+-----------------------------------------------------------------------------------------+
| 00. DYNAMIC NAVIGATION (Transparent overlay over Hero -> Frosted Ivory on scroll)        |
+-----------------------------------------------------------------------------------------+
| 01. FULL-VIEWPORT CINEMATIC HERO                                                        |
|     • Fullscreen photography, scale 1.08 -> 1, staggered editorial typography            |
|     • "A PEACEFUL STAY FOR YOUR PALITANA YATRA", subtle scroll indicator ↓               |
+-----------------------------------------------------------------------------------------+
| 02. EDITORIAL WELCOME & INTRODUCTION (Ivory Section)                                    |
|     • "Where comfort meets the spirit of the yatra." Two-column story + side mask reveal |
+-----------------------------------------------------------------------------------------+
| 03. THE YATRA & SHATRUNJAYA STORY (Full-bleed Parallax)                                 |
|     • "PALITANA — A Journey Within", sacred mountain vista, slow vertical parallax       |
+-----------------------------------------------------------------------------------------+
| 04. EDITORIAL ROOMS SHOWCASE ("REST, BEFORE YOU RISE.")                                 |
|     • Large horizontal editorial room showcase cards with live database prices & capacity|
+-----------------------------------------------------------------------------------------+
| 05. CINEMATIC BOOKING EXPERIENCE ("YOUR ROOM AWAITS.")                                  |
|     • Rich dark section with customized date range picker integrated into the theme     |
+-----------------------------------------------------------------------------------------+
| 06. PURE JAIN BHOJANSHALA ("A meal shared is part of the journey.")                     |
|     • Full-width editorial dining feature: Navkarshi, Dupahar Bhojan, Chauvihar         |
+-----------------------------------------------------------------------------------------+
| 07. EDITORIAL NUMBERED FACILITIES LIST                                                  |
|     • Large typographic numbered scroll list (01 COMFORTABLE ROOMS, 02 AIR CONDITIONING)|
+-----------------------------------------------------------------------------------------+
| 08. THE VIHAR ARCHITECTURE & SPACES ("A PLACE TO PAUSE.")                               |
|     • Layered image composition with subtle parallax                                    |
+-----------------------------------------------------------------------------------------+
| 09. PALITANA YATRA GUIDANCE ("BEFORE THE FIRST STEP.")                                  |
|     • Distance to Taleti, steps advice, Doli/Palki assistance for yatris                |
+-----------------------------------------------------------------------------------------+
| 10. MASONRY EDITORIAL GALLERY & FULLSCREEN LIGHTBOX                                     |
|     • Dynamic staggered photo tiles with Framer Motion AnimatePresence lightbox         |
+-----------------------------------------------------------------------------------------+
| 11. YATRI REFLECTIONS & TESTIMONIALS                                                    |
|     • Large serif quotation carousel with verified pilgrim experiences                  |
+-----------------------------------------------------------------------------------------+
| 12. LOCATION & TRANSIT ("FIND YOUR WAY TO PALITANA.")                                   |
|     • Bhavnagar, Ahmedabad transit distances, address, interactive map link             |
+-----------------------------------------------------------------------------------------+
| 13. FINAL CINEMATIC CTA ("YOUR JOURNEY BEGINS HERE.") & RICH EDITORIAL FOOTER           |
+-----------------------------------------------------------------------------------------+
```

---

## 3. Motion & Animation Choreography (Framer Motion)

1. **Hero Entrance:** Image scale `scale: [1.08, 1]` with duration 2.2s; Headline stagger `y: [30, 0]`, `opacity: [0, 1]` with custom bezier `[0.16, 1, 0.3, 1]`.
2. **Scroll Parallax:** `useScroll` + `useTransform` applied to full-bleed landscape and architectural backdrops.
3. **Typography Stagger & Masking:** Section titles revealed using smooth vertical clipping masks as they scroll into view (`whileInView`).
4. **Editorial Scrolling List:** Active facility item illuminates with gold accent as scroll progress advances.
5. **Interactive Gallery Lightbox:** Fluid modal transitions with image zoom using `AnimatePresence`.
6. **Full-Screen Mobile Navigation:** Fullscreen drawer animating from top/side with staggered nav link reveals.
7. **Accessibility Guarantee:** Every Framer Motion component strictly evaluates `prefers-reduced-motion` to disable transforms and fallback to clean opacity transitions for users requesting reduced motion.

---

## 4. Subpage Redesign Strategy

- **`/rooms` and `/rooms/[slug]`:** Editorial hero, large format photography, capacity tags, direct booking trigger.
- **`/booking`:** Elegant, focused 6-step reservation workflow preserving 100% of the server-side availability engine, temporary holds, and Razorpay cryptographic verification.
- **`/my-booking`:** Minimalist luxury self-service lookup portal with receipt printing.
- **`/bhojanshala`, `/facilities`, `/palitana`, `/gallery`, `/contact`:** Tailored storytelling pages matching the new editorial design language.

---

## 5. Execution Roadmap

1. **Tokens & Theme Config:** Refine `tailwind.config.ts` and `app/globals.css` with the updated color palette, typography utilities, and glassmorphism tokens.
2. **Navigation & Header:** Build the dynamic transparent-to-frosted navbar with full-screen mobile menu in `components/marketing/Header.tsx`.
3. **Hero & Storytelling Components:**
   - New cinematic full-viewport `Hero.tsx`
   - Editorial `IntroductionSection.tsx`
   - Parallax `YatraStorySection.tsx`
   - Horizontal `RoomsShowcase.tsx`
   - Integrated `BookingExperienceSection.tsx`
   - Full-width `BhojanshalaEditorial.tsx`
   - Typographic `FacilitiesNumberedList.tsx`
   - Layered `ViharArchitectureSection.tsx`
   - Masonry `GalleryEditorial.tsx` with lightbox
   - Editorial `TestimonialsSection.tsx`
   - Premium `LocationSection.tsx`
   - Final `CinematicCTA.tsx`
4. **Assembly of Homepage (`app/(site)/page.tsx`):** Seamless integration of all 13 story sections.
5. **Subpages Redesign:** Modernize `/rooms`, `/rooms/[slug]`, `/booking`, `/my-booking`, `/bhojanshala`, `/facilities`, `/palitana`, `/gallery`, `/contact`, and footer.
6. **Verification:** Linting, TypeScript checks, unit and integration test runs, and production build verification.
