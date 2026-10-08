"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ArrowButton from "@/components/ui/ArrowButton";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "@/lib/scrollToSection";

// Clean Type Definition
type NavItem = {
  label: string;
  links: { label: string; href: string }[];
};

// In-page section anchors. "#" = no section for it yet.
const NAV_ITEMS: NavItem[] = [
  {
    label: "Company",
    links: [
      { label: "About us", href: "#about" },
      { label: "Customer stories", href: "#testimonials" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    label: "Platform",
    links: [
      { label: "Live Web Ordering", href: "#platform" },
      { label: "Self Kiosk", href: "#services" },
      { label: "Cloud & Offline POS", href: "#pos" },
      { label: "Inventory", href: "#inventory" },
    ],
  },
  {
    label: "Plans & Support",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "Help center", href: "#faq" },
    ],
  },
];

const STACK_IMAGES = [
  "/logos/client2.webp",
  "/logos/client3.webp",
  "/logos/client4.webp",
  "/logos/client5.webp",
  "/logos/client6.webp",
  "/logos/client7.webp",
];

const platform = NAV_ITEMS.find((i) => i.label === "Platform")!;
const others = NAV_ITEMS.filter((i) => i.label !== "Platform");

/* ---------- Moving image stack ---------- */
function ImageStack({ active }: { active: boolean }) {
  const [step, setStep] = useState(0);
  const n = STACK_IMAGES.length;

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setStep((s) => s + 1), 1800);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="relative mx-auto h-44 w-64 rounded-[2rem] bg-white/5">
      {STACK_IMAGES.map((src, i) => {
        const pos = (((i - step) % n) + n) % n; // 0 = front card
        return (
          <div
            key={src}
            className="absolute left-8 top-6 h-28 w-40 overflow-hidden rounded-lg border border-white/10 bg-neutral-800 shadow-lg transition-all duration-700 ease-[cubic-bezier(.76,0,.24,1)]"
            style={{
              transform: `translate(${pos * 14}px, ${pos * 10}px) scale(${1 - pos * 0.04})`,
              zIndex: n - pos,
              opacity: pos === n - 1 ? 0.5 : 1,
            }}
          >
            <Image src={src} alt="" fill sizes="160px" className="object-cover" />
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Menu link ---------- */
function MenuLink({ href, label, onGo }: { href: string; label: string; onGo: (href: string) => void }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onGo(href);
      }}
      className="hover-underline-animation left inline-block py-4 text-2xl tracking-tight transition hover:text-primary"
    >
      {label}
    </a>
  );
}

/* ---------- Navbar ---------- */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // route change par menu band (adjust state during render instead of in an effect)
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  // Esc se band + body scroll lock
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

  // Close the menu first, then scroll once the body scroll-lock has been released
  const go = (href: string) => {
    close();
    requestAnimationFrame(() => scrollToSection(href));
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      {/* backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 -z-10 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Bar + panel: same container, width animate hoti hai */}
      <div
        className="mx-auto overflow-hidden rounded-[2rem] bg-neutral-900 text-white shadow-2xl shadow-black/20 transition-[max-width] duration-500 ease-[cubic-bezier(.76,0,.24,1)]"
        style={{ maxWidth: open ? "100%" : "42rem" }}
      >
        {/* top bar: Menu | Logo | Get Started */}
        <nav className="grid h-16 grid-cols-[auto_1fr_auto] items-center px-3 sm:grid-cols-3">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="flex w-fit items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition hover:bg-white/10"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
            {open ? "Close" : "Menu"}
          </button>

          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("#top");
            }}
            className="flex items-center justify-center gap-2"
          >
            <div className="flex flex-col items-start leading-none">
              {/* Main Brand Text */}
              <span className="text-3xl font-bold tracking-tight">
                eat<span className="text-primary">X</span>
              </span>
            </div>
          </a>

          <ArrowButton href="#pricing" onClick={close} className="justify-self-end px-5 py-2.5">
            Get Started
          </ArrowButton>
        </nav>

        {/* dropdown panel */}
        <div
          id="site-menu"
          className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.76,0,.24,1)] ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
          inert={!open}
        >
          <div className="overflow-hidden">
            <div className="max-h-[calc(100vh-7.5rem)] overflow-y-auto border-t border-white/10 p-3">
              <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1.1fr]">

                {/* Platform Links */}
                <div className="rounded-2xl bg-white/5 p-6 sm:p-8">
                  <p className="mb-6 text-xs text-white/50">{platform.label}</p>
                  <ul>
                    {platform.links.map((l) => (
                      <li key={l.label}>
                        <MenuLink href={l.href} label={l.label} onGo={go} />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company + Plans & Support Links */}
                <div className="p-6 sm:p-8">
                  {others.map((group) => (
                    <div key={group.label} className="mb-8 last:mb-0">
                      <p className="mb-4 text-xs text-white/50">{group.label}</p>
                      <ul>
                        {group.links.map((l) => (
                          <li key={l.label}>
                            <MenuLink href={l.href} label={l.label} onGo={go} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Featured card */}
                <div className="flex flex-col items-center gap-6 rounded-2xl bg-white/5 p-6 text-center sm:p-8">
                  <p className="text-xs text-white/50">Start with eatX</p>
                  <h3 className="max-w-xs text-3xl font-medium leading-tight tracking-tight">
                    Run your whole restaurant from one place
                  </h3>
                  <ImageStack active={open} />
                  <ArrowButton href="#platform" onClick={close}>
                    More info
                  </ArrowButton>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
