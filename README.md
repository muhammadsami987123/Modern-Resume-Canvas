# Modern Resume Canvas

Modern Resume Canvas is a Next.js 16 application that delivers a drag-and-drop resume builder with real-time styling controls, multi-template theming, and server-grade PDF export. This README is intentionally exhaustive (≈450 lines) to serve as living documentation for designers, engineers, and stakeholders.

## Table of Contents
01. Elevator Pitch
02. Feature Highlights
03. Guided Tour of the Experience
04. System Architecture Overview
05. Directory Reference
06. Tech Stack Breakdown
07. Local Development Setup
08. Workspace Scripts and Tooling
09. Environment Variables and Secrets
10. App Router Pages
11. Core UI Components
12. Drag-and-Drop Interaction Model
13. Section Editing Flow
14. Theme and Typography Controls
15. Template System
16. Global State Management (Zustand)
17. Data Model Specification
18. Persistence and Offline Safety
19. PDF Export Pipeline
20. API Contract
21. Styling Strategy
22. Animations and Micro-interactions
23. Accessibility Commitments
24. Performance Notes
25. Testing Strategy
26. Deployment Guide
27. Monitoring and Logging
28. Troubleshooting Handbook
29. Roadmap and Future Work
30. Contribution Guidelines
31. Code Review Checklist
32. Release Management
33. Security Considerations
34. Localization Notes
35. Content Strategy
36. Design Tokens
37. Third-Party Integrations
38. Knowledge Base and Specs
39. FAQ
40. Glossary

## 1. Elevator Pitch
- Modern Resume Canvas lets candidates compose polished resumes using a canvas-style editor.
- Drag sections between one, two, or three columns without losing data fidelity.
- Inline editing, typography controls, and template swaps make design decisions instant.
- Persistence is powered by localStorage so drafts survive refreshes.
- Export flows produce selectable, print-ready PDFs from the same data model.
- Tech choices (Next.js App Router, Zustand, Tailwind, Shadcn) keep delivery modern.
- Focus is on usability, expressiveness, and reliable outputs for job submissions.

## 2. Feature Highlights
- Responsive landing page with hero CTA and template preview chips in `app/page.tsx`.
- Dedicated editor workspace at `/editor` combining `Toolbar`, `Canvas`, and `Sidebar`.
- Drag-and-drop implemented with `@hello-pangea/dnd` via `Canvas` and `DraggableWrapper`.
- Inline section editing via `SectionCard` and context-aware controls in `EditorPanel`.
- Live theming controls (colors, radius, spacing) toggled inside the sidebar.
- Template presets defined in `utils/templates.ts` for instant brand shifts.
- PDF export button that POSTs to `/api/export` and streams a binary.
- State stored in `store/resumeStore.ts` with deterministic section ordering.
- Hydration and persistence handled by `hooks/useResumePersistence.ts`.
- Animations powered by `framer-motion` for cards and canvas transitions.

## 3. Guided Tour of the Experience
- Landing page invites users with "Modern Resume Canvas" headline and CTA.
- `Start Building` button routes to `/editor`, invoking the client-side editor shell.
- Toolbar presents layout switches (Single, Split, Tri-Column) and global actions.
- Canvas shows sections arranged per current layout using column-specific droppables.
- Sidebar defaults to Theme tab where accent/text/background can be updated.
- Tabs let users pivot between Theme, Templates, and Typography control sets.
- Section Editor area at bottom of sidebar unlocks controls once a section is selected.
- Add Section button injects a placeholder `custom` section in the current layout.
- Export button sends the Zustand snapshot to the PDF API for download.
- Reset button rebuilds state from `buildInitialResumeState`, clearing edits.

