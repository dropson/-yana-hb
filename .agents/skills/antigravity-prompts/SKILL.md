---
name: antigravity-prompts
description: Expert guide and prompt engineering system specifically designed for Google Antigravity (AGY), Antigravity IDE, Antigravity 2.0, and agentic workflows. Use when asking for "antigravity prompt", "prompt for antigravity", "як написати промт для antigravity", "antigravity best practices", or crafting prompts for autonomous AI agents.
---

# Google Antigravity Prompt Engineering & Agent Workflow Guide

This skill guides you in crafting high-impact, unambiguous prompts and instructions specifically optimized for Google Antigravity IDE, Antigravity 2.0, and the `agy` agent architecture.

## 1. Antigravity Agent Architecture Principles

When prompting Antigravity, understand how the agent reasons and executes:
- **Autonomous Multi-Step Execution**: Antigravity plans, explores the codebase, edits files, and executes commands autonomously.
- **Tool-Rich Environment**: Antigravity has direct access to `run_command`, `replace_file_content`, `multi_replace_file_content`, `write_to_file`, `view_file`, `grep_search`, `list_dir`, `browser_subagent`, `generate_image`, `schedule`, and `manage_task`.
- **Reactive Notification System**: Never instruct Antigravity to run polling loops or busy waits (`while true; sleep; done`). Antigravity receives automatic reactive wakeup messages from background tasks.
- **Structured Artifacts**: Antigravity presents plans, architecture reviews, and long-form outputs in markdown artifacts (`<appDataDir>/brain/<conversation-id>/...`).
- **File References**: Antigravity requires clickable file links format: `[filename](file:///path/to/file)`.

## 2. Antigravity Prompt Anatomy (The 5-Part Formula)

To get 10x better results from Antigravity, structure your prompt using this pattern:

```markdown
### 1. Goal & Context
Clearly define the end state and the problem domain.
"We are building an interactive birthday greeting web app for Yana using React, GSAP, and Framer Motion."

### 2. Constraints & Tech Stack
State non-negotiables up front:
- Styling: Tailwind CSS or Vanilla CSS, curated luxury/celebratory palette (rose gold, champagne, deep velvet).
- Animation: GSAP ScrollTrigger for pinned timeline, Framer Motion for micro-interactions, Canvas-confetti for celebration.
- Do NOT use placeholder text or low-effort generic templates.

### 3. Deliverables & Milestones
Break down what needs to be created or modified:
1. Interactive Hero with birthday reveal and sound toggle.
2. Animated Polaroid Photo Memory Wall with 3D tilt.
3. Interactive Candle blowing / Gift opening component.
4. Confetti and particle burst on greeting unwrap.

### 4. Verification & Testing
Specify how success is proven:
- Run dev server and verify in headless browser via `browser_subagent`.
- Verify zero console errors, zero layout shifts, smooth 60fps animations.

### 5. Mode or Slash Command (Optional)
- Use `/plan` for architecting complex multi-file features before touching code.
- Use `/goal` for autonomous end-to-end tasks that should run until full completion.
- Use `/grill-me` when you want Antigravity to interview you about design and technical choices.
```

## 3. High-Impact Antigravity Patterns

### Pattern A: "Zero-Slop Creative Frontend"
> "Act as an elite creative technologist. Build an interactive celebratory birthday microsite. Avoid generic AI aesthetics (no standard gradients, no generic card layouts). Implement custom physics (floating balloons, confetti physics, smooth GSAP timelines), sound design with Web Audio API, responsive touch-first gestures with Framer Motion, and rich typography."

### Pattern B: "Subagent Delegation for Complex Tasks"
> "Split the task: launch a subagent to design and test the particle confetti and canvas animation module in isolation, while you build the core React component tree and state management."

### Pattern C: "Visual Verification with Browser Subagent"
> "After implementing the animation timeline, open the local dev server using `browser_subagent`, capture a screenshot of the hero entrance, test the click triggers, and confirm 60fps fluidity."

## 4. Antigravity Slash Commands Reference

| Slash Command | Best Used When |
| ------------- | -------------- |
| `/goal` | You want Antigravity to work autonomously until the complete goal is verified and achieved. |
| `/plan` | Complex features requiring architectural alignment, task breakdowns, and dependencies before coding. |
| `/grill-me` | You want the AI to interrogate you with targeted questions to iron out ambiguous design decisions. |
| `/schedule` | Setting timers or recurring background monitors. |
| `/learn` | Saving project-specific lessons and preferences for future sessions. |
