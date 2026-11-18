# AI Usage Report – Assignment 3

## Signed Declaration

> **Declaration of AI Usage:**  
> I declare that the work presented in this assignment is my own, except where explicitly acknowledged through AI usage documentation or references. I understand all the code submitted, have reviewed and critically modified all AI-assisted outputs, and can explain every implementation decision and algorithm without assistance.
> 
> In accordance with KFUPM academic integrity regulations and course guidelines for SWE 363, every use of generative AI tools has been transparently documented below.

- **Student Name:** Jomanah Alshammary
- **Student ID:** 202271260
- **Course:** SWE 363 – Web Engineering
- **Repository Link:** [https://github.com/jomanah22/202271260-jomanahalshammery-assignment3](https://github.com/jomanah22/202271260-jomanahalshammery-assignment3)

## 1. High-Level AI Usage Log

| Tool       | Date       | Purpose                                                     | Files Affected                                               | What You Changed                                                                                                                                                                 |
|:---------- |:---------- |:----------------------------------------------------------- |:------------------------------------------------------------ |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Claude** | 2026-11-10 | Script loading order and a separate configuration file      | `index.html`, `js/config.js`                                 | Moved the script tags into the head with `defer` in the order config → data → script; wrote the `CONFIG` values (Khobar coordinates, `Asia/Riyadh`, ten-minute cache) myself.    |
| **Claude** | 2026-11-11 | One saved state object instead of separate variables        | `js/script.js`                                               | Adopted `loadState()` / `setState()` with a single `localStorage` key; kept the theme and the form draft under their own keys; wrapped storage access in `try / catch`.          |
| **Claude** | 2026-11-12 | Sort orders as data and the filter → search → sort pipeline | `js/data.js`, `js/script.js`, `index.html`, `css/styles.css` | Added `sequence` and `PROJECT_SORTS` with comparators; wrote `visibleProjects()` with `slice()` before `sort()`; chose not to persist the search text; styled the native select. |
| **Claude** | 2026-11-13 | Topic-aware contact form and two-step validation            | `index.html`, `js/script.js`, `css/styles.css`               | Added the `TOPICS` map and `REQUIRED_MESSAGES`; wrote every hint, reply and error message in my own words; linked the hint to the textarea with `aria-describedby`.              |
| **Claude** | 2026-11-14 | Live weather and local time from a public API               | `js/script.js`, `index.html`, `css/styles.css`               | Chose Open-Meteo; kept `fetchJson()` with an `AbortController` timeout and a `sessionStorage` cache; wrote `describeWeather()` from the WMO code table; three text states.       |
| **Claude** | 2026-11-15 | In-class exercises rendered as `<details>` entries          | `js/data.js`, `js/script.js`, `index.html`, `css/styles.css` | Entered the six exercises from my journal; `renderLog()` with `aria-expanded` / `aria-controls`; `logOpen` saved in state; wrote the list and phone styles.                      |
| **Claude** | 2026-11-17 | Review pass for consistency                                 | `js/script.js`, `css/styles.css`, `js/data.js`, `index.html` | Shortened callbacks to one line, trimmed stale comments, added `decoding="async"`, updated the file headers.                                                                     |
| **Claude** | 2026-11-18 | Structure of the documentation                              | `docs/ai-usage-report.md`, `docs/technical-documentation.md` | Used the suggested section outline; wrote all reflections and checked every technical claim against the code.                                                                    |

---

## 2. Commit-by-Commit AI Assistance Details

Below is the complete audit of each commit for Assignment 3, documenting whether AI assisted, what the AI provided, what human changes were made, and the corresponding entries in the AI evidence log.

### Commit 1: `commit-1-start-from-assignment-2`

- **Commit Message:** Start from the Assignment 2 portfolio
- **Commit Description:** Assignment 2 site copied in unchanged as the starting point
- **AI Assisted:** No (Manual Implementation)
- **Details:** Copied the Assignment 2 repository files into the Assignment 3 workspace to establish the clean baseline.

### Commit 2: `commit-2-config-and-deferred-scripts`

- **Commit Message:** Add a configuration file and defer the scripts
- **Commit Description:** js/config.js with the weather location and cache time; script tags moved into the head with defer
- **AI Assisted:** Yes (Claude)
- **What AI Suggested:** Loading the scripts from the `<head>` with `defer` so they run in order after parsing without blocking rendering, and keeping values that are specific to me (location, cache duration) in a separate `CONFIG` object.
- **What I Changed:** Decided the load order (`config.js`, `data.js`, `script.js`), kept the inline theme script untouched so there is still no flash of the wrong theme, and wrote the configuration values myself with a comment that nothing in the file is secret.

### Commit 3: `commit-3-state-module`

- **Commit Message:** Add a single saved state object
- **Commit Description:** loadState and setState helpers and one localStorage key, sections renumbered
- **AI Assisted:** Yes (Claude)
- **What AI Suggested:** Replacing the separate variables I had started with (filter, sort, exercises toggle), each writing its own key, by one `state` object read through `loadState()` and written through `setState()` under a single key.
- **What I Changed:** Kept `theme` as its own key because the inline head script reads it before `script.js` exists, kept `contact-draft` separate because it is cleared on submit, and added the `try / catch` so the page still works when storage is unavailable.

### Commit 4: `commit-4-sort-orders`

- **Commit Message:** Add sort orders on top of filter and search
- **Commit Description:** sequence and PROJECT_SORTS in the data, sort select with styles, filter → search → sort pipeline, filter and sort remembered
- **AI Assisted:** Yes (Claude)
- **What AI Suggested:** Storing each sort option as `{ id, label, compare }` so the `<select>` builds itself, a `visibleProjects()` function that filters, searches and then sorts a copy of the array, and a check that resets a saved filter or sort that no longer exists in the data.
- **What I Changed:** Added `sequence` to every project so "Journal order" and "Projects first" have something to sort by, wrote `syncControls()` to keep the chips and the select in step with `state`, decided not to remember the search text (an old search on the next visit felt broken in testing), and styled the native select myself, including the `option` colours for dark mode and an accessible name.

### Commit 5: `commit-5-contact-topic-and-validation`

- **Commit Message:** Add a topic to the contact form with two-step validation
- **Commit Description:** Topic select, hint under the message, confirmation per topic, presence then shape checks
- **AI Assisted:** Yes (Claude)
- **What AI Suggested:** A `TOPICS` map holding a hint and a reply per topic, a `REQUIRED_MESSAGES` object instead of an inline literal, and splitting `validateField()` into a presence step and a shape step.
- **What I Changed:** Wrote all of the hint, reply and error text in my own words, added `topic` to the draft that is saved and restored, and linked the hint to the textarea with `aria-describedby="message-hint message-error"`.

### Commit 6: `commit-6-weather-and-local-time`

- **Commit Message:** Show live weather and local time from Open-Meteo
- **Commit Description:** fetch and cache helpers, weather line in the contact section, weather codes mapped to words, loading and failure states
- **AI Assisted:** Yes (Claude)
- **What AI Suggested:** After discussing several public APIs, Open-Meteo for a "right now in Khobar" line because it needs no key; `fetchJson()` wrapped in an `AbortController` with an eight-second timer; `cacheGet()` / `cacheSet()` in `sessionStorage` with a timestamp; `Intl.DateTimeFormat` with a time zone instead of hand-written date maths.
- **What I Changed:** Wrote `describeWeather()` from the WMO weather code table in the Open-Meteo documentation, wrote the three visible states ("checking the weather…", "38° and clear skies", "Weather is unavailable right now"), added the weather credit in the footer, and rejected a generic data-source class because there is exactly one API call.

### Commit 7: `commit-7-in-class-exercises`

- **Commit Message:** Add the in-class exercises section
- **Commit Description:** EXERCISES data and screenshots, practice section rendered as details elements, show and hide remembered in state, phone layout
- **AI Assisted:** Yes (Claude)
- **What AI Suggested:** Rendering each exercise as a native `<details>` element so keyboard and screen-reader support comes for free, a toggle button with `aria-expanded` and `aria-controls`, and keeping the open or closed choice in `state.logOpen`.
- **What I Changed:** Entered the six exercises (objective, brief, what I took from it) from my design journal, resized the screenshots and gave every image explicit sizes with `loading="lazy"`, and wrote the list, gallery and phone styles myself.

### Commit 8: `commit-8-tidy-scripts-and-headers`

- **Commit Message:** Tidy the scripts and update the file headers
- **Commit Description:** One-line callbacks, trimmed comments, async image decoding, Assignment 3 headers, REST APIs in the skills card
- **AI Assisted:** Yes (Claude)
- **What AI Suggested:** A review pass listing callbacks that could sit on one line, comments that repeated the code, and `decoding="async"` for the lazy images.
- **What I Changed:** Applied the suggestions that matched the existing style, left the comments that explain a decision, updated the stylesheet and data headers for Assignment 3 and added REST APIs to the skills card.

### Commit 9: `commit-9-ai-usage-report`

- **Commit Message:** Update the AI usage report
- **Commit Description:** docs/ai-usage-report.md rewritten for Assignment 3
- **AI Assisted:** Yes (Claude)
- **What AI Suggested:** The section outline required by the assignment guidelines (declaration, usage log, commit audit, reflection, learning outcomes).
- **What I Changed:** Wrote all reflections, challenges and code adaptations in my own words and matched every entry to the evidence log.

### Commit 10: `commit-10-technical-documentation`

- **Commit Message:** Update the technical documentation
- **Commit Description:** docs/technical-documentation.md rewritten for Assignment 3
- **AI Assisted:** Yes (Claude)
- **What AI Suggested:** Formatting the state description, the project pipeline and the API request as short code blocks.
- **What I Changed:** Verified every technical detail against the actual code, wrote the testing list from what I tested in Chrome at three widths, and documented the known limitations.

### Commit 11: `commit-11-update-readme`

- **Commit Message:** Update the README
- **Commit Description:** What is new, configuration, structure and setup for Assignment 3
- **AI Assisted:** No (Manual Implementation)
- **Details:** Updated the root `README.md` with the requirements table, the exercises section, the configuration values, the project structure and the things to try.

---

## 3. Reflection: Benefits and Challenges

### Benefits

- **Boilerplate in minutes:** The fetch wrapper, the cache helpers and the state helpers took minutes, which left time for the logic, the copy and testing the edge cases.
- **Listing what can go wrong:** Claude was good at naming failure cases I had not thought of, such as a request that hangs without ever failing, rate limits and full storage.
- **Platform features explained:** `Intl.DateTimeFormat` with a time zone, `AbortController` and `sessionStorage` versus `localStorage` were explained clearly enough that I could read the MDN pages and use them with confidence.

### Challenges & Overcoming Them

- **Deciding what not to keep:** It suggested saving the search text too. In testing, opening the site the next day with an old search felt broken, so I only save the filter and the sort. Deciding what not to persist was part of the work.
- **Vague messages:** Generated error and status text was generic. I rewrote every message so it says what happened and what to do next.
- **Over-abstraction:** Some suggested code was more abstract than the page needs (a generic data-source class). I kept the simpler functions because there is exactly one API call.

---

## 4. Learning Outcomes

1. **REST APIs in the browser:** Fetching JSON, checking HTTP status codes, and cancelling a request with `AbortController`.
2. **Caching with an expiry:** Keeping an API response in `sessionStorage` with a timestamp, and why session storage (not local storage) is the right place for data that goes stale.
3. **State in one place:** Keeping application state in one object with a single save path, and validating saved values against the current data.
4. **Composing array logic:** `filter`, then `slice`, then `sort` with comparators stored as data.
5. **Performance basics:** Deferred scripts, lazy images with explicit sizes, a locally served font and a cached API response.
6. **Responsible AI co-development:** Treating the tool as a reviewer and tutor; every generated function was read, tested (including the failure cases) and edited to match the style of the rest of the code before it stayed.
