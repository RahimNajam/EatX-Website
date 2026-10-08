"use client";
import ArrowButton from "@/components/ui/ArrowButton";
import { memo, useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Tag,
  User,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { scrollToSection } from "@/lib/scrollToSection";

/* ------------------------------- content ------------------------------- */

const CONTACTS: { icon: LucideIcon; title: string; lines: string[]; note?: string }[] = [
  {
    icon: Phone,
    title: "Phone",
    lines: ["+92 300 123 4567"],
    note: "Mon – Fri, 9:00 AM – 6:00 PM",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@eatx.com"],
    note: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Our Office",
    lines: ["Plot 12, Block 5, Clifton", "Karachi, Pakistan"],
  },
];

const SUBJECTS = [
  "General Inquiry",
  "Product Demo",
  "Support",
  "Pricing & Plans",
  "Partnership",
];

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Clifton+Block+5+Karachi";

/* ------------------------------ sub-parts ------------------------------ */

const fieldBase =
  "h-14 w-full rounded-xl border border-white/[0.12] bg-[var(--contact-field-bg)] pl-[50px] pr-4 text-[15px] text-white placeholder:text-white/70 outline-none transition-[background-color,border-color,box-shadow] duration-200 hover:border-white/25 hover:bg-[var(--contact-field-bg-hover)] hover:shadow-[0_0_0_3px_var(--contact-field-ring)] focus:border-primary/70 focus:ring-2 focus:ring-primary/20";

function Field({
  icon: Icon,
  children,
  top = false,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  top?: boolean;
}) {
  return (
    <div className="relative">
      <Icon
        size={18}
        strokeWidth={1.7}
        className={`pointer-events-none absolute left-[18px] text-white/80 ${top ? "top-[18px]" : "top-1/2 -translate-y-1/2"}`}
      />
      {children}
    </div>
  );
}

const StylizedMap = memo(function StylizedMap() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 520"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--contact-map-bg-1)" />
          <stop offset="1" stopColor="var(--contact-map-bg-2)" />
        </linearGradient>
        <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="520" fill="url(#mapBg)" />

      {/* city blocks */}
      <g fill="var(--contact-map-block)" opacity="0.7">
        <path d="M20 30 L120 10 L150 90 L50 120 Z" />
        <path d="M170 20 L270 40 L250 120 L160 100 Z" />
        <path d="M290 50 L390 30 L380 130 L280 140 Z" />
        <path d="M40 150 L140 130 L170 220 L60 250 Z" />
        <path d="M200 150 L310 170 L290 260 L190 240 Z" />
        <path d="M60 280 L170 260 L200 350 L90 380 Z" />
        <path d="M230 290 L350 270 L360 360 L250 380 Z" />
      </g>

      {/* streets */}
      <g stroke="var(--contact-map-street-light)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9">
        <path d="M-10 130 L410 90" />
        <path d="M-10 250 L410 215" />
        <path d="M-10 370 L410 340" />
        <path d="M-10 470 L410 440" />
        <path d="M30 -10 L90 530" />
        <path d="M160 -10 L190 530" />
        <path d="M290 -10 L270 530" />
        <path d="M380 -10 L360 530" />
        <path d="M-10 60 L410 300" strokeWidth="1.2" opacity="0.6" />
        <path d="M100 -10 L400 420" strokeWidth="1.2" opacity="0.6" />
      </g>
      <g stroke="var(--contact-map-street-strong)" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.8">
        <path d="M-10 190 L410 160" />
        <path d="M225 -10 L215 530" />
      </g>

      <circle cx="222" cy="185" r="90" fill="url(#pinGlow)" />
    </svg>
  );
});

/* -------------------------------- header -------------------------------- */

const ContactHeader = memo(function ContactHeader() {
  const goTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection("#top");
  };

  return (
    <header className="flex h-auto min-h-[50px] flex-wrap items-center justify-between gap-3 sm:gap-4">
      <a href="#top" onClick={goTop} className="flex items-center gap-2.5" aria-label="EatX home">
        <Utensils size={30} strokeWidth={1.8} className="shrink-0 text-primary sm:size-[34px]" />
        <span className="text-[clamp(1.5rem,5vw,2.5rem)] font-extrabold tracking-tight">
          Eat<span className="text-primary">X</span>
        </span>
      </a>

      <div className="flex items-center gap-[22px]">
        <span className="hidden text-[15px] font-medium text-white md:block">
          Smart Restaurant Solutions
        </span>
        <span aria-hidden className="hidden h-0.5 w-8 rounded-full bg-primary md:block" />

        <ArrowButton
          href="#platform"
          className="group inline-flex h-10 items-center gap-2 rounded-full border border-primary bg-primary px-4 text-sm font-semibold text-white transition-colors md:h-[46px] md:px-[22px] md:text-[15px]"
        >
          Get Started
        </ArrowButton>
      </div>
    </header>
  );
});

