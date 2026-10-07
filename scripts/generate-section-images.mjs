/**
 * Generates the lightweight SVG section illustrations in /public/images.
 * They mirror the merchant dashboard's look (teal sidebar, red active item,
 * white rounded cards on a slate canvas) so every section feels like the same product.
 *
 * Run: node scripts/generate-section-images.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "images");
mkdirSync(OUT, { recursive: true });

/* ---------------- Design tokens (from the dashboard reference) ---------------- */
const C = {
  sidebar: "#042F2C",
  red: "#DB1224",
  maroon: "#7f1d2d",
  teal: "#0f6b57",
  tealMid: "#109985",
  tealSoft: "#1db39e",
  tealTint: "#e6f4f1",
  canvas: "#f1f5f9",
  card: "#ffffff",
  border: "#e5e7eb",
  ink: "#111827",
  body: "#374151",
  muted: "#6b7280",
  faint: "#9ca3af",
  amber: "#b8860b",
  amberTint: "#fef3c7",
  redTint: "#fee2e2",
  purple: "#a855f7",
  blue: "#2563eb",
  orange: "#f97316",
  pink: "#ec4899",
};
const FONT = "Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif";

/* ---------------- Primitives ---------------- */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const rect = (x, y, w, h, r, fill, extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
const circle = (cx, cy, r, fill, extra = "") => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra}/>`;
const text = (x, y, s, size, fill = C.ink, weight = 400, anchor = "start") =>
  `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(s)}</text>`;
const card = (x, y, w, h, r = 16) => rect(x, y, w, h, r, C.card, `filter="url(#sh)" stroke="${C.border}"`);
const pill = (x, y, w, h, fill, label, color, size = 14, weight = 600) =>
  rect(x, y, w, h, h / 2, fill) + text(x + w / 2, y + h / 2 + size * 0.36, label, size, color, weight, "middle");
const chevron = (x, y, color = "#ffffffaa") =>
  `<path d="M${x} ${y - 5} l5 5 -5 5" stroke="${color}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
const check = (x, y, color = "#fff", s = 1) =>
  `<path d="M${x - 5 * s} ${y} l${3.5 * s} ${3.5 * s} ${6.5 * s} -${7 * s}" stroke="${color}" stroke-width="${2.2 * s}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const iconBox = (x, y, s, fill) =>
  rect(x, y, s, s, s * 0.28, fill) + rect(x + s * 0.32, y + s * 0.32, s * 0.36, s * 0.36, s * 0.08, "none", `stroke="#fff" stroke-width="2"`);

const svg = (w, h, body, defs = "") => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" font-family="${FONT}">
<defs>
<filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.07"/></filter>
<filter id="shd" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#000" flood-opacity="0.35"/></filter>
<linearGradient id="brand" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.sidebar}"/><stop offset="1" stop-color="${C.tealMid}"/></linearGradient>
${defs}
</defs>
${body}
</svg>`;

/* ---------------- Dashboard chrome ---------------- */
const MENU = ["Dashboard", "Web Orders", "Point Of Sale", "Call Center", "Menu Setup", "Inventory Setup", "Kitchen Display", "Accounts", "Branch Settings"];

function sidebar(h, active) {
  let s = rect(0, 0, 250, h, 0, C.sidebar);
  s += circle(125, 58, 30, "#fff") + text(125, 68, "X", 28, C.red, 800, "middle");
  s += `<text x="125" y="114" font-size="15" fill="#fff" text-anchor="middle">eat<tspan fill="${C.red}" font-weight="700">X</tspan> by Ygen</text>`;
  MENU.forEach((label, i) => {
    const y = 146 + i * 46;
    const on = label === active;
    if (on) s += rect(14, y, 222, 38, 9, C.red);
    s += rect(30, y + 12, 14, 14, 3, "none", `stroke="#fff" stroke-opacity="${on ? 1 : 0.75}" stroke-width="1.8"`);
    s += text(56, y + 25, label, 15, on ? "#fff" : "#ffffffcc", on ? 600 : 400);
    s += chevron(214, y + 19);
  });
  s += rect(14, h - 66, 222, 50, 10, "#ffffff14") + rect(24, h - 56, 30, 30, 8, C.red) + text(39, h - 35, "B", 15, "#fff", 700, "middle");
  s += text(64, h - 44, "eatX by Ygen", 13, "#fff", 600) + text(64, h - 27, "Branch admin", 12, "#ffffff99");
  return s;
}

/** White filter bar at the top of the content area */
function topbar(x, w, chips, primary = "Export") {
  let s = card(x, 20, w, 64);
  let cx = x + 16;
  chips.forEach((c) => {
    const cw = c.length * 8.4 + 52;
    s += rect(cx, 34, cw, 36, 8, "#fff", `stroke="${C.border}"`);
    s += rect(cx + 12, 46, 12, 12, 3, "none", `stroke="${C.teal}" stroke-width="1.8"`);
    s += text(cx + 32, 57, c, 14, C.body);
    cx += cw + 10;
  });
  s += rect(x + w - 236, 34, 104, 36, 8, "#fff", `stroke="${C.border}"`) + text(x + w - 184, 57, "Refresh", 14, C.body, 500, "middle");
  s += rect(x + w - 122, 34, 106, 36, 8, C.teal) + text(x + w - 69, 57, primary, 14, "#fff", 600, "middle");
  return s;
}

