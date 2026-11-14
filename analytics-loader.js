// Loads Amplitude (/analytics.js, built from tools/analytics/) only when it should run:
// on the live site, and not for a browser that sends Global Privacy Control or Do Not
// Track, or where it was turned off on the Privacy page. Everyone else never downloads it.
(function () {
  function off() {
    try { if (localStorage.getItem("henwood.analyticsOff") === "true") return true; } catch (e) {}
    return navigator.globalPrivacyControl === true || navigator.doNotTrack === "1";
  }
  if (location.hostname === "henwood.app" && !off()) import("/analytics.js");

  // The switch on the Privacy page.
  var btn = document.querySelector("[data-analytics-toggle]");
  var state = document.querySelector("[data-analytics-state]");
  if (!btn) return;
  function saved() { try { return localStorage.getItem("henwood.analyticsOff") === "true"; } catch (e) { return false; } }
  function show() {
    var signal = navigator.globalPrivacyControl === true || navigator.doNotTrack === "1";
    btn.textContent = saved() ? "Turn analytics back on in this browser" : "Turn off analytics in this browser";
    btn.setAttribute("aria-pressed", saved() ? "true" : "false");
    if (state) state.textContent = saved() ? "Analytics is off in this browser." : signal ? "Analytics is already off: your browser asked not to be tracked." : "";
  }
  btn.addEventListener("click", function () {
    try { localStorage.setItem("henwood.analyticsOff", saved() ? "false" : "true"); } catch (e) {}
    show();
  });
  show();
})();
