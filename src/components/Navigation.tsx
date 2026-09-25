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
    return () => {
      document.body.style.overflow = "";
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
        <div className="mx-auto grid max-w-350 grid-cols-[1fr_auto_1fr] items-center gap-4">
          <a
            href="#top"
            data-nav-brand
            className={`${display} pointer-events-none text-[1.05rem] tracking-[0.08em] uppercase opacity-0 invisible`}
          >
            {site.shortName}
          </a>

          <nav className="hidden items-center gap-[1.6rem] min-[960px]:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.68rem] tracking-[0.18em] uppercase text-(--fg-muted) transition-colors duration-200 hover:text-fg"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center justify-end gap-[0.85rem] min-[960px]:flex">
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
            className="col-start-3 justify-self-end grid size-10 place-items-center border-0 bg-transparent text-fg min-[960px]:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
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
