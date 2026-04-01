# My Glow-Up Journey

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Full multi-page personal transformation website (April 1 – June 22 journey)
- 8 pages: Home, Body & Lifestyle Planner, Fitness Plan, Skin & Self-Care, Posture Improvement, Progress Tracker, Gallery, About My Glow-Up
- Interactive weekly habit tracker with checkboxes (persisted in backend)
- Weekly fitness plan display (Mon–Sun split)
- Skin & self-care checklists (morning/night/weekly/hair)
- Posture improvement section with exercises and educational content
- Progress tracker: weekly body metrics table (weight, waist, steps, workout days, confidence level)
- Habit streak counters and progress bars
- Weekly reflection text input
- Gallery with 4 transformation checkpoints (Apr 1, Apr 22, May 20, Jun 22) + photo upload via blob-storage
- About page with motivational content and closing statement
- Smooth animations, mobile-first, elegant serif/sans-serif typography

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Motoko backend: store habit tracker state (weekly checkbox data), progress entries (weight/waist/steps/workout days/confidence), weekly reflections, streak counters
2. Blob-storage component for gallery photo uploads
3. Frontend: React SPA with client-side routing (8 pages), shadcn components, animated transitions
4. Home page: hero, goal cards, motivational quote, CTA
5. Planner page: weekly grid with 9 habits × 7 days checkboxes
6. Fitness page: daily workout cards Mon–Sun
7. Skin page: checklists + trackers
8. Posture page: exercises + educational content
9. Progress tracker: metric table + streak counters + progress bars + reflection
10. Gallery: checkpoint cards with upload functionality
11. About page: story + closing statement
