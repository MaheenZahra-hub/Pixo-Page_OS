# 👻 Pixo-Page OS — Virtual Memory & Page Replacement Simulator

An interactive, retro 8-bit pixel-art arcade simulator built with **React** and **Tailwind CSS** to visualize Operating System virtual memory management and page replacement algorithms step-by-step.

---

## ✨ Key Features

* **Three Core Page Replacement Algorithms:**
  * **FIFO (First-In, First-Out):** Evicts the oldest page loaded into memory.
  * **LRU (Least Recently Used):** Scans backward in time to evict the page unused for the longest duration.
  * **Optimal (OPT):** Looks ahead into future references to evict the page needed farthest in the future (or never again).
* **Step-by-Step Memory Frame Matrix:**
  * Visualizes RAM slots (`Slot 0` to `Slot M-1`) across every incoming page reference.
  * Color-coded status indicators: **Mint Green** for Page Hits, **Rose Pink** for Page Faults, and an **Evict Row** flagging removed victim pages (`-X`).
  * **Live Decision Logic Inspector:** Click any column to view a human-readable explanation of why a hit, fault, or specific eviction occurred.
* **Interactive Playback & Scrubber:**
  * Full playback deck (`Reset`, `Previous`, `Auto Run / Pause`, `Next`) with `0.5x`, `1x`, and `2x` speed controls and a timeline scrubber slider.
* **Algorithm Arena & Thrashing Lab:**
  * Side-by-side comparison of Total Hits, Total Faults, and Fault Ratio % across all three algorithms.
  * **Automatic Bélády’s Anomaly Detector:** Automatically alerts when increasing physical frames in FIFO causes more page faults.
  * **Interactive Thrashing Simulator:** Adjust allocated process frames (`1` to `6`) to observe CPU execution utilization vs. disk swap overhead in real time.
* **Defensive Input Handling & Presets:**
  * Regex-based sanitizer (`/\b\d+\b/g`) safely strips extra commas, spaces, and invalid characters without crashing.
  * One-click presets for **Silberschatz OS**, **Bélády’s Anomaly (`F=3` & `F=4`)**, **Random**, and **Principle of Locality** sequences.
* **8-Bit Chiptune Audio & Report Snapshot Export:**
  * Synthesized Web Audio sound effects for hits, faults, steppers, and completion fanfare (with mute toggle).
  * Clean print-stylesheet `SNAPSHOT` export for generating report screenshots.

---

## 🛠️ Tech Stack

* **Frontend:** React 19, Vite
* **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), Google Fonts (`Press Start 2P` & `Plus Jakarta Sans`)
* **Icons & Effects:** Lucide React, `canvas-confetti`, Web Audio API

---

## 📂 Project Structure

```text
Pixo-Page_OS/
├── public/
├── src/
│   ├── components/
│   │   ├── ComparisonPage.jsx   # Algorithm Arena, Belady's Anomaly alert & Thrashing lab
│   │   ├── Footer.jsx           # Arcade status footer
│   │   ├── NavbarSide.jsx       # Multi-view navigation bar & audio mute toggle
│   │   ├── VisualizerPage.jsx   # Input controls, presets, playback deck & frame matrix
│   │   ├── VivaPage.jsx         # Exam & viva defense Q&A reference sheet
│   │   └── WelcomePage.jsx      # Retro arcade landing screen
│   ├── utils/
│   │   ├── algorithms.js        # FIFO, LRU, and Optimal simulation engines
│   │   └── sound.js             # Web Audio API chiptune sound synthesizer
│   ├── App.jsx                  # Root state manager & defensive input parser
│   ├── index.css                # Pixel grid background, custom scrollbar & print rules
│   └── main.jsx                 # React DOM entry point
├── index.html
├── package.json
└── vite.config.js

```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher) and npm installed

### Installation & Local Run

1. **Clone the repository:**
```bash
git clone [https://github.com/](https://github.com/)<YOUR-USERNAME>/Pixo-Page_OS.git
cd Pixo-Page_OS

```


2. **Install dependencies:**
```bash
npm install

```


3. **Start the development server:**
```bash
npm run dev

```


4. Open the local URL shown in your terminal (usually `http://localhost:5173`).

---

## 🧪 Quick Viva & Testing Guide

* **Test Bélády’s Anomaly:** Go to **Memory Grid**, click `Bélády (F=3)` (9 FIFO faults), then switch to `Bélády (F=4)` (10 FIFO faults) and open **Algorithm Arena** to view the live anomaly warning.


* **Test Locality vs. Random:** Compare fault rates on the `⚡ Locality` preset vs. `🎲 Random` in **Algorithm Arena** to observe how LRU outperforms FIFO on clustered working sets.


* **Test Defensive Sanitizer:** Type malformed input such as `7,,, abc, 0, @#, 1, 2` into the reference string box to verify graceful digit extraction without runtime errors.


---
