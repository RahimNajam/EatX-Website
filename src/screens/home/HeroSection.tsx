"use client";

import { useRef } from "react";
import Image from "next/image";
import ArrowButton from "@/components/ui/ArrowButton";
import VideoBackground from "@/components/background/VideoBackground";
import { InviteBadge, TaxFormsBadge } from "@/components/ui/FloatingBadges";
import { gsap, useGSAP } from "@/lib/gsap";

// Apne logos public/logos/ folder me rakhein, aur yahan sahi file ka naam likhein
const BRAND_LOGOS = [

  { name: "Brand 2", src: "/logos/client3.webp" },
  { name: "Brand 3", src: "/logos/client2.webp" },
  { name: "Brand 4", src: "/logos/client4.webp" },
  { name: "Brand 5", src: "/logos/client5.webp" },
  { name: "Brand 6", src: "/logos/client6.webp" },
  { name: "Brand 7", src: "/logos/client7.webp" },
  { name: "Brand 8", src: "/logos/client8.webp" },
];

export default function HeroSection() {
  const hero = useRef<HTMLElement>(null);
  const fadeWrap = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        title.current,
        { opacity: 0, scale: 0.9, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, delay: 1.5, ease: "power3.out" }
      );

      gsap.to(fadeWrap.current, {
        opacity: 0,
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: hero.current,
          start: "top top",
          end: "+=450",
          scrub: true,
        },
      });
    },
    { scope: hero }
  );

  return (
    <section id="top" ref={hero} className="relative isolate overflow-hidden bg-[#27040C] pt-36 text-white">
      {/* Video covers the whole hero, image included */}
      <VideoBackground overlay={0.35} />

      {/* Centered content */}
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        {/* Brand logos trust badge */}
        <div className="inline-flex items-center gap-4 rounded-full border border-white/15 bg-white/10 py-1.5 pl-2 pr-5 backdrop-blur-md">
          <div className="flex items-center -space-x-2">
            {BRAND_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-[#042f2c] bg-white"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={35}
                  height={25}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          <p className="text-left text-xs font-medium leading-tight text-white/85">
            Trusted by <span className="font-bold text-white">600+</span> restaurants
            <br />
            across Pakistan.
          </p>
        </div>

        {/* Heading, paragraph, buttons */}
        <div ref={fadeWrap} className="flex flex-col items-center">
          <h1
            ref={title}
            className=" mt-8 text-5xl font-semibold leading-[1.05] tracking-tight opacity-0 [text-shadow:0_2px_4px_rgba(0,0,0,0.35),0_4px_24px_rgba(0,0,0,0.55)] sm:text-6xl md:text-7xl"
          >
            Smarter operations.
            <br />
            <span className="text-primary">Stronger</span> business.
          </h1>

          <p className="mt-6 max-w-xl text-base text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5),0_2px_16px_rgba(0,0,0,0.6)] sm:text-lg">
            Manage outlets, orders, inventory and reports, all from one operating system built for
            modern restaurants.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ArrowButton href="/login" variant="primary">
              Start Free
            </ArrowButton>
            <ArrowButton href="/demo" variant="primary">
              Book demo
            </ArrowButton>
          </div>
        </div>
      </div>

      {/* Dashboard image: sits on the hero's bottom edge and fades into the next section */}
      <div className="relative mx-auto mt-20 max-w-5xl px-4">
        <TaxFormsBadge className="absolute -left-2 bottom-40 z-30 hidden md:flex" />
        <InviteBadge className="absolute -right-2 top-28 z-30 hidden md:flex" />

        {/* No backdrop-blur here: blurring over a playing video re-renders every frame */}
        <div className="relative overflow-hidden rounded-t-3xl border border-b-0 border-white/10 bg-white/10 p-3 pb-0">
          <Image
            src="/hero-bg.jpg"
            alt="eatX merchant dashboard preview"
            width={1024}
            height={572}
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="h-auto w-full rounded-t-2xl"
          />

          {/* Masking gradient: transparent -> maroon tint -> solid section green */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-b from-transparent via-[#27040C]/60 to-[#042F2C]" />
        </div>
      </div>
    </section>
  );
}