"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/content";
import { sectionLabel } from "@/lib/ui";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-about-anim]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(3.75rem,9vw,7rem)] pb-[clamp(3rem,8vw,6rem)]"
    >
      <div className="relative z-10 mx-auto grid min-h-[64svh] max-w-350 gap-8 pt-[2svh] min-[900px]:min-h-[74svh] min-[900px]:grid-cols-[0.35fr_1fr] min-[900px]:items-center min-[900px]:gap-16">
        <p className={`${sectionLabel} opacity-0`} data-about-anim>
          About
        </p>
        <div>
          <p
            data-about-anim
            className="max-w-[32ch] text-[clamp(1.6rem,3.6vw,2.7rem)] leading-tight font-normal text-white opacity-0"
          >
            {site.headline}
          </p>
          <div data-about-anim className="mt-10 max-w-3xl space-y-4 opacity-0">
            {site.about.map((p) => (
              <p key={p.slice(0, 24)} className="leading-relaxed text-(--fg-muted)">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
