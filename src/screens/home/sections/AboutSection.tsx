"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChefHat,
  Gauge,
  Handshake,
  Lightbulb,
  ShieldCheck,
  ShoppingBag,
  Star,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { STATS } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import ArrowButton from "@/components/ui/ArrowButton";

const hand = Caveat({ subsets: ["latin"], weight: ["500", "600"] });

const STAT_ICONS: { icon: LucideIcon; tone: string }[] = [
  { icon: ChefHat, tone: "text-primary" },
  { icon: ShoppingBag, tone: "text-primary" },
  { icon: Gauge, tone: "text-brand-teal" },
  { icon: Star, tone: "text-gray-900" },
];

const GALLERY = [
  {
    src: "/images/about/about1.webp",
    alt: "eatX POS tablet on a restaurant counter",
  },
  {
    src: "/images/about/about2.webp",
    alt: "Chefs working together in a busy restaurant kitchen",
  },
  {
    src: "/images/about/about3.webp",
    alt: "Close-up of a hand placing an order on an eatX POS tablet",
  },
  {
    src: "/images/about/about4.webp",
    alt: "Close-up of a hand placing an order on an eatX POS tablet",
  },
  {
    src: "/images/about/about5.webp",
    alt: "Close-up of a hand placing an order on an eatX POS tablet",
  },
];

const AUTO_MS = 5000;

const VALUES: { icon: LucideIcon; title: string; text: string; tone: string }[] = [
  {
    icon: Lightbulb,
    title: "Innovation",
    text: "We're always exploring new ways to make restaurants more efficient and successful.",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    text: "Our platform is built to be fast, secure and always on.",
    tone: "bg-brand-teal/10 text-brand-teal",
  },
  {
    icon: Users,
    title: "Customer First",
    text: "Your success is our biggest motivation.",
    tone: "bg-secondary/10 text-secondary",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    text: "We grow with you, not just for you.",
    tone: "bg-gray-900/10 text-gray-900",
  },
];

