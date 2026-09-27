"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/content";
import {
  btnGlass,
  btnGlassDot,
  btnPill,
  btnPillArrow,
  btnPillLabel,
  display,
} from "@/lib/ui";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const brandSlotRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const brand = brandRef.current;
    const slot = brandSlotRef.current;
    const role = roleRef.current;
    if (!section || !brand || !slot) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let introCtx: gsap.Context | null = null;
    let morphTl: gsap.core.Timeline | null = null;
    let morphTrigger: ScrollTrigger | null = null;
    let cancelled = false;
    let floater: HTMLHeadingElement | null = null;
    let nav: HTMLElement | null = null;
    let heroFont = 0;
    let geo: {
      left: number;
      top: number;
      x: number;
      y: number;
      scale: number;
    } | null = null;

    const getNav = () =>
      nav ?? (nav = document.querySelector<HTMLElement>("[data-nav-brand]"));

    const ensureFloater = () => {
      if (floater) return floater;
      floater = document.createElement("h1");
      floater.className = `${display} pointer-events-none m-0 whitespace-nowrap text-[clamp(4.2rem,16vw,10rem)] leading-[0.92] text-[var(--white)] uppercase will-change-transform [backface-visibility:hidden]`;
      floater.textContent = site.shortName;
      floater.setAttribute("aria-hidden", "true");
      floater.setAttribute("data-hero-floater", "");
      gsap.set(floater, {
        position: "fixed",
        left: 0,
        top: 0,
        autoAlpha: 0,
        force3D: true,
        zIndex: 90,
        margin: 0,
        transformOrigin: "0 0",
      });
      document.body.appendChild(floater);
      return floater;
    };

    const readGeometry = () => {
      const navBrand = getNav();
      if (!navBrand) return null;

      // Placeholder stays invisible and in-flow for layout measurement only
      gsap.set(brand, { autoAlpha: 0, x: 0, y: 0, scale: 1 });

      const from = brand.getBoundingClientRect();
      heroFont = parseFloat(window.getComputedStyle(brand).fontSize);

      navBrand.classList.remove("opacity-100", "visible", "pointer-events-auto");
      navBrand.classList.add("opacity-0", "invisible", "pointer-events-none");
      gsap.set(navBrand, { autoAlpha: 0, visibility: "visible" });
      const to = navBrand.getBoundingClientRect();
      const navFont = parseFloat(window.getComputedStyle(navBrand).fontSize);

      if (!from.width || !to.height || !heroFont || !navFont) return null;

      return {
        left: from.left,
        top: from.top,
        x: to.left - from.left,
        y: to.top - from.top,
        scale: navFont / heroFont,
      };
    };

    const placeFloater = (el: HTMLElement, g: NonNullable<typeof geo>, visible: boolean) => {
      gsap.set(el, {
        position: "fixed",
        left: g.left,
        top: g.top,
        x: 0,
        y: 0,
        scale: 1,
        fontSize: heroFont,
        letterSpacing: "-0.03em",
        lineHeight: 0.92,
        margin: 0,
        transformOrigin: "0 0",
        zIndex: 90,
        force3D: true,
        autoAlpha: document.documentElement.hasAttribute("data-nav-open") ? 0 : visible ? 1 : 0,
      });
    };

    const isCompact = () => window.matchMedia("(max-width: 899px)").matches;

    const killMorph = () => {
      morphTrigger?.kill();
      morphTrigger = null;
      morphTl?.kill();
      morphTl = null;
    };

    const buildMorph = (el: HTMLElement, g: NonNullable<typeof geo>, enabled: boolean) => {
      killMorph();

      morphTl = gsap.timeline({
        defaults: { ease: "none" },
        paused: true,
      });

      morphTl.to(
        el,
        {
          x: g.x,
          y: g.y,
          scale: g.scale,
          force3D: true,
          duration: 1,
        },
        0,
      );

      if (role) {
        morphTl.to(
          role,
          {
            autoAlpha: 0,
            y: -12,
            duration: 0.18,
          },
          0,
        );
      }

      morphTrigger = ScrollTrigger.create({
        animation: morphTl,
        trigger: section,
        start: "top top",
        // Lenis already eases scroll — scrub:true tracks 1:1 (no double lag).
        // On a phone the copy sits under the name, so the shrink finishes
        // before that text can catch it. The motion itself stays the same.
        end: () => {
          const travel = geo ? Math.abs(geo.y) : window.innerHeight * 0.5;
          if (isCompact()) {
            return `+=${Math.round(Math.max(160, Math.min(travel * 0.55, window.innerHeight * 0.36)))}`;
          }
          return `+=${Math.round(window.innerHeight * 0.85)}`;
        },
        scrub: true,
        invalidateOnRefresh: true,
      });

      if (!enabled) morphTrigger.disable(false);
    };

    const setupAtTop = (opts?: { visible?: boolean; morphEnabled?: boolean }) => {
      const visible = opts?.visible ?? true;
      const morphEnabled = opts?.morphEnabled ?? visible;
      const navBrand = getNav();

      if (!navBrand || reduce) {
        killMorph();
        if (navBrand) {
          gsap.set(navBrand, { autoAlpha: 1 });
          navBrand.classList.remove("opacity-0", "invisible", "pointer-events-none");
          navBrand.classList.add("opacity-100", "visible", "pointer-events-auto");
        }
        gsap.set(brand, { autoAlpha: 1 });
        floater?.remove();
        floater = null;
        return;
      }

      if (window.scrollY > 8 && morphTl) {
        ScrollTrigger.refresh();
        return;
      }

      geo = readGeometry();
      if (!geo) return;

      const el = ensureFloater();
      gsap.set(navBrand, { autoAlpha: 0 });
      navBrand.classList.remove("opacity-100", "visible", "pointer-events-auto");
      navBrand.classList.add("opacity-0", "invisible", "pointer-events-none");
      gsap.set(brand, { autoAlpha: 0 });

      placeFloater(el, geo, visible);
      buildMorph(el, geo, morphEnabled);
    };

    const play = async () => {
      if (cancelled || introCtx) return;

      try {
        await document.fonts.ready;
      } catch {
        /* ignore */
      }
      if (cancelled) return;

      // One visible title only (floater) — no post-intro handoff/jump
      setupAtTop({ visible: false, morphEnabled: false });
      const el = floater;
      if (!el || !geo) return;

      placeFloater(el, geo, false);

      introCtx = gsap.context(() => {
        const intro = gsap.timeline({
          onComplete: () => {
            if (cancelled || !floater || !geo) return;

            // Settle on transform y=0 without remounting/remeasuring
            gsap.set(floater, { x: 0, y: 0, scale: 1, autoAlpha: 1 });
            morphTrigger?.enable();
            morphTl?.progress(0, true);

            requestAnimationFrame(() => {
              if (cancelled) return;
              ScrollTrigger.refresh();
              window.dispatchEvent(new Event("portfolio:scroll-ready"));
            });
          },
        });

        if (role) {
          intro.fromTo(
            role,
            { y: 56, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
            0,
          );
        }

        // Animate the same element that will morph — no swap, no jump
        intro.fromTo(
          el,
          { y: 80, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.15, ease: "power3.out" },
          0.08,
        );

        intro.fromTo(
          copyRef.current?.children || [],
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" },
          0.28,
        );
      }, section);
    };

    window.addEventListener("portfolio:ready", play);
    const fallback = window.setTimeout(play, 7000);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (cancelled) return;
        const atTop = window.scrollY <= 8;
        setupAtTop({
          visible: atTop || Boolean(floater),
          morphEnabled: true,
        });
        ScrollTrigger.refresh();
      }, 140);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("portfolio:ready", play);
      window.removeEventListener("resize", onResize);
      killMorph();
      floater?.remove();
      floater = null;
      gsap.set(brand, { clearProps: "all" });
      if (role) gsap.set(role, { clearProps: "opacity,visibility,transform" });
      const navBrand = getNav();
      if (navBrand) {
        navBrand.classList.remove("opacity-100", "visible", "pointer-events-auto");
        navBrand.classList.add("opacity-0", "invisible", "pointer-events-none");
        gsap.set(navBrand, { clearProps: "opacity,visibility" });
      }
      introCtx?.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-svh flex-col justify-end overflow-visible bg-transparent px-[clamp(1.25rem,4vw,3.5rem)] pt-28 pb-12"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-350 gap-12 min-[900px]:min-h-[calc(100svh-10rem)] min-[900px]:grid-cols-[1.1fr_0.9fr] min-[900px]:items-end">
        <div>
          <p ref={roleRef} className="mb-[0.85rem] text-[0.85rem] text-(--fg-muted) opacity-0">
            {site.role}
          </p>
          <div ref={brandSlotRef} className="block min-h-[clamp(4.2rem,16vw,10rem)]">
            <h1
              ref={brandRef}
              className={`${display} m-0 text-[clamp(4.2rem,16vw,10rem)] leading-[0.92] text-(--white) uppercase opacity-0 will-change-transform`}
              aria-hidden
            >
              {site.shortName}
            </h1>
          </div>
        </div>

        <div ref={copyRef}>
          <p className="max-w-96 text-[clamp(1.05rem,2vw,1.25rem)] leading-[1.45] text-fg opacity-0">
            <span key="hero-lines" className="block">
              {site.heroLines}
            </span>
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3 opacity-0">
            <a href="#work" className={`group/pill ${btnPill}`}>
              <span className={btnPillLabel}>View work</span>
              <span className={btnPillArrow} aria-hidden>
                →
              </span>
            </a>
            <a href={site.resumeUrl} download className={btnGlass}>
              Resume
              <span className={btnGlassDot}>↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
