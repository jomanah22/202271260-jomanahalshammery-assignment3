# Technical Documentation – Assignment 3

## Overview

A static single-page site with client-side data fetching and saved UI state. No build tools,
no libraries.

```
index.html        markup; three deferred scripts in <head>
css/styles.css    tokens, base, components, sections, controls, exercises, weather line, responsive
js/config.js      CONFIG: location for the weather line, cache duration
js/data.js        PROJECTS, PROJECT_FILTERS, PROJECT_SORTS, EXERCISES
js/script.js      behaviour in one function, ten numbered parts
assets/images/    20 JPEGs, no wider than 1200 px, about 2.2 MB
assets/fonts/     Montserrat variable font
```

Load order matters: `config.js`, then `data.js`, then `script.js`, all with `defer`, so they
run in order after the document is parsed without blocking rendering.

## State

```js
var STATE_KEY = 'portfolio-state';
var defaults  = { filter: 'All', sort: 'course', logOpen: false };
var state     = loadState();          // defaults merged with the saved JSON
setState({ sort: 'kind' });           // change and save in one call
```

- `loadState()` catches parse errors and falls back to the defaults.
- `setState()` merges a patch and writes the whole object. Storage failures are ignored so the
  page still works without persistence.
- After loading, the saved `filter` and `sort` are checked against `PROJECT_FILTERS` and
  `PROJECT_SORTS` and reset if they are no longer valid.
- Two other keys are deliberately separate: `theme` (read by the inline head script before
  `script.js` exists) and `contact-draft` (form text, cleared on submit).

Helpers used by the API call:

- `cacheGet(key)` and `cacheSet(key, data)`: `sessionStorage` with a timestamp; entries expire
  after `CONFIG.cacheMinutes`.
- `fetchJson(url, timeoutMs)`: `fetch` with an `AbortController` timeout (8 seconds by
  default); throws on a non-2xx response; returns parsed JSON.

## Project pipeline

```
PROJECTS
  .filter(tag filter)            state.filter === 'All' or the tags include it
  .filter(text search)           query in title, summary, kind or tags
  .slice().sort(sort.compare)    comparator from PROJECT_SORTS[state.sort]
```

`PROJECT_SORTS` holds `{ id, label, compare }` objects and the `<select>` options are built
from it. "Journal order" sorts by `sequence`; "Projects first" sorts by kind and then sequence.
Filter and sort are saved in `state`; the search text is not. `syncControls()` keeps the
filter buttons (`aria-pressed`) and the select in step with `state`. Rendering, the empty
state, the counter and the notes popup work as in the previous version.

## In-class exercises

`EXERCISES` is rendered into `#log-list` as `<details>` elements: number, title and tools in
the `<summary>`; objective, brief and process, reflection and a lazy-loaded image grid in the
body. `state.logOpen` controls the `hidden` attribute on the list and the label and
`aria-expanded` of the toggle button. Native `<details>` gives keyboard and screen-reader
support without extra code.

## Weather and local time (Open-Meteo)

```
GET https://api.open-meteo.com/v1/forecast
    ?latitude=26.2172&longitude=50.1971
    &current=temperature_2m,weather_code,is_day&timezone=Asia/Riyadh
```

- `renderNow()` builds the sentence from `Intl.DateTimeFormat` (hour and minute in the
  configured time zone) plus `weatherText`, which is `null` while loading, a string when
  loaded, or `''` when the request failed. The three cases read "checking the weather…",
  "38° and clear skies", and "Weather is unavailable right now".
- `describeWeather(code, isDay)` maps the WMO weather codes to short phrases.
- The clock re-renders every minute; the weather is requested once and cached for ten minutes.

## Contact form

Fields: name, email, topic (`<select>`), message.

1. Presence: every field must have a value (a specific message per field).
2. Shape: the email must match `name@domain.tld`; the message needs at least 10 characters.
3. Only when everything passes: a confirmation built from the name and the topic's reply text.

The `TOPICS` map also supplies the hint shown under the message box, updated on `change`.
Fields validate on blur and all together on submit; focus moves to the first invalid field.
Drafts of all four fields are saved to `localStorage` 400 ms after typing stops and restored
on load.

## Other parts

Theme toggle, mobile navigation, typed tagline, scroll reveal and the image viewer are the
same as in the previous version.

## Performance

- 20 images, about 2.2 MB in total, all resized JPEGs with `width`/`height` attributes and
  `aspect-ratio`; every image is `loading="lazy"`.
- The font is served from `assets/fonts` (one 38 KB file), so the page makes no requests to
  third-party servers apart from the weather API.
- Scripts are deferred; the JavaScript is about 30 KB unminified with no dependencies.
- The weather response is cached in `sessionStorage`; the clock updates once a minute.
- The stylesheet was audited against the markup and scripts and contains no unused rules.

## Testing

Chrome at 1440, 820 and 390 px in both themes: no console errors, no horizontal overflow, all
images load, all in-page links resolve. Interactions: each sort order alone and combined with a
filter; filter and sort remembered across a reload; *Clear filters* keeps the sort; exercises
open and close, expand an entry, state remembered; the weather line with live data and with the
network offline; topic hint changes; presence and shape errors; focus management; success
message per topic; draft restore.

## Known limitations

- The form has no backend; submissions are acknowledged but not sent.
- The weather is for a fixed location from `CONFIG`; the site does not ask for the visitor's
  location.