/** Stat card, same structure as the dashboard: tinted icon, label, N/A chip, big value */
function stat(x, y, w, label, value, tint, delta) {
  let s = card(x, y, w, 110);
  s += iconBox(x + 18, y + 18, 38, tint) + text(x + 68, y + 43, label, 16, C.body, 500);
  if (delta) s += pill(x + w - 70, y + 24, 54, 24, C.tealTint, delta, C.teal, 12);
  else s += pill(x + w - 56, y + 24, 40, 24, C.canvas, "N/A", C.muted, 11, 500);
  s += text(x + 18, y + 90, value, 24, C.ink, 700);
  return s;
}

function frame(w, h, active, chips, content, primary) {
  return svg(w, h, rect(0, 0, w, h, 0, C.canvas) + sidebar(h, active) + topbar(270, w - 290, chips, primary) + content);
}

/* ---------------- Food tile art (no emoji: renders the same everywhere) ---------------- */
function dish(cx, cy, kind) {
  const plate = circle(cx, cy, 38, "#fff", `stroke="${C.border}" stroke-width="2"`) + circle(cx, cy, 28, "#f8fafc");
  const art = {
    burger: rect(cx - 24, cy - 16, 48, 14, 8, "#d97706") + rect(cx - 26, cy - 2, 52, 6, 3, "#16a34a") + rect(cx - 25, cy + 4, 50, 7, 3, "#7c2d12") + rect(cx - 24, cy + 11, 48, 9, 5, "#f59e0b"),
    karahi: circle(cx, cy, 24, "#b45309") + circle(cx - 8, cy - 5, 6, "#dc2626") + circle(cx + 9, cy + 3, 5, "#ea580c") + circle(cx - 2, cy + 10, 4, "#16a34a"),
    biryani: circle(cx, cy, 24, "#fbbf24") + circle(cx - 9, cy - 6, 5, "#fff7ed") + circle(cx + 8, cy - 3, 5, "#fff7ed") + circle(cx + 2, cy + 9, 7, "#9a3412"),
    drink: rect(cx - 13, cy - 26, 26, 50, 6, "#fca5a5") + rect(cx - 13, cy - 26, 26, 12, 6, "#fff") + rect(cx + 3, cy - 36, 3, 18, 1, C.red),
    fries: rect(cx - 18, cy - 4, 36, 28, 6, C.red) + rect(cx - 14, cy - 24, 5, 24, 2, "#facc15") + rect(cx - 5, cy - 28, 5, 28, 2, "#fde047") + rect(cx + 4, cy - 22, 5, 22, 2, "#facc15"),
    dessert: circle(cx, cy + 4, 20, "#fde68a") + circle(cx, cy - 8, 12, "#f9a8d4") + circle(cx + 2, cy - 18, 4, C.red),
  }[kind];
  return plate + art;
}

const PRODUCTS = [
  ["Zinger Burger", "Rs 750", "burger"], ["Chicken Karahi", "Rs 1,850", "karahi"], ["Chicken Biryani", "Rs 650", "biryani"], ["Mint Margarita", "Rs 380", "drink"],
  ["Loaded Fries", "Rs 520", "fries"], ["Molten Lava Cake", "Rs 690", "dessert"], ["Beef Smash", "Rs 990", "burger"], ["Mutton Karahi", "Rs 2,600", "karahi"],
  ["Sindhi Biryani", "Rs 720", "biryani"], ["Peach Iced Tea", "Rs 350", "drink"], ["Masala Fries", "Rs 450", "fries"], ["Kulfi Falooda", "Rs 480", "dessert"],
];

/* ================================================================
   1) POS — used for action-pos (1600x800) and platform-preview (1600x1000)
   ================================================================ */
