# Data Model for Modern Resume Canvas

## Resume Data Structure

```json
{
  "layout": "two-column",
  "theme": {
    "accent": "#4F46E5",
    "text": "#1F2937",
    "background": "#ffffff",
    "font": "Inter",
    "radius": "10px"
  },
  "sections": [
    {
      "id": "about",
      "type": "about",
      "title": "About Me",
      "content": "AI Engineer specializing in...",
      "column": "left",
      "order": 1
    },
    {
      "id": "experience",
      "type": "experience",
      "items": [
        {
          "role": "AI Engineer",
          "company": "XYZ",
          "time": "2023–Present",
          "description": "Built agentic workflows..."
        }
      ],
      "column": "right",
      "order": 1
    }
  ]
}
```

## Entity Definitions

### Resume
- `layout`: string (e.g., "one-column", "two-column", "three-column")
- `theme`: Theme object
- `sections`: Array of Section objects

### Theme
- `accent`: string (hex color code)
- `text`: string (hex color code)
- `background`: string (hex color code)
- `font`: string (font family name)
- `radius`: string (CSS border-radius value, e.g., "10px")

### Section
- `id`: string (unique identifier for the section)
- `type`: string (e.g., "about", "experience", "projects", "skills", "education", "certifications", "contact")
- `title`: string
- `content`: string (for simple text sections like "About Me")
- `items`: Array of Item objects (for list-based sections like "Experience", "Projects", "Education"). Structure depends on `type`.
- `column`: string (e.g., "left", "right") - for multi-column layouts
- `order`: number (for sorting sections within a column or overall)

### ExperienceItem (example for 'experience' section type)
- `role`: string
- `company`: string
- `time`: string (e.g., "2023–Present")
- `description`: string

_Note: Other item types (e.g., ProjectItem, EducationItem) will have similar but distinct structures based on their content._

## Relationships
- A Resume `has many` Sections.
- A Section `can have many` Items (depending on its `type`).
- A Resume `has one` Theme.

## Validation Rules
- `layout` must be one of the predefined layout options.
- `theme` colors must be valid hex codes.
- `sections` must have unique `id`s.
- `order` should be a non-negative integer for sorting.
- All required fields within each entity must be present and conform to their respective types.