## 4. System Architecture Overview
- Frontend uses Next.js App Router, meaning pages live in `app/` and leverage server/client components.
- `/` is a server component by default; `/editor` is marked `'use client'` for hooks.
- State logic is centralized in `store/resumeStore.ts` (Zustand store).
- Hooks and components subscribe to store slices to avoid prop drilling.
- PDF export route at `app/api/export/route.ts` is an edge/serverless handler.
- `generatePDF.ts` leverages `@react-pdf/renderer` to create document nodes.
- Layout includes `Toolbar`, `Canvas`, `Sidebar` siblings under a flex container.
- Canvas contains droppable columns; SectionCard handles rendering and editing.
- Template definitions feed both UI previews and theme overrides.
- Persistence hook runs once on editor load to hydrate from `localStorage`.

## 5. Directory Reference
- `app/` contains the App Router pages, layout, global CSS, and API endpoints.
- `app/api/export/route.ts` hosts the POST handler for PDF exports.
- `app/editor/page.tsx` is the main editor view bootstrapping Toolbar/Canvas/Sidebar.
- `components/` stores React components grouped by function.
- `components/ui/` contains Shadcn-inspired primitive wrappers (Button/Input/etc.).
- `hooks/` currently houses `useResumePersistence.ts`.
- `lib/utils.ts` exposes helper `cn` for conditional class joining.
- `store/resumeStore.ts` contains the Zustand store, types, and helper builders.
- `utils/templates.ts` defines template metadata and theme presets.
- `utils/generatePDF.ts` declares the PDF rendering logic with `@react-pdf/renderer`.
- `specs/master/` delivers planning docs, data models, contracts, and research artifacts.
- `history/prompts/` captures AI prompt history for planning and commits.
- `public/` includes static SVG assets referenced by the app shell.
- Root config files: `package.json`, `pnpm-lock.yaml`, `eslint.config.mjs`, `tsconfig.json`, `next.config.ts`.

## 6. Tech Stack Breakdown
- Framework: Next.js 16 (App Router, React 19, turbopack-friendly).
- Language: TypeScript across app, components, hooks, store, and utils.
- Styling: Tailwind CSS (v4 alpha) via `app/globals.css` and utility classes per component.
- State: Zustand 5 for store composition and snapshot subscriptions.
- Drag-and-drop: `@hello-pangea/dnd` for accessible reorderable lists.
- Animations: `framer-motion` for canvas fade-ins and draggable scaling.
- Icons: `lucide-react` for consistent vector glyphs.
- Forms/UI: Shadcn-inspired primitives within `components/ui`.
- PDF: `@react-pdf/renderer` supplemented by Puppeteer (dependency installed for potential SSR, though not currently invoked).
- Tooling: ESLint 9, TypeScript 5.7, Tailwind/PostCSS, package managers (npm/pnpm/yarn/bun).

## 7. Local Development Setup
- Prerequisites: Node.js 18+, npm (or pnpm/yarn/bun) installed.
- Clone the repo: `git clone <repo> && cd Modern Resume Canvas`.
- Install dependencies: `npm install` (package-lock is present); pnpm lock also included.
- Create a `.env.local` if environment overrides are necessary (none required by default).
- Start development server: `npm run dev` to boot Next.js on port 3000.
- Visit `http://localhost:3000` for landing; `http://localhost:3000/editor` for editor.
- Hot reload ensures Canvas, Sidebar, and Toolbar updates appear instantly.
- Use modern browsers for full drag-and-drop and animation support.
- Optional: configure VSCode settings for Tailwind IntelliSense and ESLint integration.
- Ensure Puppeteer dependencies (Chromium) install correctly; may require extra libs on Linux.

## 8. Workspace Scripts and Tooling
- `npm run dev`: Launch Next.js dev server with source maps and hot reload.
- `npm run build`: Generate optimized production build with route bundling.
- `npm run start`: Start production server (needs prior `build`).
- `npm run lint`: Run ESLint across the codebase with Next.js presets.
- `pnpm` and `yarn` equivalents work due to lockfiles, though package-lock indicates npm default.
- Consider adding `npm run test` once automated tests exist.
- Use `npx shadcn-ui@latest` for extending UI primitives (manual at present).
- Use `npx tailwind` for future CSS builds once Tailwind v4 finalizes CLI story.
- Integrate `tsx`/`ts-node` for scripting if additional automation is required.

