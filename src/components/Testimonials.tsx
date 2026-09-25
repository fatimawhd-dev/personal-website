"use client";

import { useLayoutEffect, useRef, useState, useEffectEvent } from "react";
import gsap from "gsap";
import { testimonials } from "@/data/content";
import { sectionLabel, sectionLead } from "@/lib/ui";

function QuoteChars({ text }: { text: string }) {
  const words = `" ${text} "`.split(" ");
  return (
    <>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block overflow-clip whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span
              key={`${wi}-${ci}`}
              data-letter
              className="letters inline-block will-change-transform"
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M15 5L8 12l7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const pendingEnter = useRef(false);
  const total = testimonials.length;
  const active = testimonials[index];

  useLayoutEffect(() => {
    if (!pendingEnter.current) return;
    pendingEnter.current = false;

    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBusy(false);
      return;
    }

    const letters = root.querySelectorAll<HTMLElement>("[data-letter]");
    gsap.set(letters, { yPercent: 120 });
    gsap.to(letters, {
      yPercent: 0,
      duration: 0.5,
      stagger: 0.001,
      ease: "power1.inOut",
    });

    gsap.fromTo(
      root.querySelectorAll("[data-quote-meta]"),
      { xPercent: -50, opacity: 0 },
      {
        xPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: () => setBusy(false),
      },
    );
  }, [index]);

  const changeQuote = useEffectEvent((newIndex: number) => {
    if (busy || newIndex === index) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIndex(newIndex);
      return;
    }

    const root = rootRef.current;
    if (!root) {
      setIndex(newIndex);
      return;
    }

    setBusy(true);

    const letters = root.querySelectorAll<HTMLElement>("[data-letter]");
    gsap.to(letters, {
      yPercent: -100,
      duration: 0.5,
      stagger: 0.001,
      ease: "power1.inOut",
    });

    gsap.to(root.querySelectorAll("[data-quote-meta]"), {
      xPercent: -50,
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut",
      onComplete: () => {
        pendingEnter.current = true;
        setIndex(newIndex);
      },
    });
  });

  const go = (dir: -1 | 1) => {
    changeQuote((index + dir + total) % total);
  };

  return (
    <section
      id="testimonials"
      ref={rootRef}
      aria-label="Testimonials"
      className="relative z-1 overflow-hidden bg-white px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(3.5rem,8vw,6rem)] text-ink"
    >
      <div className="mx-auto max-w-350 pb-[clamp(1.5rem,3vw,2.5rem)]">
        <div className="flex flex-col gap-6 min-[800px]:flex-row min-[800px]:items-end min-[800px]:justify-between">
          <p className={sectionLabel}>
            Testimonials
          </p>
          <p className={`${sectionLead} max-w-[36ch] text-(--ink-muted) min-[800px]:text-right`}>
            Here&apos;s what collaborators say about working together — their trust and the
            outcomes we ship are what matter most.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-[clamp(2.5rem,6vw,4rem)] flex max-w-350 flex-col items-center text-center">
        <div className="flex w-full max-w-4xl items-center justify-center min-h-[calc(clamp(1.35rem,3vw,2.25rem)*1.35*5)]">
          <p className="m-0 w-full text-[clamp(1.35rem,3vw,2.25rem)] leading-[1.35] font-semibold tracking-[-0.02em] text-ink">
            <QuoteChars key={index} text={active.quote} />
          </p>
        </div>

        <div className="mt-10 flex w-full max-w-2xl items-center justify-center gap-4 sm:gap-8">
          <button
            type="button"
            disabled={busy}
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-(--ink)/20 bg-transparent text-ink transition-[opacity,border-color] enabled:hover:border-(--ink)/50 disabled:opacity-40"
          >
            <Chevron dir="left" />
          </button>

          <div data-quote-meta className="min-w-0 flex-1 flex flex-col items-center will-change-transform">
            <p className="m-0 text-[1.05rem] font-bold text-ink">{active.name}</p>
            <p className="mt-1 m-0 text-[0.92rem] text-(--ink-muted)">{active.role}</p>
            <ul className="mt-4 m-0 flex list-none flex-wrap justify-center gap-2 p-0">
              {active.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-(--ink)/30 px-3 py-1 text-[0.68rem] tracking-[0.12em] uppercase text-(--ink-muted)"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            disabled={busy}
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-(--ink)/20 bg-transparent text-ink transition-[opacity,border-color] enabled:hover:border-(--ink)/50 disabled:opacity-40"
          >
            <Chevron dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
