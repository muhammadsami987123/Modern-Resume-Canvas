---

description: "Task list for Modern Resume Canvas feature implementation"
---

# Tasks: Modern Resume Canvas

**Input**: Design documents from `/specs/master/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Test tasks are included as per the research findings on testing strategy.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `app/`, `components/`, `store/`, `utils/` at repository root
- Paths shown below assume web app structure based on plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create Next.js project with Tailwind CSS and TypeScript in the root directory
- [ ] T002 Initialize Zustand for state management in `store/resumeStore.ts` (initial setup)
- [ ] T003 [P] Set up Framer Motion for animations (initial config)
- [ ] T004 [P] Integrate Shadcn UI components for general UI elements
- [ ] T005 Create initial `app/layout.tsx` for global styling and structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Define initial resume data structure in `store/resumeStore.ts` based on `specs/master/data-model.md`
- [ ] T007 Create `utils/templates.ts` for initial template data and logic
- [ ] T008 Create initial `app/editor/page.tsx` with basic layout and integration of `Canvas` and `Sidebar` placeholders
- [ ] T009 Implement basic `components/Canvas.tsx` structure to display resume sections
- [ ] T010 Implement basic `components/Sidebar.tsx` structure for controls

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Layout System (P1) 🎯 MVP

**Goal**: Users can switch between 1, 2, or 3-column layouts.

**Independent Test**: Verify layout changes correctly reflect in the UI when toggled.

### Implementation for User Story 1

- [ ] T011 [US1] Update `store/resumeStore.ts` to manage `layout` state
- [ ] T012 [P] [US1] Implement layout switching logic in `components/Canvas.tsx` to render sections based on selected layout
- [ ] T013 [P] [US1] Create `components/Toolbar.tsx` and add layout switcher controls
- [ ] T014 [US1] Integrate `Toolbar.tsx` into `app/editor/page.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Drag-and-Drop Sections (P1)

**Goal**: Users can reposition sections (About Me, Experience, etc.) with drag handles and animations.

**Independent Test**: Verify sections can be dragged and dropped, and their order updates correctly.

### Implementation for User Story 2

- [ ] T015 [US2] Install `@hello-pangea/dnd` package
- [ ] T016 [P] [US2] Implement `components/DraggableWrapper.tsx` for draggable sections
- [ ] T017 [P] [US2] Integrate `DraggableWrapper.tsx` into `components/SectionCard.tsx`
- [ ] T018 [US2] Update `store/resumeStore.ts` to handle section reordering logic
- [ ] T019 [US2] Apply Framer Motion animations for smooth drag movements in `components/DraggableWrapper.tsx` and `components/SectionCard.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Section Editing (P1)

**Goal**: Users can inline edit text, auto-save changes, and control typography from a side panel.

**Independent Test**: Verify text can be edited inline, changes persist, and typography controls in editor panel modify text appearance.

### Implementation for User Story 3

- [ ] T020 [US3] Implement inline editing logic within `components/SectionCard.tsx`
- [ ] T021 [P] [US3] Create `components/EditorPanel.tsx` for typography controls (font size, bold, line-height)
- [ ] T022 [US3] Integrate `EditorPanel.tsx` into `components/Sidebar.tsx` or `app/editor/page.tsx` (conditional rendering)
- [ ] T023 [US3] Update `store/resumeStore.ts` to manage section content and typography styles

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Templates (P1)

**Goal**: Users can switch between 3-5 modern templates instantly.

**Independent Test**: Verify switching templates instantly changes the visual theme of the resume.

### Implementation for User Story 4

- [ ] T024 [US4] Expand `utils/templates.ts` with 3-5 modern template definitions
- [ ] T025 [P] [US4] Create `components/TemplateSwitcher.tsx` for template selection
- [ ] T026 [US4] Integrate `TemplateSwitcher.tsx` into `components/Sidebar.tsx` or `components/Toolbar.tsx`
- [ ] T027 [US4] Update `components/Canvas.tsx` and `components/SectionCard.tsx` to apply active template styles dynamically
- [ ] T028 [US4] Apply Framer Motion slide transitions when switching templates

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: User Story 5 - Live Styling Controls (P1)

**Goal**: Users can customize color theme, font, spacing, etc., from a right-side panel with instant updates.

**Independent Test**: Verify changes made in the styling controls panel instantly update the resume's appearance.

### Implementation for User Story 5

- [ ] T029 [US5] Implement color pickers, font family selectors, font size, section spacing, border radius, and accent color controls in `components/Sidebar.tsx`
- [ ] T030 [US5] Update `store/resumeStore.ts` to manage theme and styling states
- [ ] T031 [US5] Apply active theme and styling properties to `components/Canvas.tsx` and `components/SectionCard.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: User Story 6 - PDF Export (P1)

