# Aura Studio — Project Agent Guide (`Agent.md`)

> **Read this file first before making changes.** It contains the essential architecture, design tokens, scroll/animation patterns, and environment rules for the **Aura Studio (`spatial-ai-studio`)** web platform.

---

## 1. Tech Stack & Runtime Environment

- **Framework**: React 18 (`^18.3.1`) + Vite 5 (`^5.4.11`), ES Modules (`"type": "module"`).
- **Routing**: `@tanstack/react-router` (`src/router.jsx`) with `RootLayout` (`src/layouts/RootLayout.jsx`) and dedicated route pages.
- **Styling**: Tailwind CSS 3 (`tailwind.config.js`, `src/index.css`) + custom utility classes (`.gutter`, `.glass`, `.card-smoke`, `.pulse-ring`).
- **Motion & Scroll**:
  - **Lenis** (`lenis` in `src/hooks/useSmoothScroll.js`, exposed globally on `window.__lenis`) provides global 1:1 smooth inertial scrolling.
  - **Framer Motion** (`framer-motion` v14) drives scroll-linked animations (`useScroll`, `useTransform`, `useMotionTemplate`, `useMotionValueEvent`) and page/element transitions.
  - **GSAP** (`gsap` v3.12) & **Three.js / React Three Fiber** (`three`, `@react-three/fiber`, `@react-three/drei`) power specialized spatial & WebGL backgrounds (`src/components/ui/WebGLBackground.jsx`).
- **Icons**: `lucide-react`.
- **Verification**: Playwright MCP (`playwright` server) for live DOM, computed-style, console, and viewport screenshot checks against `http://localhost:3000/`.

### Windows PowerShell Command Rule
- PowerShell execution policies on this machine block `.ps1` shims (`npx.ps1`, `npm.ps1`).
- **Always use `npm.cmd`** (e.g., `npm.cmd run dev`, `npm.cmd run build`) or `cmd /c npx ...` when running terminal commands.
- Vite dev server runs on **`http://localhost:3000/`** (configured in `vite.config.js`).

---

## 2. Directory & File Architecture

```text
c:\Users\Adan\Desktop\newsite\
├── public/
│   └── images/                  # Local bespoke theme assets (flagship.jpg, clarity.jpg, human.jpg, lasting.jpg, work1..4.jpg, amara.jpg, rafael.jpg, yuki.jpg)
├── src/
│   ├── main.jsx                 # React root entry point
│   ├── App.jsx                  # RouterProvider wrapper + AppErrorBoundary
│   ├── router.jsx               # TanStack Router route tree (/, /product, /solutions, /customers, /pricing, /about, /journal, /contact)
│   ├── index.css                # Global styles, typography, .gutter, .glass, .card-smoke, scrollbar & selection rules
│   ├── layouts/
│   │   └── RootLayout.jsx       # Master shell: CustomCursor, WebGLBackground, Navbar, Outlet, Footer, Lenis smooth scroll
│   ├── hooks/
│   │   ├── useSmoothScroll.js   # Lenis initialization (exposes window.__lenis)
│   │   ├── useScrollToTop.js    # Route change scroll reset
│   │   └── useInView.js         # IntersectionObserver hook for viewport reveals
│   ├── components/
│   │   ├── Layout.jsx           # Navbar & monumental Footer (includes glowing stroked "aura studio" wordmark)
│   │   ├── sections.jsx         # Shared sections: SectionHead, LogoCloud, StatsBand, Testimonials, CTABand, Newsletter
│   │   ├── wow.jsx              # Signature scroll showcases: HeroExpandShowcase (Section 2), NeuralSpatialCore, SpaceExplorer, AnimatedGeometricCircles
│   │   ├── charts.jsx           # Interactive telemetry & metric visualizations
│   │   ├── ui.jsx               # Barrel re-export of UI primitives
│   │   ├── navigation/
│   │   │   └── Link.jsx         # React.forwardRef wrappers (Link, NavLink) around TanStack Router Link
│   │   ├── journal/
│   │   │   └── ArticleModal.jsx # Editorial modal reader for Journal articles
│   │   └── ui/                  # Atomic UI primitives (Heading, Reveal, WaterButton, Magnetic, CardSmoke, Counter, Eyebrow, Marquee, PageTransition, CustomCursor, WebGLBackground)
│   └── pages/
│       ├── Home.jsx             # Flagship landing page (Full-screen Hero -> Section 2 Fog/Fade/Scale Showcase -> LogoCloud -> Core Pillars -> Work Reel -> Methodology -> Testimonials -> CTA)
│       ├── Product.jsx          # Services / Engineering architecture page
│       ├── Solutions.jsx        # Domain expertise & vertical solutions
│       ├── Customers.jsx        # Selected work & verified client case studies
│       ├── Pricing.jsx          # Engagement models & retainer tiers
│       ├── About.jsx            # Studio manifesto, leadership & culture
│       ├── Journal.jsx          # Engineering perspectives & articles
│       ├── Contact.jsx          # Project inquiry & onboarding flow
│       └── NotFound.jsx         # Custom 404 fallback
```

