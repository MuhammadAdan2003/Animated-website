# Session Handoff & Continuation Instructions (`INSTRUCTIONS.md`)

> **Purpose**: This document records exact current state, completed changes, verified metrics, and continuation notes so the next prompt/agent session can pick up seamlessly with zero lost context.

---

## 1. Summary of Recent Completed Work

1. **Customers Page Card Badges & Lighting Enhancements (`src/pages/Customers.jsx`)**:
   - Re-engineered the case study badges into architectural glass pills (`bg-ink/85 border-white/20 hover:border-lime/45`) with active lime indicator dots (`animate-pulse`) and chapter numbers (`01`–`04`).
   - Added volumetric page lighting: top ambient lime/aqua dome, side atmospheric glow fields, and card hover blooms (`bg-lime/20` & `bg-aqua/20` radial blurs) plus top-edge specular gradient highlights.
   - Connected rich photographic backdrops (`/images/work1.jpg`–`work4.jpg`) with smooth dark vignettes.
2. **Monumental Masked Footer Typography Reveal (`src/components/Layout.jsx`)**:
   - Scaled the "Aura Studio" wordmark to monumental proportions (`text-[clamp(5rem,19.5vw,24rem)] leading-[0.80] tracking-[-0.055em]`).
   - Clean, simple presentation: removed the background light effect and removed text drop-shadow glows, leaving clean, simple, unadorned `text-lime` for "studio" and crisp stroked outline for "aura".
   - One-shot **masked clip reveal**:
     - Both "aura" and "studio" are enclosed in individual `overflow-hidden` mask containers.
     - When the user reaches the footer, "aura" and "studio" slide smoothly up from below the mask line (`y: 110% → 0%`) with a staggered timing (`delay: 0.14s`) using an editorial cubic-bezier easing (`ease: [0.16, 1, 0.3, 1]`).
     - Once revealed, they settle permanently in place with zero continuous movement.
3. **Theme-Matched Visual Assets (`public/images/`)**:
   - Replaced legacy stock imagery across the site with custom dark-emerald, lime (`#c8ff4d`), and aqua (`#4de8cf`) 3D/architectural theme visuals (`flagship.jpg`, `clarity.jpg`, `human.jpg`, `lasting.jpg`, `work1.jpg`–`work4.jpg`, `amara.jpg`, `rafael.jpg`, `yuki.jpg`).
2. **Hero Section & Typography Refinements (`src/pages/Home.jsx`, `src/components/ui/Heading.jsx`, `src/components/sections.jsx`)**:
   - Set Home Section 1 (Hero) to full device viewport height (`min-h-screen min-h-[100dvh] h-screen`).
   - Tightened multi-line display heading line-heights (`leading-[0.88] sm:leading-[0.85]` on Hero `<h1>`, tightened `Heading.jsx` clip wrappers) to eliminate vertical gaps between lines.
   - Simplified the 3 Methodology cards (`01`, `02`, `03`) in `src/pages/Home.jsx` by removing cluttered inner benchmark boxes for a refined editorial layout.
   - Styled the monumental Footer `aura studio` wordmark in `src/components/Layout.jsx` with a crisp lime stroke and ambient glow.
   - Removed temporary experimental SVG tracking files (`public/images/flagship-tracking.svg` and `src/components/wow/SvgTrackingLayer.jsx`) and restored high-res raster showcase frames (`/images/flagship.jpg`, etc.).
