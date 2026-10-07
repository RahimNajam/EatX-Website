"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { ROLE_CARDS } from "@/data/showcase";
import { gsap, useGSAP } from "@/lib/gsap";

export default function RolesSection() {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-role]",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: grid.current, start: "top 85%", once: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section id="roles" ref={root} className="bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <span
          data-reveal
          className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary"
        >
          Tailored for your team
        </span>
        <h2 data-reveal className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
          Built for every part of your restaurant
        </h2>
        <p data-reveal className="mt-3 text-gray-600">
          Different roles. One powerful system.
        </p>

        <div ref={grid} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROLE_CARDS.map(({ icon: Icon, title, image, points }) => (
            <article
              key={title}
              data-role
              className="group overflow-hidden rounded-2xl bg-white opacity-0 shadow-lg shadow-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-36 overflow-hidden bg-sidebar-primary">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 280px, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                </div>

                <ul className="mt-4 space-y-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={14} className="text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}