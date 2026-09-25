"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Drive Lenis from GSAP's ticker only — never both RAF loops
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.05,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Priority=true runs Lenis before GSAP tweens so we don't measure after mutate
    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker, false, true);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.config({ ignoreMobileResize: true });

    const sync = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("portfolio:scroll-ready", sync);
    const warmTimer = window.setTimeout(sync, 200);

    return () => {
      window.clearTimeout(warmTimer);
      window.removeEventListener("portfolio:scroll-ready", sync);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
