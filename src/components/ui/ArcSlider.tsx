"use client";

import { useRef } from "react";
import Image from "next/image";
import { ARC_LOGOS } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";

export default function ArcSlider({ children }: { children?: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const guide = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const nodes = gsap.utils.toArray<HTMLElement>("[data-arc]", el);
      const n = nodes.length;
      const state = { p: 0 };

      gsap.set(nodes, { xPercent: -50, yPercent: -50 });

      const place = () => {
        const w = el.clientWidth;
        const size = gsap.utils.clamp(36, 56, w / 14);
        const R = w / 2 - size;
        const cx = w / 2;
        const cy = size / 2; // flat edge is now at the TOP

        if (guide.current) {
          gsap.set(guide.current, { left: size, right: size, top: size / 2, bottom: size / 2 });
        }

        nodes.forEach((node, i) => {
          const t = (i / n + state.p) % 1; // 0 = left end, 1 = right end
          const a = Math.PI * (1 - t);
          const edge = Math.min(t, 1 - t);
          gsap.set(node, {
            width: size,
            height: size,
            x: cx + Math.cos(a) * R,
            y: cy + Math.sin(a) * R, // + instead of - : arc bows downward
            opacity: gsap.utils.clamp(0, 1, edge * 8),
            scale: 0.8 + Math.sin(Math.PI * t) * 0.25,
          });
        });
      };

      place();

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const spin = reduce
        ? null
        : gsap.to(state, { p: 1, duration: 20, ease: "none", repeat: -1, onUpdate: place });

      const slow = () => spin && gsap.to(spin, { timeScale: 0.5, duration: 0.6 });
      const normal = () => spin && gsap.to(spin, { timeScale: 1, duration: 0.6 });
      el.addEventListener("mouseenter", slow);
      el.addEventListener("mouseleave", normal);
      window.addEventListener("resize", place);

      return () => {
        el.removeEventListener("mouseenter", slow);
        el.removeEventListener("mouseleave", normal);
        window.removeEventListener("resize", place);
      };
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative mx-auto aspect-[2/1] w-full max-w-6xl">
      {/* half-circle guide: flat side on top, dome below */}
      <div
        ref={guide}
        className="absolute rounded-b-full border border-t-0 border-dashed border-gray-900/20" />

      {/* center logo on the flat edge */}
      {/* <div cclassName="absolute left-1/2 top-0 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white shadow-2xl sm:h-20 sm:w-20">
        X
      </div> */}

      {/* text inside the half circle */}
      <div className="absolute left-1/2 top-[3%] w-[54%] -translate-x-1/2 text-center sm:top-[22%] sm:w-[58%]">
        {children}
      </div>

      {/* logos */}
      {ARC_LOGOS.map(({ src, label }, i) => (
        <div
          key={src}
          data-arc
          title={label}
          className="absolute left-0 top-0 flex items-center justify-center overflow-hidden rounded-full border border-gray-900/10 bg-white shadow-lg"
        >
          <Image
            src={src}
            alt={label}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}