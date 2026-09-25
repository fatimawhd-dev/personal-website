"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { display, sectionHeading, sectionLabel } from "@/lib/ui";
import { experience } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

/** Layout + short blurbs — role/company/dates from `experience` (oldest → newest). */
const chapterLayout = [
  {
    t: 0.14,
    side: "above" as const,
    nudgeX: "-42px",
    blurb: "VoloIQ flight planning, Django RBAC, and Flagsmith rollouts for enterprise clients.",
  },
  {
    t: 0.34,
    side: "above" as const,
    nudgeX: "78px",
    blurb: "Support Cloud with SignalR, Quartz.NET jobs, CQRS backends, and MongoDB systems.",
  },
  {
    t: 0.58,
    side: "below" as const,
    nudgeX: "16px",
    blurb: "Led Storia (App of the Day) and Kurdistan’s AI trip planner & bookings.",
  },
  {
    t: 0.82,
    side: "below" as const,
    nudgeX: "-40px",
    blurb: "Continuing Storia with the client, plus Creator Assist and Progress Pad.",
  },
];

const milestones = [...experience]
  .reverse()
  .map((job, i) => ({
    role: job.role,
    company: job.company,
    period: job.period,
    ...chapterLayout[i]!,
  }));

const VB_W = 1100;
const VB_H = 560;

// Smooth letter-S — G1-continuous join (no kink at the waist)
const PATH_D =
  "M 200 130 C 980 130, 980 255, 420 275 C 168 284, 100 420, 520 455";

const LABEL_W = "w-[min(44vw,220px)]";
const STEM = "h-12";

function setDash(el: SVGPathElement | null, length: number, offset: number) {
  if (!el) return;
  // Unitless attrs — more reliable on SVG than CSS px values from GSAP
  el.setAttribute("stroke-dasharray", `${length}`);
  el.setAttribute("stroke-dashoffset", `${offset}`);
}

export function JourneyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const chart = chartRef.current;
    const path = pathRef.current;
    const glow = glowRef.current;
    if (!section || !chart || !path) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const markers = Array.from(
      section.querySelectorAll<HTMLElement>("[data-timeline-marker]"),
    );

    const placeMarkers = () => {
      const len = path.getTotalLength();
      if (len < 1) return;
      markers.forEach((el, i) => {
        const m = milestones[i];
        if (!m) return;
        const pt = path.getPointAtLength(len * m.t);
        el.style.left = `${(pt.x / VB_W) * 100}%`;
        el.style.top = `${(pt.y / VB_H) * 100}%`;
      });
    };

    placeMarkers();

    const length = path.getTotalLength();
    if (length < 1) return;

    if (reduce) {
      setDash(path, length, 0);
      setDash(glow, length, 0);
      gsap.set(markers, { autoAlpha: 1, y: 0 });
      return;
    }

    setDash(path, length, length);
    setDash(glow, length, length);
    gsap.set(markers, { autoAlpha: 0, y: 10 });

    const applyProgress = (progress: number) => {
      setDash(path, length, length * (1 - progress));
      setDash(glow, length, length * (1 - progress));

      markers.forEach((el, i) => {
        const m = milestones[i];
        if (!m) return;
        const on = progress >= m.t - 0.03;
        gsap.set(el, {
          autoAlpha: on ? 1 : 0,
          y: on ? 0 : 10,
          overwrite: "auto",
        });
      });
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: chart,
        // Finish as soon as the chart mid/last chapters are in view (not after more scroll)
        start: "top 90%",
        end: "center 70%",
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => applyProgress(self.progress),
        onRefresh: (self) => applyProgress(self.progress),
      });
    }, section);

    const refresh = () => {
      placeMarkers();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", refresh);
    window.addEventListener("portfolio:scroll-ready", refresh);
    const readyTimer = window.setTimeout(refresh, 250);

    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("portfolio:scroll-ready", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-1 overflow-hidden bg-transparent py-[clamp(2.5rem,5.5vw,4rem)]"
      aria-label="Approach"
    >
      <div className="mx-auto max-w-350 px-[clamp(1.25rem,4vw,3.5rem)]">
        <p className={sectionLabel}>
          Approach
        </p>
        <h2 className={`${sectionHeading} mt-2 mb-4 text-[#e8e4d4]`}>
          A path drawn in chapters.
        </h2>

        <div
          ref={chartRef}
          className="relative mx-auto aspect-1100/560 w-full max-w-7xl"
        >
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
            aria-hidden
          >
            <path
              ref={glowRef}
              d={PATH_D}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="blur-[6px]"
            />
            <path
              ref={pathRef}
              d={PATH_D}
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {milestones.map((m) => {
            const above = m.side === "above";
            return (
              <div
                key={`${m.company}-${m.period}`}
                data-timeline-marker
                className={`absolute ${LABEL_W} -translate-x-1/2`}
                style={{ left: 0, top: 0 }}
              >
                <span className="absolute left-1/2 top-0 z-1 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.85)]" />

                <span
                  className={`absolute left-1/2 w-px -translate-x-1/2 bg-white/55 ${STEM} ${above
                    ? "bottom-full mb-1.5 origin-bottom"
                    : "top-full mt-1.5 origin-top"
                    }`}
                />

                <div
                  className={`absolute left-1/2 ${LABEL_W} text-center ${above ? "bottom-full mb-16" : "top-full mt-16"
                    }`}
                  style={{ transform: `translateX(calc(-50% + ${m.nudgeX}))` }}
                >
                  <p className="m-0 text-[0.95rem] font-semibold tracking-[-0.02em] text-white">
                    {m.role}
                  </p>
                  <p className="mt-1 m-0 flex items-center justify-center gap-1.5 whitespace-nowrap text-[0.72rem] text-white/65">
                    {m.company}
                    <span className="tracking-[0.02em] text-white/50">({m.period})</span>
                  </p>
                  <p className="mt-2 m-0 text-[0.74rem] leading-[1.4] text-white/60">
                    {m.blurb}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
