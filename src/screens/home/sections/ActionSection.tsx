"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { ACTION_TABS } from "@/data/showcase";
import { gsap, useGSAP } from "@/lib/gsap";

export default function ActionSection() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const tab = ACTION_TABS[active];

  // Runs on mount and every time the tab changes
  useGSAP(
    () => {
      gsap.fromTo(
        "[data-tab-text]",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: "power3.out" }
      );
      // image comes in from the far right edge
      gsap.fromTo(
        "[data-tab-image]",
        { opacity: 0, x: 160 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );
    },
    { scope: root, dependencies: [active] }
  );

  return (
    <section id="in-action" ref={root} className="overflow-hidden bg-light">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 lg:grid-cols-[0.8fr_1.5fr]">
        {/* Left: heading, tabs, tab text */}
        <div>
          <span
            data-reveal
            className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary"
          >
            Real product. Real results
          </span>
          <h2
            data-reveal
            className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl"
          >
            See eatX in action
          </h2>
          <p data-reveal className="mt-2 max-w-xs text-sm text-gray-600">
            Explore how eatX makes restaurant operations simpler, faster and more efficient.
          </p>

          {/* Tabs */}
          <div data-reveal className="mt-5 flex flex-wrap gap-2">
            {ACTION_TABS.map((t, i) => (
              <button
                key={t.id}
                id={t.id} // nav links like "#pos" open this tab (see scrollToSection)
                data-tab-anchor
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`scroll-mt-24 rounded-full px-5 py-2 text-xs font-semibold transition-colors duration-200 ${
                  active === i
                    ? "bg-primary text-white md:shadow-md md:shadow-primary/25"
                    : "bg-white text-gray-600 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab text */}
          <div className="mt-5">
            <h3 data-tab-text className="text-lg font-semibold text-gray-900">
              {tab.title}
            </h3>
            <p data-tab-text className="mt-1.5 text-sm text-gray-600">
              {tab.text}
            </p>
            <ul className="mt-3 space-y-1.5">
              {tab.points.map((p) => (
                <li key={p} data-tab-text className="flex items-center gap-2 text-xs text-gray-800">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                    <Check size={12} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: big image */}
        <div
          data-tab-image
          className="rounded-2xl bg-sidebar-primary p-1.5 shadow-2xl shadow-black/20 lg:translate-x-6"
        >
          <Image
            key={tab.id}
            src={tab.image}
            alt={`${tab.label} preview`}
            width={1600}
            height={800}
            sizes="(min-width: 1024px) 780px, 100vw"
            className="h-auto w-full rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}