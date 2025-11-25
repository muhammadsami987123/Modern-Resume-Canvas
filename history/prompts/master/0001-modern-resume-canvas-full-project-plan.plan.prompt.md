---
id: 0001
title: Modern Resume Canvas Full Project Plan
stage: plan
date: 2025-11-25
surface: agent
model: claude-sonnet-4-5-20250929
feature: master
branch: master
user: user
command: /sp.plan
labels: ["planning", "full-project-plan"]
links:
  spec: D:\Modern Resume Canvas\specs\master\spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/master/spec.md
  - specs/master/plan.md
  - specs/master/research.md
  - specs/master/data-model.md
  - specs/master/contracts/pdf-export-api.yaml
  - specs/master/quickstart.md
tests:
  - N/A
---

## Prompt

```text
 Modern Resume Canvas – Full Project Plan
1. Project Summary

A drag-and-drop resume builder where users visually arrange sections, customize layout, edit content inline, and export the final design as PDF.

This is a UI-first project with smooth interactions, clean design, and modern animations.

2. Core Features
A. Layout System

Two-column layout by default

Option to switch between:

1-column

2-column

3-column narrow sidebar + main

B. Drag-and-Drop Sections

Users can reposition:

About Me

Experience

Projects

Skills

Education

Certifications

Contact Info

Drag handles appear on hover.
Sections animate into place.

C. Section Editing

Inline editing:

Click text → Convert into editable field

Auto-save changes

Typography controls (size, bold, line-height) in the side panel

D. Templates

3–5 modern templates:

Minimal

Professional

Gradient Accent

Rounded Cards

Sidebar Highlight

User can switch templates instantly.

E. Live Styling Controls

Right-side customizer panel:

Color theme

Font family

Font size

Section spacing

Border radius

Accent color

Updates apply instantly.

F. PDF Export

Server-side rendering with Resend/HTML-Canvas or react-pdf

Export with preserved layout

High quality (300 DPI)

G. Autosave + Local Storage

Save changes automatically

Restore the resume on reload

3. Tech Stack
Frontend

Next.js (App Router)

React

Tailwind CSS

Zustand (state)

UI Libraries

Framer Motion (animations)

DnD Kit or React Beautiful DnD (drag and drop)

React PDF / html2canvas for export

Shadcn UI for sidebar and dialogs

4. Page Structure
/app
  /editor
    page.tsx
  /api/export/route.ts
/components
  Canvas.tsx
  Sidebar.tsx
  Toolbar.tsx
  SectionCard.tsx
  TemplateSwitcher.tsx
  EditorPanel.tsx
  DraggableWrapper.tsx
  ResumePreview.tsx
  PdfExportButton.tsx
/store
  resumeStore.ts
/utils
  generatePDF.ts
  templates.ts

5. Component Breakdown
1. Canvas

Displays the resume preview.

Grid-based layout

Accepts sections from store

Applies active template styles

2. SectionCard

Handles each section.

Title

Inline editing

Drag handle

Delete button

3. Sidebar

Customization panel.

Color pickers

Font controls

Template switcher

Section toggles

4. Toolbar

Top area for:

Add Section

Export PDF

Reset Layout

Template button

5. DraggableWrapper

Reusable draggable container for each section.

6. EditorPanel

When user selects a section:

Edit title

Edit content

Change layout for that section

Toggle icons

7. ResumePreview

Manages responsive preview of the final resume.

6. Resume Data Structure
Store example:
{
  layout: "two-column",
  theme: {
    accent: "#4F46E5",
    text: "#1F2937",
    background: "#ffffff",
    font: "Inter",
    radius: "10px",
  },
  sections: [
    {
      id: "about",
      type: "about",
      title: "About Me",
      content: "AI Engineer specializing in...",
      column: "left",
      order: 1
    },
    {
      id: "experience",
      type: "experience",
      items: [
        {
          role: "AI Engineer",
          company: "XYZ",
          time: "2023–Present",
          description: "Built agentic workflows..."
        }
      ],
      column: "right",
      order: 1
    }
  ]
}

7. Templates Structure
Minimal:

Clean spacing

Single accent color

Thin dividers

Professional:

Left sidebar with background

Bold section headers

Rounded Cards:

Each section wrapped in card

Soft shadows

Gradient Accent:

Gradient bar on top

Accent bullets

8. Animations (Framer Motion)

Smooth drag movement

Fade-in when adding a section

Slide transitions between templates

Button interactions

9. Export System
Option 1: html2canvas + jsPDF

Easy

Good for static layout

Option 2: react-pdf

Better quality

More control

Template-based PDF

Option 3: Server-side PDF (best)

Use Next.js server route + Puppeteer to render HTML → PDF.

10. Final User Flow
Step 1

User enters editor page.

Step 2

Default template loads with placeholder data.

Step 3

User edits:

Text

Colors

Layout

Sections

Step 4

User drags sections to new positions.

Step 5

User switches template design instantly.

Step 6

User exports high-quality PDF.

11. Extra Features (Phase 2)

Save/export resume as JSON

Import JSON to continue editing

Multiple pages support

Version history

AI suggestions:

Improve resume text

Fix grammar

Rewrite for job role

AI is optional; UI stays the main focus.

12. Development Timeline
Day 1–2

Setup project, layout, sidebar, toolbar.

Day 3–4

Create sections + draggable logic.

Day 5–6

Themes + templates system.

Day 7

Inline editing + content editor.

Day 8

PDF export feature.

Day 9

Animations and polishing.

Day 10

Deployment + final testing.
```

## Response snapshot

The `/sp.plan` command was executed, generating a full project plan for the Modern Resume Canvas. This included filling in the technical context, performing research on key technical decisions (testing, drag-and-drop, PDF generation), and outlining the data model, API contracts, and a quickstart guide.

## Outcome

- ✅ Impact: Full project plan generated for Modern Resume Canvas, establishing technical direction and key decisions.
- 🧪 Tests: N/A
- 📁 Files: `specs/master/spec.md`, `specs/master/plan.md`, `specs/master/research.md`, `specs/master/data-model.md`, `specs/master/contracts/pdf-export-api.yaml`, `specs/master/quickstart.md`
- 🔁 Next prompts: The user will review the plan and then proceed with implementation (likely using `/sp.tasks`).
- 🧠 Reflection: Successfully navigated missing script by falling back to agent-native PHR generation. The plan now provides a solid foundation for development.

## Evaluation notes (flywheel)

- Failure modes observed: `create-phr.sh` script not found, requiring agent-native fallback.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): Initial project plan from user input.
- Next experiment (smallest change to try): Ensure `create-phr.sh` exists in future projects or refine agent-native PHR generation to be more robust.