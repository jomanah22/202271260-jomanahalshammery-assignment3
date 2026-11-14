/* ==========================================================================
   Jomanah Alshammary — portfolio scripts (Assignment 3)
   1. State (remembered in localStorage)
   2. Theme toggle
   3. Mobile navigation
   4. Projects: filter + sort + search, notes popup
   6. Live weather and local time (Open-Meteo)
   7. Contact form: topic-aware, multi-step validation, saved draft
   8. Scroll reveal
   9. Footer year
   10. Project image viewer (lightbox)
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;

  /* ------------------------------------------------------------------
     1. State
     Everything the page remembers between visits lives in one object
     and one localStorage key. Reading and writing go through these two
     helpers so the rest of the code never touches storage directly.
     (The theme keeps its own key because the inline <head> script reads
     it before this file loads; the form draft has its own key too.)
     ------------------------------------------------------------------ */
  var STATE_KEY = 'portfolio-state';
  var defaults = { filter: 'All', sort: 'course', logOpen: false };
  var state = loadState();

  function loadState() {
    try {
      var saved = JSON.parse(localStorage.getItem(STATE_KEY) || '{}');
      return Object.assign({}, defaults, saved);
    } catch (error) {
      return Object.assign({}, defaults);
    }
  }

  function setState(patch) {
    Object.assign(state, patch);
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (error) {
      /* Storage can be unavailable (private mode, quota). The page still
         works; it just won't remember choices. */
    }
  }

  /* Small cache for API responses so a reload doesn't refetch immediately */
  function cacheGet(key) {
    try {
      var entry = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (entry && Date.now() - entry.time < CONFIG.cacheMinutes * 60 * 1000) {
        return entry.data;
      }
    } catch (error) { /* ignore */ }
    return null;
  }

  function cacheSet(key, data) {
    try {
      sessionStorage.setItem(key, JSON.stringify({ time: Date.now(), data: data }));
    } catch (error) { /* ignore */ }
  }

  /* fetch() with a timeout so a hanging request can't leave "Loading…"
     on screen forever */
  function fetchJson(url, timeoutMs) {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, timeoutMs || 8000);
    return fetch(url, { signal: controller.signal })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('HTTP ' + response.status);
        }
        return response.json();
      })
      .finally(function () { clearTimeout(timer); });
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ------------------------------------------------------------------
     2. Theme toggle
     ------------------------------------------------------------------ */
  var themeToggle = document.getElementById('theme-toggle');

  function currentTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) {
      return explicit;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }

  themeToggle.addEventListener('click', function () {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  themeToggle.setAttribute(
    'aria-label',
    currentTheme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
  );

  /* ------------------------------------------------------------------
     3. Mobile navigation
     ------------------------------------------------------------------ */
  var menuToggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  menuToggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('is-open'));
  });

  nav.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      setMenu(false);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  /* ------------------------------------------------------------------
     4. Projects
     Filter (chip) → search (text) → sort (select), in that order.
     Filter and sort are remembered in state; the search box is not,
     because a remembered search is confusing on the next visit.
     ------------------------------------------------------------------ */
  var projectList = document.getElementById('project-list');
  var filterBar = document.getElementById('project-filters');
  var sortSelect = document.getElementById('project-sort');
  var searchInput = document.getElementById('project-search');
  var emptyState = document.getElementById('project-empty');
  var resultCount = document.getElementById('project-count');
  var clearButton = document.getElementById('project-clear');
  var query = '';

  // Guard against a remembered filter/sort that no longer exists in data
  if (['All'].concat(PROJECT_FILTERS).indexOf(state.filter) === -1) {
    setState({ filter: 'All' });
  }
  if (!PROJECT_SORTS.some(function (s) { return s.id === state.sort; })) {
    setState({ sort: 'course' });
  }

  ['All'].concat(PROJECT_FILTERS).forEach(function (name) {
    var chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.textContent = name;
    chip.dataset.filter = name;
    filterBar.appendChild(chip);
  });

  PROJECT_SORTS.forEach(function (sort) {
    var option = document.createElement('option');
    option.value = sort.id;
    option.textContent = sort.label;
    sortSelect.appendChild(option);
  });

  function syncControls() {
    Array.prototype.forEach.call(filterBar.children, function (chip) {
      var active = chip.dataset.filter === state.filter;
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', String(active));
    });
    sortSelect.value = state.sort;
  }

  function projectTemplate(project) {
    var tags = project.tags.map(function (tag) {
      return '<li>' + escapeHtml(tag) + '</li>';
    }).join('');

    return (
      '<article class="card project-card" data-id="' + project.id + '">' +
        '<button type="button" class="project-media" aria-label="View ' + escapeHtml(project.title) + ' full size">' +
          '<img src="' + project.image + '" alt="" width="1200" height="750" loading="lazy">' +
        '</button>' +
        '<div class="project-body">' +
          '<span class="badge' + (project.kind === 'Project' ? ' badge-accent' : '') + '">' + escapeHtml(project.kind) + '</span>' +
          '<h3>' + escapeHtml(project.title) + '</h3>' +
          '<p class="project-summary">' + escapeHtml(project.summary) + '</p>' +
          '<ul class="tags">' + tags + '</ul>' +
          '<button type="button" class="details-toggle" data-notes="' + project.id + '">' +
            '<span>Process &amp; notes</span>' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>' +
          '</button>' +
        '</div>' +
      '</article>'
    );
  }

  function visibleProjects() {
    var sort = PROJECT_SORTS.filter(function (s) { return s.id === state.sort; })[0];

    return PROJECTS
      .filter(function (project) {
        // Step 1: chip filter
        if (state.filter !== 'All' && project.tags.indexOf(state.filter) === -1) {
          return false;
        }
        // Step 2: free-text search across the visible fields
        if (!query) {
          return true;
        }
        var haystack = [project.title, project.summary, project.kind].concat(project.tags).join(' ').toLowerCase();
        return haystack.indexOf(query) !== -1;
      })
      .slice() // copy before sorting so PROJECTS itself keeps course order
      .sort(sort.compare); // Step 3: order the survivors
  }

  function renderProjects() {
    var visible = visibleProjects();
    projectList.innerHTML = visible.map(projectTemplate).join('');

    var narrowed = query || state.filter !== 'All';
    emptyState.hidden = visible.length !== 0;
    clearButton.hidden = !narrowed;
    resultCount.textContent = narrowed
      ? 'Showing ' + visible.length + ' of ' + PROJECTS.length
      : PROJECTS.length + ' pieces of work';

    // Stagger the entrance so the change is easy to follow
    Array.prototype.forEach.call(projectList.children, function (item, index) {
      item.style.animationDelay = (index * 60) + 'ms';
    });
  }

  filterBar.addEventListener('click', function (event) {
    var chip = event.target.closest('.chip');
    if (chip) {
      setState({ filter: chip.dataset.filter });
      syncControls();
      renderProjects();
    }
  });

  sortSelect.addEventListener('change', function () {
    setState({ sort: sortSelect.value });
    renderProjects();
  });

  searchInput.addEventListener('input', function () {
    query = searchInput.value.trim().toLowerCase();
    renderProjects();
  });

  function resetProjectControls() {
    query = '';
    searchInput.value = '';
    setState({ filter: 'All' });
    syncControls();
    renderProjects();
  }

  clearButton.addEventListener('click', resetProjectControls);
  document.getElementById('project-empty-reset').addEventListener('click', resetProjectControls);

  // Expand / collapse (event delegation, so it survives re-rendering)
  /* "Process & notes" opens a popup with the full write-up for that card.
     showModal() supplies the backdrop, focus trap and Escape; we add the
     content, a click-outside close and focus return. */
  var notesDialog = document.getElementById('notes-dialog');
  var notesOpener = null;

  function openNotes(project, trigger) {
    notesOpener = trigger || null;
    document.getElementById('notes-kind').textContent = project.kind;
    document.getElementById('notes-title').textContent = project.title;
    document.getElementById('notes-summary').textContent = project.summary;
    document.getElementById('notes-process').textContent = project.process;
    document.getElementById('notes-learning').textContent = project.learning;
    document.getElementById('notes-tags').innerHTML = project.tags.map(function (tag) {
      return '<li>' + escapeHtml(tag) + '</li>';
    }).join('');
    notesDialog.querySelector('.notes-inner').scrollTop = 0;
    notesDialog.showModal();
    document.body.classList.add('has-notes');
  }

  projectList.addEventListener('click', function (event) {
    var toggle = event.target.closest('.details-toggle');
    if (!toggle) {
      return;
    }
    var project = PROJECTS.filter(function (item) { return item.id === toggle.dataset.notes; })[0];
    if (project) {
      openNotes(project, toggle);
    }
  });

  document.getElementById('notes-close').addEventListener('click', function () { notesDialog.close(); });
  notesDialog.addEventListener('click', function (event) {
    if (event.target === notesDialog) {
      notesDialog.close();
    }
  });
  notesDialog.addEventListener('close', function () {
    document.body.classList.remove('has-notes');
    if (notesOpener && document.body.contains(notesOpener)) {
      notesOpener.focus();
    }
  });

  syncControls();
  renderProjects();

  /* ------------------------------------------------------------------
     6. Live weather and local time
     One line in the Contact section: "It's 3:15 PM in Khobar, 38° and
     clear." The clock ticks every minute; the weather comes from
     Open-Meteo and is cached for a few minutes.
     ------------------------------------------------------------------ */
  var nowLine = document.getElementById('now-line');
  var loc = CONFIG.location;

  // WMO weather interpretation codes → short descriptions
  function describeWeather(code, isDay) {
    if (code === 0) { return isDay ? 'clear skies' : 'a clear night'; }
    if (code === 1) { return 'mostly clear'; }
    if (code === 2) { return 'partly cloudy'; }
    if (code === 3) { return 'overcast'; }
    if (code === 45 || code === 48) { return 'foggy'; }
    if (code >= 51 && code <= 57) { return 'drizzle'; }
    if (code >= 61 && code <= 67) { return 'rain'; }
    if (code >= 71 && code <= 77) { return 'snow'; }
    if (code >= 80 && code <= 82) { return 'showers'; }
    if (code >= 95) { return 'thunderstorms'; }
    return 'changeable weather';
  }

  function localTime() {
    return new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit', timeZone: loc.timezone }).format(new Date());
  }

  var weatherText = null; // null = not loaded yet, '' = failed

  function renderNow() {
    var text = 'It’s ' + localTime() + ' in ' + loc.name;
    if (weatherText === null) {
      text += ' — checking the weather…';
    } else if (weatherText) {
      text += ', ' + weatherText + '.';
    } else {
      text += '. (Weather is unavailable right now.)';
    }
    nowLine.textContent = text;
  }

  function loadWeather() {
    var cached = cacheGet('weather');
    if (cached) {
      weatherText = cached;
      renderNow();
      return;
    }
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + loc.latitude + '&longitude=' + loc.longitude +
      '&current=temperature_2m,weather_code,is_day&timezone=' + encodeURIComponent(loc.timezone);

    fetchJson(url)
      .then(function (data) {
        var c = data.current;
        weatherText = Math.round(c.temperature_2m) + '° and ' + describeWeather(c.weather_code, c.is_day === 1);
        cacheSet('weather', weatherText);
      })
      .catch(function () {
        weatherText = '';
      })
      .then(renderNow);
  }

  renderNow();
  loadWeather();
  setInterval(renderNow, 60 * 1000);


  /* ------------------------------------------------------------------
     7. Contact form
     Step 1: every field has a value.  Step 2: values have the right
     shape (email format, message length).  Only when both steps pass is
     the message accepted. The topic changes the hint under the message
     box and the confirmation text. A draft is kept in localStorage.
     ------------------------------------------------------------------ */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  var draftNote = document.getElementById('form-draft');
  var messageHint = document.getElementById('message-hint');
  var DRAFT_KEY = 'contact-draft';
  var fields = ['name', 'email', 'topic', 'message'];

  var TOPICS = {
    collaboration: {
      hint: 'Tell me a little about the project and what kind of help you’re after.',
      reply: 'I’d love to hear more about the collaboration.'
    },
    internship: {
      hint: 'A sentence about the role and the timeframe is plenty to start.',
      reply: 'I’ll get back to you about the opportunity.'
    },
    feedback: {
      hint: 'Mention which piece of work you’re responding to.',
      reply: 'Thank you for taking the time to share feedback.'
    },
    other: {
      hint: 'Anything goes.',
      reply: 'I’ll reply as soon as I can.'
    }
  };

  function updateTopicHint() {
    var topic = TOPICS[form.elements.topic.value];
    messageHint.textContent = topic ? topic.hint : 'Pick a topic above and I’ll suggest what to include.';
  }
  form.elements.topic.addEventListener('change', updateTopicHint);

  function setFieldError(name, message) {
    var input = form.elements[name];
    var error = document.getElementById(name + '-error');
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    input.closest('.field').classList.toggle('has-error', Boolean(message));
    error.textContent = message;
  }

  var REQUIRED_MESSAGES = {
    name: 'Please tell me your name.',
    email: 'Please add your email so I can reply.',
    topic: 'Please choose what this is about.',
    message: 'Please write a short message.'
  };

  function validateField(name) {
    var value = form.elements[name].value.trim();

    // Step 1: presence
    if (!value) {
      setFieldError(name, REQUIRED_MESSAGES[name]);
      return false;
    }
    // Step 2: shape
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setFieldError(name, 'That doesn’t look like a complete email address.');
      return false;
    }
    if (name === 'message' && value.length < 10) {
      setFieldError(name, 'A little more detail helps — at least 10 characters.');
      return false;
    }
    setFieldError(name, '');
    return true;
  }

  // Validate a field as soon as the visitor leaves it
  fields.forEach(function (name) {
    form.elements[name].addEventListener('blur', function () {
      if (form.elements[name].value.trim()) {
        validateField(name);
      }
    });
  });

  // Draft handling
  function saveDraft() {
    var draft = {};
    fields.forEach(function (name) {
      draft[name] = form.elements[name].value;
    });
    var hasContent = fields.some(function (name) {
      return draft[name].trim();
    });
    try {
      if (hasContent) {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        draftNote.textContent = 'Draft saved on this device.';
      } else {
        localStorage.removeItem(DRAFT_KEY);
        draftNote.textContent = '';
      }
    } catch (error) {
      draftNote.textContent = 'Couldn’t save a draft in this browser.';
    }
  }

  function restoreDraft() {
    try {
      var saved = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
      if (!saved) {
        return;
      }
      fields.forEach(function (name) {
        form.elements[name].value = saved[name] || '';
      });
      draftNote.textContent = 'Restored your unsent draft.';
    } catch (error) {
      localStorage.removeItem(DRAFT_KEY);
    }
  }

  var draftTimer;
  form.addEventListener('input', function () {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(saveDraft, 400);
  });

  restoreDraft();
  updateTopicHint();

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var allValid = fields.map(validateField).every(Boolean);
    status.className = 'form-status';

    if (!allValid) {
      status.textContent = 'Please fix the highlighted fields and try again.';
      status.classList.add('is-error', 'is-shown');
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    var name = form.elements.name.value.trim();
    var topic = TOPICS[form.elements.topic.value];

    status.textContent = 'Thanks, ' + name + '. ' + topic.reply + ' Your message has been noted.';
    status.classList.add('is-success', 'is-shown');

    form.reset();
    fields.forEach(function (field) {
      setFieldError(field, '');
    });
    localStorage.removeItem(DRAFT_KEY);
    draftNote.textContent = '';
    updateTopicHint();
  });

  /* ------------------------------------------------------------------
     8. Scroll reveal
     ------------------------------------------------------------------ */
  var revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        // Also show anything already scrolled past (e.g. after a reload
        // that restores the scroll position), otherwise it would stay hidden
        if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });

    // Safety net for jumps (anchor links, restored scroll position): anything
    // already above the fold is shown without waiting for the observer
    window.addEventListener('scroll', function () {
      revealItems.forEach(function (item) {
        if (!item.classList.contains('is-visible') && item.getBoundingClientRect().top < window.innerHeight) {
          item.classList.add('is-visible');
        }
      });
    }, { passive: true });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  /* ------------------------------------------------------------------
     9. Footer year
     ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------
     Typing effect for the hero title
     ------------------------------------------------------------------ */
  var heroTitle = document.getElementById('hero-title');
  if (heroTitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var fullText = heroTitle.textContent.trim();
    var typed = 0;
    heroTitle.setAttribute('aria-label', fullText);
    heroTitle.textContent = '';
    heroTitle.classList.add('is-typing');
    setTimeout(function typeNext() {
      typed += 1;
      heroTitle.textContent = fullText.slice(0, typed);
      if (typed < fullText.length) {
        setTimeout(typeNext, 80);
      }
    }, 400);
  }

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     10. Project image viewer
     Each project cover is a button. Clicking it shows that picture full
     size in a native <dialog>: showModal() gives the backdrop, the focus
     trap and Escape to close. On top of that we add the caption, previous
     / next (buttons and the arrow keys), a click outside the picture to
     close, and returning focus to the cover that opened the viewer.
     The covers are read from the page each time it opens, so previous /
     next follow whatever the filter, sort and search are showing.
     ------------------------------------------------------------------ */
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightbox-image');
  var lightboxTitle = document.getElementById('lightbox-title');
  var lightboxPosition = document.getElementById('lightbox-position');
  var lightboxPrev = document.getElementById('lightbox-prev');
  var lightboxNext = document.getElementById('lightbox-next');
  var covers = [];
  var coverIndex = 0;
  var openedFrom = null;

  function coverTitle(button) {
    var card = button.closest('.project-card');
    var heading = card ? card.querySelector('h3') : null;
    return heading ? heading.textContent.trim() : '';
  }

  function showCover(index) {
    if (!covers.length) {
      return;
    }
    // Wrap around, so the arrows never dead-end
    coverIndex = (index + covers.length) % covers.length;

    var button = covers[coverIndex];
    var image = button.querySelector('img');
    var title = coverTitle(button);

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = title ? 'Cover image for ' + title : '';
    lightboxTitle.textContent = title;
    lightboxPosition.textContent = (coverIndex + 1) + ' of ' + covers.length;

    // One picture on its own needs no navigation
    var single = covers.length < 2;
    lightboxPrev.hidden = single;
    lightboxNext.hidden = single;
  }

  function openLightbox(button) {
    covers = Array.prototype.slice.call(projectList.querySelectorAll('.project-media'));
    var index = covers.indexOf(button);
    if (index === -1) {
      return;
    }
    openedFrom = button;
    showCover(index);
    if (!lightbox.open) {
      lightbox.showModal();
      document.body.classList.add('has-lightbox');
    }
  }

  projectList.addEventListener('click', function (event) {
    var button = event.target.closest('.project-media');
    if (button) {
      openLightbox(button);
    }
  });

  document.getElementById('lightbox-close').addEventListener('click', function () {
    lightbox.close();
  });
  lightboxPrev.addEventListener('click', function () { showCover(coverIndex - 1); });
  lightboxNext.addEventListener('click', function () { showCover(coverIndex + 1); });

  // Anything outside the picture itself is backdrop, so a click there closes
  lightbox.addEventListener('click', function (event) {
    var target = event.target;
    if (
      target === lightbox ||
      target.classList.contains('lightbox-inner') ||
      target.classList.contains('lightbox-figure')
    ) {
      lightbox.close();
    }
  });

  lightbox.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      showCover(coverIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      showCover(coverIndex + 1);
    }
  });

  lightbox.addEventListener('close', function () {
    document.body.classList.remove('has-lightbox');
    // The card may have been re-rendered by a filter while the viewer was open
    if (openedFrom && document.body.contains(openedFrom)) {
      openedFrom.focus();
    }
    openedFrom = null;
  });
})();
