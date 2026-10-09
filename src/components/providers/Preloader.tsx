"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        className="logo-path"
        d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"
      />
      <path className="logo-path" d="M7 2v20" />
      <path
        className="logo-path"
        d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"
      />
    </svg>
  );
}

const BRAND_NAME = "eatX";

/*
 * The small centered box the intro plays inside (sized via the `min()`
 * CSS below: 240x165, clamped on narrow viewports). Its bounds double as
 * the starting clip-path window for the reveal, so the box fading out and
 * the window growing read as the same object stretching outward. Keep this
 * in sync with the box's Tailwind classes further down.
 */
const BOX_RADIUS = 26;

const Z_BACKDROP = 9990;
const Z_CONTENT = 9995;
const Z_BOX = 9999;

/*
 * Safety net: the overlay is server-rendered, so if JS never takes over
 * (blocked dev server on a phone, script error, very slow network) a pure
 * CSS animation fades it out at this point. Keep in sync with the
 * `.preloader-failsafe` delay in globals.css.
 */
const FAILSAFE_MS = 8000;

/* Don't hold the reveal hostage to slow assets on mobile networks */
const MAX_LOAD_WAIT_MS = 4000;

/*
 * Hard ceiling from mount: if the intro/exit timelines haven't finished by
 * now (rAF paused while the phone tab was backgrounded, battery saver
 * throttling, a stalled tween), jump them to the end and hand the page back.
 * Plain setTimeout, so it doesn't depend on GSAP's rAF-driven ticker.
 */
const FORCE_FINISH_MS = 15000;

