"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { message } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * Layout/animation
 * - title scale + tracking on the wrapper
 * - first line narrower than second (max-w-xs → md:max-w-2xl / 4xl)
 * - absolute tilted badge between the two lines
 * - scrubbed word color reveal + clip-path badge + rising body words
 */
export function Message() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reveal = "#f3efe6";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.querySelectorAll<HTMLElement>("[data-msg-word]").forEach((el) => {
        el.style.color = reveal;
      });
      const badge = section.querySelector<HTMLElement>("[data-msg-badge]");
      if (badge) {
        badge.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
      }
      return;
    }

    const firstWords = section.querySelectorAll<HTMLElement>("[data-msg-word='a']");
    const secondWords = section.querySelectorAll<HTMLElement>("[data-msg-word='b']");
    const bodyWords = section.querySelectorAll<HTMLElement>("[data-msg-body-word]");
    const badge = section.querySelector<HTMLElement>("[data-msg-badge]");

    const ctx = gsap.context(() => {
      // One scrub range: when section center hits viewport center,
      // every title word (including the last) is fully highlighted.
      const titleWords = [...firstWords, ...secondWords];
      gsap.to(titleWords, {
        color: reveal,
        ease: "none",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "center 42%",
          scrub: true,
        },
      });

      if (badge) {
        gsap.set(badge, {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        });
        gsap.to(badge, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 64%",
            end: "top 48%",
            scrub: true,
          },
        });
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "center 42%",
            toggleActions: "play none none reverse",
          },
        })
        .from(bodyWords, {
          yPercent: 300,
          rotate: 3,
          ease: "power1.inOut",
          duration: 1,
          stagger: 0.01,
        });
    }, section);

    return () => ctx.revert();
  }, []);

  const splitWords = (text: string, group: "a" | "b") =>
    text.split(" ").map((word, i) => (
      <span
        key={`${group}-${word}-${i}`}
        data-msg-word={group}
        className="mr-[0.22em] inline-block last:mr-0"
        style={{ color: "rgba(243, 239, 230, 0.06)" }}
      >
        {word}
      </span>
    ));

  return (
    <section
      id="message"
      ref={sectionRef}
      aria-label="Message"
      className="relative z-20 flex min-h-svh items-center justify-center overflow-hidden bg-[#061428] px-[clamp(1.25rem,4vw,3.5rem)]"
    >
      <div className="relative mx-auto flex w-full max-w-350 flex-col items-center py-20 md:py-28">
        <div className="relative flex flex-col items-center justify-center gap-2 font-[family-name:var(--font-loader),Arial_Black,sans-serif] text-5xl leading-none font-medium tracking-[-0.35vw] uppercase md:gap-24 md:text-6xl xl:text-7xl">
          <h2 className="m-0 max-w-xs text-center leading-none md:max-w-xl xl:max-w-2xl">
            {splitWords(message.lineOne, "a")}
          </h2>


          <div
            data-msg-badge
            className="relative z-10 rotate-3 border-[0.5vw] border-[#061428] will-change-[clip-path] md:absolute md:-translate-y-12 xl:-translate-y-8"
            style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
          >
            <div className="grid place-items-center bg-[#f3efe6] px-[0.4em] pt-[0.12em] pb-[0.22em]">
              <p className="m-0 text-[1em] leading-none font-bold tracking-[-0.35vw] text-[#061428] uppercase">
                {message.badge}
              </p>
            </div>
          </div>

          <h2
            data-msg-second
            className="m-0 max-w-xs text-center leading-none md:max-w-2xl xl:max-w-3xl"
          >
            {splitWords(message.lineTwo, "b")}
          </h2>
        </div>

        <div className="mt-10 flex justify-center md:mt-16">
          <div data-msg-body className="max-w-md overflow-hidden px-8 text-center">
            <p className="m-0 text-[1.05rem] leading-[1.45] text-[#f3efe6] md:text-lg">
              {message.body.split(" ").map((word, i) => (
                <span
                  key={`body-${word}-${i}`}
                  data-msg-body-word
                  className="mr-[0.28em] inline-block will-change-transform last:mr-0"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
