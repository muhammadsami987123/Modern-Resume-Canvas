# Research for Modern Resume Canvas

## Decisions and Rationale

### 1. Testing Strategy for Next.js Applications
*   **Decision:** Implement a comprehensive testing strategy using Jest and React Testing Library for unit/integration tests, and Playwright for E2E tests. Utilize TypeScript for type safety and integrate with CI/CD.
*   **Rationale:** This combination provides robust testing coverage from individual components to full application flows, ensuring reliability and maintainability.
*   **Alternatives considered:** Cypress (for E2E).

### 2. Drag-and-Drop Library
*   **Decision:** Use `@hello-pangea/dnd` (a community-maintained fork of React Beautiful DnD).
*   **Rationale:** It is well-suited for list-based drag-and-drop, offers excellent accessibility, and smooth animations, which are crucial for a resume builder's section reordering.
*   **Alternatives considered:** DnD Kit (more flexible but has a steeper learning curve for basic list reordering).

### 3. PDF Generation Library
*   **Decision:** Use `@react-pdf/renderer` for PDF generation.
*   **Rationale:** It generates native, selectable, and searchable text within the PDF, which is critical for professional resume exports. It also offers a React-based development experience and precise control over document structure.
*   **Alternatives considered:** `html2canvas` (produces image-based PDFs, making text unselectable).

### 4. Server-Side PDF Rendering
*   **Decision:** Implement server-side PDF rendering using Next.js API routes and Puppeteer.
*   **Rationale:** This approach ensures consistent and high-quality PDF output, avoiding browser-dependent rendering inconsistencies of client-side solutions. Optimized Puppeteer settings (e.g., `deviceScaleFactor`) will ensure high quality.
*   **Alternatives considered:** Client-side PDF generation (less consistent rendering).