function pos(w, h) {
  const x0 = 270;
  const gridW = 860;
  let s = "";

  // Category pills
  const cats = ["All Items", "Burgers", "Karahi", "Biryani", "Drinks", "Desserts"];
  let px = x0;
  cats.forEach((c, i) => {
    const cw = c.length * 8.6 + 40;
    s += pill(px, 104, cw, 40, i === 0 ? C.teal : "#fff", c, i === 0 ? "#fff" : C.body, 14, i === 0 ? 600 : 500);
    if (i) s += rect(px, 104, cw, 40, 20, "none", `stroke="${C.border}"`);
    px += cw + 10;
  });

  // Product grid
  const cols = 4;
  const tw = (gridW - 16 * (cols - 1)) / cols;
  // 3 rows of tiles that stretch to fill whatever height the image has
  const rows = 3;
  const th = Math.floor((h - 164 - 20 - 16 * (rows - 1)) / rows);
  const imgH = th - 84;
  PRODUCTS.slice(0, cols * rows).forEach(([name, price, kind], i) => {
    const x = x0 + (i % cols) * (tw + 16);
    const y = 164 + Math.floor(i / cols) * (th + 16);
    s += card(x, y, tw, th, 14);
    s += rect(x + 8, y + 8, tw - 16, imgH, 10, i === 1 ? "#fde8ea" : C.tealTint) + dish(x + tw / 2, y + 8 + imgH / 2, kind);
    s += text(x + 16, y + th - 46, name, 15, C.ink, 600);
    s += text(x + 16, y + th - 18, price, 15, C.teal, 700);
    s += circle(x + tw - 28, y + th - 24, 16, i === 1 ? C.red : C.sidebar) + text(x + tw - 28, y + th - 18, "+", 20, "#fff", 600, "middle");
  });

  // Order panel
  const ox = x0 + gridW + 20;
  const ow = w - ox - 20;
  const oh = h - 124;
  s += card(ox, 104, ow, oh);
  s += text(ox + 22, 140, "Order #1042", 20, C.ink, 700) + pill(ox + ow - 112, 120, 90, 28, C.tealTint, "Table 7", C.teal, 13);

  // Order type segmented control
  const seg = ["Dine-in", "Takeaway", "Delivery"];
  const sw = (ow - 44) / 3;
  s += rect(ox + 22, 160, ow - 44, 40, 10, C.canvas);
  seg.forEach((l, i) => {
    if (i === 0) s += rect(ox + 26, 164, sw - 8, 32, 8, C.sidebar);
    s += text(ox + 22 + sw * i + sw / 2, 185, l, 14, i === 0 ? "#fff" : C.muted, 600, "middle");
  });

  const items = [["Chicken Karahi", "Half · Extra spicy", 1, "1,850"], ["Zinger Burger", "No mayo", 2, "1,500"], ["Mint Margarita", "Large", 2, "760"], ["Loaded Fries", "", 1, "520"]];
  const listRows = h > 900 ? items.length : 3;
  items.slice(0, listRows).forEach(([n, note, q, p], i) => {
    const y = 222 + i * 66;
    s += rect(ox + 22, y, 36, 36, 9, C.tealTint) + text(ox + 40, y + 24, `${q}×`, 14, C.teal, 700, "middle");
    s += text(ox + 70, y + 16, n, 15, C.ink, 600) + text(ox + 70, y + 36, note || "Regular", 13, C.faint);
    s += text(ox + ow - 22, y + 24, `Rs ${p}`, 15, C.ink, 600, "end");
    s += `<line x1="${ox + 22}" x2="${ox + ow - 22}" y1="${y + 52}" y2="${y + 52}" stroke="${C.border}" stroke-dasharray="4 4"/>`;
  });

  // Totals pinned to the bottom of the panel
  const by = 104 + oh;
  const lines = [["Subtotal", "Rs 4,630"], ["Tax (16%)", "Rs 741"], ["Discount", "− Rs 463"]];
  lines.forEach(([l, v], i) => {
    s += text(ox + 22, by - 236 + i * 28, l, 14, C.muted) + text(ox + ow - 22, by - 236 + i * 28, v, 14, i === 2 ? C.red : C.body, 500, "end");
  });
  s += text(ox + 22, by - 140, "Total", 18, C.ink, 700) + text(ox + ow - 22, by - 140, "Rs 4,908", 24, C.ink, 800, "end");

  const pm = ["Cash", "Card", "Wallet"];
  const pw = (ow - 44 - 20) / 3;
  pm.forEach((l, i) => {
    const x = ox + 22 + i * (pw + 10);
    s += rect(x, by - 120, pw, 38, 9, i === 1 ? C.tealTint : "#fff", `stroke="${i === 1 ? C.tealSoft : C.border}"`);
    s += text(x + pw / 2, by - 96, l, 14, i === 1 ? C.teal : C.body, 600, "middle");
  });
  s += rect(ox + 22, by - 68, 96, 48, 12, "#fff", `stroke="${C.border}"`) + text(ox + 70, by - 38, "Hold", 15, C.body, 600, "middle");
  s += rect(ox + 128, by - 68, ow - 150, 48, 12, C.red) + text(ox + 128 + (ow - 150) / 2, by - 38, "Pay Rs 4,908", 16, "#fff", 700, "middle");

  // Offline badge in the top bar
  s += pill(x0 + 380, 36, 150, 32, C.tealTint, "● Offline-ready", C.teal, 13);
  return frame(w, h, "Point Of Sale", ["Main Branch", "Cashier: Ali"], s, "New Order");
}

/* ================================================================
   2) Inventory
   ================================================================ */
