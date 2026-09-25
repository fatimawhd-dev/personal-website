"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/data/content";
import { display } from "@/lib/ui";

gsap.registerPlugin(ScrollTrigger);

function IconBriefcase({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect
        x="3.5"
        y="7"
        width="17"
        height="12.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M3.5 12h17" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 3.5V7M16 3.5V7M3.5 10h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconCpu({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="7" y="7" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 3.5V7M14 3.5V7M10 17v3.5M14 17v3.5M3.5 10H7M3.5 14H7M17 10h3.5M17 14h3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconLink({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M9.5 14.5 8 16a3.5 3.5 0 0 1-5-5l2-2a3.5 3.5 0 0 1 5 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M14.5 9.5 16 8a3.5 3.5 0 0 1 5 5l-2 2a3.5 3.5 0 0 1-5 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M9.5 14.5l5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-role-card]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%" },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-1 overflow-x-hidden bg-[#f4f7fb] text-ink"
    >
      <div className="mx-auto max-w-350 px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(4.5rem,10vw,8rem)]">
        <div className="mb-10 flex flex-col gap-3 min-[800px]:mb-14 min-[800px]:flex-row min-[800px]:items-end min-[800px]:justify-between">
          <div>
            <p className="m-0 flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.2em] text-accent uppercase">
              <IconBriefcase className="size-4" />
              Approach
            </p>
            <h2 className={`${display} mt-3 text-[clamp(2.2rem,5vw,3.8rem)] text-ink`}>
              Roles that shaped how I ship.
            </h2>
          </div>
          <p className="m-0 max-w-[34ch] text-[0.95rem] leading-[1.55] text-(--ink-muted) min-[800px]:text-right">
            Four chapters across freelance, product studios, and enterprise teams — each one
            tighter on craft and clearer on what to ship next.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute top-3 bottom-3 left-[0.55rem] hidden w-px bg-ink/30 min-[900px]:block"
            aria-hidden
          />

          <div className="flex flex-col gap-8 min-[900px]:gap-10">
            {experience.map((job, i) => (
              <article
                key={job.company}
                data-role-card
                className="relative opacity-0 min-[900px]:pl-12"
              >
                <span
                  className="absolute top-8 left-0 hidden size-[1.15rem] items-center justify-center min-[900px]:flex"
                  aria-hidden
                >
                  <span className="absolute size-3 rounded-full bg-accent/25 blur-[3px]" />
                  <span className="relative size-2.5 rounded-full border-2 border-accent bg-[#f4f7fb]" />
                </span>

                <div className="rounded-2xl border border-[#e8e4d4]/18 bg-[#0d2240] p-[clamp(1.25rem,3vw,1.85rem)] shadow-[0_16px_48px_rgba(10,22,40,0.14)]">
                  <div className="flex flex-col gap-4 min-[720px]:flex-row min-[720px]:items-start min-[720px]:justify-between">
                    <div className="min-w-0">
                      <h3
                        className={`${display} m-0 text-[clamp(1.55rem,3vw,2.15rem)] tracking-[-0.03em] text-white`}
                      >
                        {job.role}
                      </h3>
                      <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-2">
                        <span className="text-[0.95rem] font-semibold text-accent">
                          {job.company}
                        </span>
                        <span className="text-white/30" aria-hidden>
                          ·
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[0.72rem] tracking-[0.02em] text-white/85">
                          <IconPin className="size-3.5 opacity-80" />
                          {job.place}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-3 py-1.5 text-[0.75rem] tracking-[0.02em] text-white">
                      <IconCalendar className="size-3.5 text-accent" />
                      {job.period}
                    </span>
                  </div>

                  <p className="mt-5 max-w-[62ch] text-[0.98rem] leading-[1.65] text-white/88">
                    {job.summary}
                  </p>

                  <div className="mt-7 border-t border-white/15 pt-6">
                    <p className="m-0 flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.18em] text-accent uppercase">
                      <IconCpu className="size-3.5" />
                      Projects
                    </p>
                    <div className="mt-3.5 grid gap-3 min-[640px]:grid-cols-2">
                      {job.systems.map((system, si) => (
                        <div
                          key={system.title}
                          className="rounded-xl border border-white/15 bg-[#061428]/70 px-4 py-3.5"
                        >
                          <p className="m-0 flex items-center gap-2 text-[0.95rem] font-semibold text-white">
                            <span
                              className={`size-2 shrink-0 rounded-full ${
                                si % 2 === 0 ? "bg-accent" : "bg-[#9bb8de]"
                              }`}
                              aria-hidden
                            />
                            {system.title}
                          </p>
                          <p className="mt-2 m-0 text-[0.88rem] leading-[1.55] text-white/80">
                            {system.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 border-t border-white/15 pt-6">
                    <p className="m-0 flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.18em] text-accent uppercase">
                      <IconLink className="size-3.5" />
                      Key contributions
                    </p>
                    <ul className="mt-3.5 m-0 flex list-none flex-col gap-2.5 p-0">
                      {job.highlights.map((item) => (
                        <li
                          key={item}
                          className="relative pl-3.5 text-[0.95rem] leading-[1.6] text-white/88 before:absolute before:top-[0.55em] before:left-0 before:size-1.5 before:rounded-full before:bg-accent"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-6 text-[0.68rem] tracking-[0.16em] text-white/55 uppercase">
                    {job.category}
                    <span className="mx-2 text-white/25">·</span>
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(experience.length).padStart(2, "0")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
