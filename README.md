# The Violin Workshop
### A Multimodal Interactive Web App - MITA Project 2025-26

A heritage site prototype for exploring Cremona luthier tradition. Built with Nuxt 3 and Vue 3.

---

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation

Clone the repo:
    git clone https://github.com/MateoVTLN/MITA-Luthier-Workshop-Interactive-Web-App.git

Go into the project folder:
    cd MITA-Luthier-Workshop-Interactive-Web-App

Install dependencies:
    npm install

Start the dev server:
    npm run dev

Then open http://localhost:3000 in your browser.

---

## Project Structure

    components/
        LoopIndicator.vue       - Shows SENSE > INTERPRET > GROUND > ACT
        ToolSelector.vue        - Grid of tools and violin parts
        DisambiguationPanel.vue - Asks which tool when two look similar
        IntentPanel.vue         - Asks what the user wants to know
        ResultPanel.vue         - Shows the final explanation (ACT stage)
        VoiceInput.vue          - Voice input fallback

    composables/
        useGroundingLoop.js     - Brain of the app, state machine

    pages/
        index.vue               - Main tool exploration page (Task 2)
        tour.vue                - Guided tour page (Task 3)

    data/
        violinParts.json        - All tool and part content and images

    public/
        images/                 - All photos (tools and violin parts)

---

## What is Built

Grounding loop (SENSE > INTERPRET > GROUND > ACT) - Done - useGroundingLoop.js
Tool grid (Task 2) - Done - index.vue
Ambiguity handling (plane vs scraper) - Done - DisambiguationPanel.vue
Intent grounding - Done - IntentPanel.vue
REPAIR path - Done - ResultPanel.vue
Voice input fallback - Done - VoiceInput.vue
Rich content from Jonke interview - Done - violinParts.json
Mobile camera UI - Done - index.vue
Guided tour (Task 3) - Done - tour.vue
Live URL (Vercel) - Pending
Task 1 (clickable workbench hotspots) - Pending

---

## What is Still Missing

Task 1 - A clickable workbench image where the user taps directly on parts of the violin using image map hotspots

Live Vercel URL - needs deployment after all branches are merged to main

---

## Branch Structure

main - Mateo - Base project
feature/content-and-media - Benedito - Images, JSON, tour page, styling

---

## The 3 Tasks

Task 1 - Point and Ask - tap directly on a violin image - Pending
Task 2 - Tool Identification - tap a tool card, go through grounding loop - Done
Task 3 - Guided Tour - 8 step walkthrough of violin making process - Done

---

## Demo Script (2 minutes)

1. Open the app - This is The Violin Workshop, a multimodal prototype for Cremona luthier tradition.
2. Show the tool grid - The visitor sees tools and violin parts. They tap to identify them.
3. Click Finger Plane - Watch the loop indicator move through SENSE, INTERPRET, GROUND. The plane and scraper look similar so the system asks which one.
4. Resolve ambiguity - Select Finger Plane. Now it asks what you want to know - intent grounding.
5. Show result - The ACT stage shows the full explanation from the interview with luthier Jonke.
6. Demonstrate REPAIR - Clicking That is not what I meant sends it back to GROUND.
7. Try voice - Say sound or history to select an intent.
8. Show guided tour - Task 3 walks the visitor through all 8 stages of making a violin.

---

## Troubleshooting

npm run dev fails - Make sure package.json is not empty. Run: cat package.json
Images not loading - Make sure images are directly in public/images/ not in subfolders
Voice not working - Use Chrome or Edge. Safari has partial support, Firefox has none
Wrong folder in terminal - Run pwd to check, then cd to the right path
Port 3000 in use - Run: npx nuxi dev --port 3001

---

## Team

Frontend - Sekou and Marius
Integration - Sofia and Hu
Content and Media - Benedito and Mateo

---

Deadline: May 26, 11:59pm
