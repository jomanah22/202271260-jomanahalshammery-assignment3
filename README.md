# Jomanah Alshammary – Portfolio Website (Assignment 3)

The third version of my portfolio for SWE 363 (Web Engineering) at KFUPM. It adds live data
from a public API, sorting on top of filtering and search, a section for my in-class
exercises, a contact form that adapts to the chosen topic, and one central state object that
is saved between visits. Plain HTML, CSS and JavaScript.

Live site: https://202271260-jomanahalshammery-assignment-3.vercel.app

## What is new

| Requirement      | How it is met                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API integration  | The Contact section shows a live line such as "It's 3:40 PM in Khobar, 38° and clear skies", using the Open-Meteo weather API (no key needed). It has a loading state, a friendly fallback if the request fails, a timeout, and the result is cached in `sessionStorage` for ten minutes.                                                                                                      |
| Complex logic    | Projects pass through three steps: filter by tool, search by text, then one of four sort orders (Journal order, Title A–Z, Title Z–A, Projects first). The contact form validates in two steps (all fields present, then email format and message length) and changes its hint and confirmation depending on the topic you choose. Weather codes from the API are translated into plain words. |
| State management | One `state` object holds the active filter, the sort order and whether the exercises list is open. It is read and written through two helper functions and saved under one `localStorage` key, so those choices survive a reload. The theme and the form draft are also saved. Saved values are checked against the current data on load.                                                      |
| Performance      | Scripts are deferred, images are resized JPEGs with `loading="lazy"` and explicit sizes, the font is served from the repository, API responses are cached, and the stylesheet has no unused rules.                                                                                                                                                                                             |

Everything from the earlier versions is still here: light and dark mode, responsive layout,
mobile menu, typed tagline, filter and search, notes popup, saved drafts, scroll reveal, image
viewer.

## In-class exercises

Below the projects there is a section with six exercises from my design journal (mood board,
postcard, logo redesign, Blender modifiers, Blender nodes, sculpting). A button shows or hides
the list and remembers your choice; each entry expands to show the objective, the process and
what I took from it, with screenshots.

## Configuration

`js/config.js` holds the location used for the weather line and the cache time:

```js
location: { name: 'Khobar', latitude: 26.2172, longitude: 50.1971, timezone: 'Asia/Riyadh' },
cacheMinutes: 10
```

## Project structure

```
assignment-3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── config.js         location and cache settings
│   ├── data.js           projects, filters, sort orders, exercises
│   └── script.js         behaviour, ten numbered parts
├── assets/
│   ├── fonts/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

## Running the site locally

No installation. Open `index.html` directly, or serve the folder:

```bash
# inside the assignment-3 folder, pick one
npx serve .
python -m http.server 8000
```

The weather request works from `file://` as well as from a server. Without internet the rest
of the page works normally and the weather line says the weather is unavailable.

Things to try: change the sort and pick a filter, then reload. Open the exercises, expand one,
reload. Choose different topics in the contact form and watch the hint change. Set the browser
to offline and reload to see the weather fallback.

## AI use

I used Claude as an assistant for this assignment: to design the single state object, to
structure the filter → search → sort pipeline, to handle the failure cases of the API call,
and to review the new controls for accessibility. All code was tested and edited by me. See
[docs/ai-usage-report.md](docs/ai-usage-report.md).

## Technical notes

See [docs/technical-documentation.md](docs/technical-documentation.md).
