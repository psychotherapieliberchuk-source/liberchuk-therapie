/* Mobiles Navigationsmenü – aufklappbar, ohne Framework.
   Erwartet einen Button .nav-toggle mit aria-controls="mainnav"
   und ein <nav id="mainnav" class="mainnav">. */
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("mainnav");
  if (!toggle || !nav) return;

  var labelOpen = toggle.getAttribute("data-label-open") || "Menü öffnen";
  var labelClose = toggle.getAttribute("data-label-close") || "Menü schließen";

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? labelClose : labelOpen);
  }

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Nach Klick auf einen Menüpunkt wieder schließen.
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });

  // Escape schließt und gibt den Fokus zurück auf den Button.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // Klick außerhalb schließt.
  document.addEventListener("click", function (e) {
    if (
      toggle.getAttribute("aria-expanded") === "true" &&
      !nav.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      setOpen(false);
    }
  });

  // Beim Wechsel auf Desktop-Breite den offenen Zustand zurücksetzen.
  var wide = window.matchMedia("(min-width: 901px)");
  var onChange = function () {
    if (wide.matches) setOpen(false);
  };
  if (wide.addEventListener) wide.addEventListener("change", onChange);
  else if (wide.addListener) wide.addListener(onChange);
})();