function inventory() {
  const w = 1600, h = 800, x0 = 270;
  let s = "";
  const sw = (w - x0 - 20 - 48) / 4;
  [["Total Items", "248", C.purple], ["Stock Value", "Rs 1,284,500", C.blue], ["Low Stock", "12", C.orange, ""], ["Out of Stock", "3", C.red]].forEach(([l, v, t], i) => {
    s += stat(x0 + i * (sw + 16), 104, sw, l, v, t);
  });

  // Stock table
  const tw = 880, ty = 234, th = h - ty - 20;
  s += card(x0, ty, tw, th);
  s += text(x0 + 22, ty + 38, "Stock Levels", 19, C.ink, 700) + text(x0 + 22, ty + 60, "Live quantities across all stores", 13, C.muted);
  const cols = [x0 + 22, x0 + 250, x0 + 420, x0 + 540, x0 + 760];
  s += rect(x0 + 12, ty + 78, tw - 24, 34, 8, C.canvas);
  ["Item", "Category", "In stock", "Level", "Status"].forEach((c, i) => (s += text(cols[i] + (i ? 0 : 0), ty + 100, c, 13, C.muted, 600)));
  const rowsData = [
    ["Chicken (kg)", "Meat", "42 / 60", 0.7, "ok"],
    ["Basmati Rice (kg)", "Dry goods", "18 / 80", 0.22, "low"],
    ["Cooking Oil (L)", "Dry goods", "6 / 40", 0.15, "crit"],
    ["Tomatoes (kg)", "Produce", "25 / 30", 0.83, "ok"],
    ["Mozzarella (kg)", "Dairy", "3 / 20", 0.12, "crit"],
    ["Burger Buns (pcs)", "Bakery", "140 / 200", 0.7, "ok"],
    ["Coca-Cola (cans)", "Beverages", "96 / 240", 0.4, "low"],
  ];
  const ST = { ok: [C.tealTint, C.teal, "In stock"], low: [C.amberTint, C.amber, "Low"], crit: [C.redTint, C.red, "Critical"] };
  rowsData.forEach(([n, cat, q, lvl, st], i) => {
    const y = ty + 146 + i * 52;
    const [bg, fg, label] = ST[st];
    s += text(cols[0], y, n, 15, C.ink, 600) + text(cols[1], y, cat, 14, C.muted) + text(cols[2], y, q, 14, C.body, 500);
    s += rect(cols[3], y - 10, 180, 8, 4, C.canvas) + rect(cols[3], y - 10, 180 * lvl, 8, 4, fg);
    s += pill(cols[4], y - 20, 90, 26, bg, label, fg, 12);
    if (i < rowsData.length - 1) s += `<line x1="${x0 + 22}" x2="${x0 + tw - 22}" y1="${y + 22}" y2="${y + 22}" stroke="${C.border}"/>`;
  });

  // Alerts
  const ax = x0 + tw + 20, aw = w - ax - 20;
  s += card(ax, ty, aw, 300);
  s += text(ax + 22, ty + 38, "Low-stock alerts", 19, C.ink, 700) + pill(ax + aw - 62, ty + 18, 40, 26, C.redTint, "5", C.red, 13, 700);
  [["Cooking Oil", "6 L left · ~1 day", C.red], ["Mozzarella", "3 kg left · ~1 day", C.red], ["Basmati Rice", "18 kg left · ~3 days", C.amber]].forEach(([n, d, c], i) => {
    const y = ty + 66 + i * 74;
    s += rect(ax + 16, y, aw - 32, 62, 12, C.canvas) + circle(ax + 38, y + 31, 6, c);
    s += text(ax + 56, y + 27, n, 15, C.ink, 600) + text(ax + 56, y + 46, d, 13, C.muted);
    s += pill(ax + aw - 112, y + 16, 80, 30, C.sidebar, "Reorder", "#fff", 13);
  });

  // Waste donut
  const wy = ty + 320;
  s += card(ax, wy, aw, h - wy - 20);
  s += text(ax + 22, wy + 38, "Waste by reason", 19, C.ink, 700);
  const seg = [["Expired", 45, C.teal], ["Over-prep", 30, C.amber], ["Returns", 25, C.maroon]];
  let off = 0;
  const cx = ax + 100, cy = wy + 130;
  seg.forEach(([, p, c]) => {
    // real circumference (not pathLength) so every SVG renderer draws the segments identically
    const L = 2 * Math.PI * 52;
    const len = (p / 100) * L;
    s += `<circle cx="${cx}" cy="${cy}" r="52" fill="none" stroke="${c}" stroke-width="24" stroke-dasharray="${len.toFixed(2)} ${(L - len).toFixed(2)}" stroke-dashoffset="${(((25 - off) / 100) * L).toFixed(2)}"/>`;
    off += p;
  });
  seg.forEach(([l, p, c], i) => {
    s += circle(ax + 200, wy + 100 + i * 30, 6, c) + text(ax + 214, wy + 105 + i * 30, l, 14, C.body) + text(ax + aw - 22, wy + 105 + i * 30, `${p}%`, 14, C.ink, 700, "end");
  });
  return frame(w, h, "Inventory Setup", ["All Stores", "All Categories"], s, "Add Stock");
}

/* ================================================================
   3) Kitchen display (KDS)
   ================================================================ */
