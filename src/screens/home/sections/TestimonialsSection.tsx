"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { REVIEWS, REVIEW_STATS } from "@/data/testimonials";
import { gsap, useGSAP } from "@/lib/gsap";

const pad = (n: number) => String(n).padStart(2, "0");

export default function TestimonialsSection() {
  const root = useRef<HTMLElement>(null);
  const busy = useRef(false);
  const dir = useRef(1); // 1 = next, -1 = previous
  const first = useRef(true);
  const [index, setIndex] = useState(0);
  const review = REVIEWS[index];

  // Animate IN every time the review changes (skipped on first load)
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      const d = dir.current;
      gsap.fromTo(
        "[data-rv-text]",
        { opacity: 0, x: 40 * d },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }
      );
      gsap.fromTo(
        "[data-rv-img]",
        { opacity: 0, scale: 1.08 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => {
            busy.current = false;
          },
        }
      );
    },
    { scope: root, dependencies: [index] }
  );

  // Animate OUT, then swap the review
  const go = (step: 1 | -1) => {
    if (busy.current) return;
    busy.current = true;
    dir.current = step;

    gsap.to("[data-rv-text]", { opacity: 0, x: -30 * step, duration: 0.3, ease: "power2.in" });
    gsap.to("[data-rv-img]", {
      opacity: 0,
      scale: 1.04,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => setIndex((i) => gsap.utils.wrap(0, REVIEWS.length, i + step)),
    });
  };

  return (
    <section id="testimonials" ref={root} className="overflow-hidden bg-light">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading eyebrow="Testimonials" title="Loved by restaurants across Pakistan" />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[0.8fr_1.7fr]">
          {/* Left: social proof + stats */}
          <div data-reveal className="flex flex-col justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {REVIEWS.slice(0, 3).map((r) => (
                  <span
                    key={r.name}
                    className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-light bg-white"
                  >
                    <Image src={r.image} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                ))}
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-light bg-white text-xs font-medium text-gray-800">
                  +243
                </span>
              </div>
              <div>
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-0.5 text-sm text-gray-600">Happy by 600+ restaurants</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {REVIEW_STATS.map((s) => (
                <div
                  key={s.label}
                  className={`rounded-2xl bg-white p-5 text-center shadow-sm ${s.wide ? "col-span-2" : ""}`}
                >
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: review card */}
          <div
            data-reveal
            className="grid overflow-hidden rounded-3xl bg-white p-2 shadow-lg shadow-black/5 sm:grid-cols-[0.9fr_1.1fr]"
          >
            {/* Logos are small squares: show them in a fixed square tile instead of stretching them to fill the panel */}
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-sidebar-primary to-page-soft sm:aspect-auto sm:min-h-[420px]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] bg-size-[18px_18px]" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />

              <div
                data-rv-img
                className="relative aspect-square w-3/5 max-w-60 overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/30 ring-4 ring-white/15"
              >
                <Image
                  src={review.image}
                  alt={review.name}
                  fill
                  sizes="(min-width: 640px) 240px, 60vw"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-8 p-6 sm:p-8">
              <div>
                <div data-rv-text className="space-y-4 text-lg leading-snug text-gray-900">
                  {review.quote.map((p, i) => (
                    <p key={i}>
                      {i === 0 ? "\u201C" : ""}
                      {p}
                      {i === review.quote.length - 1 ? "\u201D" : ""}
                    </p>
                  ))}
                </div>

                <div data-rv-text className="mt-6 flex items-center gap-3">
                  <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-gray-200">
                    <Image src={review.image} alt="" fill sizes="40px" className="object-cover" />
                  </span>
                  <p className="text-sm">
                    <span className="block font-semibold text-gray-900">{review.name}</span>
                    <span className="text-gray-500">{review.role}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => go(-1)}
                    aria-label="Previous review"
                    className="flex h-11 w-14 items-center justify-center rounded-full border border-gray-300 text-gray-800 transition hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Next review"
                    className="flex h-11 w-14 items-center justify-center rounded-full border border-gray-300 text-gray-800 transition hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>

                <p className="text-2xl text-gray-900">
                  {pad(index + 1)}
                  <span className="text-base text-gray-400">/{pad(REVIEWS.length)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}