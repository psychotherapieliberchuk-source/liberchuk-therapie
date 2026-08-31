/* Ruhiges Einblenden beim Scrollen. Ohne JS oder bei "reduzierte Bewegung"
   bleibt alles sofort sichtbar (keine .reveal-Klasse wird gesetzt). */
(function () {
  "use strict";

  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var selector = [
    ".hero .container > div",
    ".reassure p",
    ".usp-strip .usp",
    ".section-head",
    ".sp-card",
    ".flag-card",
    ".about-teaser .container > div",
    ".reviews .container",
    ".kontakt .container > div"
  ].join(",");

  var els = Array.prototype.slice.call(document.querySelectorAll(selector));
  if (!els.length) return;

  els.forEach(function (el) { el.classList.add("reveal"); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      // kleine Staffelung innerhalb einer Gruppe
      var sibs = el.parentElement ? Array.prototype.slice.call(el.parentElement.children).filter(function (c) { return c.classList.contains("reveal"); }) : [el];
      var i = Math.max(0, sibs.indexOf(el));
      el.style.transitionDelay = Math.min(i * 70, 280) + "ms";
      el.classList.add("is-visible");
      io.unobserve(el);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

  els.forEach(function (el) { io.observe(el); });
})();