## 9. Environment Variables and Secrets
- Current application does not load environment variables for runtime flows.
- `NEXT_PUBLIC_` variables can be introduced for analytics or feature flags.
- Server-only envs (e.g., `PDF_API_KEY`) could feed the export route in future.
- `.env.local` remains git-ignored; use it for local overrides without leaks.
- If Puppeteer requires proxies or extra args, store them as environment variables.
- Document any new secret in this section to keep onboarding smooth.
- For deployment on Vercel, configure env vars in dashboard to mirror `.env`.

## 10. App Router Pages
- `app/layout.tsx` sets global metadata, fonts, and wraps children with `<html>` shell.
- `app/globals.css` provides reset styles and Tailwind directives.
- `app/page.tsx` is the marketing/landing page with hero, features, and template list.
- `app/editor/page.tsx` is explicitly client-side; it imports `useResumePersistence`.
- `app/api/export/route.ts` handles POST requests with JSON payload and returns PDFs.
- Additional routes (e.g., `/docs`, `/pricing`) can be added by new directories.
- Each page can co-locate components, though shared UI lives in `components/`.
- Layout supports metadata updates per route; consider customizing for SEO.

## 11. Core UI Components
- `Toolbar`: layout toggles, add/reset buttons, PDF export trigger.
- `Canvas`: orchestrates drag-and-drop columns, theme application, and section rendering.
- `Sidebar`: hosts Theme/Template/Typography tabs plus `EditorPanel`.
- `EditorPanel`: inputs and sliders for section-specific edits (title, content, font size, alignment, column).
- `SectionCard`: renders actual resume sections with content editing, drag handles, delete action, and type-specific layouts.
- `TemplateSwitcher`: vertical list of template buttons showing color swatches.
- `DraggableWrapper`: wrapper around `Draggable` that exposes handle props to `SectionCard`.
- `PdfExportButton`: button with loading/error states calling fetch POST.
- `Canvas`/`SectionCard` rely heavily on `useResumeStore` for data and actions.
- `components/ui/` primitives (Button/Input/Label/Select/Slider/Textarea) maintain consistent styling.

## 12. Drag-and-Drop Interaction Model
- Built with `@hello-pangea/dnd` for React 19 compatibility and accessibility.
- `Canvas` defines droppable IDs for single/left/main/right columns.
- Layout determines which droppables render: one, split, or tri-column grid.
- `DragDropContext` wraps the droppables and processes `onDragEnd`.
- `columnFromDroppable` maps droppable IDs back to `Section['column']`.
- Sections are sorted by `order` before populating column arrays.
- `reorderSections` accepts a fully rebuilt array ensuring deterministic order.
- When layout is one-column, drag reorder is a simple array splice.
- For multi-column, columns are reassembled via `rebuildSections` which rewrites order + column metadata.
- Drag handle is exposed via `DraggableWrapper` and rendered beside each section title.

## 13. Section Editing Flow
- Selecting a `SectionCard` sets `selectedSection` in the store.
- `EditorPanel` reads the selected section and reveals form inputs.
- Title editing uses controlled `Input` mirroring `section.title`.
- For text-based sections (about/contact/custom), a `Textarea` exposes body content editing with onChange dispatching `updateSection`.
- Font size and line height sliders update `section.style` via `updateSectionStyle`.
- Alignment buttons toggle `style.align` between left/center/right/justify.
- Column placement dropdown updates `section.column`, affecting layout after reorder.
- `SectionCard` also supports inline editing: clicking title toggles an input with local state before committing changes.
- Deleting uses `deleteSection` which also clears selection if necessary.
- Body color, spacing, fonts respond live because `Canvas` reads values from store theme/section styles.