---

## 3. Brand & Design System Tokens

Maintain strict visual consistency across every component:

| Token | Value | Usage |
| :--- | :--- | :--- |
| `ink` | `#050a0a` | Primary deep obsidian-emerald background |
| `ink2` | `#0b1413` | Elevated dark card surface |
| `ink3` | `#122020` | Subtle container / hover surface |
| `lime` | `#c8ff4d` | Primary high-contrast electric accent, active badges, primary CTAs |
| `aqua` | `#4de8cf` | Secondary cyber-teal accent & atmospheric mist |
| `sand` | `#f3eee3` | Primary warm off-white editorial typography |
| `coral` | `#ff7a5c` | Tertiary alert / highlight accent |

### Typography
- **Display (`font-display`)**: `Bricolage Grotesque` — Monumental editorial headlines (`font-extrabold`, tight tracking `-0.035em` to `-0.04em`, tight cohesive line-height `0.85`–`0.98` so multi-line headings never have excessive vertical gaps).
- **Body (`font-sans`)**: `Manrope` — Clean, readable UI and editorial copy.
- **Technical (`font-mono`)**: `JetBrains Mono` — Eyebrows, HUD telemetry badges, chapter indices (`01 — 04`), and metrics.

---

## 4. Essential Engineering & UI Rules

1. **1:1 Scroll Binding (No Double Smoothing)**:
   - Because `Lenis` already smooths `window.scrollY`, bind Framer Motion `useScroll` motion values **directly** to `useTransform` without wrapping `scrollYProgress` in `useSpring` unless deliberate lag is desired. Wrapping Lenis scroll in heavy springs causes sluggish, rubbery detachment.
2. **Sticky Scroll Showcases**:
   - Ensure sticky viewports (`sticky top-0 h-screen h-[100dvh]`) sit inside tall scroll-track wrappers (`relative h-[310vh] sm:h-[360vh]`) without `overflow-hidden` on ancestor elements that would break CSS `position: sticky`.
   - When programmatically scrolling to a progress checkpoint (e.g., `jumpToFrame`), prefer `window.__lenis.scrollTo(targetY, { duration: 0.85 })` with a `window.scrollTo` fallback.
3. **Hero & Section 2 Separation (`src/pages/Home.jsx`)**:
   - **Section 1 (Hero)** must remain full device screen height (`min-h-screen min-h-[100dvh] h-screen`) with tight headline line-height (`leading-[0.88] sm:leading-[0.85]`).
   - **Section 2 (`HeroExpandShowcase` in `src/components/wow.jsx`)** is a standalone scroll-driven showcase below the Hero that reveals its imagery **like parting fog** — combining `opacity` (`0 → 1`), `scale` (`initialScale → 1` outer + `1.24 → 1` inner), optical blur diffusion (`22px → 0px`), and parting volumetric fog curtains, 100% controlled by scroll. The final image retains full 100% opacity with zero fade-out effect.
4. **Clean Editorial Cards**:
   - Keep feature and methodology cards clean and uncluttered (avoid noisy nested benchmark sub-tables inside cards unless explicitly requested).
5. **Fast Refresh & Ref Hygiene**:
   - Keep page files (`src/pages/*.jsx`) exporting only their page component (avoid stray unused named constant exports that invalidate Vite React Fast Refresh).
   - Keep custom navigation wrappers (`src/components/navigation/Link.jsx`) wrapped in `React.forwardRef` so `<Magnetic>` and `<WaterButton>` never trigger ref warnings.
6. **Local Image Assets**:
   - Use the generated theme-matched assets in `public/images/` (`/images/flagship.jpg`, `/images/clarity.jpg`, `/images/human.jpg`, `/images/lasting.jpg`, `/images/work1.jpg`–`work4.jpg`, `/images/amara.jpg`, `/images/rafael.jpg`, `/images/yuki.jpg`). Do not replace them with generic stock photos or unrequested SVGs.

