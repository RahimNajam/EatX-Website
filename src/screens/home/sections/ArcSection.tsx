import ArcSlider from "@/components/ui/ArcSlider";
import { PLACEHOLDER } from "@/data/content";

export default function ArcSection() {
  return (
    <section id="integrations" className="overflow-hidden bg-light">
      <div className="mx-auto max-w-6xl px-4 pb-12 ">
        <div data-reveal>
          <ArcSlider>
            <span className="inline-block rounded-full border border-gray-900/10 bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-600 sm:text-xs">
              Integrations
            </span>
            <h2 className="mt-2 text-[15px] font-semibold leading-tight sm:mt-3 sm:text-2xl tracking-tight text-balance text-gray-900 md:text-4xl">
              Your entire restaurant stack, fully connected
            </h2>
            <p className="mt-3 hidden text-sm text-gray-600 md:block">
              {PLACEHOLDER} One line about payments, delivery, printers and messaging.
            </p>
          </ArcSlider>
        </div>
      </div>
    </section>
  );
}