**Goal**: Users can export high-quality PDF of the final design via server-side rendering.

**Independent Test**: Verify exporting a resume generates a high-quality PDF with preserved layout and selectable text.

### Tests for User Story 6

- [ ] T032 [P] [US6] Create unit/integration tests for `api/export/route.ts` to verify PDF generation logic with `@react-pdf/renderer`

### Implementation for User Story 6

- [ ] T033 [US6] Install `@react-pdf/renderer` and Puppeteer packages
- [ ] T034 [US6] Implement `utils/generatePDF.ts` using `@react-pdf/renderer` components for resume rendering
- [ ] T035 [US6] Create `/api/export/route.ts` to handle POST requests, use Puppeteer to render the React component as HTML, and then convert to PDF using `@react-pdf/renderer`
- [ ] T036 [P] [US6] Create `components/PdfExportButton.tsx` and integrate into `components/Toolbar.tsx`
- [ ] T037 [US6] Implement error handling and loading states for PDF export

**Checkpoint**: All user stories should now be independently functional

---

## Phase 9: User Story 7 - Autosave + Local Storage (P1)

**Goal**: Users' changes are automatically saved and restored on reload.

**Independent Test**: Verify changes made to the resume are automatically saved to local storage and restored when the application is reloaded.

### Implementation for User Story 7

- [ ] T038 [US7] Implement `useEffect` in `store/resumeStore.ts` to persist state to `localStorage` on changes
- [ ] T039 [US7] Implement `useEffect` in `store/resumeStore.ts` to load state from `localStorage` on initialization
- [ ] T040 [US7] Add debouncing to auto-save mechanism to prevent excessive `localStorage` writes

**Checkpoint**: All user stories should now be independently functional

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

### Tests for Polish & Cross-Cutting Concerns

- [ ] T041 [P] Configure Jest and React Testing Library for unit/integration tests in `jest.config.js` and `package.json`
- [ ] T042 [P] Create initial unit tests for `store/resumeStore.ts` in `tests/unit/resumeStore.test.ts`
- [ ] T043 [P] Configure Playwright for E2E tests in `playwright.config.ts` and `package.json`
- [ ] T044 [P] Create initial E2E test for basic user flow (e.g., loading editor, making a change) in `tests/e2e/basic-flow.spec.ts`

### Implementation for Polish & Cross-Cutting Concerns

- [ ] T045 Ensure all Framer Motion animations (drag, fade-in, slide, button) are smooth and responsive
- [ ] T046 Review and refine Tailwind CSS styling for consistency and responsiveness across all components
- [ ] T047 Code cleanup, refactoring, and adding necessary comments/documentation
- [ ] T048 Integrate CI/CD pipeline (e.g., GitHub Actions) to run tests and build on pushes
- [ ] T049 Verify and update `quickstart.md` with final setup instructions and `npm run` commands

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-9)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3...)
- **Polish (Phase 10)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1 - Layout System)**: Can start after Foundational (Phase 2)
- **User Story 2 (P1 - Drag-and-Drop Sections)**: Can start after Foundational (Phase 2)
- **User Story 3 (P1 - Section Editing)**: Can start after Foundational (Phase 2)
- **User Story 4 (P1 - Templates)**: Can start after Foundational (Phase 2)
- **User Story 5 (P1 - Live Styling Controls)**: Can start after Foundational (Phase 2)
- **User Story 6 (P1 - PDF Export)**: Can start after Foundational (Phase 2)
- **User Story 7 (P1 - Autosave + Local Storage)**: Can start after Foundational (Phase 2)

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models/State logic before components/UI
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Many tasks within each user story marked [P] can run in parallel (e.g., creating components, updating store logic)
- Different user stories can be worked on in parallel by different team members
- Test setup tasks in Polish phase can be done in parallel.

---

## Parallel Example: User Story 1

```bash
# Implement layout switching logic in Canvas and add Toolbar controls in parallel:
Task: "Implement layout switching logic in components/Canvas.tsx to render sections based on selected layout"
Task: "Create components/Toolbar.tsx and add layout switcher controls"
```

---

## Parallel Example: User Story 2

```bash
# Implement DraggableWrapper and integrate with SectionCard in parallel:
Task: "Implement components/DraggableWrapper.tsx for draggable sections"
Task: "Integrate DraggableWrapper.tsx into components/SectionCard.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Layout System)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories
   ... (continue for all stories)

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Layout System)
   - Developer B: User Story 2 (Drag-and-Drop Sections)
   - Developer C: User Story 3 (Section Editing)
   - ... (and so on for other stories)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence



