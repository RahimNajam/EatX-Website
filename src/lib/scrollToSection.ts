import { ScrollSmoother } from "@/lib/gsap";

/** Space kept above a section so the fixed navbar doesn't cover its heading */
const NAV_OFFSET = 88;

/**
 * Smoothly scrolls to an in-page anchor like "#pricing".
 * Goes through ScrollSmoother when it's active (native hash jumps fight it),
 * and falls back to native smooth scrolling otherwise (e.g. reduced motion).
 *
 * If the target is a tab button marked with `data-tab-anchor` (e.g. "#pos"),
 * the tab is activated and its parent section is scrolled into view.
 *
 * Returns false when the href is not an in-page anchor, so callers can let the browser navigate.
 */
export function scrollToSection(href: string): boolean {
  if (!href.startsWith("#")) return false;
  if (href === "#") return true; // placeholder link: nothing to scroll to yet

  if (href === "#top") {
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(0, true);
    else window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", window.location.pathname);
    return true;
  }

  const el = document.getElementById(decodeURIComponent(href.slice(1)));
  if (!el) return true;

  if (el.matches("[data-tab-anchor]")) el.click();
  const target = el.matches("[data-tab-anchor]") ? (el.closest("section") ?? el) : el;

  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(target, true, `top ${NAV_OFFSET}px`);
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }

  // keep the URL shareable without triggering a native jump
  history.replaceState(null, "", href);
  return true;
}
