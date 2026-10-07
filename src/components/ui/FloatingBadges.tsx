"use client";

import { useRef } from "react";
import { MousePointer2 } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

interface MagnetOptions {
  radius?: number;   // px: how close the cursor must be
  strength?: number; // 0..1: how much it follows
  max?: number;      // px: maximum travel
}

function useMagnet<T extends HTMLElement>({ radius = 200, strength = 0.4, max = 32 }: MagnetOptions = {}) {
  const ref = useRef<T>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const clamp = gsap.utils.clamp(-max, max);

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      // subtract the current offset so the badge doesn't chase its own movement
      const cx = r.left + r.width / 2 - Number(gsap.getProperty(el, "x"));
      const cy = r.top + r.height / 2 - Number(gsap.getProperty(el, "y"));
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      if (Math.hypot(dx, dy) < radius) {
        xTo(clamp(dx * strength));
        yTo(clamp(dy * strength));
      } else {
        xTo(0);
        yTo(0);
      }
    };
    const reset = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", reset);
    };
  }, []);

  return ref;
}

/** "Tax Forms" badge */
export function TaxFormsBadge({ label = "Tax Forms", className = "" }: { label?: string; className?: string }) {
  const ref = useMagnet<HTMLDivElement>();
  return (
    <div ref={ref} className={`z-20 ${className}`}>
      <div className="flex cursor-pointer select-none items-center gap-2 rounded-full bg-gradient py-1.5 pl-1.5 pr-4 text-sm font-medium text-white shadow-xl">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <MousePointer2 size={14} fill="currentColor" />
        </span>
        {label}
      </div>
    </div>
  );
}

/** "Invite" pill with a gentle idle bob */
export function InviteBadge({ className = "" }: { className?: string }) {
  const ref = useMagnet<HTMLDivElement>({ radius: 240, strength: 0.45, max: 36 });
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(inner.current, { y: -8, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
  }, []);

  return (
    <div ref={ref} className={`z-20 ${className}`}>
      <div
        ref={inner}
        className="flex select-none items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-xl"
      >
        <MousePointer2 size={14} fill="currentColor" className="-ml-1 " />
        Invite
      </div>
    </div>
  );
}