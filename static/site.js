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