## 14. Theme and Typography Controls
- Theme tab features color pickers for accent, text, and background.
- Inputs combine `<input type="color">` with text input for hex editing.
- Border radius slider adjusts `theme.radius`, applied as CSS to section cards.
- Spacing sliders update `theme.sectionPadding` and `theme.sectionSpacing`.
- Typography tab includes font-family select with curated options (Inter, Roboto, Outfit, Poppins, Playfair, Lora, Montserrat).
- Heading size slider ranges 20–42 px; body size 12–24 px; line height 1–2 with 0.05 increments.
- Preview card at bottom shows sample sentence in chosen font.
- Theme updates propagate immediately to Canvas via inline styles.
- `updateTheme` merges new values into the stored theme object.
- Template tab overlays on top of these controls by applying preset theme bundles.

## 15. Template System
- Templates defined in `utils/templates.ts` with `id`, `name`, `description`, and `theme`.
- Each theme covers accent/text/background, font, radius, heading/body sizes, line height, spacing.
- Template IDs: `minimal`, `professional`, `gradient-accent`, `rounded-cards`, `sidebar-highlight`.
- `TemplateSwitcher` maps templates to buttons with color swatch preview.
- Selecting a template sets `activeTemplate` and calls `updateTheme` with preset values.
- `Canvas` uses `activeTemplate` to key `motion.div`, enabling fade animation per template change.
- Additional templates can be appended to the array and will auto-render in UI.
- Use `getTemplateById` helper to access templates programmatically.
- `applyTemplate` (exported) returns theme object and defaults to minimal if missing.

## 16. Global State Management (Zustand)
- Store file: `store/resumeStore.ts`.
- Defines types for Theme, Sections, Items, Layout, and ResumeState.
- `buildInitialResumeState` seeds layout (`two-column`), theme defaults, template ID, and sections.
- Sections include about/contact/skills/experience/projects/education with sample content.
- Actions: `setLayout`, `updateTheme`, `addSection`, `updateSection`, `updateSectionStyle`, `deleteSection`, `reorderSections`, `setTemplate`, `setSelectedSection`, `resetResume`.
- `buildDefaultSectionStyle` ensures new sections have consistent typography defaults.
- `addSection` auto-assigns `order` based on target column length.
- `updateSection` merges partial updates and recalculates style if provided.
- `updateSectionStyle` merges into section `style` with defaults.
- `resetResume` simply replaces state with `buildInitialResumeState`.
- Hooks (Canvas, Toolbar, Sidebar, etc.) use `useResumeStore((state) => ({ ... }))` selectors to avoid unnecessary rerenders.

## 17. Data Model Specification
- ResumeState fields: `layout`, `theme`, `sections`, `activeTemplate`, `selectedSection`.
- Layout options enumerated in `LayoutOption` union type.
- Theme includes colors, font, radius, heading/body sizes, line height, spacing/padding.
- Section type union: about, experience, projects, skills, education, certifications, contact, custom.
- Each section stores `id`, `type`, `title`, optional `content`, optional `items`, `column`, `order`, optional `style`.
- Item types:
  - ExperienceItem: role, company, time, description.
  - ProjectItem: title, description, tech array, optional link.
  - EducationItem: degree, institution, time, optional description.
- `sections` array order is the canonical source of truth for rendering and PDF.
- Data model mirrors docs in `specs/master/data-model.md`.
- When persisting or exporting, the full ResumeState object travels as JSON.
- Validation rules (from specs) include unique section IDs, valid hex colors, and positive orders.

## 18. Persistence and Offline Safety
- Hook: `useResumePersistence` in `hooks/useResumePersistence.ts`.
- Storage key: `mrc-resume-state`.
- On mount, hook reads localStorage, parses JSON, and seeds Zustand via `useResumeStore.setState`.
- Subscribes to store updates with debounced (500ms) callback writing back to storage.
- Debounce implemented manually to throttle writes and avoid blocking UI.
- Selected section is kept so returning users resume editing same section.
- If hydration fails, warning logs in console but app continues with defaults.
- Since only localStorage is used, no backend data retention occurs.
- To reset, use Reset button or clear site storage via browser devtools.