3. **Section 2 Scroll-Controlled Fog + Fade (`0 → 1`) + Scale Reveal (`src/components/wow.jsx`)**:
   - Audited Section 2 (`HeroExpandShowcase`) live with the **Playwright MCP** server (`1440x900`), identifying that `offset: ['start end', 'end end']` previously caused the opacity and scale transition to finish *before* Section 2 reached `top: 0`.
   - Re-engineered `HeroExpandShowcase` in `src/components/wow.jsx`:
     - **Scroll Track & Offset**: Updated container height to `h-[310vh] sm:h-[360vh]` with `useScroll({ target: containerRef, offset: ['start 85%', 'end end'] })` so the reveal starts from strict `0` on entry and completes its dramatic expansion and fog clearing while sticky-pinned at `top: 0` (`scrollYProgress` `0.00 → 0.42`).
     - **Opacity (`0 → 1` on Entry, No Fade-Out on Exit)**:
       - `imageOpacity`: `[0, 0.14, 0.30, 0.42, 1] -> [0, 0.32, 0.76, 1, 1]` (retains 100% opacity on the last image/card with zero fade-out).
       - `cardOpacity`: `[0, 0.08, 0.24, 1] -> [0, 0.55, 1, 1]`
     - **Scale Choreography**:
       - Outer portal `scale`: `[0, 0.42] -> [0.50 (desktop) / 0.86 (mobile), 1.0]` with `borderRadius` `[36/24 -> 0]`.
       - Inner image `imgInnerScale`: `[0, 0.42, 1] -> [1.24, 1, 1]`.
     - **Fog Reveal Mechanics (Optical Diffusion + Parting Volumetric Curtains)**:
       - `imageFilter`: Scroll-linked `blur(22px -> 0px)` and `brightness(0.68 -> 1)` via `useMotionTemplate` so the image materializes out of soft mist into razor-sharp focus at `0.42` (with no blur or fog re-entering on exit).
       - Multi-layer volumetric fog curtains (`centerFogOpacity`, `leftFogX: 0% -> -58%`, `rightFogX: 0% -> 58%`, `groundFogY: 0% -> 46%`) shroud the portal early on and physically part outward as you scroll, evaporating cleanly as the image reaches `opacity: 1` and `scale: 1`.
     - **HUD & 4-Chapter Scrubber Sync**:
       - Compact viewfinder badge (`miniBadgeOpacity`) shows during the foggy emergence (`0.08 → 0.34`) and fades out cleanly before the full-screen HUD (`contentOpacity`: `0.35 → 0.44`) enters.
       - Phase 2 chapter switching (`01`–`04`) runs across `scrollYProgress` `[0.42, 0.98]`, with matching `jumpToFrame(idx)` scroll target math.
4. **Console & HMR Cleanup**:
   - Wrapped `Link` and `NavLink` in `src/components/navigation/Link.jsx` with `React.forwardRef` (eliminating React ref warnings from `Magnetic` / `WaterButton`).
   - Removed unused `export const FEATURES = []` in `src/pages/Home.jsx` (preventing Vite Fast Refresh full reloads).

---

## 2. Verified Checkpoints (Playwright MCP @ `1440x900`)

| `scrollY` | State | `cardOpacity` | `imgOpacity` | Outer `scale` | Image `filter` | `centerFog` / `fogCurtains` | Console Errors/Warnings |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `0px` | Full-screen Hero (`Section 2` hidden) | `0.000` | `0.000` | `0.500` | `blur(22px) brightness(0.68)` | `0.000` / `0.000` | `0` |
| `450px` | Emerging into mist | `0.610` | `0.232` | `0.621` | `blur(16.4px) brightness(0.76)` | `0.918` / `0.949` | `0` |
| `900px` | Pinned sticky at `top: 0` (active fog parting) | `1.000` | `0.613` | `0.793` | `blur(8.4px) brightness(0.88)` | `0.686` / `0.828` | `0` |
| `1150px` | Mid-pinned expansion & clearing | `1.000` | `0.814` | `0.889` | `blur(4.0px) brightness(0.93)` | `0.372` / `0.612` | `0` |
| `1550px` | Full-screen crisp reveal + Chapter 01 HUD | `1.000` | `1.000` | `1.000` | `blur(0px) brightness(1)` | `0.000` / `0.120` | `0` |
| `3980px+` | Last image (no fade-out; stays 100% visible) | `1.000` | `1.000` | `1.000` | `blur(0px) brightness(1)` | `0.000` / `0.120` | `0` |

---

## 3. How to Pick Up in the Next Prompt

1. **Read [`Agent.md`](./Agent.md)** first for project-wide rules, design tokens, and Windows PowerShell `npm.cmd` usage.
2. **Start / Check Dev Server**:
   - Run `npm.cmd run dev` (serves on `http://localhost:3000/`).
3. **Key Files for Home & Scroll Animations**:
   - Home layout & sections: `src/pages/Home.jsx`
   - Section 2 Fog + Fade + Scale Showcase & Section 3/4 Wow components: `src/components/wow.jsx` (`HeroExpandShowcase` starts around line 224)
   - Shared UI primitives: `src/components/ui/`
4. **Tuning Knobs for Section 2 Fog Animation (if further tweaks are ever requested)**:
   - To make the fog thicker/lighter: adjust gradient alphas or `centerFogOpacity` / `fogCurtainOpacity` in `HeroExpandShowcase` (`src/components/wow.jsx`).
   - To make optical blur stronger/softer: adjust `imgBlurPx` (`[22, 12, 0, 0, 16]`) in `HeroExpandShowcase`.
   - To make the reveal faster/slower on scroll: adjust the `0.42` upper bound on `scale`, `imageOpacity`, `imgBlurPx`, and Phase 2 start threshold (keeping `jumpToFrame` in sync).

