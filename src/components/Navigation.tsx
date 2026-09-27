"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { navLinks, site } from "@/data/content";
import { btnGlass, btnGlassDot, display } from "@/lib/ui";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let scrolled = false;
    const onScroll = () => {
      const next = window.scrollY > 24;
      if (next === scrolled) return;
      scrolled = next;
      header.toggleAttribute("data-scrolled", next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.documentElement.toggleAttribute("data-nav-open", open);
    const floater = document.querySelector<HTMLElement>("[data-hero-floater]");
    if (floater) gsap.set(floater, { autoAlpha: open ? 0 : 1 });
    return () => {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-nav-open");
    };
  }, [open]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      header,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: "power3.out" },
    );
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-70 px-[clamp(1.25rem,4vw,3rem)] py-[1.1rem] transition-[background,border-color,backdrop-filter] duration-300 data-scrolled:border-b data-scrolled:border-(--line) data-scrolled:bg-[rgba(3,11,24,0.72)] data-scrolled:backdrop-blur-lg"
      >
        <div className="mx-auto grid max-w-350 grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-[clamp(0.75rem,2vw,1.5rem)]">
          <a
            href="#top"
            data-nav-brand
            className={`${display} pointer-events-none text-[1.05rem] tracking-[0.08em] uppercase opacity-0 invisible`}
          >
            {site.shortName}
          </a>

          <nav
            className="hidden min-w-0 items-center justify-center gap-[clamp(0.45rem,1vw,1.6rem)] min-[1080px]:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.64rem] tracking-[0.12em] whitespace-nowrap uppercase text-(--fg-muted) transition-colors duration-200 hover:text-fg min-[1280px]:text-[0.68rem] min-[1280px]:tracking-[0.16em]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center justify-end gap-[clamp(0.45rem,1vw,0.85rem)] min-[1080px]:flex">
            <a href={site.resumeUrl} download className={btnGlass}>
              Resume
              <span className={btnGlassDot} aria-hidden>
                ↓
              </span>
            </a>
            <a href="#contact" className={btnGlass}>
              Contact us
              <span className={btnGlassDot} aria-hidden>
                →
              </span>
            </a>
          </div>

          <button
            type="button"
            className="col-start-3 grid size-12 place-items-center justify-self-end border-0 bg-transparent text-fg min-[1080px]:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3 7h18M3 12h18M3 17h18" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-60 flex flex-col justify-center gap-[1.4rem] bg-[rgba(3,11,24,0.97)] p-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`${display} text-[2rem]`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={`${btnGlass} mt-4 w-fit`}
          >
            Contact us
            <span className={btnGlassDot}>→</span>
          </a>
        </div>
      )}
    </>
  );
}
