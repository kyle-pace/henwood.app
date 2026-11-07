// Display settings (see display.css). Saved in this browser only, applied before paint
// by the small inline script in each page's head.
(function () {
  var KEY = "henwood.display";
  var root = document.documentElement;
  var panel = document.getElementById("display-panel");
  if (!panel) return;
  var form = panel.querySelector("form");
  var defaults = {};
  Array.prototype.forEach.call(form.querySelectorAll("fieldset"), function (fs) {
    var first = fs.querySelector("input");
    if (first) defaults[first.name] = first.value;
  });
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; } }
  function save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  function apply(values) {
    Object.keys(defaults).forEach(function (key) {
      if (values[key]) root.setAttribute("data-" + key, values[key]);
      else root.removeAttribute("data-" + key);
      var input = form.querySelector('input[name="' + key + '"][value="' + (values[key] || defaults[key]) + '"]');
      if (input) input.checked = true;
    });
    // Keep the browser's toolbar color in step with a forced theme.
    var ground = getComputedStyle(root).getPropertyValue("--ground").trim();
    Array.prototype.forEach.call(document.querySelectorAll('meta[name="theme-color"]'), function (m) {
      if (!m.dataset.content) m.dataset.content = m.content;
      m.content = values.theme && ground ? ground : m.dataset.content;
    });
  }
  apply(load());
  form.addEventListener("change", function (e) {
    var input = e.target, values = load();
    if (input.value === defaults[input.name]) delete values[input.name];
    else values[input.name] = input.value;
    save(values);
    apply(values);
  });
  panel.querySelector(".dp-reset").addEventListener("click", function () { save({}); apply({}); });
  panel.addEventListener("toggle", function (e) {
    if (e.newState === "open") { var c = panel.querySelector("input:checked"); if (c) c.focus(); }
  });
})();
