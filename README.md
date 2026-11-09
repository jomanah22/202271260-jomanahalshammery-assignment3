# Jomanah Alshammary – Portfolio Website (Assignment 2)

The second version of my portfolio for SWE 363 (Web Engineering) at KFUPM. It keeps the
layout and content of Assignment 1 and adds interactivity: the projects are rendered from
data and can be filtered and searched, each project has a notes popup, the contact form
validates every field and remembers a draft, and sections fade in as you scroll.
Still plain HTML, CSS and JavaScript.

Live site: https://202271260-jomanahalshammery-assignment-2.vercel.app

## Features

**Dynamic content**

- The six projects live in `js/data.js` and are rendered by `js/script.js`.
- Filter buttons (All, Blender, Photoshop, InDesign) and a search box work together. A
  counter shows how many projects match, a *Clear filters* link resets both, and an empty
  state appears when nothing matches.
- *Process & notes* on each card opens a popup with the project's process and what I learned.

**Data handling**

- The theme choice is saved in `localStorage`.
- The contact form checks each field (required, email format, minimum message length) when
  you leave it and again on submit. Errors appear under the field that has the problem and
  focus moves to the first one.
- What you type in the form is saved as a draft in `localStorage` and restored after a
  refresh. A successful submit clears it.

**Animation**

- Sections fade and slide in the first time they enter the viewport.
- Newly filtered cards fade in with a small stagger.
- The form status message fades in; buttons, cards and links have hover states.

**Feedback**

- Field-level error messages, a general message on failed submit, a confirmation on success,
  a "Draft saved" note, the result counter and the empty state all tell the visitor what
  happened and what to do next.

Also included from the first version: light and dark mode, responsive layout, mobile menu,
typed hero tagline, image viewer for the covers.

## Project structure

```
assignment-2/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── data.js           project content and filter list
│   └── script.js         behaviour
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
# inside the assignment-2 folder, pick one
npx serve .
python -m http.server 8000
```

Then open `http://localhost:3000` or `http://localhost:8000`. The site works offline.

## AI use

I used Claude as an assistant for this assignment, mainly to work out how to combine the
filter and the search into one function, to learn how the `<dialog>` element behaves, and to
review the form for accessibility. Everything was tested and edited before it stayed in the
code. See [docs/ai-usage-report.md](docs/ai-usage-report.md).

## Technical notes

See [docs/technical-documentation.md](docs/technical-documentation.md).
