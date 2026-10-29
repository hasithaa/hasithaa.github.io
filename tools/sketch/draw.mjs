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

function strokesSvg(items, start) {
  let i = start;
  const out = items.map((it) => {
    const n = i++;
    const ink = `<g class="ink" style="--i:${n}">${it.outline.map((d) => `<path pathLength="1" d="${d}"/>`).join("")}</g>`;
    const wash = it.fill.length
      ? `<g class="wash ${it.color}" style="--i:${n + 0.6}">${it.fill.map((d) => `<path pathLength="1" d="${d}"/>`).join("")}</g>`
      : "";
    return wash + ink;
  });
  return { svg: out.join(""), next: i };
}

function write(name, svg) {
  writeFileSync(new URL(`../../art/${name}.svg`, import.meta.url), svg + "\n");
  console.log(`art/${name}.svg: ${svg.length} bytes`);
}

// Each area is drawn in its own 180 x 120 box: one sketch per portfolio entry, and all of them in a row on Home.
const W = 180;
const areas = [
  {
    id: "compiler",
    href: "/projects/#ballerina-compiler",
    title: "Programming languages and compilers",
    labels: ["languages", "& compilers"],
    items: () => [
      shape((o) => gen.path("M90 47 L57 63 M90 47 L123 63 M57 81 L40 97 M57 81 L74 97 M123 81 L123 97", o)),
      shape((o) => gen.circle(90, 36, 22, o), "blue"),
      shape((o) => gen.circle(57, 72, 18, o)),
      shape((o) => gen.circle(123, 72, 18, o)),
      shape((o) => gen.circle(40, 104, 14, o), "blue"),
      shape((o) => gen.circle(74, 104, 14, o), "blue"),
      shape((o) => gen.circle(123, 104, 14, o), "blue"),
    ],
  },
  {
    id: "integration",
    href: "/projects/#wso2-integrator",
    title: "Integration",
    labels: ["integration"],
    text: [["API", 50, 77, 15]],
    items: () => [
      shape((o) => gen.rectangle(22, 50, 56, 44, o), "orange"),
      arrow(84, 106, 72, true),
      shape((o) => gen.path("M112 52 L112 92 Q134 104 156 92 L156 52 Q134 40 112 52 Z M112 52 Q134 64 156 52", o), "amber"),
    ],
  },
  {
    id: "workflow",
    href: "/projects/#durable-workflow",
    title: "Durable workflows",
    labels: ["durable", "workflows"],
    items: () => [
      shape((o) => gen.circle(27, 72, 24, o), "orange"),
      arrow(42, 59, 72),
      shape((o) => gen.path("M69 54 H105 Q113 54 113 62 V82 Q113 90 105 90 H69 Q61 90 61 82 V62 Q61 54 69 54 Z", o), "teal"),
      arrow(117, 132, 72),
      shape((o) => gen.circle(147, 50, 18, o), "teal"),
      shape((o) => gen.path("M147 59 L147 88 M135 72 L159 72 M138 104 L147 88 L156 104", o)),
    ],
  },
  {
    id: "agent",
    href: "/projects/#durable-agents",
    title: "Durable agents",
    labels: ["durable", "agents"],
    items: () => [
      shape((o) => gen.rectangle(60, 48, 46, 38, o), "pink"),
      shape((o) => gen.path("M83 48 L83 39 M73 76 Q83 82 93 76", o)),
      shape((o) => gen.circle(83, 35, 9, o)),
      shape((o) => gen.circle(75, 62, 7, o)),
      shape((o) => gen.circle(91, 62, 7, o)),
      shape((o) => gen.path("M43 72 A40 40 0 1 1 64 103 M64 103 L56 95 M64 103 L53 106", o)),
      shape((o) => gen.circle(155, 46, 16, o), "pink"),
      shape((o) => gen.path("M155 54 L155 80 M145 66 L165 66 M148 96 L155 80 L162 96", o)),
      shape((o) => gen.path("M128 6 H170 Q176 6 176 12 V18 Q176 24 170 24 H142 L135 31 L136 24 H128 Q122 24 122 18 V12 Q122 6 128 6 Z", o)),
    ],
    text: [["?", 149, 21, 15]],
  },
  {
    id: "afm",
    href: "/projects/#afm",
    title: "Agent-Flavored Markdown",
    labels: ["agents in", "Markdown"],
    text: [["#", 44, 53, 15]],
    items: () => [
      shape((o) => gen.rectangle(28, 32, 46, 64, o)),
      shape((o) => gen.path("M37 64 L65 64 M37 76 L59 76 M37 88 L63 88", o)),
      arrow(80, 96, 66),
      shape((o) => gen.rectangle(102, 46, 50, 42, o), "violet"),
      shape((o) => gen.path("M127 46 L127 37 M116 78 Q127 84 138 78", o)),
      shape((o) => gen.circle(127, 33, 9, o)),
      shape((o) => gen.circle(118, 62, 8, o)),
      shape((o) => gen.circle(136, 62, 8, o)),
    ],
  },
];
for (const a of areas) a.drawn = a.items();

const textSvg = (t, x, y, n, size) => `<text x="${x}" y="${y}" style="--i:${n}${size ? `;font-size:${size}px` : ""}">${t}</text>`;

// Home: all areas in a row, each a link to its portfolio entry.
{
  let i = 0;
  const parts = areas.map((a, k) => {
    const { svg, next } = strokesSvg(a.drawn, i);
    i = next;
    const inner = (a.text || []).map(([t, x, y, size]) => textSvg(t, x, y, i, size)).join("");
    const labels = a.labels.map((t, j) => textSvg(t, 90, 142 + j * 22, i)).join("");
    i += 0.5;
    return `<a href="${a.href}" transform="translate(${k * W} 0)"><title>${a.title}</title>${svg}${inner}${labels}</a>`;
  });
  write("home", `<svg class="sketch sketch-home" viewBox="0 0 ${W * areas.length} 172" role="img" aria-label="Areas I work in: ${areas.map((a) => a.title).join(", ")}.">${parts.join("")}</svg>`);
}

// Portfolio: one sketch per entry, without labels.
for (const a of areas) {
  const { svg, next } = strokesSvg(a.drawn, 0);
  const inner = (a.text || []).map(([t, x, y, size]) => textSvg(t, x, y, next, size)).join("");
  write(a.id, `<svg class="sketch sketch-side" viewBox="0 0 ${W} 120" aria-hidden="true">${svg}${inner}</svg>`);
}
