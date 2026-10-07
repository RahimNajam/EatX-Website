"use client";

import { useRef } from "react";
import { Crown, ShoppingBag, TrendingUp } from "lucide-react";
import ArrowButton from "@/components/ui/ArrowButton";
import { CATEGORIES, SALES_POINTS } from "@/data/showcase";
import { gsap, useGSAP } from "@/lib/gsap";

// Chart geometry
const W = 400;
const H = 150;
const xAt = (i: number) => (i * W) / (SALES_POINTS.length - 1);
const yAt = (v: number) => H - (v / 100) * (H - 10) - 5;
const LINE = SALES_POINTS.map((v, i) => `${i === 0 ? "M" : "L"}${xAt(i)},${yAt(v)}`).join(" ");
const AREA = `${LINE} L${W},${H} L0,${H} Z`;
// Where each donut segment starts (sum of the segments before it)
const SEG_START = CATEGORIES.map((_, i) => CATEGORIES.slice(0, i).reduce((sum, c) => sum + c.pct, 0));

export default function NumbersSection() {
  const root = useRef<HTMLElement>(null);
  const cards = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: cards.current, start: "top 80%", once: true },
      });

      // 1) cards rise in one by one
      tl.fromTo(
        "[data-ncard]",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.15 }
      );

      // 2) numbers count up
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const prefix = el.dataset.prefix ?? "";
        const obj = { v: 0 };
        tl.to(
          obj,
          {
            v: end,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = prefix + Math.round(obj.v).toLocaleString("en-US");
            },
          },
          0.3
        );
      });

      // 3) line chart draws, area fades in
      tl.fromTo(
        "[data-line]",
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" },
        0.5
      );
      tl.fromTo("[data-area]", { opacity: 0 }, { opacity: 1, duration: 1 }, 1.4);

      // 4) donut fills
      gsap.utils.toArray<SVGCircleElement>("[data-seg]").forEach((c, i) => {
        const pct = Number(c.dataset.seg);
        tl.fromTo(
          c,
          { strokeDasharray: "0 100" },
          { strokeDasharray: `${pct} ${100 - pct}`, duration: 1, ease: "power2.out" },
          0.8 + i * 0.2
        );
      });
    },
    { scope: root }
  );

  return (
    <section id="insights" ref={root} className="bg-page text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 lg:grid-cols-[0.8fr_1.5fr]">
        <div>
          <span
            data-reveal
            className="inline-block rounded-full bg-primary/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary"
          >
            Real impact
          </span>
          <h2 data-reveal className="mt-4 text-4xl font-semibold leading-tight tracking-tight">
            Your numbers, without the spreadsheets
          </h2>
          <p data-reveal className="mt-5 max-w-sm text-white/65">
            Get real-time insights into your business performance and make smarter decisions,
            faster.
          </p>
          <div data-reveal className="mt-8">
            <ArrowButton href="/login">View Analytics</ArrowButton>
          </div>
        </div>

        <div ref={cards} className="space-y-4">
          {/* Top stat cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div data-ncard className="rounded-2xl border border-white/10 bg-white/5 p-5 opacity-0">
              <p className="flex items-center gap-2 text-xs text-white/60">
                <TrendingUp size={14} className="text-primary" /> Today&apos;s Sales
              </p>
              <p data-count="258450" data-prefix="Rs " className="mt-2 text-2xl font-semibold">
                Rs 258,450
              </p>
              <p className="mt-1 text-xs text-primary">+12.5%</p>
            </div>

            <div data-ncard className="rounded-2xl border border-white/10 bg-white/5 p-5 opacity-0">
              <p className="flex items-center gap-2 text-xs text-white/60">
                <ShoppingBag size={14} className="text-primary" /> Total Orders
              </p>
              <p data-count="1284" className="mt-2 text-2xl font-semibold">
                1,284
              </p>
              <p className="mt-1 text-xs text-primary">+8.2%</p>
            </div>

            <div data-ncard className="rounded-2xl border border-white/10 bg-white/5 p-5 opacity-0">
              <p className="flex items-center gap-2 text-xs text-white/60">
                <Crown size={14} className="text-amber-400" /> Best Seller
              </p>
              <p className="mt-2 text-lg font-semibold">Chicken Biryani</p>
              <p className="mt-1 text-xs text-white/50">
                <span data-count="340">340</span> orders
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
            <div data-ncard className="rounded-2xl border border-white/10 bg-white/5 p-5 opacity-0">
              <p className="text-sm font-semibold">Sales Overview</p>
              <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full">
                <defs>
                  <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" style={{ stopColor: "var(--primary)" }} stopOpacity="0.45" />
                    <stop offset="100%" style={{ stopColor: "var(--primary)" }} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((g) => (
                  <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="white" strokeOpacity="0.08" />
                ))}
                <path data-area d={AREA} fill="url(#areaFill)" />
                <path
                  data-line
                  d={LINE}
                  fill="none"
                  style={{ stroke: "var(--primary)" }}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                />
              </svg>
            </div>

            <div data-ncard className="rounded-2xl border border-white/10 bg-white/5 p-5 opacity-0">
              <p className="text-sm font-semibold">Sales by Category</p>
              <div className="mt-4 flex items-center gap-4">
                <svg viewBox="0 0 120 120" className="h-28 w-28 shrink-0 -rotate-90">
                  {CATEGORIES.map((c, i) => (
                    <circle
                      key={c.label}
                      data-seg={c.pct}
                      cx="60"
                      cy="60"
                      r="44"
                      fill="none"
                      style={{ stroke: c.color }}
                      strokeWidth="18"
                      pathLength={100}
                      strokeDasharray="0 100"
                      strokeDashoffset={-SEG_START[i]}
                    />
                  ))}
                </svg>
                <ul className="space-y-2 text-xs text-white/70">
                  {CATEGORIES.map((c) => (
                    <li key={c.label} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.label} <span className="text-white">{c.pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}