function kitchen() {
  const w = 1600, h = 800, x0 = 270;
  let s = "";
  const colW = (w - x0 - 20 - 32) / 3;
  const COLS = [
    ["New", C.tealMid, [["#1051", "Dine-in · T4", "00:42", ["2× Zinger Burger", "1× Loaded Fries", "2× Mint Margarita"]], ["#1052", "Web order", "00:18", ["1× Chicken Karahi (Half)", "4× Naan"]]]],
    ["Preparing", C.amber, [["#1047", "Takeaway", "06:12", ["1× Sindhi Biryani", "1× Raita", "1× Kulfi Falooda"]], ["#1049", "Dine-in · T9", "04:05", ["1× Mutton Karahi", "2× Roghni Naan"]]]],
    ["Ready", C.teal, [["#1044", "Delivery · Rider 3", "11:30", ["2× Beef Smash", "2× Peach Iced Tea"]], ["#1045", "Dine-in · T2", "09:48", ["1× Chicken Biryani", "1× Mint Margarita"]]]],
  ];
  const BTN = { New: "Start", Preparing: "Bump", Ready: "Served" };
  COLS.forEach(([title, color, tickets], ci) => {
    const x = x0 + ci * (colW + 16);
    s += rect(x, 104, colW, h - 124, 18, "#e2e8f0");
    s += circle(x + 24, 132, 7, color) + text(x + 40, 138, title, 17, C.ink, 700) + pill(x + colW - 54, 118, 38, 26, "#fff", String(tickets.length + (ci === 0 ? 2 : 1)), C.body, 13, 700);
    let ty = 160;
    tickets.forEach(([id, src, timer, lines], ti) => {
      const th = 124 + lines.length * 30;
      s += card(x + 12, ty, colW - 24, th, 14) + rect(x + 12, ty, colW - 24, 6, 3, color);
      s += text(x + 30, ty + 40, id, 20, C.ink, 800) + text(x + 30, ty + 62, src, 13, C.muted);
      const late = ci === 1 && ti === 0;
      s += pill(x + colW - 116, ty + 22, 84, 30, late ? C.redTint : C.canvas, `⏱ ${timer}`, late ? C.red : C.body, 14, 700);
      lines.forEach((l, li) => {
        const ly = ty + 92 + li * 30;
        const done = ci === 2 || (ci === 1 && li === 0);
        s += rect(x + 30, ly - 13, 18, 18, 5, done ? C.teal : "#fff", done ? "" : `stroke="${C.faint}" stroke-width="1.5"`);
        if (done) s += check(x + 39, ly - 4, "#fff", 0.8);
        s += text(x + 58, ly + 1, l, 15, done ? C.muted : C.ink, 500);
      });
      const by = ty + th - 48;
      s += rect(x + 30, by, colW - 60, 34, 9, ci === 0 ? C.sidebar : ci === 1 ? C.red : C.tealTint);
      s += text(x + colW / 2, by + 22, BTN[title], 14, ci === 2 ? C.teal : "#fff", 700, "middle");
      ty += th + 14;
    });
  });
  s += pill(x0 + 370, 36, 170, 32, C.tealTint, "Avg prep 7m 40s", C.teal, 13);
  return frame(w, h, "Kitchen Display", ["All Stations", "Grill"], s, "Recall");
}

/* ================================================================
   4) Analytics
   ================================================================ */
