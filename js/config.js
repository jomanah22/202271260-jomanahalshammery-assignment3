/* ==========================================================================
   Site configuration (Assignment 3)
   Values that are specific to me and may change. Nothing here is secret;
   the weather API used by the site is public and needs no key.
   ========================================================================== */

/* eslint-disable no-unused-vars */
var CONFIG = {
  /* Location used for the live weather / local time line in the
     Contact section (Open-Meteo, no key required). */
  location: {
    name: 'Khobar',
    latitude: 26.2172,
    longitude: 50.1971,
    timezone: 'Asia/Riyadh'
  },

  /* API responses are kept in sessionStorage for this long so reloading
     the page doesn't hit the services again straight away. */
  cacheMinutes: 10
};
