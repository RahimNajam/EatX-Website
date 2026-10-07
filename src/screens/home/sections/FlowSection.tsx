"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { FLOW_STEPS } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";

export default function FlowSection() {
  const root = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-flow]", row.current);

      gsap.fromTo(
        items,
        { opacity: 0, y: 30, scale: 0.85 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.6)",
          stagger: 0.35, // 1 -> arrow -> 2 -> arrow -> 3 ...
          scrollTrigger: { trigger: row.current, start: "top 80%", once: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section id="flow" ref={root} className="bg-page text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-24 lg:grid-cols-[0.8fr_1.6fr]">
        <div>
          <span
            data-reveal
            className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/70"
          >
            The complete flow
          </span>
          <h2 data-reveal className="mt-5 text-4xl font-semibold leading-tight tracking-tight">
            From order to insight
          </h2>
          <p data-reveal className="mt-5 max-w-sm text-white/65">
            Every step is connected. Every action matters. Here&apos;s how eatX keeps your
            restaurant running smoothly.
          </p>
        </div>

        <div
          ref={row}
          className="flex flex-wrap justify-center gap-y-6 lg:flex-nowrap lg:items-start"
        >
          {FLOW_STEPS.map(({ n, icon: Icon, title, text }, i) => (
            <div key={n} className="contents">
              {/* GSAP animates this layer (inline transform/opacity) */}
              <div data-flow className="w-1/2 px-1 opacity-0 sm:w-1/3 lg:w-auto lg:flex-1">
                {/* CSS hover lives on this layer so it never fights GSAP */}
                <div
                  tabIndex={0}
                  className="group/step h-full cursor-default rounded-2xl border border-transparent px-2 py-5 text-center outline-none transition duration-300 ease-out hover:-translate-y-1.5 hover:border-white/10 hover:bg-white/5 focus-visible:-translate-y-1.5 focus-visible:border-white/10 focus-visible:bg-white/5"
                >
                  {/* hover = lift + scale only: no color or shadow changes */}
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary ring-8 ring-white/5 transition-transform duration-300 ease-out group-hover/step:scale-110 group-focus-visible/step:scale-110">
                    <Icon size={24} />
                  </span>
                  <p className="mt-4 text-xs font-semibold text-primary">{n}</p>
                  <h3 className="mt-1 text-sm font-semibold">{title}</h3>
                  <p className="mt-2 text-xs text-white/55">{text}</p>
                </div>
              </div>

              {i < FLOW_STEPS.length - 1 && (
                <div data-flow className="hidden pt-10 text-primary opacity-0 lg:block">
                  <ArrowRight size={18} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}