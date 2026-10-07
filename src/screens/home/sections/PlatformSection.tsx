"use client";

import { useRef } from "react";
import Image from "next/image";
import { PLATFORM_NODES } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";

export default function PlatformSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const cleanups: (() => void)[] = [];

      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
        const ax = 6 + (i % 3) * 4; // how far it drifts (px)
        const ay = 8 + (i % 2) * 5;

        const tween = gsap.to(el, {
          x: i % 2 ? ax : -ax,
          y: i % 3 ? -ay : ay,
          duration: 3 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // hover: float slows down (the scale effect is CSS on the inner element)
        const slow = () => gsap.to(tween, { timeScale: 0.15, duration: 0.4 });
        const normal = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
        el.addEventListener("mouseenter", slow);
        el.addEventListener("mouseleave", normal);
        cleanups.push(() => {
          el.removeEventListener("mouseenter", slow);
          el.removeEventListener("mouseleave", normal);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root }
  );

  return (
    <section id="platform" ref={root} className="overflow-hidden bg-light">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 lg:grid-cols-[1fr_1.2fr]">
        {/* Left text */}
        <div>
          <span
            data-reveal
            className="inline-block rounded-full border border-gray-900/10 bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-600"
          >
            All in one platform
          </span>
          <h2
            data-reveal
            className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-gray-900 md:text-5xl"
          >
            One system. Every restaurant operation.
          </h2>
          <p data-reveal className="mt-5 max-w-md text-gray-600">
            From front of house to back of house, eatX brings everything together in one powerful
            platform.
          </p>
        </div>

        {/* Right: image + floating round buttons */}
        <div data-reveal className="relative mx-auto aspect-[5/4] w-full max-w-xl">
          <span className="absolute inset-[10%] rounded-full border border-gray-900/10" />

          <div className="absolute left-1/2 top-1/2 w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-sidebar-primary p-1.5 shadow-2xl">
            <Image
              src="/images/platform-preview.svg"
              alt="eatX POS preview"
              width={1600}
              height={1000}
              sizes="(min-width: 1024px) 380px, 60vw"
              className="h-auto w-full rounded-lg"
            />
          </div>

          {PLATFORM_NODES.map(({ icon: Icon, title, text, tone, pos }) => (
            <div key={title} className={`absolute z-10 ${pos}`}>
              {/* GSAP moves this layer */}
              <div data-float className="cursor-default">
                {/* CSS hover moves this layer */}
                <div className="group flex items-center gap-2 sm:gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-lg shadow-black/10 transition duration-300 group-hover:scale-110 group-hover:shadow-xl sm:h-16 sm:w-16">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-white sm:h-12 sm:w-12 ${tone}`}
                    >
                      <Icon size={18} />
                    </span>
                  </span>
                  <span className="leading-tight transition duration-300 group-hover:translate-x-0.5">
                    <span className="block text-sm font-semibold text-gray-900">{title}</span>
                    <span className="hidden w-28 text-[11px] text-gray-500 sm:block">{text}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}