"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { scrollToSection } from "@/lib/scrollToSection";

type Variant = "primary" | "dark" | "light";

const STYLES: Record<Variant, string> = {
  primary: "bg-primary text-white shadow-lg shadow-primary/25",
  dark: "bg-gradient text-white",
  light: "bg-white text-foreground",
};

interface ArrowButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}

export default function ArrowButton({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: ArrowButtonProps) {
  const arrow = useRef<HTMLSpanElement>(null);

  const show = () =>
    gsap.to(arrow.current, { x: 0, width: 22, opacity: 1, duration: 0.4, ease: "power3.out", overwrite: "auto" });

  const hide = () =>
    gsap.to(arrow.current, { x: -14, width: 0, opacity: 0, duration: 0.3, ease: "power3.inOut", overwrite: "auto" });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    // In-page anchors scroll smoothly instead of jumping
    if (href.startsWith("#")) {
      e.preventDefault();
      requestAnimationFrame(() => scrollToSection(href));
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      className={`inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold transition-[filter] hover:brightness-110 ${STYLES[variant]} ${className}`}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span
        ref={arrow}
        aria-hidden
        className="inline-flex justify-end overflow-hidden"
        style={{ width: 0, opacity: 0, transform: "translateX(-14px)" }}
      >
        <ArrowRight size={16} className="shrink-0" />
      </span>
    </Link>
  );
}
