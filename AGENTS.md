# Project Guidelines: Yana Birthday Experience (`-yana-hb`)

## Project Purpose
An interactive, high-end celebratory birthday website / digital greeting card for Yana. The experience must be emotionally resonant, visually spectacular, and filled with fluid animations, micro-interactions, and festive surprises.

## Installed Agent Skills (Located in `.agents/skills/`)

### 1. Antigravity & AI Prompt Engineering
- `antigravity-prompts`: Specialized prompt engineering for Google Antigravity IDE, agent modes, slash commands, reactive wakeups, and artifacts.
- `prompt-engineer`: Systematic LLM prompt architecture, role design, and context management.
- `prompt-engineering-creative`: Meta-skill for AI creative prompts (images, video, animation concepts).
- `prompt-engineering-patterns`: Production prompt patterns (few-shot, chain-of-thought, structured output).
- `enhance-prompt`: Google Stitch prompt optimizer.

### 2. Frontend & Animation Engine
- `gsap-core`: GSAP core tweens, easing, stagger, responsive animation.
- `gsap-react`: GSAP integration with React (`useGSAP`, refs, cleanup).
- `gsap-scrolltrigger`: Scroll-driven animation, parallax, pinned sections.
- `gsap-timeline`: Orchestrated sequences, timelines, keyframe choreography.
- `gsap-plugins`: Advanced GSAP plugins (Flip, Draggable, ScrollSmoother, etc.).
- `gsap-performance`: 60fps optimization, transforms, avoiding layout thrashing.
- `gsap-frameworks`: GSAP lifecycle for frameworks.
- `gsap-utils`: GSAP math and utility functions.
- `framer-motion-animator`: Framer Motion gestures, spring physics, layout animations, exit animations.
- `3d-web-experience`: Three.js, WebGL, interactive 3D scenes.
- `threejs-3d-graphics`: 3D graphics, lighting, shaders, camera controls.
- `generative-art`: Procedural canvas visuals, particle systems, festive effects.

### 3. Visual Aesthetics & Design Systems
- `birthday-experience-design`: Dedicated architecture for interactive birthday microsites (envelope/gift unboxing, confetti physics, interactive candle blowing, polaroid memory wall, Web Audio API sound design, celebratory storytelling).
- `design-taste-frontend`: Anti-slop frontend design, elite typography, bespoke palettes, real UI aesthetics.
- `ui-ux-pro-max`: 79 styles, 17 GSAP presets, 192 product palettes, 119 UX guidelines.
- `web-design-guidelines`: Web interface guidelines & accessibility audit.
- `vercel-react-best-practices`: High-performance React patterns.

## Technical & Design Principles
1. **Aesthetics & Atmosphere**: Warm, premium celebratory atmosphere (e.g. champagne gold, soft blush, deep velvet midnight). Avoid generic templates or cheesy clipart.
2. **Smooth 60fps Animation**: Use `will-change: transform, opacity`, avoid animating layout properties (`width`, `height`, `top`, `left`).
3. **Sound & Interaction**: Include festive micro-sounds (Web Audio API or audio elements) with an intuitive mute/audio toggle.
4. **Mobile First & Responsive**: Ensure touch targets are at least 44x44px and gesture interactions work seamlessly on mobile.