function analytics() {
  const w = 1600, h = 800, x0 = 270;
  let s = "";
  const sw = (w - x0 - 20 - 48) / 4;
  [["Gross Sales", "Rs 1,842,300", C.blue, "+12.5%"], ["Net Sales", "Rs 1,507,980", C.teal, "+9.8%"], ["Orders", "4,218", C.purple, "+8.2%"], ["Avg Ticket", "Rs 436", C.orange, "+3.1%"]].forEach(([l, v, t, d], i) => {
    s += stat(x0 + i * (sw + 16), 104, sw, l, v, t, d);
  });

  // Sales overview line/area chart
  const cy0 = 234, cw = 820, ch = h - cy0 - 20;
  s += card(x0, cy0, cw, ch);
  s += text(x0 + 22, cy0 + 38, "Sales Overview", 19, C.ink, 700) + text(x0 + 22, cy0 + 60, "This week vs last week", 13, C.muted);
  s += rect(x0 + cw - 66, cy0 + 18, 44, 44, 12, C.teal) + `<path d="M${x0 + cw - 56} ${cy0 + 48} l8 -8 6 6 10 -10" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const px = x0 + 64, pw = cw - 96, py = cy0 + 90, ph = ch - 140;
  const thisW = [42, 55, 48, 70, 64, 88, 96];
  const lastW = [38, 44, 50, 52, 58, 66, 72];
  const X = (i) => px + (i * pw) / 6;
  const Y = (v) => py + ph - (v / 100) * ph;
  [0, 25, 50, 75, 100].forEach((t) => {
    s += `<line x1="${px}" x2="${px + pw}" y1="${Y(t)}" y2="${Y(t)}" stroke="${C.border}"/>` + text(px - 12, Y(t) + 4, `${t * 3}k`, 12, C.muted, 400, "end");
  });
  const path = (arr) => arr.map((v, i) => `${i ? "L" : "M"}${X(i)},${Y(v)}`).join(" ");
  s += `<path d="${path(thisW)} L${X(6)},${Y(0)} L${X(0)},${Y(0)} Z" fill="url(#area)"/>`;
  s += `<path d="${path(lastW)}" fill="none" stroke="${C.maroon}" stroke-width="2.5" stroke-dasharray="6 6"/>`;
  s += `<path d="${path(thisW)}" fill="none" stroke="${C.tealMid}" stroke-width="3.5" stroke-linejoin="round"/>`;
  thisW.forEach((v, i) => (s += circle(X(i), Y(v), 5, "#fff", `stroke="${C.tealMid}" stroke-width="2.5"`)));
  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((d, i) => (s += text(X(i), py + ph + 26, d, 13, C.muted, 400, "middle")));
  // Tooltip on Saturday
  s += rect(X(5) - 66, Y(88) - 62, 132, 48, 10, C.sidebar) + text(X(5), Y(88) - 42, "Saturday", 12, "#ffffffaa", 500, "middle") + text(X(5), Y(88) - 23, "Rs 264,000", 15, "#fff", 700, "middle");

  // Branch bars + top items
  const bx = x0 + cw + 20, bw = w - bx - 20;
  s += card(bx, cy0, bw, ch);
  s += text(bx + 22, cy0 + 38, "Sales by Branch", 19, C.ink, 700);
  [["Gulberg", 0.92], ["DHA Phase 6", 0.78], ["Clifton", 0.64], ["F-7 Markaz", 0.5]].forEach(([n, p], i) => {
    const y = cy0 + 74 + i * 46;
    s += text(bx + 22, y, n, 14, C.body, 500) + text(bx + bw - 22, y, `Rs ${Math.round(p * 520)}k`, 14, C.ink, 700, "end");
    s += rect(bx + 22, y + 10, bw - 44, 10, 5, C.canvas) + rect(bx + 22, y + 10, (bw - 44) * p, 10, 5, i === 0 ? C.red : C.tealMid);
  });
  const ty = cy0 + 270;
  s += `<line x1="${bx + 22}" x2="${bx + bw - 22}" y1="${ty - 18}" y2="${ty - 18}" stroke="${C.border}"/>`;
  s += text(bx + 22, ty + 10, "Top selling items", 16, C.ink, 700);
  [["Chicken Biryani", "340"], ["Zinger Burger", "296"], ["Mint Margarita", "251"], ["Chicken Karahi", "188"]].forEach(([n, q], i) => {
    const y = ty + 46 + i * 44;
    s += rect(bx + 22, y - 18, 28, 28, 8, i === 0 ? C.amberTint : C.canvas) + text(bx + 36, y + 1, String(i + 1), 13, i === 0 ? C.amber : C.muted, 700, "middle");
    s += text(bx + 62, y + 1, n, 15, C.ink, 500) + text(bx + bw - 22, y + 1, `${q} sold`, 14, C.muted, 500, "end");
  });

  const defs = `<linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.tealSoft}" stop-opacity="0.35"/><stop offset="1" stop-color="${C.tealSoft}" stop-opacity="0"/></linearGradient>`;
  return svg(w, h, rect(0, 0, w, h, 0, C.canvas) + sidebar(h, "Dashboard") + topbar(270, w - 290, ["This Week", "All Branches"]) + s, defs);
}

/* ================================================================
   5) Role cards (shown at ~280x144, object-cover)
   ================================================================ */
const RW = 640, RH = 330;
function roleBg(id, from, to) {
  return {
    defs: `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>
<pattern id="${id}d" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#fff" fill-opacity="0.09"/></pattern>`,
    body: rect(0, 0, RW, RH, 0, `url(#${id})`) + rect(0, 0, RW, RH, 0, `url(#${id}d)`) + circle(RW - 60, 40, 120, "#fff", `fill-opacity="0.05"`),
  };
}

function roleFront() {
  const bg = roleBg("gf", C.sidebar, C.tealMid);
  let s = bg.body;
  // Tablet with floor plan
  s += rect(150, 50, 340, 230, 22, "#0b1f1d", `filter="url(#shd)"`) + rect(162, 62, 316, 206, 14, C.canvas);
  s += text(178, 90, "Floor plan", 15, C.ink, 700) + pill(392, 74, 72, 24, C.tealTint, "12 / 20", C.teal, 12);
  const T = [["T1", 1], ["T2", 0], ["T3", 2], ["T4", 1], ["T5", 1], ["T6", 0], ["T7", 1], ["T8", 2]];
  T.forEach(([n, st], i) => {
    const x = 200 + (i % 4) * 76, y = 140 + Math.floor(i / 4) * 78;
    const fill = st === 1 ? C.teal : st === 2 ? C.red : "#fff";
    s += circle(x, y, 26, fill, st ? "" : `stroke="${C.border}" stroke-width="2"`) + text(x, y + 5, n, 14, st ? "#fff" : C.muted, 700, "middle");
  });
  // Floating receipt + payment chip
  s += rect(452, 120, 130, 150, 12, "#fff", `filter="url(#shd)"`) + text(468, 146, "Table 7", 14, C.ink, 700);
  [70, 90, 60].forEach((wv, i) => (s += rect(468, 162 + i * 20, wv, 8, 4, C.border)));
  s += rect(468, 232, 98, 26, 8, C.red) + text(517, 250, "Pay", 13, "#fff", 700, "middle");
  s += rect(60, 200, 130, 54, 14, "#fff", `filter="url(#shd)"`) + rect(72, 213, 28, 28, 8, C.tealTint) + rect(78, 222, 16, 11, 2, "none", `stroke="${C.teal}" stroke-width="2"`);
  s += text(110, 225, "Card paid", 13, C.ink, 700) + text(110, 242, "Rs 4,908", 12, C.muted);
  return svg(RW, RH, s, bg.defs);
}

