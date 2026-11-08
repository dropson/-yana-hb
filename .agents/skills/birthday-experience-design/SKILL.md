---
name: birthday-experience-design
description: Creative engineering and design architecture for high-end interactive birthday greeting websites, animated celebratory microsites, and digital cards. Use when building "birthday site", "сайт привітання день народження", "celebratory animation", "greeting card", or interactive festive experiences with GSAP, Framer Motion, confetti, sound, and 3D effects.
---

# Birthday Experience Design & Creative Engineering

This skill provides architecture, animation orchestration, and interaction design for creating celebratory, emotionally resonant, and visually stunning birthday greeting microsites and digital cards.

## 1. Core Emotional Arc & Stage Architecture

A memorable greeting website follows a cinematic narrative:

```
[Phase 1: The Teaser] ──► [Phase 2: The Big Reveal] ──► [Phase 3: The Journey] ──► [Phase 4: The Finale]
   Mystery Envelope         Explosion / Unboxing         Photo Wall & Wishes         Interactive Wishes /
  or Candle Lighting         Confetti & Music            GSAP Horizontal Scroll       Personal Message
```

### Stage 1: The Teaser / Hero Entrance
- **Concept**: A mysterious, elegant entrance rather than dumping the whole page at once.
- **Interactions**:
  - An interactive 3D gift box with a ribbon you can drag or click to untie.
  - Or a glowing birthday cake where the user clicks or blows to extinguish the candle.
  - Or an animated wax seal envelope that unfolds.
- **Micro-copy**: Subtle invitation ("For Yana, on your special day...", "Click to open your surprise").

### Stage 2: The Big Reveal
- **Orchestration (GSAP Timeline + Canvas Confetti)**:
  - Background flash/shimmer with elegant palette (e.g. champagne gold `#F7D070`, soft blush `#FFB5C2`, deep midnight `#0D1117`, or lilac lavender).
  - Confetti burst: Multi-colored or metallic particles cascading down with realistic gravity and wind drift.
  - Sound effect: Joyful chime, cork pop, or ambient background melody (always respectful with clear audio toggle).
  - Main typography entrance: "Happy Birthday, Yana!" using custom display font with staggered letter reveals.

### Stage 3: The Journey (Memory Gallery & Milestones)
- **Interactive Polaroid / Memory Stack**:
  - Framer Motion drag gestures with rotational momentum (`dragConstraints`, `dragElastic`).
  - Cards tilt with 3D perspective based on pointer movement.
  - Caption cards with heartfelt notes, unforgettable moments, and photos.
- **GSAP ScrollTrigger Pinned Section**:
  - Horizontal scroll showcasing shared memories, qualities, or funny moments across the years.

### Stage 4: Interactive Delights (Easter Eggs)
- **Candle Wish**: Click-and-hold to make a wish; stars converge into an illuminated wish.
- **Floating Balloons**: Click balloons to pop them with mini-confetti bursts and sound.
- **Sound Design**: Lightweight Web Audio API synthesizer for clicks, pops, and celebratory chords (no external heavy MP3 dependencies needed).
- **Guestbook / Wish Jar**: Interactive sticky notes or cards where friends can leave wishes or pre-recorded audio notes.

---

## 2. Animation Tech Stack Integration

### GSAP (Core & ScrollTrigger)
Best for:
- Orchestrated entrance sequences with millisecond precision timelines (`gsap.timeline()`).
- Coordinated particle physics and continuous ambient floaters.
- Scroll-pinned sections and parallax effects.

```javascript
// Example: Master Birthday Entrance Timeline
const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });
tl.to(".gift-ribbon", { scaleX: 0, duration: 0.6 })
  .to(".gift-lid", { y: -120, rotation: -15, opacity: 0 }, "-=0.2")
  .to(".greeting-title .char", { y: 0, opacity: 1, stagger: 0.04 }, "-=0.4")
  .add(() => launchConfetti(), "-=0.2")
  .fromTo(".photo-card", { scale: 0.8, opacity: 0, y: 50 }, { scale: 1, opacity: 1, y: 0, stagger: 0.15 }, "-=0.5");
```

### Framer Motion / Motion
Best for:
- Gesture-driven UI: Draggable polaroids, spring physics, hover scale, tap bounce.
- Modals, overlays, and presence transitions (`AnimatePresence`).

```tsx
// Example: Draggable Memory Polaroid
<motion.div
  drag
  dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
  whileHover={{ scale: 1.05, rotateZ: 2, zIndex: 10 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="polaroid-card"
>
  <img src={photoUrl} alt="Memory" />
  <p className="handwritten-caption">{caption}</p>
</motion.div>
```

### Canvas Confetti & Particles
Use `canvas-confetti` or raw HTML5 2D Canvas for fireworks:
```javascript
import confetti from 'canvas-confetti';

export function fireBirthdayConfetti() {
  const count = 200;
  const defaults = { origin: { y: 0.7 }, zIndex: 9999 };

  confetti({ ...defaults, spread: 60, particleCount: count * 0.25, colors: ['#FF69B4', '#FFD700', '#9370DB'] });
  confetti({ ...defaults, spread: 100, particleCount: count * 0.2, scalar: 1.2 });
  confetti({ ...defaults, spread: 120, particleCount: count * 0.35, decay: 0.91, scalar: 0.8 });
}
```

---

## 3. Aesthetic Guidelines (Anti-Slop Birthday Design)

1. **Avoid Cheesy Clip-Art**: No low-res 2000s balloon clipart or harsh primary colors.
2. **Elevated Color Palette**:
   - Palette A (Warm Elegance): Champagne `#FBE8A6`, Warm Rose `#F4978E`, Deep Plum `#301B28`, Pure Cream `#FFFDF9`.
   - Palette B (Cosmic Magic): Midnight Velvet `#0B0C10`, Electric Violet `#9A48D0`, Starlight Gold `#F8D800`, Neon Rose `#FF2E93`.
3. **Typography**: Pair a warm, expressive display font (e.g. *Playfair Display*, *Cinzel*, *Great Vibes*, or *Cormorant Garamond*) with a clean modern sans-serif (*Inter*, *Plus Jakarta Sans*).
4. **Delight in Details**:
   - Subtle cursor trail (sparkles or hearts floating behind the cursor).
   - Replay button so the recipient can re-watch the opening experience.
   - Fully optimized for mobile screens (touch targets >= 44px, safe area padding).