## 19. PDF Export Pipeline
- Triggered by `PdfExportButton`.
- Button collects ResumeState snapshot via store selection.
- `fetch('/api/export')` POST with `Content-Type: application/json`.
- API route parses JSON, passes ResumeState to `generateResumePDF`.
- `generateResumePDF` builds React PDF document with `SectionBlock` components.
- Styles derived from theme: colors, font, spacing, radius.
- Sections rendered sequentially (currently ignoring column layout for PDF simplicity).
- `pdf()` from `@react-pdf/renderer` converts to buffer asynchronously.
- API returns `application/pdf` with `Content-Disposition` attachment header.
- Frontend turns blob into object URL, triggers download, revokes object URL afterward.
- Error states toggle button text to `Retry Export` for quick recovery.
- Consider queueing complex PDFs or adding analytics on usage in future.

## 20. API Contract
- Endpoint: `POST /api/export`.
- Request body: ResumeState JSON (see Data Model section).
- Response success: binary PDF stream.
- Response failure: `{ message: 'Unable to export resume' }` with 500 status.
- No authentication at present; rely on future middleware for multi-tenant scenarios.
- Rate limiting and logging can be added via Next.js middleware or third-party services.
- API module logs server errors to console; extend to structured logging if needed.

## 21. Styling Strategy
- Tailwind utility classes compose most layout and design decisions.
- Custom values (colors, fonts, spacing) flow inline via `style` props when bound to state.
- `app/globals.css` likely contains Tailwind base/components/utilities (per create-next-app).
- Section backgrounds/radius/padding respond to theme via inline styles for precision.
- Buttons and inputs reuse Shadcn tokens for consistent visual language.
- Template accent colors are applied to headings, pills, and outlines.
- Gradients and backgrounds on landing page use Tailwind `bg-gradient-to-br` etc.

## 22. Animations and Micro-interactions
- Canvas fades in/out when template changes using `framer-motion`.
- `DraggableWrapper` scales slightly when sections are dragged.
- `AnimatePresence` in Canvas handles section mount/unmount transitions.
- Toolbar buttons have subtle scale/hover states via Tailwind classes.
- Landing page uses hover transitions on feature cards and template chips.
- Delete button and drag handle appear on hover using `group-hover`.

## 23. Accessibility Commitments
- Drag-and-drop library includes keyboard interactions; ensure sections can reorder via keyboard.
- Buttons include icons plus text for clarity; Icon-only buttons carry `aria-label`.
- Color pickers and inputs are labeled with `<Label>` components.
- Contrast-aware colors chosen for default themes; allow user adjustments for better accessibility.
- Template names and descriptions provide textual context beyond swatches.
- Consider adding `aria-live` announcements for actions like export success/failure.
- Ensure PDF output text is selectable for ATS compatibility, already achieved via React PDF text nodes.

## 24. Performance Notes
- Zustand selectors limit rerenders by pulling only required slices.
- Drag-and-drop operations mutate local arrays before committing to store to avoid heavy diffing.
- Template switching reuses same data; `motion.div` key ensures smooth transitions but not heavy reflow.
- PDF export done server-side; client only handles fetch and file saving.
- LocalStorage writes debounced to 500ms to prevent blocking main thread during rapid edits.
- Next.js App Router leverages React Server Components for landing page, minimizing client bundle there.

## 25. Testing Strategy
- Automated tests not yet implemented; recommended stacks include:
  - Unit tests for store actions using Vitest or Jest.
  - Component tests for `SectionCard` and `Canvas` using React Testing Library.
  - Integration tests for drag-and-drop flows via Playwright.
  - API tests for `/api/export` ensuring valid PDF response.
