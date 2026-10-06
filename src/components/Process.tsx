"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/data/content";
import { display, sectionHeading, sectionLabel, sectionLead } from "@/lib/ui";

gsap.registerPlugin(ScrollTrigger);

const cardFace: Record<(typeof processSteps)[number]["tone"], string> = {
  coral: "bg-[#f6d5c4]",
  sand: "bg-[#d5e4f6]",
  teal: "bg-[#d4ebe3]",
  ink: "bg-[#e4dff6]",
};

const stepArt: Record<(typeof processSteps)[number]["tone"], string> = {
  coral: "/process/frame.png",
  sand: "/process/outline.png",
  teal: "/process/realise.png",
  ink: "/process/grow.png",
};

function StepArt({ tone }: { tone: (typeof processSteps)[number]["tone"] }) {
  return (
    <Image
      src={stepArt[tone]}
      alt=""
      fill
      sizes="(max-width: 859px) 40vw, 380px"
      className="object-contain object-center"
    />
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
    const compactQuery = window.matchMedia("(max-width: 859px)");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        scroller,
        { x: 0 },
        {
          x: () => -getShift(),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: pin,
            // Phone: slide the cards sideways as the row scrolls through.
            // Pinning it in the center holds a short row on screen and leaves a tall gap.
            start: () => (compactQuery.matches ? "top 64%" : "top 5%"),
            end: () => {
              if (compactQuery.matches) return "bottom 40%";
              const shift = getShift();
              return `+=${Math.max(window.innerHeight * 2.6, shift * 1.05)}`;
            },
            scrub: 0.7,
            pin: compactQuery.matches ? false : pin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("portfolio:scroll-ready", refresh);
    return () => {
      window.removeEventListener("portfolio:scroll-ready", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-label="How I forge an idea into a product"
      className="relative z-1 bg-[#f4f7fb] text-ink"
    >
      <div ref={pinRef} className="relative flex items-center overflow-hidden py-6 min-[860px]:h-svh min-[860px]:py-0">
        <div
          ref={scrollerRef}
          className="flex w-max items-center gap-[clamp(3.5rem,7vw,5.5rem)] py-0 pl-[clamp(1.25rem,4vw,3.5rem)] pr-[min(12vw,5rem)] will-change-transform min-[860px]:py-10"
        >
          {/* Title fills leftover viewport so only the 1st card shows initially */}
          <div
            className="flex shrink-0 flex-col justify-center pr-2 max-[859px]:self-start max-[859px]:pt-1"
            style={{
              width:
                "max(17rem, calc(100vw - min(92vw, 780px) - clamp(3.5rem, 7vw, 5.5rem) - clamp(1.25rem, 4vw, 3.5rem) - 1.5rem))",
            }}
          >
            <p className={sectionLabel}>
              Process
            </p>
            <h2
              className={`${sectionHeading} mt-2 max-w-[12ch] text-ink min-[860px]:mt-4`}
            >
              How I forge an idea into a product.
            </h2>
            <p className={`${sectionLead} mt-3 max-w-[36ch] text-(--ink-muted) min-[860px]:mt-5`}>
              A four-part approach I use to move from a rough idea to a considered, working product —
              with clarity at every stage.
            </p>
          </div>

          {processSteps.map((step, i) => {
            const tilt = i % 2 === 0 ? "-rotate-[5deg]" : "rotate-[3.5deg]";
            return (
              <div
                key={step.title}
                className="flex w-[62vw] shrink-0 items-center justify-center px-1.5 min-[860px]:w-[min(92vw,780px)] min-[860px]:px-3"
              >
                <article
                  data-process-card
                  className={`relative flex h-60 w-full overflow-hidden rounded-[1.35rem] text-[#1c2430] shadow-[0_18px_44px_rgba(20,32,48,0.08)] min-[860px]:h-[min(62svh,520px)] min-[860px]:rounded-[1.75rem] ${tilt} ${cardFace[step.tone]}`}
                >
                  <div className="relative z-1 flex w-[52%] flex-col justify-between p-3.5 min-[860px]:w-[48%] min-[860px]:p-[clamp(1.75rem,3.2vw,2.5rem)]">
                    <p className="m-0 text-[0.55rem] font-semibold tracking-[0.14em] text-[#1c2430]/65 uppercase min-[860px]:text-[0.68rem] min-[860px]:tracking-[0.16em]">
                      {step.label}
                    </p>
                    <div className="mb-1 min-[860px]:mb-6">
                      <h3 className={`${display} m-0 text-[1.15rem] uppercase leading-[0.95] min-[860px]:text-[clamp(2.05rem,3.8vw,2.9rem)]`}>
                        {step.title}
                      </h3>
                      <p className="mt-1.5 m-0 max-w-[22ch] text-[0.68rem] leading-[1.35] text-[#1c2430]/75 min-[860px]:mt-3.5 min-[860px]:max-w-[26ch] min-[860px]:text-[1.05rem] min-[860px]:leading-[1.45]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-y-3 right-2 w-[54%] min-[860px]:inset-y-6 min-[860px]:right-6">
                    <StepArt tone={step.tone} />
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
