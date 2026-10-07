"use client";

import { useRef } from "react";
import {
  ArrowUp,
  BarChart3,
  Boxes,
  Check,
  Clock,
  Plus,
  Receipt,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { gsap, useGSAP } from "@/lib/gsap";

/* ---------------------------------------------------------------
   Reusable card shell
   - light : white card, gray icon box that turns green on hover
   - dark  : maroon card, icon centered (like the black card in the design)
   - green : maroon -> green gradient card
---------------------------------------------------------------- */
type Tone = "light" | "dark" | "green";

const TONE: Record<Tone, string> = {
  light: "bg-page text-white", // global project green
  dark: "bg-gradient text-white",
  green: "bg-linear-to-br from-gradient to-sidebar-primary text-white",
};

function Card({
  icon: Icon,
  label,
  tone = "light",
  centered = false,
  children,
}: {
  icon: LucideIcon;
  label: string;
  tone?: Tone;
  centered?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      data-svc
      tabIndex={0}
      className={`group relative min-h-[260px] overflow-hidden rounded-3xl opacity-0 shadow-lg shadow-black/5 outline-none transition duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:-translate-y-1 ${TONE[tone]}`}
    >
      {centered ? (
        /* big centered icon, fades away on hover */
        <span className="absolute inset-x-0 top-[26%] flex justify-center transition duration-500 group-hover:-translate-y-4 group-hover:opacity-0 group-focus:opacity-0">
          <Icon size={44} strokeWidth={1.3} />
        </span>
      ) : (
        /* translucent icon box, turns red + rotates on hover */
        <span className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white transition duration-500 group-hover:rotate-[360deg] group-hover:bg-primary">

          <Icon size={22} strokeWidth={1.5} />
        </span>
      )}

      {/* Custom hover UI */}
      <div
        className={`absolute inset-x-5 bottom-16 flex translate-y-4 scale-95 items-center justify-center opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus:translate-y-0 group-focus:scale-100 group-focus:opacity-100 ${
          centered ? "top-6" : "top-20"
        }`}
      >
        {children}
      </div>

      {/* Label */}
      <p
        className={
          centered
            ? "absolute inset-x-5 top-[56%] text-center text-lg font-medium transition-all duration-500 group-hover:top-[calc(100%-3.25rem)]"
            : "absolute inset-x-5 bottom-5 text-lg font-medium"
        }
      >
        {label}
      </p>
    </div>
  );
}

/* ------------------------- Hover previews ------------------------- */

function TimePreview() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-20 w-20 rounded-full border-4 border-primary bg-white">
        <span className="absolute inset-0 transition-transform duration-[2000ms] ease-out group-hover:rotate-[720deg]">
          <span className="absolute left-1/2 top-2 h-7 w-0.5 -translate-x-1/2 rounded bg-primary" />
        </span>
        <span className="absolute inset-0 transition-transform duration-[4000ms] ease-out group-hover:rotate-[180deg]">
          <span className="absolute left-1/2 top-4 h-5 w-1 -translate-x-1/2 rounded bg-gradient" />
        </span>
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient" />
      </div>
      <span className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
        <Check size={12} /> -14 hrs / week
      </span>
    </div>
  );
}

function ErrorPreview() {
  const lines = ["Chicken Karahi x2", "Beef Burger x1", "Mint Margarita x3"];
  return (
    <div className="w-full max-w-[210px] rounded-xl border border-gray-200 bg-gray-50 p-3 shadow-md">
      <div className="mb-2 flex items-center justify-between text-[10px] font-semibold text-gray-500">
        <span>ORDER #1042</span>
        <span className="flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-white">
          <ShieldCheck size={10} /> 0 errors
        </span>
      </div>
      {lines.map((l, i) => (
        <div key={l} className="flex items-center justify-between py-1 text-xs text-gray-800">
          {l}
          <span
            className="flex h-4 w-4 scale-0 items-center justify-center rounded-full bg-primary text-white transition duration-300 group-hover:scale-100"
            style={{ transitionDelay: `${250 + i * 220}ms` }}
          >
            <Check size={10} />
          </span>
        </div>
      ))}
    </div>
  );
}

