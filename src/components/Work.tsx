"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/content";
import { display, sectionLabel, sectionLead } from "@/lib/ui";

gsap.registerPlugin(ScrollTrigger);

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const indexEl = indexRef.current;
    if (!section || !indexEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-project-card]"));

    const setIndex = (i: number) => {
      indexEl.textContent = `${String(i + 1).padStart(2, "0")}.`;
    };

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const media = card.querySelector<HTMLElement>("[data-project-media]") ?? card;

        // Update the sticky index as soon as this project's image enters view —
        // not when it reaches the middle (that felt a project late).
        ScrollTrigger.create({
          trigger: media,
          start: "top 75%",
          end: "bottom 25%",
          onEnter: () => setIndex(i),
          onEnterBack: () => setIndex(i),
        });

        if (reduce) {
          gsap.set(card, { clearProps: "opacity,transform" });
          return;
        }

        gsap.fromTo(
          card,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          },
        );
      });

      // Sync index to whatever image is already in view on load / refresh
      ScrollTrigger.refresh();
      const active = cards.findIndex((card) => {
        const media = card.querySelector<HTMLElement>("[data-project-media]") ?? card;
        const rect = media.getBoundingClientRect();
        const line = window.innerHeight * 0.75;
        return rect.top <= line && rect.bottom >= line;
      });
      if (active >= 0) setIndex(active);
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleFlip = (i: number) => {
    setFlipped((current) => (current === i ? null : i));
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-1 bg-[#061428] text-[#e8e4d4]"
    >
      <div className="flex flex-col justify-between px-[clamp(1.25rem,4vw,3.5rem)] pt-[clamp(4rem,10vw,7rem)] pb-[clamp(2rem,5vw,3.5rem)]">
        <div className="flex flex-col gap-6 min-[800px]:flex-row min-[800px]:items-end min-[800px]:justify-between">
          <p className={sectionLabel}>
            Projects
          </p>
          <p className={`${sectionLead} max-w-[36ch] text-[#e8e4d4]/75 min-[800px]:text-right`}>
            Highlights from AI products, tourism platforms, aviation software, and real-time
            systems — click a cover to flip for what I built.
          </p>
        </div>
      </div>

      <div className="relative px-[clamp(1.25rem,4vw,3.5rem)] pb-[clamp(4.5rem,10vw,8rem)]">
        <div className="mx-auto grid max-w-350 grid-cols-1 gap-10 min-[900px]:grid-cols-[0.38fr_1fr] min-[900px]:gap-8">
          <div className="relative hidden min-[900px]:block">
            <div className="sticky top-[30vh]">
              <span
                ref={indexRef}
                className={`${display} block text-[clamp(5rem,14vw,9.5rem)] leading-none tracking-[-0.04em] text-[#e8e4d4]`}
              >
                01.
              </span>
            </div>
          </div>

          <div data-projects-grid className="flex flex-col gap-[clamp(4rem,12vw,8rem)]">
            {projects.map((project, i) => {
              const isFlipped = flipped === i;

              return (
                <article
                  key={project.title}
                  data-project-card
                  data-project-i={i}
                  className="block opacity-0"
                >
                  <span
                    className={`${display} mb-4 block text-[clamp(2.5rem,8vw,4rem)] leading-none text-[#e8e4d4] min-[900px]:hidden`}
                  >
                    {String(i + 1).padStart(2, "0")}.
                  </span>

                  <button
                    type="button"
                    data-project-media
                    aria-expanded={isFlipped}
                    aria-label={
                      isFlipped
                        ? `Hide details for ${project.title}`
                        : `Show details for ${project.title}`
                    }
                    onClick={() => toggleFlip(i)}
                    className="group/flip relative mb-4 block w-full cursor-pointer appearance-none border-0 bg-transparent p-0 text-left perspective-[1400px]"
                  >
                    <span
                      className="relative block aspect-video max-h-[min(58vh,32rem)] w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] transform-3d"
                      style={{
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      {/* Front — cover image */}
                      <span className="absolute inset-0 overflow-hidden rounded-[1.25rem] bg-[#0b1c36] backface-hidden">
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          fill
                          sizes="(max-width: 900px) 100vw, 60vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover/flip:scale-[1.03]"
                        />
                        <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                        <span className="absolute inset-x-4 bottom-4 z-1 flex items-end justify-between gap-3">
                          <span className="text-[0.68rem] tracking-[0.16em] uppercase text-white/85">
                            {project.status}
                          </span>
                          <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[0.65rem] tracking-[0.14em] uppercase text-white/80 backdrop-blur-sm">
                            Flip
                          </span>
                        </span>
                      </span>

                      {/* Back — project details */}
                      <span className="absolute inset-0 flex transform-[rotateY(180deg)] flex-col overflow-hidden rounded-[1.25rem] border border-[#e8e4d4]/12 bg-[#0a1a30] p-[clamp(1.1rem,3vw,1.75rem)] text-[#e8e4d4] backface-hidden">
                        <span className="flex min-h-0 flex-1 flex-col gap-3">
                          <span className="flex shrink-0 items-start justify-between gap-3">
                            <span>
                              <span className="block text-[0.68rem] tracking-[0.18em] uppercase text-[#e8e4d4]/45">
                                What I did
                              </span>
                              <span
                                className={`${display} mt-1 block text-[clamp(1.05rem,2.2vw,1.4rem)] uppercase tracking-[-0.03em]`}
                              >
                                {project.role}
                              </span>
                            </span>
                          </span>

                          <ul className="m-0 flex min-h-0 list-none flex-1 flex-col gap-2 overflow-y-auto overscroll-contain p-0 pr-1">
                            {project.did.map((item) => (
                              <li
                                key={item}
                                className="relative pl-3 text-[0.82rem] leading-[1.45] text-[#e8e4d4]/82 before:absolute before:top-[0.55em] before:left-0 before:size-1 before:rounded-full before:bg-[#ff4f2d]"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </span>

                        <span className="mt-3 shrink-0 border-t border-[#e8e4d4]/12 pt-3">
                          <span className="block text-[0.65rem] tracking-[0.18em] uppercase text-[#e8e4d4]/45">
                            What I used
                          </span>
                          <span className="mt-2 flex flex-wrap gap-1.5">
                            {project.tech.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-[#e8e4d4]/25 px-2.5 py-1 text-[0.68rem] tracking-[0.04em] text-[#e8e4d4]/85"
                              >
                                {item}
                              </span>
                            ))}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>

                  <p className="m-0 text-[0.82rem] tracking-[0.04em] text-[#e8e4d4]/55">
                    {project.category}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
                    <h3
                      className={`${display} m-0 text-[clamp(2rem,5vw,3.4rem)] uppercase tracking-[-0.03em] text-[#e8e4d4]`}
                    >
                      {project.href ? (
                        <a href={project.href} target="_blank" rel="noreferrer">
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    <span className="rounded-full bg-[#e8e4d4] px-3 py-1 text-[0.72rem] font-semibold tracking-[0.04em] text-[#0a0c10]">
                      {project.year}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
