"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { silkGradient } from "@/lib/ui";

const blobs = [
  "absolute top-[-8%] right-[-6%] size-[min(65vw,620px)] rounded-full bg-[rgba(120,170,230,0.5)] opacity-50 blur-[40px] mix-blend-screen will-change-transform [contain:strict]",
  "absolute bottom-0 left-[-12%] size-[min(55vw,520px)] rounded-full bg-[rgba(50,110,190,0.45)] opacity-50 blur-[40px] mix-blend-screen will-change-transform [contain:strict]",
  "absolute top-[40%] left-[30%] size-[min(48vw,440px)] rounded-full bg-[rgba(170,200,240,0.32)] opacity-50 blur-[40px] mix-blend-screen will-change-transform [contain:strict]",
];

const grain =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function LiveSilk() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const blobEls = root.querySelectorAll<HTMLElement>("[data-silk-blob]");
    const wash = root.querySelector<HTMLElement>("[data-silk-wash]");
    const tweens: gsap.core.Tween[] = [];

    const ctx = gsap.context(() => {
      blobEls.forEach((blob, i) => {
        tweens.push(
          gsap.to(blob, {
            x: i % 2 === 0 ? "8vw" : "-10vw",
            y: i % 2 === 0 ? "6vh" : "-7vh",
            scale: 1.06 + (i % 3) * 0.03,
            rotation: i % 2 === 0 ? 10 : -12,
            duration: 18 + i * 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            force3D: true,
          }),
        );
      });

      if (wash) {
        tweens.push(
          gsap.to(wash, {
            backgroundPosition: "100% 65%",
            duration: 28,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }),
        );
      }
    }, root);

    const moveX = gsap.quickTo(root, "x", { duration: 1.1, ease: "power2.out" });
    const moveY = gsap.quickTo(root, "y", { duration: 1.1, ease: "power2.out" });
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let active = true;

    const setActive = (next: boolean) => {
      if (next === active) return;
      active = next;
      tweens.forEach((t) => (next ? t.play() : t.pause()));
      if (!next) {
        moveX(0);
        moveY(0);
      }
    };

    // Silk sits under white sections — pause once it is covered to free the main thread.
    const onScroll = () => {
      setActive(window.scrollY < window.innerHeight * 1.35);
    };

    const onMove = (e: MouseEvent) => {
      if (!active) return;
      targetX = (e.clientX / window.innerWidth - 0.5) * -12;
      targetY = (e.clientY / window.innerHeight - 0.5) * -8;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        moveX(targetX);
        moveY(targetY);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-[-10%] z-0 overflow-hidden bg-[#020814] contain-[paint] transform-[translateZ(0)]"
      aria-hidden
    >
      <div
        data-silk-wash
        className="absolute inset-[-16%]"
        style={{
          backgroundImage: silkGradient,
          backgroundSize: "140% 140%",
          backgroundPosition: "0% 20%",
        }}
      />
      {blobs.map((cls, i) => (
        <div key={i} data-silk-blob className={cls} />
      ))}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{ backgroundImage: grain }}
      />
    </div>
  );
}