export default function Preloader({
  children,
}: {
  children: ReactNode;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [done, setDone] = useState(false);

  useEffect(() => {
    const content = contentRef.current;

    // JS is in control now: cancel the CSS failsafes and un-hide the page
    // (the failsafe sits on the backdrop and box, not their wrapper: an
    // animation on the wrapper would make it a stacking context and trap
    // their z-indexes)
    [backdropRef.current, boxRef.current, content].forEach((el) => {
      if (el) el.style.animation = "none";
    });
    if (content) content.style.visibility = "visible";

    /*
     * JS arrived too late: the CSS failsafe has already (or is about to)
     * hide the overlay, so skip the intro instead of re-locking the page.
     * setTimeout, not rAF: rAF doesn't run while a phone tab is backgrounded.
     */
    if (performance.now() > FAILSAFE_MS - 500) {
      const id = window.setTimeout(() => setDone(true), 0);
      return () => window.clearTimeout(id);
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const html = document.documentElement;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    /*
     * iOS Safari ignores overflow:hidden for touch scrolling, and
     * ScrollSmoother gives <body> the full page height, so a finger could
     * still scroll the page behind the preloader (and the reveal would then
     * open mid-page). Block the gestures outright while locked.
     */
    const blockScroll = (e: Event) => e.preventDefault();
    window.addEventListener("touchmove", blockScroll, { passive: false });
    window.addEventListener("wheel", blockScroll, { passive: false });

    // Anything scrolled before JS arrived (or restored by the browser) would
    // make the reveal open mid-page instead of on the Hero
    window.scrollTo(0, 0);

    const unlockScroll = () => {
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("touchmove", blockScroll);
      window.removeEventListener("wheel", blockScroll);
    };

    /*
     * While the preloader is active, the real page is pinned to the
     * viewport and clipped down to the small centered window. Releasing
     * these styles hands it back to normal document flow once the clip
     * path has fully opened (scroll is still locked at that point, so
     * there is no jump).
     */
    const lockContent = (clipPath: string) => {
      if (!content) return;
      content.style.position = "fixed";
      content.style.top = "0";
      content.style.left = "0";
      content.style.right = "0";
      content.style.bottom = "0";
      content.style.overflow = "hidden";
      content.style.zIndex = String(Z_CONTENT);
      content.style.clipPath = clipPath;
      content.style.willChange = "clip-path";
    };

    const releaseContent = () => {
      if (!content) return;
      content.style.position = "";
      content.style.top = "";
      content.style.left = "";
      content.style.right = "";
      content.style.bottom = "";
      content.style.overflow = "";
      content.style.zIndex = "";
      content.style.clipPath = "";
      content.style.willChange = "";
    };

    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGGeometryElement>(".logo-path");
      const letters = gsap.utils.toArray<HTMLElement>(".brand-letter");

      const heroVideo = gsap.utils.toArray<HTMLElement>(
        '[data-hero="video"]',
        document
      );

      const heroNavbar = gsap.utils.toArray<HTMLElement>(
        '[data-hero="navbar"]',
        document
      );

      const heroHeading = gsap.utils.toArray<HTMLElement>(
        '[data-hero="heading"]',
        document
      );

      const heroDashboard = gsap.utils.toArray<HTMLElement>(
        '[data-hero="dashboard"]',
        document
      );

      /*
       * ==========================================
       * CLIP-PATH WINDOW
       *
       * The box's size/radius are already established by
       * CSS (so the very first paint is correct, with no
       * JS-dependent flash). Reading its rendered bounds
       * here means the clip window always matches the box
       * pixel-for-pixel, on any viewport, with no duplicated
       * sizing math that could drift out of sync.
       * ==========================================
       */

      const boxRect = boxRef.current?.getBoundingClientRect();
      const insetX = boxRect?.left ?? 0;
      const insetY = boxRect?.top ?? 0;

      const clipStart = `inset(${insetY}px ${insetX}px round ${BOX_RADIUS}px)`;
      const clipEnd = "inset(0px 0px round 0px)";

      /*
       * ==========================================
       * INITIAL STATES
       * ==========================================
       */

      paths.forEach((path) => {
        const length = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      gsap.set(letters, {
        yPercent: 110,
      });

      gsap.set(".logo-wrap", {
        opacity: 0,
        scale: 0.75,
      });

      gsap.set(".brand-wrap", {
        opacity: 0,
        y: 15,
      });

      gsap.set(".brand-wrap h1", {
        letterSpacing: "0.38em",
      });

      lockContent(clipStart);

      if (!prefersReduced) {
        gsap.set(heroVideo, {
          autoAlpha: 0,
        });

        gsap.set(heroNavbar, {
          autoAlpha: 0,
          y: -20,
        });

        gsap.set(heroHeading, {
          autoAlpha: 0,
          y: 25,
        });

        gsap.set(heroDashboard, {
          autoAlpha: 0,
          y: 35,
        });
      }

      let windowLoaded = document.readyState === "complete";
      let introDone = false;
      let exited = false;
      let finished = false;
      let exitTl: gsap.core.Timeline | undefined;

      const onLoad = () => {
        windowLoaded = true;
        tryExit();
      };

      if (!windowLoaded) {
        window.addEventListener("load", onLoad);
      }

      const loadCap = window.setTimeout(onLoad, MAX_LOAD_WAIT_MS);

      /*
       * Hands the page back. Idempotent, so both the exit timeline and the
       * watchdog can call it.
       */
      const finish = () => {
        if (finished) return;

        finished = true;

        releaseContent();
        unlockScroll();
        ScrollTrigger.refresh();

        setDone(true);
      };

      /*
       * ==========================================
       * EXIT / WINDOW EXPANSION
       * ==========================================
       */

      const exit = () => {
        if (exited) return;

        exited = true;

        exitTl = gsap.timeline({
          onComplete: finish,
        });

        exitTl
          /*
           * Brief hold, then the intro content fades.
           */
          .to(
            [".logo-wrap", ".brand-wrap"],
            {
              opacity: 0,
              y: -8,
              duration: 0.35,
              ease: "power2.in",
            },
            "+=0.45"
          )

          /*
           * The small box itself dissolves right as the
           * window starts growing, so the handoff reads
           * as one continuous object stretching outward.
           */
          .to(
            boxRef.current,
            {
              opacity: 0,
              scale: 0.94,
              duration: 0.4,
              ease: "power2.in",
            },
            "<"
          )

          /*
           * =====================================
           * THE IMPORTANT PART
           *
           * The real page is clipped to a small
           * rounded window; growing the clip-path
           * reveals the Hero continuously as it
           * expands toward the viewport edges.
           * =====================================
           */
          .to(
            content,
            {
              clipPath: clipEnd,
              duration: 1.3,
              ease: "power4.inOut",
            },
            "<0.05"
          )

          /*
           * HERO BACKGROUND
           */
          .to(
            heroVideo,
            {
              autoAlpha: 1,
              duration: 0.8,
              ease: "power2.out",
              clearProps: "transform",
            },
            "-=1"
          )

          /*
           * NAVBAR
           */
          .to(
            heroNavbar,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              clearProps: "transform",
            },
            "-=0.7"
          )

          /*
           * HERO HEADING
           */
          .to(
            heroHeading,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "transform",
            },
            "-=0.6"
          )

          /*
           * DASHBOARD
           */
          .to(
            heroDashboard,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              clearProps: "transform",
            },
            "-=0.55"
          );

        if (prefersReduced) {
          exitTl.progress(1);
        }
      };

      /*
       * ==========================================
       * WAIT UNTIL BOTH LOADER + WEBSITE READY
       * ==========================================
       */

      // Event-driven (intro onComplete + window load), no per-frame polling
      function tryExit() {
        if (introDone && windowLoaded) {
          exit();
        }
      }

      /*
       * ==========================================
       * INTRO
       * ==========================================
       */

      const intro = gsap.timeline({
        onComplete: () => {
          introDone = true;
          tryExit();
        },
      });

      intro
        /*
         * Logo appears
         */
        .to(".logo-wrap", {
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
        })

        /*
         * Draw logo
         */
        .to(
          paths,
          {
            strokeDashoffset: 0,
            duration: 1.15,
            ease: "power2.inOut",
            stagger: 0.12,
          },
          "<"
        )

        /*
         * Logo glow
         */
        .to(".logo-wrap", {
          filter: "drop-shadow(0 0 16px rgba(219,18,36,0.75))",
          duration: 0.5,
          ease: "sine.inOut",
        })

        .to(".logo-wrap", {
          filter: "drop-shadow(0 0 4px rgba(219,18,36,0.25))",
          duration: 0.45,
          ease: "sine.inOut",
        })

        /*
         * Brand name appears
         */
        .to(
          ".brand-wrap",
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.4"
        )

        /*
         * Brand letters
         */
        .to(
          letters,
          {
            yPercent: 0,
            duration: 0.7,
            ease: "power4.out",
            stagger: 0.06,
          },
          "-=0.15"
        )

        /*
         * Letter-spacing settles from a wide premium
         * spread down to its resting tracking.
         */
        .to(
          ".brand-wrap h1",
          {
            letterSpacing: "0.08em",
            duration: 0.8,
            ease: "power3.out",
          },
          "<"
        );

      if (prefersReduced) {
        intro.progress(1);

        introDone = true;
        windowLoaded = true;

        exit();
      }

      /*
       * Watchdog: never leave the visitor stuck behind the preloader.
       */
      const watchdog = window.setTimeout(() => {
        intro.progress(1);
        introDone = true;
        windowLoaded = true;
        exit();
        exitTl?.progress(1);
        finish();
      }, FORCE_FINISH_MS);

      return () => {
        window.removeEventListener("load", onLoad);
        window.clearTimeout(loadCap);
        window.clearTimeout(watchdog);
      };
    }, boxRef);

    return () => {
      ctx.revert();
      releaseContent();
      unlockScroll();
    };
  }, []);

  return (
    <>
      {!done && (
        <div role="status" aria-label="Loading">
          {/* Dark wall behind the clipped page; shows through the window */}
          <div
            ref={backdropRef}
            aria-hidden
            className="preloader-failsafe fixed inset-0 overflow-hidden bg-[var(--contact-bg)]"
            style={{ zIndex: Z_BACKDROP }}
          >
            {/* navy -> maroon sweep, same palette as the Contact section */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--contact-bg)] from-30% via-[var(--contact-bg)] via-55% to-[var(--gradient)]" />
            {/* even dark overlay for depth */}
            <div className="absolute inset-0 bg-[var(--contact-overlay-dark)]" />
            {/* primary-tinted glows, bottom-right + faint top-left */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--contact-overlay-glow),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(39,4,12,0.55),transparent_50%)]" />
          </div>

          {/* Small centered box: logo + brand name, no progress indicator.
              Size/radius are plain CSS (via min()) so the very first paint
              already matches the intended shape, before any JS runs. */}
          <div
            ref={boxRef}
            className="preloader-failsafe fixed left-1/2 top-1/2 h-[min(165px,42vh)] w-[min(240px,84vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[26px] border-[1.5px] border-white/10 bg-gradient-to-b from-[var(--contact-card-bg-top)] to-[var(--contact-card-bg-bottom)] text-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7),0_0_40px_-10px_var(--contact-card-glow)] backdrop-blur-[16px]"
            style={{ zIndex: Z_BOX, willChange: "opacity, transform" }}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[70px]" />
            </div>

            <div className="relative flex h-full w-full flex-col items-center justify-center px-6">
              {/* Logo */}
              <div className="logo-wrap scale-75 text-primary opacity-0">
                <Logo className="h-12 w-12" />
              </div>

              {/* Brand: lowercase "eat" + bold primary "X", matching the
                  navbar's own wordmark, with a premium tracking-collapse
                  reveal rather than a plain static label. */}
              <div className="brand-wrap mt-4 translate-y-[15px] opacity-0">
                <h1
                  className="flex overflow-hidden text-2xl font-semibold tracking-[0.38em] sm:text-3xl"
                  aria-label={BRAND_NAME}
                >
                  {BRAND_NAME.split("").map((char, index) => (
                    <span
                      key={index}
                      className={`brand-letter inline-block ${
                        index === BRAND_NAME.length - 1
                          ? "text-primary"
                          : "text-white"
                      }`}
                    >
                      {char}
                    </span>
                  ))}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Website: pinned + clipped to the small window until the reveal finishes */}
      <div ref={contentRef} className="preloader-pending">
        {children}
      </div>
    </>
  );
}