- Manual testing checklist:
  - Create/edit/delete sections across layouts.
  - Switch templates and ensure theming updates.
  - Verify persistence after refresh.
  - Export PDF and confirm file contents.
  - Test on Safari/Firefox/Chrome for drag fidelity.

## 26. Deployment Guide
- Default deployment target: Vercel (Next.js native).
- Steps:
  - Push to main branch.
  - Vercel auto-detects Next.js project, installs dependencies, runs `npm run build`.
  - Set `PUPPETEER_SKIP_DOWNLOAD=1` if using custom Chromium; otherwise allow default download.
  - Configure environment variables in Vercel dashboard if added later.
  - Monitor build logs for SSR/PDF warnings.
- Alternative hosting: self-host Next.js with `npm run start` behind Node server or containerize.
- Ensure server has enough memory to run Puppeteer/React PDF.

## 27. Monitoring and Logging
- Currently relies on console logs (client and server).
- Suggestions:
  - Integrate Vercel Analytics or Log Drain.
  - Add Sentry for error tracking around PDF export and editor interactions.
  - Add structured logging in API routes for request IDs and latencies.
  - Track feature usage (template switches, exports) with privacy-safe analytics.

## 28. Troubleshooting Handbook
- **Puppeteer install fails**: ensure `npm` has postinstall scripts enabled; on Linux install `libatk`, `libx11`, etc.
- **PDF export returns 500**: inspect server logs; confirm ResumeState payload is serializable and not undefined.
- **Drag-and-drop not working**: verify components render inside `DragDropContext` and no hydration issues occur.
- **Styles not applying**: confirm theme values are valid; e.g., hex colors must start with `#`.
- **LocalStorage hydration fails**: check console for JSON parse errors; clear storage entry if corrupted.
- **Fonts missing in PDF**: React PDF uses Helvetica/Times fallback via `resolveFont`; update mapping if using new fonts.
- **Type errors**: run `npm run lint` or `tsc --noEmit` to identify mismatches.
- **Layout stuck**: ensure `layout` state updates via Toolbar; watch for derived column logic in Canvas.
- **Slow drag**: disable heavy console logging; avoid large text blocks if performance on low-end devices suffers.

## 29. Roadmap and Future Work
- Add authentication and cloud persistence for multi-device resume editing.
- Implement collaborative editing or shareable links.
- Expand template library with industry-specific variants.
- Introduce AI copy suggestions leveraging LLM APIs.
- Provide block-level components (achievement bullets, metrics) for richer sections.
- Add undo/redo stack for editing safety.
- Build preview-on-mobile mode.
- Add cover letter builder module.
- Integrate ATS keyword analysis.
- Add localization support for multi-language resumes.
- Create test suite and CI pipeline.
- Offer theme export/import for designers.

## 30. Contribution Guidelines
- Fork repository and create feature branches from `main`.
- Keep pull requests focused; include description referencing spec sections if applicable.
- Run `npm run lint` before submitting.
- Document new components or APIs inside this README or `/specs` as needed.
- For larger features, create or update specs under `specs/master/`.
- Use descriptive commit messages (e.g., `feat(canvas): add ternary layout spacing control`).
- Await code review approvals before merging.

## 31. Code Review Checklist
- Confirm UI aligns with spec expectations (layout states, theme responses).
- Ensure state mutations are immutable and maintain `order`.
- Validate TypeScript types for new sections or templates.
- Check accessibility (labels, focus states, keyboard nav).
- Ensure drag-and-drop interactions remain stable.
- Verify PDF export still succeeds with new data fields.
- Confirm persistence logic still hydrates/serializes after changes.
- Update README/Specs for notable shifts.

## 32. Release Management
- Tag releases using semantic versioning (e.g., `v0.2.0` for new templates).
- Changelog entries should highlight user-facing changes, fixes, and known issues.
- Smoke test landing page, editor interactions, and export before release.
- For hotfixes, branch off release tag and patch quickly, then merge back.