/* ------------------------------ info column ------------------------------ */

const ContactInfoColumn = memo(function ContactInfoColumn() {
  return (
    <div className="lg:col-start-1">
      <p className="text-[clamp(1rem,2.5vw,1.25rem)] font-semibold uppercase tracking-[0.2em] text-primary">
        Get in Touch
      </p>
      <h2 className="mt-3 text-[clamp(2.25rem,6vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.01em]">
        We&apos;d Love to
        <br />
        <span className="text-primary">Hear From You</span>
      </h2>
      <p className="mt-5 max-w-[410px] text-[clamp(1rem,2vw,1.125rem)] leading-[26px] text-white/85">
        Have a question, suggestion, or need support? Our team is here to help. Reach out to us
        anytime and we&apos;ll get back to you as soon as possible.
      </p>

      {/* dotted curve + paper plane */}
      <svg
        aria-hidden
        viewBox="0 0 210 40"
        className="mt-7 h-10 w-[210px] text-primary"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 24 C 36 30, 76 36, 124 27 S 167 14, 180 11" strokeDasharray="2 4" strokeWidth="1.4" />
        <path d="M206 3 L162 20 L177 24 L182 38 L190 27 Z" strokeWidth="1.5" />
        <path d="M206 3 L177 24" strokeWidth="1.5" />
      </svg>

      <ul className="mt-[30px] space-y-4">
        {CONTACTS.map(({ icon: Icon, title, lines, note }) => (
          <li
            key={title}
            className="group -m-3 flex items-start gap-4 rounded-2xl border border-transparent p-3 transition-[transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/5"
          >
            <span className="relative flex h-[54px] w-[54px] shrink-0 transform-gpu items-center justify-center rounded-2xl border-[1.5px] border-primary/40 bg-gradient-to-b from-[var(--contact-icon-bg-top)] to-[var(--contact-icon-bg-bottom)] text-primary transition-[background-color,border-color,color] duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:shadow-[0_0_22px_-4px_rgba(219,18,36,0.65)] after:transition-opacity after:duration-300 group-hover:after:opacity-100">
              <Icon size={24} strokeWidth={1.8} />
            </span>
            <div className="min-w-0 text-base leading-snug">
              <p className="font-semibold text-white">{title}</p>
              {lines.map((l) => (
                <p key={l} className="mt-0.5 text-[17px] text-white/90">
                  {l}
                </p>
              ))}
              {note && <p className="mt-0.5 text-[13px] text-white/60">{note}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

/* -------------------------------- map card -------------------------------- */

const ContactMapCard = memo(function ContactMapCard() {
  return (
    <div className="group relative min-h-[320px] transform-gpu overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40 after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 after:shadow-[0_30px_70px_-16px_rgba(219,18,36,0.25)] after:transition-opacity after:duration-300 hover:after:opacity-100 sm:min-h-[420px] md:col-span-2 lg:col-span-1 lg:col-start-5 lg:mt-5 lg:min-h-[498px]">
      <StylizedMap />
      <div aria-hidden className="absolute inset-0 bg-black/10" />

      {/* pin */}
      <div className="absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 transform-gpu transition-transform duration-300 group-hover:-translate-y-[calc(50%_+_6px)] group-hover:scale-105">
        <svg width="56" height="72" viewBox="0 0 56 72" aria-hidden className="drop-shadow-[0_10px_14px_rgba(0,0,0,0.5)]">
          <defs>
            <linearGradient id="pinFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--contact-pin-fill-start)" />
              <stop offset="1" stopColor="var(--primary)" />
            </linearGradient>
          </defs>
          <path
            d="M28 2C14.2 2 3 13 3 26.6 3 44 28 70 28 70s25-26 25-43.4C53 13 41.8 2 28 2z"
            fill="url(#pinFill)"
          />
          <circle cx="28" cy="26" r="9" fill="var(--contact-pin-core)" />
          <circle cx="28" cy="26" r="4" fill="var(--contact-pin-inner)" />
        </svg>
      </div>

      {/* info card */}
      <div className="absolute inset-x-3 bottom-4 flex min-h-[160px] gap-[10px] rounded-[20px] border border-white/10 bg-[var(--contact-info-card-bg)] p-4 backdrop-blur-md sm:inset-x-4 sm:bottom-5 sm:min-h-[176px] sm:p-6">
        <div
          aria-hidden
          className="hidden h-[104px] w-[104px] shrink-0 rounded-xl bg-cover bg-center sm:block"
          style={{ backgroundImage: "url('/images/about/about-pos-counter.jpg')" }}
        />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[16px] font-semibold text-primary">
            <MapPin size={16} fill="currentColor" />
            Our Location
          </p>
          <p className="mt-[10px] text-[15px] leading-[22px] text-white/90">
            Plot 12, Block 5, Clifton
            <br />
            Karachi, Pakistan
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[14px] inline-flex h-[42px] flex-row items-center whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-3 gap-2 text-sm font-medium text-white transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-primary/70 hover:bg-primary/10"
          >
            <span className="text-xs">View on Google Maps</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
});

/* --------------------------------- form --------------------------------- */

type Status = "idle" | "sending" | "sent" | "error";

const ContactForm = memo(function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [e.target.name]: e.target.value })),
    [],
  );

  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // TODO: replace with your real endpoint, e.g.
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
      await new Promise((r) => setTimeout(r, 900));
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }, []);

  return (
    <div className="group relative transform-gpu rounded-[32px] border-[1.5px] border-white/10 bg-gradient-to-b from-[var(--contact-card-bg-top)] to-[var(--contact-card-bg-bottom)] p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-[16px] transition-colors duration-300 hover:border-primary/40 sm:p-[33px] lg:col-start-3 lg:mt-3">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 shadow-[0_0_40px_rgba(219,18,36,0.25)] transition-opacity duration-300 group-hover:opacity-100"
      />
      <span aria-hidden className="block h-[3px] w-[34px] rounded-full bg-primary" />
      <h3 className="mt-[22px] text-[clamp(1.375rem,3vw,1.75rem)] font-bold tracking-tight">
        Send Us a Message
      </h3>
      <p className="mt-[10px] text-[15px] text-white/80">
        Fill out the form below and we&apos;ll get back to you shortly.
      </p>

      <form onSubmit={onSubmit} className="mt-9 space-y-4" aria-describedby="contact-form-status">
        <div className="grid gap-[14px] sm:grid-cols-2">
          <Field icon={User}>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              placeholder="Full Name"
              aria-label="Full Name"
              autoComplete="name"
              className={fieldBase}
            />
          </Field>
          <Field icon={Mail}>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              placeholder="Email Address"
              aria-label="Email Address"
              autoComplete="email"
              className={fieldBase}
            />
          </Field>
        </div>

        <Field icon={Tag}>
          <select
            name="subject"
            value={form.subject}
            onChange={onChange}
            required
            aria-label="Subject"
            className={`${fieldBase} appearance-none pr-11 ${form.subject ? "" : "text-white/70"}`}
          >
            <option value="" disabled className="bg-[var(--contact-select-bg)]">
              Select Subject
            </option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s} className="bg-[var(--contact-select-bg)] text-white">
                {s}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/80"
          />
        </Field>

        <Field icon={MessageSquare} top>
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            required
            aria-label="Your Message"
            rows={5}
            placeholder="Your Message"
            className={`${fieldBase} h-[138px] resize-none py-4`}
          />
        </Field>

        <button
          type="submit"
          disabled={status === "sending"}
          className="group mt-5 flex h-14 w-full items-center justify-center gap-[10px] rounded-xl bg-primary text-base font-semibold text-white shadow-[0_10px_25px_-8px_rgba(219,18,36,0.5)] transition-[box-shadow,opacity,transform] duration-300 hover:shadow-[0_14px_32px_-8px_rgba(219,18,36,0.65)] active:scale-[0.99] disabled:opacity-70"
        >
          <Send size={18} strokeWidth={1.8} />
          {status === "sending" ? "Sending..." : "Send Message"}
          <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
        </button>

        <p
          id="contact-form-status"
          role="status"
          aria-live="polite"
          className={`mt-[22px] flex items-center justify-center gap-2 text-[13px] ${
            status === "sent"
              ? "text-emerald-400"
              : status === "error"
                ? "text-red-400"
                : "text-white/70"
          }`}
        >
          {status === "sent" ? (
            "Thanks! Your message has been sent."
          ) : status === "error" ? (
            "Something went wrong. Please try again."
          ) : (
            <>
              <Lock size={14} />
              Your information is safe with us.
            </>
          )}
        </p>
      </form>
    </div>
  );
});

/* ------------------------------- section ------------------------------- */

export default function ContactSection() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-[var(--contact-bg)] text-white">
      {/* background photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-30 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/about/contacbg.jpg')" }}
      />
      {/* left-to-right navy gradient so the photo reads on the right, text stays crisp on the left */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-gradient-to-r from-[var(--contact-bg)] from-25% to-[rgba(10,16,32,0)] to-55%"
      />
      {/* even dark overlay for readability */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[var(--contact-overlay-dark)]" />
      {/* faint primary-tinted glow, bottom-right */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,var(--contact-overlay-glow),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24 lg:px-[82px] lg:pb-24 lg:pt-32">
        <ContactHeader />

        <div className="mt-10 grid items-start gap-x-6 gap-y-10 md:grid-cols-2 lg:mt-10 lg:grid-cols-[210fr_43px_255fr_22px_202fr] lg:gap-x-0">
          <ContactInfoColumn />
          <ContactForm />
          <ContactMapCard />
        </div>
      </div>
    </section>
  );
}
