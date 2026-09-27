"use client";

import { useEffect, useRef, type CSSProperties } from "react";
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
    nudgeXMobile: "-4px",
    blurb: "VoloIQ flight planning, Django RBAC, and Flagsmith rollouts for enterprise clients.",
  },
  {
    t: 0.34,
    side: "above" as const,
    nudgeX: "78px",
    nudgeXMobile: "-18px",
    blurb: "Support Cloud with SignalR, Quartz.NET jobs, CQRS backends, and MongoDB systems.",
  },
  {
    t: 0.58,
    side: "below" as const,
    nudgeX: "16px",
    nudgeXMobile: "54px",
    blurb: "Led Storia (App of the Day) and Kurdistan’s AI trip planner & bookings.",
  },
  {
    t: 0.82,
    side: "below" as const,
    nudgeX: "-40px",
    nudgeXMobile: "42px",
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
const VB_DESKTOP = { x: 0, y: 0, w: VB_W, h: VB_H };
// Same path, cropped to its bounds so it fills a phone without stretching.
const VB_MOBILE = { x: 168, y: 98, w: 680, h: 390 };

// Smooth letter-S — G1-continuous join (no kink at the waist)
const PATH_D =
  "M 200 130 C 980 130, 980 255, 420 275 C 168 284, 100 420, 520 455";

const LABEL_W = "w-[7.75rem] min-[860px]:w-[min(44vw,220px)]";
const STEM = "h-6 min-[860px]:h-12";

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
      const compact = window.matchMedia("(max-width: 859px)").matches;
      const vb = compact ? VB_MOBILE : VB_DESKTOP;
      path.ownerSVGElement?.setAttribute(
        "viewBox",
        `${vb.x} ${vb.y} ${vb.w} ${vb.h}`,
      );
      chart.style.aspectRatio = compact ? `${vb.w} / ${vb.h}` : "";
      markers.forEach((el, i) => {
        const m = milestones[i];
        if (!m) return;
        const pt = path.getPointAtLength(len * m.t);
        el.style.left = `${((pt.x - vb.x) / vb.w) * 100}%`;
        el.style.top = `${((pt.y - vb.y) / vb.h) * 100}%`;
      });
    };

    let ctx: gsap.Context | null = null;

    const boot = () => {
      ctx?.revert();
      ctx = null;
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

      ctx = gsap.context(() => {
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
    };

    boot();

    const refresh = () => {
      boot();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", refresh);
    window.addEventListener("portfolio:scroll-ready", refresh);
    const readyTimer = window.setTimeout(refresh, 250);

    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("portfolio:scroll-ready", refresh);
      ctx?.revert();
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

        <div className="relative max-[859px]:pt-28 max-[859px]:pb-36">
          <div
            ref={chartRef}
            className="relative mx-auto aspect-1100/560 w-full max-w-7xl max-[859px]:-mx-[clamp(1.25rem,4vw,3.5rem)] max-[859px]:w-[calc(100%+2*clamp(1.25rem,4vw,3.5rem))] max-[859px]:max-w-none"
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
                className="blur-[6px] max-[859px]:[vector-effect:non-scaling-stroke] max-[859px]:stroke-[8px]"
              />
              <path
                ref={pathRef}
                d={PATH_D}
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="max-[859px]:[vector-effect:non-scaling-stroke] max-[859px]:stroke-[2.5px]"
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
                    className={`absolute left-1/2 ${LABEL_W} text-center transform-[translateX(calc(-50%+var(--tl-nudge-sm)))] min-[860px]:transform-[translateX(calc(-50%+var(--tl-nudge)))] ${above ? "bottom-full mb-8 min-[860px]:mb-16" : "top-full mt-8 min-[860px]:mt-16"
                      }`}
                    style={
                      {
                        "--tl-nudge": m.nudgeX,
                        "--tl-nudge-sm": m.nudgeXMobile,
                      } as CSSProperties
                    }
                  >
                    <p className="m-0 text-[0.68rem] leading-[1.15] font-semibold tracking-[-0.02em] text-white min-[860px]:text-[0.95rem] min-[860px]:leading-none">
                      {m.role}
                    </p>
                    <p className="mt-1 m-0 flex flex-wrap items-center justify-center gap-x-1 text-[0.58rem] leading-tight text-white/65 min-[860px]:flex-nowrap min-[860px]:text-[0.72rem]">
                      {m.company}
                      <span className="tracking-[0.02em] text-white/50">({m.period})</span>
                    </p>
                    <p className="mt-1 m-0 text-[0.58rem] leading-[1.3] text-white/60 min-[860px]:mt-2 min-[860px]:text-[0.74rem] min-[860px]:leading-[1.4]">
                      {m.blurb}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
