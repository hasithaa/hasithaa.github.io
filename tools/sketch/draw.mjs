// Hand-drawn (Excalidraw-style) diagrams for the site, drawn with rough.js and written to art/.
// Every stroke becomes its own path so CSS can draw it in; --i orders the shapes.
import rough from "roughjs";
import { writeFileSync } from "node:fs";

const gen = rough.generator();
const base = { roughness: 1.1, bowing: 1.2, strokeWidth: 1.6, seed: 7 };
const hachure = { fillStyle: "hachure", hachureGap: 7, fillWeight: 1.2 };

const round = (d) => d.trim().replace(/-?\d+\.\d+/g, (n) => String(Number(Number(n).toFixed(1))));

function strokes(drawable) {
  return gen.toPaths(drawable)
    .filter((p) => p.stroke !== "none")
    .flatMap((p) => p.d.split(/(?=M)/).map(round).filter(Boolean));
}

// A shape: outline in ink, optional hachure fill in a colour.
function shape(make, color) {
  const outline = strokes(make({ ...base, stroke: "ink" }));
  const fill = color ? strokes(make({ ...base, ...hachure, stroke: "none", fill: "fill" })) : [];
  return { outline, fill, color };
}

const arrow = (x1, x2, y, both = false) =>
  shape((o) => gen.path(
    `M${x1} ${y} L${x2} ${y} M${x2 - 8} ${y - 6} L${x2} ${y} L${x2 - 8} ${y + 6}` + (both ? ` M${x1 + 8} ${y - 6} L${x1} ${y} L${x1 + 8} ${y + 6}` : ""),
    o,
  ));

// Each area is a link with its own sketch and label; --i orders the strokes across the whole picture.
function render(name, width, height, label, areas) {
  let i = 0;
  const parts = areas.map((area) => {
    const groups = area.items.map((it) => {
      const n = i++;
      const ink = `<g class="ink" style="--i:${n}">${it.outline.map((d) => `<path pathLength="1" d="${d}"/>`).join("")}</g>`;
      const wash = it.fill.length
        ? `<g class="wash ${it.color}" style="--i:${n + 0.6}">${it.fill.map((d) => `<path pathLength="1" d="${d}"/>`).join("")}</g>`
        : "";
      return wash + ink;
    });
    const text = area.labels.map(([t, x, y, size]) =>
      `<text x="${x}" y="${y}" style="--i:${i}${size ? `;font-size:${size}px` : ""}">${t}</text>`);
    i += 0.5;
    return `<a href="${area.href}"><title>${area.title}</title>${groups.join("")}${text.join("")}</a>`;
  });
  const svg = `<svg class="sketch" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">${parts.join("")}</svg>\n`;
  writeFileSync(new URL(`../../art/${name}.svg`, import.meta.url), svg);
  console.log(`art/${name}.svg: ${svg.length} bytes`);
}

// Home: the areas I work in, each linked to its portfolio entry.
render("home", 730, 172, "Areas I work in: programming languages and compilers, integration, durable workflows and AI agents.", [
  {
    href: "/projects/#ballerina-compiler",
    title: "Programming languages and compilers",
    items: [
      shape((o) => gen.path("M95 47 L62 63 M95 47 L128 63 M62 81 L45 97 M62 81 L79 97 M128 81 L128 97", o)),
      shape((o) => gen.circle(95, 36, 22, o), "blue"),
      shape((o) => gen.circle(62, 72, 18, o)),
      shape((o) => gen.circle(128, 72, 18, o)),
      shape((o) => gen.circle(45, 104, 14, o), "blue"),
      shape((o) => gen.circle(79, 104, 14, o), "blue"),
      shape((o) => gen.circle(128, 104, 14, o), "blue"),
    ],
    labels: [["languages", 95, 140], ["& compilers", 95, 162]],
  },
  {
    href: "/projects/#wso2-integrator",
    title: "Integration",
    items: [
      shape((o) => gen.rectangle(212, 50, 56, 44, o), "orange"),
      arrow(274, 296, 72, true),
      shape((o) => gen.path("M302 52 L302 92 Q324 104 346 92 L346 52 Q324 40 302 52 Z M302 52 Q324 64 346 52", o), "amber"),
    ],
    labels: [["API", 240, 77, 15], ["integration", 280, 140]],
  },
  {
    href: "/projects/#durable-workflow",
    title: "Durable workflows",
    items: [
      shape((o) => gen.circle(392, 72, 24, o), "orange"),
      arrow(407, 424, 72),
      shape((o) => gen.path("M434 54 H470 Q478 54 478 62 V82 Q478 90 470 90 H434 Q426 90 426 82 V62 Q426 54 434 54 Z", o), "teal"),
      arrow(482, 497, 72),
      shape((o) => gen.circle(512, 50, 18, o), "teal"),
      shape((o) => gen.path("M512 59 L512 88 M500 72 L524 72 M503 104 L512 88 L521 104", o)),
    ],
    labels: [["durable", 455, 140], ["workflows", 455, 162]],
  },
  {
    href: "/projects/#afm",
    title: "AI agents (Agent-Flavored Markdown)",
    items: [
      shape((o) => gen.rectangle(578, 32, 46, 64, o)),
      shape((o) => gen.path("M587 64 L615 64 M587 76 L609 76 M587 88 L613 88", o)),
      arrow(630, 646, 66),
      shape((o) => gen.rectangle(652, 46, 50, 42, o), "violet"),
      shape((o) => gen.path("M677 46 L677 37 M666 78 Q677 84 688 78", o)),
      shape((o) => gen.circle(677, 33, 9, o)),
      shape((o) => gen.circle(668, 62, 8, o)),
      shape((o) => gen.circle(686, 62, 8, o)),
    ],
    labels: [["#", 594, 53, 15], ["AI agents", 640, 140]],
  },
]);
