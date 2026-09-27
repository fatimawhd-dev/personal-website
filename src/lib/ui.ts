/** Shared Tailwind class strings used across the site */

export const display =
  "font-[family-name:var(--font-display),system-ui,sans-serif] font-bold tracking-[-0.03em] leading-[0.92]";

export const sectionHeading =
  "font-[family-name:var(--font-display),system-ui,sans-serif] font-bold tracking-[-0.03em] leading-[0.92] text-[clamp(2rem,4.5vw,3.25rem)]";

export const sectionLead =
  "m-0 font-[family-name:var(--font-body),system-ui,sans-serif] text-[0.95rem] font-normal leading-[1.55]";

export const sectionLabel =
  "m-0 text-[0.72rem] font-semibold tracking-[0.2em] text-accent uppercase";

export const btnPill =
  "inline-flex shrink-0 items-center gap-[0.55rem] min-h-12 py-1 pr-[0.3rem] pl-[1.35rem] border-0 rounded-full bg-white text-accent whitespace-nowrap cursor-pointer font-inherit transition-[transform,box-shadow] duration-300 hover:-translate-y-px hover:shadow-[0_10px_28px_rgba(0,0,0,0.22)]";

export const btnPillLabel =
  "inline-flex items-center justify-center p-0 rounded-none bg-transparent text-accent text-[0.92rem] font-semibold";

export const btnPillArrow =
  "inline-flex items-center justify-center size-[2.45rem] rounded-full bg-[rgba(255,79,45,0.1)] text-accent transition-[transform,background] duration-300 group-hover/pill:translate-x-0.5 group-hover/pill:bg-[rgba(255,79,45,0.16)]";

export const btnGlass =
  "inline-flex shrink-0 items-center gap-[0.55rem] min-h-12 py-1 pr-[0.3rem] pl-[1.35rem] rounded-full border border-[var(--glass-border)] bg-[var(--glass)] backdrop-blur-[14px] text-fg text-[0.92rem] font-semibold tracking-[0.02em] whitespace-nowrap transition-[background,border-color] duration-300 hover:bg-[rgba(255,255,255,0.14)] hover:border-[rgba(255,255,255,0.4)]";

export const btnGlassDot =
  "inline-flex items-center justify-center size-[2.45rem] rounded-full border border-[var(--glass-border)] bg-[rgba(255,255,255,0.06)] text-fg";

export const silkGradient = [
  "radial-gradient(ellipse 70% 55% at 18% 28%, rgba(90, 140, 200, 0.45), transparent 58%)",
  "radial-gradient(ellipse 65% 50% at 88% 18%, rgba(160, 190, 230, 0.32), transparent 55%)",
  "radial-gradient(ellipse 55% 65% at 72% 82%, rgba(40, 90, 160, 0.48), transparent 58%)",
  "radial-gradient(ellipse 50% 40% at 8% 88%, rgba(120, 160, 210, 0.28), transparent 52%)",
  "linear-gradient(145deg, #020814 0%, #0a1a34 42%, #061428 100%)",
].join(", ");

