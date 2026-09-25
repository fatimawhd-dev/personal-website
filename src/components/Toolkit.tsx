"use client";

import { techCategories, techMarquee } from "@/data/content";
import { display, sectionHeading, sectionLabel } from "@/lib/ui";

function MarqueeTrack({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="m-0 flex list-none items-center gap-12 p-0 pr-12 min-[700px]:gap-16 min-[700px]:pr-16"
      aria-hidden={ariaHidden || undefined}
    >
      {techMarquee.map((item) => (
        <li
          key={`${item.file}-${ariaHidden ? "b" : "a"}`}
          className="flex shrink-0 items-center gap-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/tech/${item.file}.svg`}
            alt=""
            width={36}
            height={36}
            className="size-8 brightness-0 min-[700px]:size-9"
            loading="lazy"
            decoding="async"
          />
          <span className="text-[1.05rem] font-semibold tracking-[0.02em] whitespace-nowrap text-ink min-[700px]:text-[1.15rem]">
            {item.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

function TechPill({ name, file }: { name: string; file: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full bg-[#214264] py-1.5 pr-4 pl-1.5 text-[0.8rem] font-semibold tracking-[0.01em] text-white">
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/tech/${file}.svg`}
          alt=""
          width={14}
          height={14}
          className="size-3.5"
          loading="lazy"
          decoding="async"
        />
      </span>
      {name}
    </span>
  );
}

export function Toolkit() {
  return (
    <section
      aria-label="Technologies I work with"
      className="relative z-1 overflow-hidden border-y border-(--line-dark) bg-[#f4f7fb] py-[clamp(3.5rem,8vw,5.5rem)]"
    >
      {/* Scrolling strip */}
      {/* <div className="relative mb-[clamp(2.5rem,6vw,3.75rem)]">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-1 w-16 bg-linear-to-r from-[#f4f7fb] to-transparent min-[700px]:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-1 w-16 bg-linear-to-l from-[#f4f7fb] to-transparent min-[700px]:w-28" />
        <div className="flex w-max animate-tech-marquee hover:[animation-play-state:paused]">
          <MarqueeTrack />
          <MarqueeTrack ariaHidden />
        </div>
      </div> */}

      {/* Categorized toolkit */}
      <div className="mx-auto max-w-350 px-[clamp(1.25rem,4vw,3.5rem)]">
        <p className={sectionLabel}>Toolkit</p>
        <h2 className={`${sectionHeading} mt-3 mb-8 text-ink`}>
          Stack I ship with.
        </h2>

        <div className="grid grid-cols-1 gap-4 min-[800px]:grid-cols-2 min-[800px]:gap-5">
          {techCategories.map((cat) => (
            <article
              key={cat.title}
              className="rounded-[1.35rem] border border-(--line-dark) bg-white px-[clamp(1.25rem,3vw,1.75rem)] py-[clamp(1.35rem,3vw,1.85rem)]"
            >
              <div className="mb-5 flex items-start justify-between gap-6">
                <h3 className="m-0 shrink-0 text-[clamp(1.55rem,3vw,2.1rem)] font-bold tracking-[-0.03em] leading-none text-ink uppercase">
                  {cat.title}
                </h3>
                <p className="m-0 max-w-[22ch] text-right text-[0.88rem] leading-[1.45] text-(--ink-muted)">
                  {cat.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cat.items.map((item) => (
                  <TechPill key={item.name} name={item.name} file={item.file} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
