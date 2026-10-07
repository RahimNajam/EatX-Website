"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, ScrollSmoother, useGSAP } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!wrapper.current || !content.current) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!reduce) {
        ScrollSmoother.create({
          wrapper: wrapper.current,
          content: content.current,
          smooth: 1.2,
          effects: true,
        });
      }

      content.current.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: Number(el.dataset.revealDelay ?? 0),
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
          }
        );
      });

      const t = setTimeout(() => ScrollTrigger.refresh(), 300);
      return () => clearTimeout(t);
    },
    { scope: wrapper }
  );

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}