function roleBack() {
  const bg = roleBg("gb", "#0a3b35", C.sidebar);
  let s = bg.body;
  // Chef hat
  s += `<g transform="translate(108 150)" filter="url(#shd)"><circle cx="-26" cy="-8" r="30" fill="#fff"/><circle cx="26" cy="-8" r="30" fill="#fff"/><circle cx="0" cy="-30" r="34" fill="#fff"/><rect x="-42" y="0" width="84" height="56" rx="8" fill="#fff"/><rect x="-42" y="40" width="84" height="16" rx="4" fill="${C.border}"/></g>`;
  // KDS tickets
  [[220, 46, C.tealMid, "#1051", "00:42", false], [360, 70, C.amber, "#1047", "06:12", true], [500, 46, C.teal, "#1044", "Ready", false]].forEach(([x, y, c, id, t, late]) => {
    s += rect(x - 10, y, 124, 230, 14, "#fff", `filter="url(#shd)"`) + rect(x - 10, y, 124, 6, 3, c);
    s += text(x + 2, y + 34, id, 16, C.ink, 800);
    s += pill(x + 2, y + 46, 70, 24, late ? C.redTint : C.canvas, t, late ? C.red : C.body, 12, 700);
    [0, 1, 2].forEach((li) => {
      const ly = y + 96 + li * 30;
      const done = t === "Ready" || li === 0;
      s += rect(x + 2, ly - 10, 14, 14, 4, done ? C.teal : "#fff", done ? "" : `stroke="${C.faint}"`) + rect(x + 24, ly - 6, [70, 54, 62][li], 7, 3.5, C.border);
    });
    s += rect(x + 2, y + 190, 100, 26, 8, t === "Ready" ? C.tealTint : late ? C.red : C.sidebar);
  });
  return svg(RW, RH, s, bg.defs);
}

function roleManagement() {
  const bg = roleBg("gm", C.sidebar, "#0d5c52");
  let s = bg.body;
  // Bar chart card
  s += rect(70, 50, 300, 230, 18, "#fff", `filter="url(#shd)"`) + text(92, 84, "Weekly revenue", 15, C.ink, 700) + text(92, 104, "+18.4% vs last week", 12, C.teal, 600);
  [0.45, 0.62, 0.5, 0.78, 0.7, 0.92, 0.85].forEach((v, i) => {
    const bh = 130 * v;
    s += rect(96 + i * 38, 258 - bh, 24, bh, 6, i === 5 ? C.red : C.tealMid);
  });
  // Staff card
  s += rect(330, 120, 250, 150, 18, "#fff", `filter="url(#shd)"`) + text(352, 152, "Staff on shift", 15, C.ink, 700);
  [["AK", C.sidebar], ["SR", C.tealMid], ["ZM", C.red], ["BM", C.amber]].forEach(([n, c], i) => {
    s += circle(370 + i * 34, 192, 20, c, `stroke="#fff" stroke-width="3"`) + text(370 + i * 34, 197, n, 12, "#fff", 700, "middle");
  });
  s += text(510, 197, "+6", 14, C.muted, 700);
  s += rect(352, 228, 206, 8, 4, C.canvas) + rect(352, 228, 160, 8, 4, C.teal) + text(352, 256, "Attendance 78%", 12, C.muted, 500);
  s += pill(420, 60, 150, 36, "#fff", "✓ Payroll ready", C.teal, 13, 700);
  return svg(RW, RH, s, bg.defs);
}

