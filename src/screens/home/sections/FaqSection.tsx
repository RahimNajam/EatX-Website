"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import ArrowButton from "@/components/ui/ArrowButton";
import { FAQS } from "@/data/content";
import { ScrollTrigger } from "@/lib/gsap";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpen((cur) => (cur === i ? null : i));
    setTimeout(() => ScrollTrigger.refresh(), 400);
  };

  return (
    <section id="faq" className="bg-[#f3f5f8] py-24 text-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Heading, Subtitle & CTA */}
          <div className="flex flex-col items-start justify-between lg:col-span-5">
            <div>
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-700 shadow-sm">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  ❖
                </span>
                Frequently Asked Questions
              </div>

              {/* Main Title */}
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                Frequently asked <br className="hidden sm:inline" />
                questions
              </h2>

              {/* Description */}
              <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-500">
                We&apos;ve gathered the most commonly asked questions to help you understand our services, workflow, pricing, and support.
              </p>
            </div>

            {/* Contact Us Button with Green Accent */}
            <div className="mt-8 lg:mt-12">
              <ArrowButton href="/contact">Contact Us</ArrowButton>
            </div>
          </div>

          {/* Right Column: White FAQ Accordion Cards */}
          <div className="space-y-4 lg:col-span-7">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  data-reveal
                  className={`overflow-hidden rounded-2xl bg-white shadow-sm ring-1 transition-all duration-300 ${
                    isOpen ? "ring-primary/30" : "ring-neutral-200/60"
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left font-semibold text-neutral-900 transition hover:text-primary"
                  >
                    <span className="text-lg sm:text-xl tracking-tight">{f.q}</span>
                    {isOpen ? (
                      <Minus size={20} className="shrink-0 text-primary" />
                    ) : (
                      <Plus size={20} className="shrink-0 text-primary/60" />
                    )}
                  </button>

                  {/* Animated Accordion Body */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden px-6 text-sm leading-relaxed text-neutral-500 sm:text-base">
                      <p className="pb-6 pt-1 border-t border-neutral-100/80">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}