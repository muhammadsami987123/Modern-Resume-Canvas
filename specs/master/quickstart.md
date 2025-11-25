# Quickstart for Modern Resume Canvas

This guide provides a quick overview to get started with the Modern Resume Canvas project.

## 1. Project Overview
Modern Resume Canvas is a drag-and-drop resume builder with inline editing, customizable layouts, multiple templates, live styling controls, and high-quality PDF export.

## 2. Tech Stack Highlights
- **Frontend:** Next.js (App Router), React, Tailwind CSS, Zustand (state management)
- **UI Libraries:** Framer Motion (animations), @hello-pangea/dnd (drag and drop), Shadcn UI (components)
- **PDF Export:** @react-pdf/renderer (for declarative PDF generation), Puppeteer (for server-side rendering in API routes)

## 3. Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone [repository_url]
   cd Modern Resume Canvas
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 4. Key Project Areas

- **Editor Page:** `app/editor/page.tsx`
- **API for PDF Export:** `api/export/route.ts`
- **Components:** `components/` directory (Canvas, Sidebar, SectionCard, etc.)
- **State Management:** `store/resumeStore.ts`
- **Utility Functions:** `utils/` (generatePDF, templates)

## 5. Data Structure
The core resume data is managed by Zustand and follows a structured JSON format for layout, theme, and sections. Refer to `specs/master/data-model.md` for detailed schema.

## 6. PDF Export
PDF generation is handled server-side via `api/export/route.ts` using Puppeteer and `@react-pdf/renderer` for high-quality output.

## 7. Next Steps
- Implement the core UI components as outlined in the component breakdown.
- Integrate drag-and-drop functionality using `@hello-pangea/dnd`.
- Develop the state management with Zustand.
- Set up the PDF export API route.