function roleOwners() {
  const bg = roleBg("go", "#0d5c52", C.sidebar);
  let s = bg.body;
  // Connected outlets map
  const pins = [[150, 210, "Lahore"], [300, 110, "Islamabad"], [250, 270, "Multan"], [110, 100, "Karachi"]];
  const hub = [230, 175];
  pins.forEach(([x, y]) => (s += `<line x1="${hub[0]}" y1="${hub[1]}" x2="${x}" y2="${y}" stroke="#fff" stroke-opacity="0.45" stroke-width="2" stroke-dasharray="6 6"/>`));
  s += circle(hub[0], hub[1], 34, C.red, `filter="url(#shd)"`) + text(hub[0], hub[1] + 9, "X", 26, "#fff", 800, "middle");
  pins.forEach(([x, y, n]) => {
    s += circle(x, y, 18, "#fff", `filter="url(#shd)"`) + rect(x - 7, y - 6, 14, 12, 2, C.teal);
    s += text(x, y + 36, n, 12, "#ffffffdd", 600, "middle");
  });
  // Revenue card
  s += rect(370, 70, 220, 190, 18, "#fff", `filter="url(#shd)"`);
  s += text(392, 104, "All outlets", 13, C.muted, 600) + text(392, 138, "Rs 2.4M", 30, C.ink, 800) + pill(392, 152, 88, 26, C.tealTint, "▲ 18%", C.teal, 13, 700);
  s += `<path d="M392 236 L420 224 L448 230 L476 210 L504 214 L532 194 L566 186" fill="none" stroke="${C.tealMid}" stroke-width="3" stroke-linejoin="round"/>`;
  s += `<path d="M392 236 L420 224 L448 230 L476 210 L504 214 L532 194 L566 186 L566 246 L392 246 Z" fill="${C.tealSoft}" fill-opacity="0.15"/>`;
  return svg(RW, RH, s, bg.defs);
}

/* ================================================================
   6) Services tall card (portrait, bottom ~40% sits under a glass panel)
   ================================================================ */
function servicesMain() {
  const w = 600, h = 900;
  const defs = `<radialGradient id="glow" cx="0.75" cy="0.15" r="0.7"><stop offset="0" stop-color="${C.tealSoft}" stop-opacity="0.55"/><stop offset="1" stop-color="${C.tealSoft}" stop-opacity="0"/></radialGradient>
<radialGradient id="glow2" cx="0.1" cy="0.7" r="0.6"><stop offset="0" stop-color="${C.red}" stop-opacity="0.25"/><stop offset="1" stop-color="${C.red}" stop-opacity="0"/></radialGradient>`;
  let s = rect(0, 0, w, h, 0, C.sidebar) + rect(0, 0, w, h, 0, "url(#glow)") + rect(0, 0, w, h, 0, "url(#glow2)");
  // Phone
  s += rect(150, 70, 300, 600, 44, "#0b1f1d", `filter="url(#shd)"`) + rect(164, 84, 272, 572, 34, C.canvas) + rect(255, 96, 90, 22, 11, "#0b1f1d");
  s += text(186, 160, "Live orders", 22, C.ink, 800) + pill(350, 140, 66, 28, C.redTint, "● 8", C.red, 13, 700);
  const orders = [["#1052", "Web · 2 items", "New", C.red, "#fde8ea"], ["#1051", "Dine-in T4", "Cooking", C.amber, C.amberTint], ["#1049", "Takeaway", "Cooking", C.amber, C.amberTint], ["#1047", "Delivery", "Ready", C.teal, C.tealTint], ["#1044", "Dine-in T2", "Served", C.muted, C.canvas]];
  orders.forEach(([id, src, st, fg, bgc], i) => {
    const y = 186 + i * 84;
    s += rect(180, y, 240, 72, 16, "#fff", `filter="url(#sh)"`);
    s += rect(194, y + 14, 44, 44, 12, bgc) + rect(208, y + 28, 16, 16, 4, "none", `stroke="${fg}" stroke-width="2.2"`);
    s += text(250, y + 32, id, 16, C.ink, 700) + text(250, y + 52, src, 13, C.muted);
    s += pill(336, y + 22, 72, 28, bgc, st, fg, 12, 700);
  });
  // Floating notification
  s += rect(30, 236, 200, 64, 18, "#fff", `filter="url(#shd)"`) + circle(64, 268, 18, C.teal) + check(64, 268, "#fff", 1.1);
  s += text(92, 262, "Order ready", 15, C.ink, 700) + text(92, 282, "#1047 · 6m 12s", 12, C.muted);
  s += rect(400, 360, 172, 60, 18, C.red, `filter="url(#shd)"`) + text(486, 386, "New web order", 13, "#ffffffcc", 600, "middle") + text(486, 406, "Rs 1,850", 16, "#fff", 800, "middle");
  return svg(w, h, s, defs);
}

/* ---------------- Write files ---------------- */
const files = {
  "platform-preview.svg": pos(1600, 1000),
  "action-pos.svg": pos(1600, 800),
  "action-inventory.svg": inventory(),
  "action-kitchen.svg": kitchen(),
  "action-analytics.svg": analytics(),
  "role-front.svg": roleFront(),
  "role-back.svg": roleBack(),
  "role-management.svg": roleManagement(),
  "role-owners.svg": roleOwners(),
  "services-main.svg": servicesMain(),
};

for (const [name, content] of Object.entries(files)) {
  // collapse whitespace between tags to keep files small
  writeFileSync(join(OUT, name), content.replace(/>\s+</g, "><"));
  console.log(`${name.padEnd(24)} ${(Buffer.byteLength(content) / 1024).toFixed(1)} KB`);
}
