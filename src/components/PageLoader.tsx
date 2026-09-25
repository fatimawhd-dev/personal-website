"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function PageLoader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      window.dispatchEvent(new Event("portfolio:ready"));
      queueMicrotask(() => setVisible(false));
      return;
    }

    document.documentElement.classList.add("is-loading");

    const brand = root.querySelector<HTMLElement>("[data-loader-brand]");
    const name = root.querySelector<HTMLElement>("[data-loader-name]");
    const line = root.querySelector<HTMLElement>("[data-loader-line]");
    const role = root.querySelector<HTMLElement>("[data-loader-role]");
    const nameChars = root.querySelectorAll<HTMLElement>("[data-loader-char]");

    gsap.set(brand, { opacity: 1 });
    gsap.set(nameChars, { yPercent: 110 });
    gsap.set(line, { scaleX: 0 });
    gsap.set(role, { opacity: 0, y: 12 });

    const tl = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => {
        document.documentElement.classList.remove("is-loading");
        window.dispatchEvent(new Event("portfolio:ready"));
        setVisible(false);
      },
    });

    tl.to(
      nameChars,
      {
        yPercent: 0,
        duration: 0.85,
        stagger: 0.035,
        ease: "power3.out",
      },
      0.1,
    )
      .to(line, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, "-=0.45")
      .to(role, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }, "-=0.5")
      .to({}, { duration: 0.85 })
      .to(
        [name, line, role],
        {
          y: -28,
          opacity: 0,
          duration: 0.55,
          stagger: 0.04,
          ease: "power2.in",
        },
      )
      .to(
        root,
        {
          yPercent: -100,
          duration: 0.95,
          ease: "power4.inOut",
        },
        "-=0.15",
      );

    return () => {
      tl.kill();
      document.documentElement.classList.remove("is-loading");
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-200 grid place-items-center bg-black text-[#f2ece4] will-change-transform"
      aria-hidden
    >
      <div className="relative grid h-[clamp(4.5rem,14vw,9rem)] w-[min(92vw,1100px)] place-items-center">
        <div
          data-loader-brand
          className="absolute inset-0 flex flex-col items-center justify-center gap-[0.85rem] text-center opacity-0"
        >
          <div
            data-loader-name
            className="flex justify-center font-[family-name:var(--font-loader),Arial_Black,sans-serif] text-[clamp(3rem,12vw,7.2rem)] leading-[0.9] tracking-[0.08em] text-[#f2ece4] uppercase"
            aria-label="Fatima"
          >
            {"FATIMA".split("").map((char, i) => (
              <span key={`${char}-${i}`} className="inline-block overflow-hidden align-top">
                <span data-loader-char className="inline-block will-change-transform">
                  {char}
                </span>
              </span>
            ))}
          </div>
          <span
            data-loader-line
            className="block h-px w-[min(42vw,280px)] origin-center bg-[rgba(242,236,228,0.35)]"
          />
          <p
            data-loader-role
            className="m-0 font-[family-name:var(--font-body),system-ui,sans-serif] text-[clamp(0.68rem,1.4vw,0.82rem)] tracking-[0.28em] text-[rgba(242,236,228,0.55)] uppercase"
          >
            Full Stack Developer · 2026
          </p>
        </div>
      </div>
    </div>
  );
}
