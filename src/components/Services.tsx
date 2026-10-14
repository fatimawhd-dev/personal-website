"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/content";
import { sectionHeading, sectionLabel, silkGradient } from "@/lib/ui";

gsap.registerPlugin(ScrollTrigger);

const tonePos: Record<(typeof services)[number]["tone"], string> = {
  coral: "0% 20%",
  sand: "40% 50%",
  teal: "70% 30%",
  ink: "100% 70%",
};

const serviceArt: Record<(typeof services)[number]["tone"], string> = {
  coral: "/services/frontend.png",
  sand: "/services/backend.png",
  teal: "/services/cloud.png",
  ink: "/services/ux-and-tools.png",
};

function Doodle({ tone }: { tone: (typeof services)[number]["tone"] }) {
  return (
    <Image
      src={serviceArt[tone]}
      alt=""
      fill
      sizes="300px"
      className="object-contain p-2"
    />
  );
}

export function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    const stage = pin.querySelector<HTMLElement>("[data-services-stage]");
    const lift = pin.querySelector<HTMLElement>("[data-services-lift]");
    const cards = Array.from(pin.querySelectorAll<HTMLElement>("[data-service-card]"));
    if (!stage || !lift || !cards.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(cards, { y: 0, clearProps: "transform" });
      return;
    }

    const peek = () => {
      const raw = getComputedStyle(stage).getPropertyValue("--stack-peek").trim();
      const probe = document.createElement("div");
      probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;height:${raw || "4.5rem"}`;
      stage.appendChild(probe);
      const value = probe.offsetHeight;
      probe.remove();
      return value || 72;
    };

    const slideFrom = () => stage.offsetHeight;

    const segment = (i: number, which: "start" | "end") => {
      const total = Math.max(1, track.offsetHeight - window.innerHeight);
      const seg = total / Math.max(1, cards.length - 1);
      const offset = which === "start" ? seg * (i - 1) : seg * i;
      return `top+=${offset} top`;
    };

    const ctx = gsap.context(() => {
      gsap.set(lift, { y: 0 });

      cards.forEach((card, i) => {
        gsap.set(card, { zIndex: 10 + i, force3D: true });
        if (i === 0) {
          gsap.set(card, { y: 0 });
          return;
        }

        gsap.set(card, { y: slideFrom() });

        gsap.fromTo(
          card,
          { y: slideFrom },
          {
            y: 0,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: track,
              start: () => segment(i, "start"),
              end: () => segment(i, "end"),
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      // Transform-only lift (no margin/layout props — those cause scroll jank).
      gsap.fromTo(
        lift,
        { y: 0 },
        {
          y: () => {
            const full = peek() * (cards.length - 1);
            // Desktop keeps the full lift. On a phone the stack is shorter than
            // the screen, so only lift what would actually overflow — otherwise
            // the card jumps up and leaves a white gap above the next section.
            if (window.matchMedia("(min-width: 860px)").matches) return -full;
            const overflow = lift.scrollHeight - pin.clientHeight;
            return -Math.min(full, Math.max(0, overflow));
          },
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: track,
            start: () => segment(1, "start"),
            end: () => segment(cards.length - 1, "end"),
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    }, track);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      aria-label="Services"
      className="relative z-2 bg-white pt-[clamp(3.5rem,8vw,5.5rem)] text-ink [--stack-card:27.5rem] min-[860px]:[--stack-card:31.25rem]"
      style={
        {
          "--services-nav": "4.75rem",
          "--stack-peek": "clamp(4.5rem, 8vw, 5.75rem)",
          "--stack-count": 4,
        } as CSSProperties
      }
    >
      <div ref={trackRef} className="relative h-[225vh] min-[860px]:h-[240vh]">
        <div
          ref={pinRef}
          className="sticky top-(--services-nav) flex h-auto flex-col overflow-hidden bg-white pb-18 min-[860px]:h-[calc(100svh-var(--services-nav))] min-[860px]:pb-0"
        >
          <div data-services-lift className="will-change-transform">
            <div className="w-full px-[clamp(1.25rem,4vw,3.5rem)] pt-[0.35rem] pb-[clamp(1.1rem,3vw,1.75rem)] text-left">
              <p className={sectionLabel}>Your Vision. My Expertise.</p>
              <h2 className={`${sectionHeading} mt-3 text-ink`}>
                Full-stack development & Design Solutions
              </h2>
            </div>

            <div
              data-services-stage
              className="relative mx-[clamp(0.65rem,1.5vw,1.1rem)] h-[calc((var(--stack-count)-1)*var(--stack-peek)+var(--stack-card))] overflow-hidden"
            >
              {services.map((service, i) => (
                <article
                  key={service.title}
                  data-service-card
                  className="absolute inset-x-0 grid h-(--stack-card) grid-cols-1 content-start items-start gap-5 rounded-[clamp(1.6rem,3.5vw,2.75rem)] p-[clamp(1.35rem,3vw,2rem)_clamp(1.4rem,4vw,3.25rem)_clamp(1.5rem,4vw,2.5rem)] text-fg shadow-[0_-12px_40px_rgba(3,11,24,0.08)] will-change-transform min-[860px]:grid-cols-[1.2fr_0.8fr] min-[860px]:gap-8"
                  style={
                    {
                      "--stack-i": i,
                      top: "calc(var(--stack-i) * var(--stack-peek))",
                      zIndex: 10 + i,
                      backgroundImage: silkGradient,
                      backgroundSize: "140% 140%",
                      backgroundPosition: tonePos[service.tone],
                    } as CSSProperties
                  }
                >
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <h6
                        className="m-0 min-h-[calc(var(--stack-peek)-1.4rem)] font-[family-name:var(--font-loader),Arial_Black,sans-serif] text-[clamp(1.15rem,3.2vw,2.6rem)] leading-none font-bold tracking-[-0.03em] text-fg uppercase"
                      >
                        {service.title}
                      </h6>
                      <svg
                        viewBox="0 0 24 24"
                        className="mt-1 size-[clamp(0.9rem,1.6vw,1.15rem)] shrink-0 text-(--fg-dim)"
                        aria-hidden
                      >
                        <path
                          fill="currentColor"
                          d="M12 0l1.4 10.6L24 12l-10.6 1.4L12 24l-1.4-10.6L0 12l10.6-1.4L12 0z"
                        />
                      </svg>
                    </div>
                    <p className="mt-3 max-w-[42ch] text-[clamp(0.88rem,1.35vw,1.02rem)] leading-[1.55] text-(--fg-muted)">
                      {service.description}
                    </p>
                    <ul className="mt-6 m-0 list-none p-0">
                      {service.features.map((feature, fi) => (
                        <li
                          key={feature}
                          className="flex items-baseline gap-4 border-t border-[rgba(244,247,251,0.16)] py-[0.85rem] first:border-t last:pb-0"
                        >
                          <span className="w-7 shrink-0 text-[0.72rem] tracking-[0.06em] text-(--fg-dim)">
                            {String(fi + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[clamp(0.95rem,1.5vw,1.15rem)] font-semibold text-fg">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative hidden aspect-square w-[min(100%,280px)] justify-self-end self-start overflow-hidden rounded-[1.35rem] bg-white shadow-[inset_0_0_0_1px_rgba(10,22,40,0.06)] min-[860px]:block min-[860px]:w-[min(100%,300px)]">
                    <Doodle tone={service.tone} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
