interface Props {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "left";
}

export default function SectionHeading({ eyebrow, title, text, align = "center" }: Props) {
  return (
    <div className={`mx-auto max-w-2xl ${align === "center" ? "text-center" : "text-left"}`}>
      <span
        data-reveal
        className="inline-block rounded-full border border-gray-900/10 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wider text-gray-600"
      >
        {eyebrow}
      </span>
      <h2
        data-reveal
        className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-balance text-gray-900 md:text-5xl"
      >
        {title}
      </h2>
      {text && (
        <p data-reveal className="mt-4 text-gray-600">
          {text}
        </p>
      )}
    </div>
  );
}