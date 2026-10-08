"use client";

import { PLACEHOLDER } from "@/data/content";
import { scrollToSection } from "@/lib/scrollToSection";

// In-page section anchors. "#" = no section for it yet.
const COLS = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "#about" },
      { label: "Customer stories", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Web Ordering", href: "#platform" },
      { label: "Self Kiosk", href: "#services" },
      { label: "Cloud POS", href: "#pos" },
      { label: "Inventory", href: "#inventory" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Help", href: "#faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-900/10 bg-[#eaeceb] text-gray-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <p className="text-2xl font-bold">
            eat<span className="text-primary">X</span>{" "}
            <span className="text-sm font-normal text-gray-500">by Ygen</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-gray-600">{PLACEHOLDER} Short company blurb.</p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <p className="text-sm font-semibold">{c.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(l.href);
                    }}
                    className="transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t border-gray-900/10 py-6 text-center text-xs text-gray-500">
        Copyright eatX by Ygen © 2026
      </p>
    </footer>
  );
}
