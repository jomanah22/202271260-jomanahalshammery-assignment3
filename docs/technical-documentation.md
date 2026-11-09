# Technical Documentation – Assignment 2

## Overview

A static single-page site with client-side interactivity. No build step and no dependencies.

```
index.html          markup
css/styles.css      styles (tokens, components, sections, controls, popup, responsive)
js/data.js          PROJECTS array and PROJECT_FILTERS list
js/script.js        behaviour, seven numbered parts
assets/             fonts and images
```

`data.js` is loaded before `script.js`, so `PROJECTS` and `PROJECT_FILTERS` exist as globals
when the behaviour runs.

## Data model

```js
{
  id: 'tarout-palm-island',        // used for ids and lookups
  title: 'Tarout Palm Island',
  kind: 'Project',
  year: 2025,
  tags: ['Blender', '3D Modeling', 'World building'],   // matched by the filter buttons
  image: 'assets/images/tarout-palm-island-1.jpg',
  summary: '...',                  // shown on the card
  process: '...',                  // shown in the popup
  learning: '...'                  // shown in the popup
}
```

Adding a project means adding one object. `PROJECT_FILTERS` lists the tags that get a filter
button; "All" is added by the script.

## Rendering, filter and search

- State is two variables: `activeFilter` (defaults to `'All'`) and `query` (lower-cased text).
- `matches(project)` returns true when the project has the active tag (or the filter is All)
  and the query appears in its title, summary, kind or tags.
- `renderProjects()` filters `PROJECTS`, builds the cards with `projectTemplate()`, writes them
  into `#project-list`, then updates the counter, the *Clear filters* link and the empty state.
  Each card gets a small `animation-delay` so the list fades in staggered.
- The filter buttons are created from data and use `aria-pressed` for their state.
- All text inserted into templates goes through `escapeHtml()`.

## Notes popup

Each card has a *Process & notes* button with `data-notes="<id>"`. One click listener on the
list finds the project in `PROJECTS`, fills `#notes-dialog` (kind, title, summary, process,
what I learned, tags) and calls `showModal()`. The dialog closes with Escape, the close button
or a click on the backdrop, and focus goes back to the button that opened it. While it is
open, `body.has-notes` stops the page from scrolling.

## Contact form

- `validateField(name)` checks one field and writes a specific message into the matching
  `#<name>-error` element, sets `aria-invalid` and toggles a `has-error` class on the wrapper.
  Rules: required; the email must match `name@domain.tld`; the message needs at least 10
  characters.
- Fields are validated on blur once they have content, and all together on submit. On failure
  the first invalid field receives focus.
- Drafts: every `input` event schedules `saveDraft()` after 400 ms. The three values are stored
  as JSON under the key `contact-draft`, restored on load, and removed after a successful
  submit. If storage is unavailable the note under the form says so.
- The status message is a `role="status"` live region that fades in through an `is-shown`
  class.

## Scroll reveal

Elements with the `reveal` class start slightly lower and transparent. One
`IntersectionObserver` adds `is-visible` the first time an element enters the viewport, or
straight away if it is already above the viewport (for example after a reload restored the
scroll position). A scroll listener acts as a safety net for anchor jumps. Without
`IntersectionObserver` everything is shown at once, and `prefers-reduced-motion` turns the
effect off.

## Image viewer

Clicking a project cover opens it full size in the `#lightbox` dialog with previous / next
buttons, arrow-key navigation, a position counter and click-outside to close.

## Theme, navigation and typing effect

Same approach as the first version: `<html data-theme>` is set by an inline script from
`localStorage` before paint and toggled by the header button; the mobile menu toggles an
`is-open` class; the hero tagline is typed character by character.

## Testing

Checked in Chrome at 1440, 820 and 390 px in light and dark mode: no console errors, no
horizontal overflow, all images load, all in-page links resolve. Interactions tested: each
filter, filter combined with search, no-match state and reset, the notes popup (open, Escape,
focus return), empty submit, invalid email, short message, draft restore after reload,
successful submit clears the draft, the image viewer.

## Known limitations

- The form does not send anything (no backend required).
- Filtering runs over six items in memory; a much larger list would need paging.
