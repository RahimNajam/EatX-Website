"use client";
import ArrowButton from "@/components/ui/ArrowButton";
import { useState } from "react";
import { Check, ArrowRight, Star } from "lucide-react";

type PlanKey = "starter" | "pro" | "business";

interface PlanDetails {
  name: string;
  tagline: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  ctaUrl: string;
}

const PRICING_DATA: Record<PlanKey, PlanDetails> = {
  starter: {
    name: "Starter",
    tagline: "For single-outlet cafes & small eateries",
    description: "Essential POS and cloud menu features to get your restaurant up and running without hardware headaches.",
    monthlyPrice: 29,
    yearlyPrice: 23,
    features: [
      "1 Cloud POS Terminal",
      "Digital Menu & Web Ordering",
      "Real-time Sales Reporting",
      "Basic Inventory Tracking",
      "Email & Chat Support",
    ],
    ctaUrl: "/login?plan=starter",
  },
  pro: {
    name: "Pro",
    tagline: "For growing restaurants & busy kitchens",
    description: "Advanced kitchen display workflows, self-kiosk integrations, and deep inventory controls for high volume sales.",
    monthlyPrice: 79,
    yearlyPrice: 63,
    features: [
      "Up to 3 POS Terminals & KDS Support",
      "Live Web Ordering & Self Kiosk App",
      "Advanced Inventory & Waste Analytics",
      "Recipe & Ingredient Costing",
      "Staff Attendance & Shift Payroll",
      "24/7 Priority Support",
    ],
    ctaUrl: "/login?plan=pro",
  },
  business: {
    name: "Business",
    tagline: "For multi-branch chains & large enterprises",
    description: "Enterprise-grade multi-location management, custom API integrations, dedicated server clusters, and multi-currency billing.",
    monthlyPrice: 199,
    yearlyPrice: 159,
    features: [
      "Unlimited POS Terminals & Outlets",
      "Multi-Branch Centralized Dashboard",
      "Automated Stock Sync & Purchasing Orders",
      "Custom ERP & Payment Gateway Integrations",
      "Dedicated Account Manager & On-site Setup",
      "SLA Guarantee & Custom Analytics",
    ],
    ctaUrl: "/login?plan=business",
  },
};

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>("pro");

  const currentPlan = PRICING_DATA[selectedPlan];
  const activePrice = isYearly ? currentPlan.yearlyPrice : currentPlan.monthlyPrice;

  return (
    <section id="pricing" className="bg-light py-24 text-neutral-900 transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge & Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            Pricing Plans
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Simple pricing that scales with you
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-500">
            Upgrade anytime as your needs evolve, and stay focused on what matters most—running and expanding your restaurant with confidence.
          </p>

          {/* Monthly / Yearly Toggle Switch */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span
              onClick={() => setIsYearly(false)}
              className={`cursor-pointer text-sm font-medium transition-colors duration-300 ${
                !isYearly ? "text-neutral-900 font-semibold" : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              Monthly
            </span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isYearly ? "bg-primary" : "bg-neutral-300"
              }`}
              aria-label="Toggle Billing Period"
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${
                  isYearly ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </button>

            <span
              onClick={() => setIsYearly(true)}
              className={`cursor-pointer text-sm font-medium transition-colors duration-300 ${
                isYearly ? "text-neutral-900 font-semibold" : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              Yearly{" "}
              <span className="ml-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary transition-all duration-300">
                20% OFF
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Layout: Left Tabs vs Right Detail Card */}
        <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          
          {/* Left Column: Plan Selectors & Highlights */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            
            {/* Tab Buttons Box */}
            <div className="space-y-3 rounded-3xl bg-neutral-200/60 p-2.5 backdrop-blur-xs">
              {(Object.keys(PRICING_DATA) as PlanKey[]).map((key) => {
                const plan = PRICING_DATA[key];
                const isSelected = selectedPlan === key;

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedPlan(key)}
                    className={`group relative flex w-full items-center justify-between rounded-2xl p-5 text-left transition-all duration-300 ease-out ${
                      isSelected
                        ? "bg-page text-white shadow-md shadow-page/20 translate-x-1"
                        : "text-neutral-600 hover:bg-white/60 hover:text-neutral-900"
                    }`}
                  >
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                        {plan.name}
                        {isSelected && (
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        )}
                      </h3>
                      <p
                        className={`mt-1 text-xs transition-colors duration-300 ${
                          isSelected ? "text-white/70" : "text-neutral-500"
                        }`}
                      >
                        {plan.tagline}
                      </p>
                    </div>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isSelected
                          ? "bg-primary text-white md:shadow-sm md:shadow-primary/30 scale-100"
                          : "bg-transparent text-neutral-400 group-hover:text-primary scale-90"
                      }`}
                    >
                      <ArrowRight size={18} />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Trial & Review Badges */}
            <div className="space-y-4 px-2 pt-2">
              <div className="flex items-center gap-6 text-xs font-semibold text-neutral-600">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span>Cancel anytime</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-current" />
                  ))}
                </div>
                <div className="text-xs font-medium text-neutral-600">
                  <span className="font-bold text-neutral-900">4.9/5</span> rating from over 500+ restaurants
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Plan Display Card with Smooth Transitions */}
          <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-neutral-200/80 transition-all duration-500 ease-in-out lg:col-span-7 sm:p-10 hover:shadow-xl hover:ring-primary/30">
            
            {/* Top Badge & Dynamic Price */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-8 transition-all duration-300">
              <div>
                <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {currentPlan.name} Tier
                </span>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500 transition-opacity duration-300">
                  {currentPlan.description}
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl transition-all duration-300 transform">
                    ${activePrice}
                  </span>
                  <span className="text-sm font-medium text-neutral-500">/month</span>
                </div>
                <p
                  className={`mt-1 text-xs text-primary font-medium transition-all duration-300 ${
                    isYearly ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                  }`}
                >
                  Billed annually (Save ${ (currentPlan.monthlyPrice - currentPlan.yearlyPrice) * 12 }/yr)
                </p>
              </div>
            </div>

            {/* Main Action Button */}
            <div className="mt-8">
              <ArrowButton
                href={currentPlan.ctaUrl}
                className="w-full justify-center py-4 text-base"
              >
                Get Started with {currentPlan.name}
              </ArrowButton>
            </div>

            {/* Dynamic Features List with Smooth Fade Effect */}
            <div className="mt-10">
              <h4 className="text-xs font-bold tracking-wider text-neutral-900 uppercase">
                What&apos;s included in {currentPlan.name}:
              </h4>

              <ul className="mt-6 space-y-4">
                {currentPlan.features.map((feature, idx) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3.5 text-sm font-medium text-neutral-700 transition-all duration-300"
                    style={{
                      transitionDelay: `${idx * 40}ms`,
                    }}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary shadow-2xs">
                      <Check size={13} strokeWidth={2.5} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}