# AI Usage Report – Assignment 2

## Signed Declaration

> **Declaration of AI Usage:**  
> I declare that the work presented in this assignment is my own, except where explicitly acknowledged through AI usage documentation or references. I understand all the code submitted, have reviewed and critically modified all AI-assisted outputs, and can explain every implementation decision and algorithm without assistance.
> 
> In accordance with KFUPM academic integrity regulations and course guidelines for SWE 363, every use of generative AI tools has been transparently documented below.

- **Student Name:** Jomanah Alshammary
- **Student ID:** 202271260
- **Course:** SWE 363 – Web Engineering
- **Repository Link:** [https://github.com/jomanah22/202271260-jomanahalshammery-assignment2](https://github.com/jomanah22/202271260-jomanahalshammery-assignment2)

## 1. High-Level AI Usage Log

| Tool                  | Date       | Purpose                                                  | Files Affected                                 | What You Changed                                                                                                                                                   |
|:--------------------- |:---------- |:-------------------------------------------------------- |:---------------------------------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Claude 3.5 Sonnet** | 2026-09-14 | Project data array and schema design                     | `js/data.js`                                   | Extracted into a standalone `data.js` file, adapted schema to fit coursework from ITD 211 & ITD 212, added tags, process, and learning reflection fields.          |
| **Claude 3.5 Sonnet** | 2026-09-15 | Dynamic project card rendering & filter/search logic     | `js/script.js`, `css/styles.css`               | Unified independent filter and search state into a single `matches(project)` predicate function; removed unwanted sort controls; added HTML escaping for security. |
| **Claude 3.5 Sonnet** | 2026-09-16 | Accessible `<dialog>` popup for project notes            | `index.html`, `js/script.js`, `css/styles.css` | Implemented native HTML5 `<dialog>` using `showModal()`; added backdrop-click dismiss, body scroll lock, and return of focus to opening button.                    |
| **Claude 3.5 Sonnet** | 2026-09-18 | Contact form validation, live status, and draft autosave | `index.html`, `js/script.js`, `css/styles.css` | Replaced vague error messages with specific guidance, added ARIA attributes (`aria-invalid`, `aria-describedby`), and added debounced `localStorage` draft saving. |
| **Claude 3.5 Sonnet** | 2026-09-19 | Scroll reveal animations with IntersectionObserver       | `js/script.js`, `css/styles.css`               | Added `prefers-reduced-motion` support, safety scroll listener for midway reloads, and subtle staggered fade-in delays.                                            |
| **Claude 3.5 Sonnet** | 2026-09-20 | Scoped lightbox image viewer to active filtered projects | `js/script.js`                                 | Scoped `.project-media` querySelector to `#project-list` so keyboard navigation only cycles through currently visible projects.                                    |

---

## 2. Commit-by-Commit AI Assistance Details

Below is the complete audit of each commit for Assignment 2, documenting whether AI assisted, what the AI provided, what human changes were made, and the corresponding evidence file.

### Commit 1: `commit-1-start-from-assignment-1`

- **Commit Message:** Start from the Assignment 1 portfolio
- **Commit Description:** Assignment 1 site copied in unchanged as the starting point
- **AI Assisted:** No (Manual Implementation)
- **Details:** Copied Assignment 1 repository files into the Assignment 2 workspace to establish the clean baseline.

### Commit 2: `commit-2-refactor-theme-toggle`

- **Commit Message:** Refactor the theme toggle
- **Commit Description:** Move setting and saving the theme into an applyTheme helper
- **AI Assisted:** No (Manual Implementation)
- **Details:** Refactored the inline script and toggle handler into a modular `applyTheme(theme)` helper function to improve maintainability before adding new JavaScript modules.

### Commit 3: `commit-3-add-project-data-file`

- **Commit Message:** Add project data file
- **Commit Description:** js/data.js with the six projects and the filter list
- **AI Assisted:** Yes (Claude 3.5 Sonnet)
- **What AI Suggested:** A schema defining an array of objects (`PROJECTS`) with metadata keys (`id`, `title`, `kind`, `year`, `tags`, `image`, `summary`, `process`, `learning`) and a separate list for filter chips (`PROJECT_FILTERS`).
- **What I Changed:** I wrote all the project data myself using my authentic course projects from ITD 211 and ITD 212. I placed it in its own file (`js/data.js`) to be loaded before `script.js`.

### Commit 4: `commit-4-render-projects-from-data`

- **Commit Message:** Render the projects from data
- **Commit Description:** Static cards replaced by a rendered list, result count, empty state
- **AI Assisted:** Yes (Claude 3.5 Sonnet)
- **What AI Suggested:** A card template function (`projectTemplate`) using string interpolation and an `escapeHtml()` helper function to prevent XSS injection.
- **What I Changed:** Converted template strings into standard ES5 string concatenation to match existing codebase conventions; added the "Process & notes" modal trigger button and custom badge elements.

### Commit 5: `commit-5-filter-chips`

- **Commit Message:** Add filter buttons for projects
- **Commit Description:** Filter chips built from the data, active state
- **AI Assisted:** Yes (Claude 3.5 Sonnet)
- **What AI Suggested:** Generating button elements dynamically from `['All'].concat(PROJECT_FILTERS)` with `aria-pressed` attributes and attaching an event delegation listener on `#project-filters`.
- **What I Changed:** Integrated with my CSS chip styling classes (`.chip.is-active`), ensured active toggle logic updates ARIA state correctly for screen readers.

### Commit 6: `commit-6-live-search`

- **Commit Message:** Add live search
- **Commit Description:** Search box that narrows the list while typing, combined with the filter
- **AI Assisted:** Yes (Claude 3.5 Sonnet)
- **What AI Suggested:** A single unified predicate function `matches(project)` evaluating both `activeFilter` and `query` simultaneously across title, summary, kind, and tags.
- **What I Changed:** AI initially suggested debouncing the search, but since the array contains only 6 items, direct execution on the `input` event was much more responsive and cleaner without added complexity.

### Commit 7: `commit-7-clear-filters`

- **Commit Message:** Add clear filters
- **Commit Description:** Clear filters and Show all projects reset the search and the filter
- **AI Assisted:** Yes (Claude 3.5 Sonnet)
- **What AI Suggested:** A `resetProjectControls()` helper resetting `activeFilter = 'All'`, `query = ''`, clearing the search input value, and re-rendering.
- **What I Changed:** Tied the function to both the *Clear filters* button and the *Show all projects* button inside the empty state message.

### Commit 8: `commit-8-project-notes-popup`

- **Commit Message:** Add Process and notes popup
- **Commit Description:** Dialog with the process and learning for each project
- **AI Assisted:** Yes (Claude 3.5 Sonnet)
- **What AI Suggested:** Utilizing the native HTML5 `<dialog id="notes-dialog">` with `showModal()`, detecting backdrop clicks by checking `event.target === dialog`, and listening for the `close` event.
- **What I Changed:** Added body scroll locking (`body.has-notes`), mapped the student journal reflection text (`process` and `learning`), and guaranteed return of keyboard focus to the opening card button (`openedFrom.focus()`).

### Commit 9: `commit-9-update-projects-intro`

- **Commit Message:** Update the projects intro text
- **Commit Description:** Section intro now describes the filter, search and notes
- **AI Assisted:** No (Manual Implementation)
- **Details:** Wrote section introductory copywriting in `index.html` explaining how visitors can interact with the filter chips, search box, and process notes modal.

### Commit 10: `commit-10-contact-form-validation`

- **Commit Message:** Add contact form validation
- **Commit Description:** Per-field errors, focus to the first problem, submit feedback
- **AI Assisted:** Yes (Claude 3.5 Sonnet)
- **What AI Suggested:** Per-field validation rules (required, email regex, minimum message length) setting `aria-invalid="true"`, toggling `.has-error`, and directing focus to the first invalid field upon submission.
- **What I Changed:** Replaced generic error text ("Invalid value") with polite, context-aware student guidance ("Please enter your name", "Please enter a valid email address such as name@example.com").

### Commit 11: `commit-11-saved-form-draft`

- **Commit Message:** Save an unsent form draft
- **Commit Description:** Draft kept in localStorage and restored on reload
- **AI Assisted:** Yes (Claude 3.5 Sonnet)
- **What AI Suggested:** Saving form field values as a JSON string in `localStorage` under key `contact-draft` debounced by 400ms, restoring them on `DOMContentLoaded`, and clearing upon submission.
- **What I Changed:** Added a defensive `try / catch` block around `localStorage` access so that if cookies/storage are blocked by browser privacy modes, a friendly message is shown without JavaScript runtime errors.

### Commit 12: `commit-12-animated-status-message`

- **Commit Message:** Animate the form status message
- **Commit Description:** Status fades in instead of appearing at once
- **AI Assisted:** Yes (Claude 3.5 Sonnet)
- **What AI Suggested:** Using an element with `role="status"` and `aria-live="polite"`, transitioning opacity and vertical transform via an `.is-shown` modifier class.
- **What I Changed:** Styled the success message container with green accent tokens matching the portfolio's color palette.

### Commit 13: `commit-13-scroll-reveal`

- **Commit Message:** Add scroll reveal
- **Commit Description:** Sections fade up the first time they come into view
- **AI Assisted:** Yes (Claude 3.5 Sonnet)
- **What AI Suggested:** Setting up an `IntersectionObserver` observing all `.reveal` elements to add an `.is-visible` CSS class when they intersect the viewport.
- **What I Changed:** Added a fallback for browsers without `IntersectionObserver`, added a scroll safety listener for pages restored mid-scroll upon refresh, and respected `prefers-reduced-motion` media queries.

### Commit 14: `commit-14-list-stagger-animation`

- **Commit Message:** Animate the project list
- **Commit Description:** Cards fade in with a small stagger when the list re-renders
- **AI Assisted:** Yes (Claude 3.5 Sonnet)
- **What AI Suggested:** Appending an inline `style="animation-delay: " + (index * 40) + "ms"` to each rendered project card.
- **What I Changed:** Adjusted the delay curve and CSS keyframes (`cardFadeIn`) so the stagger feels subtle rather than sluggish.

### Commit 15: `commit-15-lightbox-follows-filter`

- **Commit Message:** Image viewer follows the filtered list
- **Commit Description:** Previous and next step through what the filter and search are showing
- **AI Assisted:** Yes (Claude 3.5 Sonnet)
- **What AI Suggested:** Changing the lightbox cover query from `document.querySelectorAll('.project-media')` to `projectList.querySelectorAll('.project-media')` when the modal opens.
- **What I Changed:** Implemented the scoped selector; retained modal defensive checks (`document.body.contains(openedFrom)`) for safe focus restoration upon closing.

### Commit 16: `commit-16-ai-usage-report`

- **Commit Message:** Update the AI usage report
- **Commit Description:** docs/ai-usage-report.md rewritten for Assignment 2
- **AI Assisted:** Yes (Claude 3.5 Sonnet)
- **What AI Suggested:** Outlining the sections required by the assignment guidelines (use cases, benefits, challenges, learning outcomes).
- **What I Changed:** Wrote all reflections, challenges encountered, and code adaptations in my own words.

### Commit 17: `commit-17-technical-documentation`

- **Commit Message:** Update the technical documentation
- **Commit Description:** docs/technical-documentation.md rewritten for Assignment 2
- **AI Assisted:** Yes (Claude 3.5 Sonnet)
- **What AI Suggested:** Formatting the technical specifications and data schema descriptions for clarity.
- **What I Changed:** Verified all technical details against the actual vanilla JS implementation; documented the testing matrix across screen sizes and browser configurations.

### Commit 18: `commit-18-update-readme`

- **Commit Message:** Update the README
- **Commit Description:** Features, project structure and setup for Assignment 2
- **AI Assisted:** No (Manual Implementation)
- **Details:** Updated the root `README.md` to document Assignment 2 features, project setup instructions, and links to technical documentation and live deployment.

---

## 3. Reflection: Benefits and Challenges

### Benefits

- **Rapid Debugging & Exploration:** Claude helped diagnose tricky state-collision issues quickly (e.g., combining live text search with category filter chips).
- **Accessibility Standards:** Guided the addition of essential accessibility attributes (`aria-pressed`, `aria-invalid`, `aria-describedby`, and ARIA live regions) which make the portfolio accessible to screen readers.

### Challenges & Overcoming Them

- **Code Style Inconsistency:** The AI often suggested mixed modern ES6+ idioms (arrow functions, template literals) that clashed with the clean vanilla JavaScript structure of Assignment 1. I refactored all snippets to maintain consistent syntax throughout.
- **Feature Creep:** Initial AI suggestions included complex sorting dropdowns and external packages. I intentionally stripped these out to keep the codebase pure vanilla HTML/CSS/JS in line with course rubrics.
- **Vague Messaging:** Default AI validation error messages were generic ("Invalid input"). I rewrote every user-facing message into friendly, clear, and actionable feedback.

---

## 4. Learning Outcomes

1. **State Management in Vanilla JS:** Understanding how to unify multiple filter conditions (`activeFilter` + `query`) into a single declarative predicate function `matches(project)`.
2. **Accessible Native Dialogs:** Using the HTML5 `<dialog>` element with `showModal()`, managing keyboard focus traps, backdrop dismissal, and restoring focus to the triggering element.
3. **Form Resilience & Storage:** Implementing debounced autosave with `localStorage` (`JSON.stringify`/`JSON.parse`), handling storage quota exceptions safely, and implementing accessible form validation.
4. **Performance & Motion:** Employing `IntersectionObserver` for scroll-triggered animations while honoring user preferences via `prefers-reduced-motion`.
5. **Responsible AI Co-Development:** Learning how to treat AI as an interactive tutor and brainstorming assistant rather than an unquestioned code generator.
