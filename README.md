# Resilient Browser Automation for Multi-Step UX Flows

This repository contains a small, self-contained browser automation script written in vanilla JavaScript.

The current implementation is **tested and validated on Instahyre**, where it serves as a **real-world case study** for handling multi-step user interactions, conditional confirmation dialogs, asynchronous UI updates, and transient error states in a modern web application.

While the example implementation targets Instahyre’s UI, the **design patterns, safeguards, and approach are intentionally generic** and applicable to similar client-side automation problems.


## 🎯 Motivation

Many web applications expose repetitive user workflows that involve:
- Dynamic DOM rendering
- Conditional modals
- Network-driven UI state changes
- Temporary error or retry states

Instahyre’s job-application flow is a good real-world example of this class of problem:
- A primary action may trigger secondary confirmation dialogs
- UI elements become enabled/disabled based on async state
- Error popups can interrupt the happy path

This project explores how to build **resilient, user-controlled browser automation** for such flows without relying on heavy frameworks or headless automation.


## 🧠 Design Principles

This project is intentionally designed around:

- **Case-study driven development**  
  Instahyre is used as a concrete environment to validate behavior under real UX constraints.

- **Manual execution & user intent**  
  The script is executed explicitly via browser DevTools and does not run autonomously.

- **State-aware automation**  
  Alternate UI flows (e.g. secondary confirmation modals) are detected and handled explicitly.

- **Guardrails over brute force**  
  Caps, delays, and cancellation logic are first-class concerns.

- **Resilience over fragility**  
  Text-based detection is preferred over brittle CSS-only selectors where possible.


## ⚙️ What This Script Does

In its current form (Instahyre case study), the script:

1. Detects the primary “Apply” action in the UI
2. Triggers the action when enabled
3. Detects optional “Apply to similar jobs” confirmation modals
4. Applies or cancels based on configurable thresholds
5. Handles transient error popups gracefully
6. Repeats the process up to a user-defined limit

All execution occurs **in-browser**, under direct user supervision.


## 🚀 Usage

### 1. Open Instahyre
Navigate to the relevant Instahyre job listing or suggestion page.

### 2. Open DevTools

### 3. Paste the script
Paste the full script from `src/autoApply.js` into the console.

### 4. Run with a limit

autoApply(10);
