"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { offerings } from "@/data/content";
import { display, sectionHeading, sectionLabel, sectionLead } from "@/lib/ui";

gsap.registerPlugin(ScrollTrigger);

const restRotates = [-3, 2, 2.25, -1.75, 2.75, -2] as const;

const cardTone = {
  card: "bg-[#214264] text-white",
  mute: "text-white/85",
  num: "text-white/22",
  icon: "text-white",
} as const;

const icons = [
  <svg key="web" viewBox="0 0 40 40" fill="none" className="size-7">
    <rect x="5" y="8" width="30" height="22" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 14h30M12 8v6M20 8v6M28 8v6" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  <svg key="landing" viewBox="0 0 40 40" fill="none" className="size-7">
    <rect x="8" y="5" width="24" height="30" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 12h12M14 18h12M14 24h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="portfolio" viewBox="0 0 40 40" fill="none" className="size-7">
    <rect x="5" y="10" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="22" y="10" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="5" y="24" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="22" y="24" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  <svg key="mobile" viewBox="0 0 40 40" fill="none" className="size-7">
    <rect x="12" y="4" width="16" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 30h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="saas" viewBox="0 0 40 40" fill="none" className="size-7">
    <rect x="4" y="8" width="32" height="22" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 14h32M10 20h8M10 25h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="ai" viewBox="0 0 40 40" fill="none" className="size-7">
    <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 10v4M20 26v4M10 20h4M26 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="20" cy="20" r="3.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
];

export function Help() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(section.querySelectorAll("[data-offer-head]"), { clearProps: "opacity,transform" });
      Array.from(section.querySelectorAll<HTMLElement>("[data-offer-card]")).forEach((card, i) => {
        gsap.set(card, { opacity: 1, rotate: restRotates[i] ?? 0 });
      });
      return;
    }

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-offer-card]"));
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-offer-head]"),
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%" },
        },
      );

      cards.forEach((card, i) => {
        const restRotate = restRotates[i] ?? 0;
        gsap.fromTo(
          card,
          { y: 72, opacity: 0, rotate: restRotate * 2.4, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            rotate: restRotate,
            scale: 1,
            duration: 1,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: "[data-offerings-grid]", start: "top 82%" },
          },
        );

        const icon = card.querySelector<HTMLElement>("[data-offer-icon]");
        const onEnter = () => {
          gsap.to(card, {
            y: -10,
            scale: 1.03,
            rotate: 0,
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
          });
          if (icon) {
            gsap.to(icon, {
              rotate: 8,
              scale: 1.12,
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        };
        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotate: restRotate,
            duration: 0.55,
            ease: "power3.out",
            overwrite: "auto",
          });
          if (icon) {
            gsap.to(icon, {
              rotate: 0,
              scale: 1,
              duration: 0.55,
              ease: "elastic.out(1, 0.5)",
              overwrite: "auto",
            });
          }
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }, section);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="help"
      ref={sectionRef}
      className="relative z-1 overflow-hidden bg-[#f4f7fb] px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(2.75rem,6vw,4.25rem)] text-ink"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 size-[min(55vw,420px)] rounded-full bg-[rgba(255,79,45,0.08)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-20 size-[min(50vw,380px)] rounded-full bg-[rgba(33,66,100,0.1)] blur-3xl"
      />

      <div className="relative mx-auto max-w-350">
        <div className="mb-[clamp(1.35rem,3vw,2rem)] grid gap-4 min-[900px]:grid-cols-[1fr_0.85fr] min-[900px]:items-end">
          <div>
            <p data-offer-head className={`${sectionLabel} opacity-0`}>
              Help
            </p>
            <h2
              data-offer-head
              className={`${sectionHeading} mt-2 max-w-[14ch] text-ink opacity-0`}
            >
              What I can help you with.
            </h2>
          </div>
          <p
            data-offer-head
            className={`${sectionLead} mb-0 max-w-[36ch] text-(--ink-muted) opacity-0 min-[900px]:justify-self-end min-[900px]:text-right`}
          >
            From a focused landing page to a full product — I design and ship the thing you need
            next.
          </p>
        </div>

        <div
          data-offerings-grid
          className="grid grid-cols-1 gap-x-3.5 gap-y-5 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3 min-[1100px]:gap-x-4 min-[1100px]:gap-y-6"
        >
          {offerings.map((item, i) => {
            return (
              <article
                key={item.title}
                data-offer-card
                className={`group relative flex min-h-53 cursor-default flex-col justify-between overflow-hidden rounded-[1.35rem] p-[clamp(1rem,2.2vw,1.25rem)] opacity-0 will-change-transform ${cardTone.card}`}
              >
                <span
                  aria-hidden
                  className={`${display} pointer-events-none absolute -right-1 -bottom-2 text-[clamp(3.4rem,7vw,4.75rem)] leading-none select-none ${cardTone.num}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex items-start justify-between gap-3">
                  <span
                    data-offer-icon
                    className={`inline-flex ${cardTone.icon} will-change-transform`}
                  >
                    {icons[i]}
                  </span>
                  <span
                    className={`text-[0.65rem] font-semibold tracking-[0.18em] uppercase ${cardTone.mute}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative mt-5">
                  <h3
                    className={`${display} m-0 text-[clamp(1.1rem,2vw,1.4rem)] leading-[0.95] uppercase`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2 m-0 max-w-[28ch] text-[0.82rem] leading-[1.45] ${cardTone.mute}`}
                  >
                    {item.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
