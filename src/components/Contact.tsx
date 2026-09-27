"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navLinks, site } from "@/data/content";
import {
  btnPill,
  btnPillArrow,
  btnPillLabel,
  display,
  silkGradient,
} from "@/lib/ui";

gsap.registerPlugin(ScrollTrigger);

type ContactLink = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
};

const navByHref = new Map(navLinks.map((link) => [link.href, link]));

/** Footer columns in display order. Every `navLinks` href must appear here. */
const footerNav = {
  explore: ["#about", "#services", "#contact"],
  work: ["#work", "#process", "#help", "#experience"],
} as const;

function linksFor(hrefs: readonly string[]): ContactLink[] {
  return hrefs.map((href) => {
    const link = navByHref.get(href);
    if (!link) {
      throw new Error(`Contact footer href is not in navLinks: ${href}`);
    }
    return link;
  });
}

const coveredHrefs = new Set<string>(Object.values(footerNav).flat());
const missing = navLinks.filter((link) => !coveredHrefs.has(link.href));
if (missing.length > 0) {
  throw new Error(
    `Contact footer is missing nav links: ${missing.map((link) => link.href).join(", ")}`,
  );
}

const columns: { title: string; links: ContactLink[] }[] = [
  {
    title: "Explore",
    links: [{ label: "Home", href: "#top" }, ...linksFor(footerNav.explore)],
  },
  {
    title: "Work",
    links: linksFor(footerNav.work),
  },
  {
    title: "Connect",
    links: [
      { label: "Email", href: `mailto:${site.email}` },
      { label: "LinkedIn", href: site.linkedin, external: true },
      { label: "Resume", href: site.resumeUrl, download: true },
    ],
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-contact-anim]"),
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-2 bg-white p-[clamp(1.5rem,4vw,2.5rem)]"
    >
      <div
        className="relative z-10 flex flex-col gap-6 overflow-hidden rounded-[clamp(1.75rem,4vw,3rem)] px-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(1.5rem,4vw,2.5rem)] text-fg min-[900px]:min-h-[min(80svh,840px)] min-[900px]:justify-between min-[900px]:gap-[clamp(0.75rem,2vw,1.25rem)]"
        style={{
          backgroundImage: silkGradient,
          backgroundSize: "140% 140%",
          backgroundPosition: "20% 40%",
        }}
      >
        <div
          data-contact-anim
          className="mx-auto flex flex-col items-center gap-3 pt-[clamp(0.5rem,2vw,1.25rem)] text-center opacity-0"
        >
          <p className={`${display} m-0 text-[clamp(2.6rem,8vw,5.5rem)] uppercase text-(--white)`}>
            {site.name}
          </p>
          <p className="m-0 max-w-[32ch] text-[clamp(0.95rem,1.6vw,1.15rem)] font-normal leading-[1.45] text-(--fg-muted)">
            An idea, a project, or simply need to build something that feels right?
          </p>
          <a href={`mailto:${site.email}`} className={`group/pill ${btnPill} w-fit`}>
            <span className={btnPillLabel}>Let&apos;s talk!</span>
            <span className={btnPillArrow} aria-hidden>
              →
            </span>
          </a>
        </div>

        <div
          data-contact-anim
          className="mx-auto grid w-full max-w-275 grid-cols-3 gap-x-3 text-center opacity-0 min-[900px]:gap-8"
        >
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-[0.85rem] text-[0.95rem] font-semibold text-(--white)">
                {col.title}
              </p>
              <ul className="m-0 grid list-none justify-items-center gap-[0.45rem] p-0">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <a
                      href={link.href}
                      className="text-[0.82rem] text-(--fg-muted) transition-colors duration-200 hover:text-fg"
                      {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      {...(link.download ? { download: true } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          data-contact-anim
          className="m-0 text-center text-[0.68rem] uppercase tracking-[0.14em] text-(--fg-dim) opacity-0"
        >
          © {site.name.toUpperCase()} - {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
