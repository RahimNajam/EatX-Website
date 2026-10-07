"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  /** Path without extension: expects `${src}.webm` and `${src}.mp4` in /public */
  src?: string;
  poster?: string;
  /** Dark overlay strength, 0 to 1 */
  overlay?: number;
}

/** Skip the video entirely for reduced-motion or data-saver users */
function shouldSkipVideo() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  return Boolean(conn?.saveData || conn?.effectiveType?.includes("2g"));
}

export default function VideoBackground({
  src = "/hero-video",
  poster = "/hero-poster.jpg",
  overlay = 0.4,
}: VideoBackgroundProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  // The <video> is only mounted once the hero is near the viewport, so it never competes with first paint
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (shouldSkipVideo()) return;
    const el = wrap.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          video.current?.play().catch(() => {});
        } else {
          // Pause off-screen so the browser stops decoding frames
          video.current?.pause();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${poster})` }}
    >
      {load && (
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={`${src}.webm`} type="video/webm" />
          <source src={`${src}.mp4`} type="video/mp4" />
        </video>
      )}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(0, 0, 0, ${overlay})` }} />

      {/* Maroon at the top, easing toward green at the bottom */}
      <div className="absolute inset-0 bg-linear-to-b from-[#27040C]/70 via-transparent to-[#042F2C]/80" />
    </div>
  );
}
