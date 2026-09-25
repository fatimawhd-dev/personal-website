"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { impact } from "@/data/content";
import { sectionLead } from "@/lib/ui";

gsap.registerPlugin(ScrollTrigger);

/**
 * Layout/animation
 * - cream radial field + drip transition
 * - rising title chars + clip-path badge
 * - rising paragraph words
 * - bottom pill stats bar (3 on mobile, all on desktop)
 */
export function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [stats, setStats] = useState(impact.stats);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => {
      setStats(mq.matches ? impact.stats.slice(0, 3) : impact.stats);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const badge = section.querySelector<HTMLElement>("[data-impact-badge]");
      if (badge) {
        badge.style.opacity = "1";
        badge.style.clipPath = "polygon(100% 0, 0 0, 0 100%, 100% 100%)";
      }
      return;
    }

    const titleChars = section.querySelectorAll<HTMLElement>("[data-impact-char]");
    const bodyWords = section.querySelectorAll<HTMLElement>("[data-impact-word]");
    const badge = section.querySelector<HTMLElement>("[data-impact-badge]");

    const ctx = gsap.context(() => {
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top center",
        },
      });

      contentTl
        .from(titleChars, {
          yPercent: 100,
          stagger: 0.02,
          ease: "power2.out",
        })
        .from(
          bodyWords,
          {
            yPercent: 300,
            rotate: 3,
            ease: "power1.inOut",
            duration: 1,
            stagger: 0.01,
          },
          "-=0.2",
        );

      if (badge) {
        gsap.set(badge, {
          opacity: 0,
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
        });
        gsap.to(badge, {
          duration: 1,
          opacity: 1,
          clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="impact"
      ref={sectionRef}
      aria-label="Impact"
      className="relative z-20 min-h-svh overflow-hidden 2xl:h-[120svh]"
      style={{
        backgroundImage: "radial-gradient(circle at 50% 40%, #f7f3eb, #d8e0ec)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 -mt-px leading-none" aria-hidden>
        <svg viewBox="0 0 1440 120" className="block w-full" preserveAspectRatio="none">
          <path
            fill="#061428"
            d="M0,0 H1440 V28 C1320,88 1180,110 1040,96 C900,82 820,28 700,36 C560,46 480,110 340,104 C200,98 120,48 0,64 Z"
          />
        </svg>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 md:h-2/3 2xl:h-full"
        style={{
          background: [
            "radial-gradient(ellipse 55% 50% at 62% 70%, rgba(6,20,40,0.14), transparent 70%)",
            "radial-gradient(ellipse 40% 35% at 28% 78%, rgba(255,79,45,0.12), transparent 65%)",
            "radial-gradient(ellipse 30% 28% at 78% 55%, rgba(120,160,210,0.22), transparent 60%)",
          ].join(", "),
        }}
      />

      <div className="relative z-10 flex flex-col justify-between gap-10 px-5 pt-32 pb-52 md:flex-row md:items-start md:justify-between md:gap-10 md:px-10 md:pt-40 md:pb-56 xl:pt-44">
        <div className="relative inline-block md:translate-y-8">
          <div className="relative flex flex-col items-start justify-center gap-4 font-[family-name:var(--font-loader),Arial_Black,sans-serif] text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.92] font-bold tracking-[-0.04em] uppercase md:gap-5">
            <div className="overflow-hidden">
              <h2 className="m-0 leading-[0.92] text-[#061428] md:whitespace-nowrap">
                {impact.title.split("").map((char, i) => (
                  <span
                    key={`impact-char-${char}-${i}`}
                    data-impact-char
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h2>
            </div>

            <div
              data-impact-badge
              className="-mt-2 -rotate-3 border-[0.4vw] border-[#e8e4d8] opacity-0 md:-mt-4"
              style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
            >
              <div className="bg-[#061428] px-[0.35em] pt-[0.12em] pb-[0.2em]">
                <p className="m-0 text-[1em] leading-none font-bold tracking-[-0.04em] text-[#f3efe6] uppercase">
                  {impact.badge}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center md:mt-6 md:justify-center md:pt-4">
          <div className="max-w-md overflow-hidden md:max-w-xs">
            <p className={`${sectionLead} text-balance text-[#3a4a62] md:text-right`}>
              {impact.body.split(" ").map((word, i) => (
                <span
                  key={`impact-word-${word}-${i}`}
                  data-impact-word
                  className="mr-[0.28em] inline-block will-change-transform last:mr-0"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 z-20 w-full px-5 md:bottom-16 md:px-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border-[0.5vw] border-[#dce3ee] bg-[#eef2f7] px-5 py-5 md:px-0 md:py-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative flex flex-1 flex-col items-center justify-center text-center"
            >
              <div>
                <p className="m-0 text-sm text-[#4a5a70] md:text-lg">{stat.label}</p>
                <p className="mt-2 font-[family-name:var(--font-loader),Arial_Black,sans-serif] text-2xl leading-none font-bold tracking-tighter text-[#061428] md:text-4xl">
                  {stat.amount}
                </p>
              </div>
              {index !== stats.length - 1 && (
                <div
                  aria-hidden
                  className="absolute top-1/2 right-0 h-16 w-px -translate-y-1/2 bg-[#9aabc0] md:h-24"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