function TeamPreview() {
  const staff = [
    { n: "AK", c: "bg-white text-gradient" },
    { n: "SR", c: "bg-primary text-white ring-1 ring-white/30" },
    { n: "ZM", c: "bg-white/80 text-gradient" },
    { n: "BM", c: "bg-primary text-white ring-1 ring-white/30" },
  ];
  return (
    <div className="w-full max-w-[220px] space-y-3">
      <div className="flex -space-x-2">
        {staff.map((s, i) => (
          <span
            key={s.n}
            className={`flex h-10 w-10 translate-y-3 items-center justify-center rounded-full border-2 border-gradient text-xs font-bold opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 ${s.c}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {s.n}
          </span>
        ))}
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gradient bg-white/15 text-xs">
          <Users size={14} />
        </span>
      </div>
      <div>
        <div className="mb-1 flex justify-between text-[10px] text-white/70">
          <span>Team efficiency</span>
          <span className="font-semibold text-white">+32%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/15">
          <span className="block h-full w-0 rounded-full bg-white transition-[width] duration-1000 ease-out group-hover:w-[78%]" />
        </div>
      </div>
    </div>
  );
}

function FocusPreview() {
  const rows = [
    { icon: Boxes, t: "Inventory counted" },
    { icon: BarChart3, t: "Report sent" },
    { icon: Receipt, t: "Payroll ready" },
  ];
  return (
    <div className="w-full max-w-[210px] space-y-2">
      {rows.map(({ icon: Icon, t }, i) => (
        <div
          key={t}
          className="flex -translate-x-6 items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 text-xs text-gray-800 opacity-0 shadow-sm transition duration-500 group-hover:translate-x-0 group-hover:opacity-100"
          style={{ transitionDelay: `${i * 150}ms` }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-white">
            <Icon size={12} />
          </span>
          <span className="flex-1">{t}</span>
          <span className="rounded-full bg-gradient px-2 py-0.5 text-[9px] font-semibold text-white">Auto</span>
        </div>
      ))}
    </div>
  );
}

function ScalePreview() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
        <Store size={22} />
      </span>
      {["B2", "B3"].map((b, i) => (
        <span
          key={b}
          className="flex h-11 w-11 scale-0 items-center justify-center rounded-xl bg-gradient text-xs font-bold text-white shadow-md transition duration-500 group-hover:scale-100"
          style={{ transitionDelay: `${200 + i * 200}ms` }}
        >
          {b}
        </span>
      ))}
      <span
        className="flex h-9 w-9 scale-0 items-center justify-center rounded-full bg-primary text-white transition duration-500 group-hover:scale-100"
        style={{ transitionDelay: "650ms" }}
      >
        <Plus size={16} />
      </span>
    </div>
  );
}

function ChartPreview() {
  return (
    <div className="w-full max-w-[230px]">
      <svg viewBox="0 0 200 90" className="w-full">
        {[30, 60].map((y) => (
          <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="white" strokeOpacity="0.1" />
        ))}
        {/* faint static line */}
        <path
          d="M0,75 L25,60 L50,66 L75,40 L100,50 L125,25 L150,34 L175,12 L200,18"
          fill="none"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        {/* line that draws on hover */}
        <path
          d="M0,75 L25,60 L50,66 L75,40 L100,50 L125,25 L150,34 L175,12 L200,18"
          fill="none"
          style={{ stroke: "var(--primary)" }}
          strokeWidth="3"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          className="[stroke-dashoffset:1] transition-[stroke-dashoffset] duration-[1400ms] ease-out group-hover:[stroke-dashoffset:0]"
        />
      </svg>
      <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-white/80">
        <TrendingUp size={12} className="text-primary" /> Sales up 12.5% today
      </p>
    </div>
  );
}

/* ------------------------------ Section ------------------------------ */

export default function ServicesSection() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-svc]",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: grid.current, start: "top 85%", once: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section id="services" ref={root} className="bg-light">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading eyebrow="Services" title="Everything a restaurant needs, in one place" />

        <div ref={grid} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card icon={Clock} label="Save 10–20 hours weekly">
            <TimePreview />
          </Card>

          <Card icon={ShieldCheck} label="Reduce manual errors">
            <ErrorPreview />
          </Card>

          <Card icon={Users} label="Improve team productivity" tone="dark" centered>
            <TeamPreview />
          </Card>

          <Card icon={Sparkles} label="Focus on high-value work">
            <FocusPreview />
          </Card>

          <Card icon={BarChart3} label="Live sales insights" tone="green">
            <ChartPreview />
          </Card>

          <Card icon={Store} label="Scale without hiring more staff">
            <ScalePreview />
          </Card>

          {/* Tall image card (right column, spans 2 rows) */}
          <div
            data-svc
            tabIndex={0}
            className="group relative min-h-[420px] overflow-hidden rounded-3xl bg-sidebar-primary opacity-0 shadow-lg shadow-black/5 outline-none sm:col-span-2 lg:col-span-1 lg:col-start-4 lg:row-span-2 lg:row-start-1"
            style={{
              backgroundImage: "url('/images/services-main.svg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-sidebar-primary/90 via-transparent to-gradient/30" />

            <span className="absolute right-5 top-5 flex h-11 w-11 -rotate-90 scale-0 items-center justify-center rounded-full bg-white text-primary shadow-lg transition duration-500 group-hover:rotate-0 group-hover:scale-100">
              <Zap size={20} />
            </span>

            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-white/15 p-5 text-white backdrop-blur-md">
              <p className="text-2xl font-medium leading-tight">35% Faster order turnaround</p>
              <div className="mt-6 flex items-center justify-between text-xs text-white/80">
                <span>+224 orders</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-transform duration-500 group-hover:-translate-y-1.5">
                  <ArrowUp size={18} />
                </span>
                <span>88%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}