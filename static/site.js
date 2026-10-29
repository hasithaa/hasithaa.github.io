// Theme switch: system -> light -> dark. The choice is kept per browser; "system" follows the OS.
const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const order = ["system", "light", "dark"];

function showTheme(theme) {
  toggle.dataset.theme = theme;
  toggle.setAttribute("aria-label", `Theme: ${theme}`);
  toggle.title = `Theme: ${theme}`;
}

showTheme(root.dataset.theme || "system");
toggle.addEventListener("click", () => {
  const next = order[(order.indexOf(toggle.dataset.theme) + 1) % order.length];
  if (next === "system") delete root.dataset.theme;
  else root.dataset.theme = next;
  try {
    if (next === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", next);
  } catch (e) {}
  showTheme(next);
});

// Kind filter on the blog index.
document.querySelectorAll(".filters button").forEach((button) => {
  button.addEventListener("click", () => {
    const kind = button.dataset.filter;
    document.querySelectorAll(".filters button").forEach((b) => b.setAttribute("aria-pressed", b === button));
    document.querySelectorAll(".entry").forEach((e) => {
      e.hidden = kind !== "all" && e.dataset.kind !== kind;
    });
    document.querySelectorAll("h2.year").forEach((h) => {
      h.hidden = ![...h.nextElementSibling.children].some((e) => !e.hidden);
    });
  });
});

// Copy buttons, e.g. the BibTeX entry on the portfolio.
document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = document.getElementById(button.dataset.copy).textContent;
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied";
    } catch (e) {
      button.textContent = "Select and copy";
    }
    setTimeout(() => (button.textContent = "Copy BibTeX"), 2000);
  });
});

// Portfolio sketches draw in once they scroll into view.
const sketches = document.querySelectorAll(".sketch-side");
if ("IntersectionObserver" in window) {
  const seen = new IntersectionObserver((list) => list.forEach((s) => {
    if (s.isIntersecting) { s.target.classList.add("go"); seen.unobserve(s.target); }
  }), { threshold: 0.4 });
  sketches.forEach((s) => seen.observe(s));
} else sketches.forEach((s) => s.classList.add("go"));

// Portfolio backdrop: the last section whose top has passed the middle of the screen picks the scene; CSS does the rest.
const sections = [...document.querySelectorAll("main [data-scene]")];
if (sections.length) {
  let queued = false;
  const pick = () => {
    queued = false;
    const middle = innerHeight * 0.5;
    const current = scrollY < 40 ? sections[0] : sections.filter((s) => s.getBoundingClientRect().top < middle).pop();
    document.body.dataset.scene = (current || sections[0]).dataset.scene;
  };
  addEventListener("scroll", () => queued || (queued = requestAnimationFrame(pick)), { passive: true });
  pick();
}
