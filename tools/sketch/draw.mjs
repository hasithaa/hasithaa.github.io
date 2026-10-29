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

const arrow = (x1, x2, y) =>
  shape((o) => gen.path(`M${x1} ${y} Q${(x1 + x2) / 2} ${y - 7} ${x2} ${y} M${x2 - 10} ${y - 7} L${x2} ${y} L${x2 - 9} ${y + 7}`, o));

function render(name, width, height, items, labels) {
  let i = 0;
  const groups = items.map((it) => {
    const n = i++;
    const out = `<g class="ink" style="--i:${n}">${it.outline.map((d) => `<path pathLength="1" d="${d}"/>`).join("")}</g>`;
    const fill = it.fill.length
      ? `<g class="wash ${it.color}" style="--i:${n + 0.6}">${it.fill.map((d) => `<path pathLength="1" d="${d}"/>`).join("")}</g>`
      : "";
    return fill + out;
  });
  const text = labels.map(([t, x, y, n]) => `<text x="${x}" y="${y}" style="--i:${n}">${t}</text>`);
  const svg = `<svg class="sketch" viewBox="0 0 ${width} ${height}" role="img" aria-label="An event starts a workflow; an agent checks, a decision, a person approves, done.">${groups.join("")}${text.join("")}</svg>\n`;
  writeFileSync(new URL(`../../art/${name}.svg`, import.meta.url), svg);
  console.log(`art/${name}.svg: ${svg.length} bytes`);
}

// Home: event → workflow → agent → decision → human → done.
render("home", 730, 170, [
  shape((o) => gen.rectangle(20, 50, 72, 50, o), "orange"),
  shape((o) => gen.linearPath([[22, 53], [56, 78], [90, 53]], o)),
  arrow(102, 150, 76),
  shape((o) => gen.path("M172 44 H264 Q278 44 278 58 V94 Q278 108 264 108 H172 Q158 108 158 94 V58 Q158 44 172 44 Z", o), "teal"),
  arrow(288, 332, 76),
  shape((o) => gen.rectangle(342, 50, 58, 50, o), "violet"),
  shape((o) => gen.path("M371 50 L371 38 M357 88 Q371 94 385 88", o)),
  shape((o) => gen.circle(371, 32, 11, o)),
  shape((o) => gen.circle(359, 70, 9, o)),
  shape((o) => gen.circle(383, 70, 9, o)),
  arrow(410, 448, 76),
  shape((o) => gen.polygon([[486, 38], [524, 76], [486, 114], [448, 76]], o), "amber"),
  arrow(532, 572, 76),
  shape((o) => gen.circle(596, 50, 22, o), "blue"),
  shape((o) => gen.path("M596 61 L596 96 M578 84 L596 74 L614 62 M582 122 L596 96 L610 122", o)),
  arrow(626, 664, 76),
  shape((o) => gen.circle(694, 76, 44, o), "green"),
  shape((o) => gen.linearPath([[681, 77], [690, 88], [707, 64]], { ...o, strokeWidth: 2.4 })),
], [
  ["event", 56, 140, 1],
  ["workflow", 218, 83, 3.5],
  ["agent", 371, 140, 9],
  ["?", 486, 85, 11.5],
  ["decision", 486, 148, 11.5],
  ["human", 596, 150, 14],
  ["done", 694, 140, 17],
]);