/* ------------------------------ small pieces ------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      data-reveal
      className="inline-flex items-center gap-1.5 rounded-full border border-gray-900/10 bg-white px-2.5 py-1 text-[9px] font-semibold text-gray-600 shadow-2xs"
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      {children}
    </span>
  );
}

/** Primary-colored text with a hand-drawn underline stroke */
function Marked({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap text-primary sm:whitespace-normal">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 8"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 h-[6px] w-full text-primary"
      >
        <path
          d="M2 5 C 40 1, 80 7, 120 3 S 180 4, 198 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** Floating glass pill with a primary-tinted icon tile (bottom badges) */
function Badge({
  icon: Icon,
  children,
  className = "",
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-20 flex items-center gap-2 rounded-2xl bg-white/95 py-1.5 pl-1.5 pr-3.5 text-[10px] font-semibold leading-tight text-gray-900 shadow-lg backdrop-blur-xs ${className}`}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon size={14} />
      </span>
      {children}
    </div>
  );
}

/** Handwritten note with a curved arrow */
function Handwritten({
  children,
  className = "",
  arrow = "down-left",
}: {
  children: React.ReactNode;
  className?: string;
  arrow?: "down-left" | "down-right";
}) {
  return (
    <div
      className={`${hand.className} pointer-events-none absolute z-20 text-base font-medium leading-[1.05] text-gray-800 md:text-lg ${className}`}
    >
      {children}
      <svg
        aria-hidden
        viewBox="0 0 40 30"
        className={`mt-0.5 h-6 w-8 text-gray-700 ${arrow === "down-right" ? "ml-auto -scale-x-100" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M34 3 C 28 4, 12 8, 8 24" />
        <path d="M3 18 L8 25 L14 19" />
      </svg>
    </div>
  );
}

/* --------------------------------- section -------------------------------- */

export default function AboutSection() {
  const root = useRef<HTMLElement>(null);
  const statsRow = useRef<HTMLDivElement>(null);
  const valuesGrid = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const go = (i: number) => setActive((i + GALLERY.length) % GALLERY.length);
  const next = () => go(active + 1);
  const prev = () => go(active - 1);

  // auto-advance; restarts whenever the user clicks (active changes)
  useEffect(() => {
    const t = setTimeout(() => setActive((p) => (p + 1) % GALLERY.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [active]);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-stat]",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: statsRow.current, start: "top 88%", once: true },
        }
      );
      gsap.fromTo(
        "[data-value]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: valuesGrid.current, start: "top 88%", once: true },
        }
      );
    },
    { scope: root }
  );

  const current = GALLERY[active];

  return (
    <section id="about" ref={root} className="overflow-hidden bg-light py-6 md:py-10">
      {/* ===================== Block 1 — About Us ===================== */}
      <div className="relative mx-auto max-w-5xl px-4 py-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left: content */}
          <div>
            <Eyebrow>About Us</Eyebrow>

            <h2
              data-reveal
              className="mt-3 text-2xl font-bold leading-tight tracking-tight text-balance text-gray-900 md:text-[32px]"
            >
              We&apos;re not just building technology — we&apos;re building <Marked>a better restaurant experience.</Marked>
            </h2>

            <p data-reveal className="mt-4 max-w-md text-xs leading-relaxed text-gray-600 md:text-[13px]">
              At eatX, we help restaurants of all sizes run smarter, serve faster and grow bigger.
              Our all-in-one platform brings together online ordering, POS, inventory, staff
              management and analytics — so you focus on your customers.
            </p>

            {/* 4 stats in one row */}
            <div ref={statsRow} className="mt-5 grid max-w-md grid-cols-2 gap-2.5 sm:grid-cols-4">
              {STATS.map(({ value, label }, i) => {
                const { icon: Icon, tone } = STAT_ICONS[i % STAT_ICONS.length];
                return (
                  <div
                    key={label}
                    data-stat
                    className="rounded-xl border border-gray-900/10 bg-white p-2.5 opacity-0 shadow-2xs"
                  >
                    <Icon size={15} className={tone} />
                    <p className={`mt-1.5 text-sm font-bold leading-none ${tone}`}>{value}</p>
                    <p className="mt-1 text-[9px] leading-tight text-gray-500">{label}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5">
              <ArrowButton href="#platform" className="px-4 py-1.5 text-[11px]">
                Our Story
              </ArrowButton>
            </div>
          </div>

          {/* Right: clickable / auto-changing image */}
          <div data-reveal className="relative mx-auto w-full max-w-md">
            {/* soft primary-tinted blob behind */}
            <div
              aria-hidden
              className="absolute -bottom-5 -left-6 -z-10 h-44 w-52 rounded-[60%_40%_55%_45%] bg-primary/15 blur-[1px]"
            />
            <div
              aria-hidden
              className="absolute -right-5 -top-5 -z-10 h-32 w-32 rounded-full bg-brand-teal/10 blur-2xl"
            />

            <div
              role="button"
              tabIndex={0}
              aria-label="Show next photo"
              onClick={next}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "Enter") next();
                if (e.key === "ArrowLeft") prev();
              }}
              className="relative aspect-[16/11] w-full cursor-pointer overflow-hidden rounded-tl-[36px] rounded-tr-[90px] rounded-br-[44px] rounded-bl-[22px] bg-sidebar-primary shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={current.src}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="(min-width: 1024px) 450px, 90vw"
                    className="select-none object-cover"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>

              {/* soft vignette so badges stay readable */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

              {/* progress dots */}
              <div className="absolute bottom-3 left-4 z-20 flex items-center gap-1.5">
                {GALLERY.map((g, i) => (
                  <button
                    key={g.src}
                    type="button"
                    aria-label={`Show photo ${i + 1}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      go(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                      }`}
                  />
                ))}
              </div>
            </div>
               <Handwritten className="-right-1 top-1 w-28 text-center  md:-right-20" arrow="down-left">
             Smarter Tools,
              <br />
              Happier Restaurants
            </Handwritten>

            <Badge icon={Zap} className="-bottom-3 right-2">
              Manage Orders
              <br />
              in Real Time
            </Badge>
          </div>
        </div>
      </div>

      {/* ===================== Block 2 — Our Story ===================== */}
      <div className="relative mx-auto max-w-5xl px-4 py-6 md:py-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div data-reveal className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden
              className="absolute -left-6 -top-6 -z-10 h-44 w-48 rounded-[55%_45%_60%_40%] bg-primary/15"
            />

            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-tl-[90px] rounded-tr-[28px] rounded-br-[20px] rounded-bl-[44px] shadow-xl">
              <Image
                src="/images/about/about-owner-photo.webp"
                alt="Smiling restaurant staff member using a tablet"
                fill
                sizes="(min-width: 1024px) 450px, 90vw"
                className="object-cover"
              />
            </div>

            <Handwritten className="-left-1 top-3 w-24 text-center md:-left-3" arrow="down-right">
              Real People,
              <br />
              Real Impact
            </Handwritten>

            <Badge icon={Users} className="-bottom-3 -left-3">
              Empowering
              <br />
              Restaurant Owners
            </Badge>
          </div>

          <div>
            <Eyebrow>Our Story</Eyebrow>

            <h2
              data-reveal
              className="mt-3 text-2xl font-bold leading-tight tracking-tight text-balance text-gray-900 md:text-[32px]"
            >
              From a simple idea to a <Marked>complete restaurant solution.</Marked>
            </h2>

            <p data-reveal className="mt-4 max-w-md text-xs leading-relaxed text-gray-600 md:text-[13px]">
              eatX started with a simple belief — that restaurant owners deserve better tools, not
              more problems. What began as a small idea has now grown into a platform used by 500+
              restaurants to manage orders, staff, inventory and more.
            </p>

            <div data-reveal className="mt-5">
              <ArrowButton href="#roles" className="px-4 py-2 text-[11px]">
                Learn More
              </ArrowButton>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== Block 3 — Our Values ===================== */}
      <div className="relative mx-auto max-w-5xl px-4 py-6 md:py-10">
        <div className="mx-auto max-w-lg text-center">
          <Eyebrow>Our Values</Eyebrow>
          <h2 data-reveal className="mt-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            What drives us forward
          </h2>
          <p data-reveal className="mt-1.5 text-xs text-gray-600">
            Our values shape every feature, decision and partnership.
          </p>
        </div>

        <div ref={valuesGrid} className="relative mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, text, tone }) => (
            <article
              key={title}
              data-value
              className="group flex flex-col items-center text-center opacity-0"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-2xs transition duration-200 group-hover:-translate-y-1 ${tone}`}
              >
                <Icon size={18} />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-gray-900">{title}</h3>
              <p className="mt-1 max-w-[190px] text-[11px] leading-normal text-gray-500">{text}</p>
            </article>
          ))}
        </div>

        {/* handwritten decoration */}
        <div
          aria-hidden
          className={`${hand.className} pointer-events-none absolute -right-2 -top-2 hidden -rotate-12 text-3xl font-semibold leading-none text-gray-300 xl:block`}
        >
          Better
          <br />
          <span className="ml-4 inline-block text-primary/70">Together</span>
        </div>
      </div>
    </section>
  );
}