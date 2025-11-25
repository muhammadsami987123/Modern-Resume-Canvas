# Implementation Plan: Modern Resume Canvas

**Branch**: `master` | **Date**: 2025-11-25 | **Spec**: D:\Modern Resume Canvas\specs\master\spec.md
**Input**: Feature specification from `/specs/master/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

A drag-and-drop resume builder where users visually arrange sections, customize layout, edit content inline, and export the final design as PDF. This is a UI-first project with smooth interactions, clean design, and modern animations.

## Technical Context

**Language/Version**: Next.js, React, Node.js
**Primary Dependencies**: Next.js, React, Tailwind CSS, Zustand, Framer Motion, @hello-pangea/dnd, @react-pdf/renderer, Shadcn UI, Puppeteer (for server-side PDF rendering)
**Storage**: Local Storage (for autosave)
**Testing**: Jest, React Testing Library, Playwright
**Target Platform**: Web application
**Project Type**: web
**Performance Goals**: Smooth interactions, clean design, modern animations, instant template switching, high quality PDF export (300 DPI)
**Constraints**: UI-first, drag-and-drop interactions, inline editing, auto-save
**Scale/Scope**: Single user resume builder, multiple sections, multiple templates, PDF export

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution file contains placeholder principles, so no specific checks can be performed at this time. Assuming no violations.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
/
├── app/
│   └── editor/
│       └── page.tsx
├── api/
│   └── export/
│       └── route.ts
├── components/
│   ├── Canvas.tsx
│   ├── Sidebar.tsx
│   ├── Toolbar.tsx
│   ├── SectionCard.tsx
│   ├── TemplateSwitcher.tsx
│   ├── EditorPanel.tsx
│   ├── DraggableWrapper.tsx
│   ├── ResumePreview.tsx
│   └── PdfExportButton.tsx
├── store/
│   └── resumeStore.ts
└── utils/
    ├── generatePDF.ts
    └── templates.ts
```

**Structure Decision**: This project follows a Next.js App Router structure, leveraging server components and API routes for PDF export. Frontend components are organized under `/components`, state management under `/store`, and utility functions under `/utils`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
