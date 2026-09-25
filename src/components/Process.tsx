"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/data/content";
import { display, sectionHeading, sectionLabel, sectionLead } from "@/lib/ui";

gsap.registerPlugin(ScrollTrigger);

const cardTone: Record<(typeof processSteps)[number]["tone"], string> = {
  coral: "bg-[#ff4f2d] text-white",
  sand: "bg-[#d8e4f0] text-ink",
  teal: "bg-[#1a6b6b] text-white",
  ink: "bg-[#061428] text-white",
};

const accentOn: Record<(typeof processSteps)[number]["tone"], string> = {
  coral: "text-white/90",
  sand: "text-ink/70",
  teal: "text-white/85",
  ink: "text-[#e8e4d4]/80",
};

function StepArt({ tone }: { tone: (typeof processSteps)[number]["tone"] }) {
  const stroke = "currentColor";
  if (tone === "coral") {
    return (
      <svg viewBox="0 0 200 200" className="size-[min(48%,9.5rem)] opacity-90" aria-hidden>
        <circle cx="100" cy="100" r="54" fill="none" stroke={stroke} strokeWidth="3" />
        <circle cx="100" cy="100" r="8" fill={stroke} />
        <path d="M100 46v18M100 136v18M46 100h18M136 100h18" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <path d="M64 64l12 12M124 124l12 12M124 64l-12 12M64 124l12-12" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (tone === "sand") {
    return (
      <svg viewBox="0 0 200 200" className="size-[min(48%,9.5rem)] opacity-90" aria-hidden>
        <rect x="42" y="48" width="116" height="84" rx="14" fill="none" stroke={stroke} strokeWidth="3" />
        <path d="M62 78h76M62 98h52M62 118h64" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <path d="M70 148h60M100 132v28" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (tone === "teal") {
    return (
      <svg viewBox="0 0 200 200" className="size-[min(48%,9.5rem)] opacity-90" aria-hidden>
        <rect x="48" y="40" width="104" height="120" rx="14" fill="none" stroke={stroke} strokeWidth="3" />
        <path d="M70 72h60M70 96h44M70 120h52" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <path d="M78 152h44" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 200" className="size-[min(48%,9.5rem)] opacity-90" aria-hidden>
      <path d="M56 120c0-28 20-48 44-48s44 20 44 48" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <path d="M72 120h56M100 72v20" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <circle cx="100" cy="148" r="10" fill="none" stroke={stroke} strokeWidth="3" />
      <path d="M100 158v16" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const scroller = scrollerRef.current;
    if (!section || !pin || !scroller) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const getShift = () => {
      // Leave a little breathing room on the right after the last card
      return Math.max(0, scroller.scrollWidth - window.innerWidth + 48);
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        scroller,
        { x: 0 },
        {
          x: () => -getShift(),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top 5%",
            end: () => `+=${Math.max(window.innerHeight * 2.6, getShift() * 1.05)}`,
            scrub: 0.7,
            pin: pin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-label="How I forge an idea into a product"
      className="relative z-1 bg-[#f4f7fb] text-ink"
    >
      <div ref={pinRef} className="relative flex h-svh items-center overflow-hidden">
        <div
          ref={scrollerRef}
          className="flex w-max items-center gap-[clamp(3.5rem,7vw,5.5rem)] py-10 pl-[clamp(1.25rem,4vw,3.5rem)] pr-[min(12vw,5rem)] will-change-transform"
        >
          {/* Title fills leftover viewport so only the 1st card shows initially */}
          <div
            className="flex shrink-0 flex-col justify-center pr-2"
            style={{
              width:
                "max(17rem, calc(100vw - min(92vw, 650px) - clamp(3.5rem, 7vw, 5.5rem) - clamp(1.25rem, 4vw, 3.5rem) - 1.5rem))",
            }}
          >
            <p className={sectionLabel}>
              Process
            </p>
            <h2
              className={`${sectionHeading} mt-4 max-w-[12ch] text-ink`}
            >
              How I forge an idea into a product.
            </h2>
            <p className={`${sectionLead} mt-5 max-w-[36ch] text-(--ink-muted)`}>
              A four-part approach I use to move from a rough idea to a considered, working product —
              with clarity at every stage.
            </p>
          </div>

          {processSteps.map((step, i) => {
            const tilt = i % 2 === 0 ? "-rotate-[5deg]" : "rotate-[3.5deg]";
            return (
              <div
                key={step.title}
                className="flex w-[min(92vw,650px)] shrink-0 items-center justify-center px-3"
              >
                <article
                  data-process-card
                  className={`flex h-[min(62svh,520px)] w-full flex-col justify-between overflow-hidden rounded-4xl p-[clamp(1.25rem,3vw,1.75rem)] shadow-[0_24px_60px_rgba(6,20,40,0.14)] ${tilt} ${cardTone[step.tone]}`}
                >
                  <p
                    className={`m-0 text-[0.72rem] font-semibold tracking-[0.18em] uppercase ${accentOn[step.tone]}`}
                  >
                    {step.label}
                  </p>

                  <div className="flex flex-1 items-center justify-center py-3">
                    <StepArt tone={step.tone} />
                  </div>

                  <div>
                    <h3
                      className={`${display} m-0 text-[clamp(1.7rem,3.5vw,2.4rem)] uppercase leading-[0.95]`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-2 m-0 max-w-[26ch] text-[0.88rem] leading-[1.45] ${accentOn[step.tone]}`}
                    >
                      {step.body}
                    </p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