## 33. Security Considerations
- Currently no authentication; treat as single-tenant front-end.
- Be mindful of XSS when rendering user-provided content in SectionCard; consider sanitization if content might include HTML.
- PDF export route should validate payload size to prevent abuse.
- Consider rate limiting and CSRF protection when exposing publicly.
- If future cloud storage introduced, encrypt resume data at rest.

## 34. Localization Notes
- Text strings currently hard-coded in English within components.
- Consider extracting to i18n framework (next-intl) for multi-language support.
- Right-to-left layouts may require additional alignment logic.
- PDF generation must respect locale-specific fonts and glyphs.

## 35. Content Strategy
- Provide helpful placeholder text guiding users to personalize sections.
- Template descriptions should explain aesthetic differences succinctly.
- Landing page copy emphasizes benefits (flexible layouts, customization, export quality).
- Future marketing pages can highlight testimonials, tutorials, and changelog.

## 36. Design Tokens
- Theme object effectively acts as token set: accent, text, background, radius, font, sizes, spacing.
- Consider centralizing tokens in JSON for syncing with design tools (Figma).
- Support for multiple accent shades (primary, secondary) could come later.
- Document token usage so designers/devs share consistent language.

## 37. Third-Party Integrations
- `@hello-pangea/dnd` for drag-and-drop.
- `framer-motion` for animations.
- `lucide-react` for icons.
- `@react-pdf/renderer` for PDFs (requires React element tree).
- `puppeteer` dependency included for potential SSR/headless Chrome tasks.
- Shadcn-based UI primitives for buttons, inputs, select, slider, textarea.
- No analytics or auth integrations currently configured.

## 38. Knowledge Base and Specs
- Specs live in `specs/master/`:
  - `plan.md`: project plan and milestones.
  - `tasks.md`: granular backlog items.
  - `spec.md`: functional specification.
  - `data-model.md`: JSON structure reference.
  - `contracts/`: API contract files like `pdf-export-api.yaml`.
  - `research.md`: UX/UI explorations and inspirations.
  - `quickstart.md`: condensed onboarding doc.
- History of AI prompts recorded under `history/prompts/master/*` for traceability.
- Keep README synchronized with spec updates to avoid drift.

## 39. FAQ
- **Q:** Why erz `@hello-pangea/dnd` instead of `react-beautiful-dnd`?  
  **A:** It is the maintained fork compatible with React 18+ and 19.
- **Q:** Does PDF reflect multi-column layout?  
  **A:** Currently sections render sequentially; multi-column PDF layout can be added later.
- **Q:** Can I import/export JSON resumes?  
  **A:** Not yet; consider exposing state serialization endpoints.
- **Q:** How do I add a new template?  
  **A:** Append to `templates` array with unique `id` and theme, UI updates automatically.
- **Q:** Where do I change default sections?  
  **A:** Update `createInitialSections` inside `store/resumeStore.ts`.
- **Q:** Does persistence sync across devices?  
  **A:** No, data is stored locally in browser storage.
- **Q:** Is there undo/redo?  
  **A:** Not yet; recommended future enhancement.
- **Q:** Which browsers are supported?  
  **A:** Modern evergreen browsers; ensure pointer events for drag.
- **Q:** Can I customize PDF styling further?  
  **A:** Modify `stylesFromTheme` in `utils/generatePDF.ts`.

## 40. Glossary
- **Canvas:** The central editing surface displaying resume sections.
- **Section:** A logical block (About, Experience, etc.) with title and content/items.
- **Template:** A predefined set of theme tokens representing a visual style.
- **Theme:** Collection of colors, font, radius, and spacing applied globally.
- **Layout:** Column configuration (one, two, three) controlling Canvas grid.
- **Zustand:** Lightweight state management library used for ResumeState.
- **Droppable:** Area defined by drag-and-drop library to rearrange sections.
- **ResumeState:** Serializable data structure capturing entire resume configuration.
- **PDF Export:** Server process generating final resume document.
- **Persistence:** LocalStorage hydration ensuring edits survive reloads.

