export const site = {
  name: "Fatima Waheed",
  shortName: "Fatima",
  role: "Full Stack Developer",
  heroLines: "Transforming ideas into innovative products. Building experiences that make them grow.",
  headline:
    "I am Fatima. I combine product thinking, full-stack engineering and AI to craft digital experiences that feel intentional and ship with confidence.",
  email: "fatimawhd.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/fatimawaheed10/",
  resumeUrl: "/resume.pdf",
  about: [
    "I'm a passionate software engineer with 4+ years of experience building meaningful, user-focused products that blend creativity with technology.",
    "With experience in AI-driven and cross-platform development, I enjoy turning complex ideas into simple, impactful digital experiences while continuously learning and growing through new challenges.",
  ],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#experience" },
  { label: "Process", href: "#process" },
  { label: "Help", href: "#help" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const experience = [
  {
    role: "Freelance Product Engineer",
    company: "Independent",
    period: "July 2026 — Present",
    category: "Freelance · Product",
    place: "Remote · clients",
    summary:
      "Designing and shipping full-stack products for clients end to end — including continuing Storia with the client after We Over I, plus new products from Figma through production.",
    systems: [
      {
        title: "Storia",
        description:
          "Continued as lead engineer with the client after We Over I — AI journaling, notifications, and App of the Day craft.",
      },
      {
        title: "Creator Assist",
        description:
          "Kanban content tracker, payments, agency talent management, and idea-to-content flows for creators.",
      },
      {
        title: "Progress Pad",
        description:
          "Triggers, mind sweeps, writing spaces, six pillars of progression, and a full archive of past days.",
      },
    ],
    highlights: [
      "Kept shipping Storia with the client after leaving We Over I — Ask Sunny, Echo, guided journals, and AI reviews.",
      "Designed Creator Assist and Progress Pad in Figma, then engineered them in Next.js, TypeScript, and Supabase.",
      "Built creator workflows for organic and paid collaborations, profit-and-loss tracking, and agency multi-talent views.",
      "Shipped Progress Today features including triggers, gratitude/reflection writing, and mental-to-romantic progress pillars.",
    ],
  },
  {
    role: "Product Engineer",
    company: "We Over I",
    period: "June 2024 — July 2026",
    category: "Product & AI",
    place: "Remote · startups",
    summary:
      "Partnering with early-stage startups to deliver end-to-end software design, engineering, and product solutions — from Figma through production.",
    systems: [
      {
        title: "Storia",
        description:
          "Led engineering on an AI journaling app featured as App of the Day by Apple multiple times.",
      },
      {
        title: "Kurdistan Tourism",
        description:
          "AI trip planner, place bookings, and immersive video experiences for travelers.",
      },
    ],
    highlights: [
      "Built personalized notifications, weekly/monthly AI reviews, Ask Sunny, Echo, and guided journals on Storia.",
      "Shipped AI itineraries from party size, kids, and trip length — plus events and tours booking.",
      "Owned mobile/web product craft across subscriptions, maps, and AI-assisted travel flows.",
    ],
  },
  {
    role: "Software Engineer",
    company: "VaporVM",
    period: "Dec 2023 — June 2024",
    category: "Platform & Systems",
    place: "Enterprise · cloud",
    summary:
      "Cloud transformation and custom software for enterprise clients — real-time platforms, scheduled jobs, and production data systems.",
    systems: [
      {
        title: "Support Cloud",
        description:
          "Cloud support platform with SignalR real-time updates for live operations.",
      },
      {
        title: "Jobs & data layer",
        description:
          "Quartz.NET jobs, CQRS backends, and MongoDB models tuned for production.",
      },
    ],
    highlights: [
      "Built scheduled Quartz.NET jobs and CQRS services with optimized SQL procedures.",
      "Delivered real-time support experiences with SignalR on Support Cloud.",
      "Designed MongoDB models and indexes for reliable production data.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "ili.digital",
    period: "Sept 2022 — Nov 2023",
    category: "Engineering Foundation",
    place: "Enterprise · product",
    summary:
      "Custom software and platform work for enterprise clients — including flight-planning systems, access control, and controlled feature rollouts.",
    systems: [
      {
        title: "VoloIQ",
        description:
          "Flight-planning for certified eVTOL — distances, payload, and mid-route fuel modeling.",
      },
      {
        title: "Access & rollouts",
        description:
          "Django RBAC and Flagsmith feature flags for safe, controlled production releases.",
      },
    ],
    highlights: [
      "Contributed across front end and back end on Volocopter’s VoloIQ, with deep work on the Django side.",
      "Modeled route distance, weight/luggage, and remaining fuel along the path.",
      "Shipped React interfaces with RBAC and Flagsmith-driven feature rollouts.",
    ],
  },
];

export const projects = [
  {
    title: "Creator Assist",
    category: "AI Product",
    tech: ["Next.js", "TypeScript", "Supabase", "Figma"],
    year: "2026",
    status: "Ongoing",
    image: "/projects/creator-assist.png",
    imageAlt:
      "Creator Assist landing page with waitlist signup for creators running a business",
    role: "Product engineer · full stack",
    did: [
      "Building Creator Assist for social media creators and influencers who run content like a business.",
      "Designed the product end to end in Figma before engineering the experience.",
      "Shipped a Kanban-style content tracker — concept → film → edit → deliver / go live.",
      "Support for organic posts and paid collaborations as separate content types.",
      "Payments tracking with profit-and-loss visibility across deals and brand work.",
      "Agency mode so one account can manage multiple talents (often 6–7 at once).",
      "Revenue overview, dues-this-week alerts, and an ideas brain-dump that converts into tracked content.",
      "Owned the product architecture, landing/waitlist UX, and full-stack feature work end to end.",
    ],
  },
  {
    title: "Progress Pad",
    category: "Product",
    tech: ["Next.js", "TypeScript", "Supabase", "Figma"],
    year: "2026",
    status: "Ongoing",
    image: "/projects/progress-pad.png",
    imageAlt:
      "Progress Today dashboard showing daily triggers and workspace cognitive reset",
    role: "Full-stack engineer",
    did: [
      "Built Progress Today around triggers — daily tasks you plan and complete.",
      "Designed the full product experience in Figma, then engineered it in code.",
      "Active Mind Sweep list for capturing open loops and turning them into actionable tasks.",
      "Writing spaces for daily gratitude, quotes, reflections, and free journaling.",
      "Six pillars of progression: mental, emotional, professional, physical, social, and romantic check-ins.",
      "A Done list so finished work stays visible and motivating.",
      "Archive section to revisit everything written across past days.",
      "Owned the dashboard UI, trigger workflows, and full-stack feature delivery.",
    ],
  },
  {
    title: "Storia",
    category: "Mobile & AI",
    tech: ["React Native", "Expo", "Swift", "Firebase", "OpenAI"],
    year: "2025",
    status: "App of the Day · Apple",
    image: "/projects/storia.jpg",
    imageAlt:
      "Storia five-minute ritual promo with Daily Storia, check-in, and gratitude cards",
    role: "Lead engineer",
    did: [
      "Led engineering across Storia — an AI journaling app featured as App of the Day by Apple multiple times.",
      "Built on Firebase with personalized notifications generated from what users wrote in recent journal entries.",
      "Monthly AI reviews that surface patterns and insights people couldn’t see while journaling day to day.",
      "Weekly reviews for a lighter cadence of reflection and progress.",
      "Ask Sunny — chat with Sunny, the in-app character, about anything on your mind.",
      "Echo — resurfaces a random past entry so users can reflect back on earlier moments.",
      "Guided journals with prompted questions so writing feels easy without staring at a blank page.",
      "Owned mobile UI, subscriptions, widgets, notifications, and AI-powered insight features.",
    ],
  },
  {
    title: "Kurdistan Tourism",
    category: "Frontend & Backend",
    tech: ["React", "Mapbox", "OpenAI", "MapTiler"],
    year: "2024",
    status: "Production",
    image: "/projects/kurdistan.png",
    imageAlt:
      "Golden-hour view of a historic city square with citadel, fountains, and clock tower",
    role: "Full-stack product engineer",
    did: [
      "Built an AI trip planner: travelers share party size, kids, and trip length — then get a full AI-generated itinerary.",
      "Personalized plans from user preferences so the trip fits who they’re traveling with and how long they’ll stay.",
      "Tourism booking system for places and destinations across Kurdistan.",
      "Events and tours booking so visitors can reserve experiences alongside the itinerary.",
      "Immersive video experiences to let users feel Kurdistan before they go.",
      "Integrated MapTiler, Mapbox, and OpenAI for maps, discovery, and intelligent planning.",
      "Owned trip-planner UX, maps & AI flows, and booking integrations.",
    ],
  },
  {
    title: "ManageX",
    category: "Platform",
    tech: ["C#", ".NET", "SignalR", "MongoDB", "Quartz.NET"],
    year: "2023",
    status: "Production",
    href: "https://managex.ae/",
    image: "/projects/managex.png",
    imageAlt:
      "ManageX Platform hero — Empowers you to hire certified resources, with Get Started and Call Now",
    role: "Software engineer",
    did: [
      "Managed production background services with Quartz.NET to automate recurring jobs and scheduled workflows.",
      "Applied Repository and CQRS patterns to build modular, maintainable backend services for long-term scale.",
      "Designed and optimized SQL stored procedures for complex business logic and faster query performance.",
      "Developed and maintained MongoDB models and indexes for efficient storage and retrieval in production.",
      "Built a cloud support and issue-management system for request logging, expert assignment, SLAs, and task tracking.",
      "Integrated SignalR for real-time status updates and notifications for customers and internal support teams.",
    ],
  },
  {
    title: "VoloIQ",
    category: "Platform",
    tech: ["Python", "Django", "React", "PostgreSQL"],
    year: "2022",
    status: "Enterprise",
    image: "/projects/voloiq.jpg",
    imageAlt:
      "White eVTOL aircraft flying over La Défense and the Grande Arche in Paris at sunset",
    role: "Software engineer",
    did: [
      "Worked on Volocopter’s VoloIQ flight-planning system for certified eVTOL operations.",
      "Contributed across front end and back end, with most of my focus on the Python / Django backend.",
      "Distance calculations between origin and destination as the base of each planned route.",
      "Factored weight and luggage into planning so fuel burn matched real payload.",
      "Modeled remaining fuel mid-route so planners could see what was left along the path.",
      "Built React interfaces on top of the planning services and shared data layer.",
      "Owned flight-planning backend logic, API integrations, and route-validation flows.",
    ],
  },
];

export const services = [
  {
    title: "Frontend Development",
    tone: "coral" as const,
    ink: "light" as const,
    description:
      "I build polished, high-performance interfaces with React and Next.js — responsive layouts, thoughtful interactions, and code that stays maintainable as products grow.",
    features: ["Responsive Interfaces", "Motion & Interactions", "Performance"],
  },
  {
    title: "Backend Development",
    tone: "sand" as const,
    ink: "light" as const,
    description:
      "I design APIs and services that stay reliable under load — clean data models, secure auth, and integrations that make the product feel seamless end to end.",
    features: ["APIs & Services", "Data Architecture", "Reliability"],
  },
  {
    title: "UI/UX Development",
    tone: "teal" as const,
    ink: "light" as const,
    description:
      "I turn product goals into clear flows and interfaces — from wireframes to production-ready UI — so every screen feels intentional, accessible, and easy to ship.",
    features: ["Product Flows", "Design Systems", "Accessible UI"],
  },
  {
    title: "Websites and Mobile Apps",
    tone: "ink" as const,
    ink: "light" as const,
    description:
      "I create custom-coded websites and apps specifically for your brand. I focus on making sure they are scalable, fast, accessible, and have engaging animations to provide a memorable experience for users.",
    features: ["Modern Websites", "Motion & Animations", "Scalability"],
  },
];

export const processSteps = [
  {
    title: "Frame",
    label: "01 — FRAME",
    body: "Get clear on the idea, the people it's for, the problem, and what success actually looks like.",
    tone: "coral" as const,
  },
  {
    title: "Outline",
    label: "02 — OUTLINE",
    body: "Map the experience — flows, structure, edge cases, and interface — before committing to code.",
    tone: "sand" as const,
  },
  {
    title: "Realise",
    label: "03 — REALISE",
    body: "Turn the thinking into a working product across web, mobile, backend, APIs, and AI.",
    tone: "teal" as const,
  },
  {
    title: "Grow",
    label: "04 — GROW",
    body: "Test, polish, learn, and iterate — turning the first version into something stronger with every pass.",
    tone: "ink" as const,
  },
];

export const offerings = [
  {
    title: "Business websites",
    body: "Custom-coded sites for your brand — fast, on-brand, and built to convert visitors into clients.",
  },
  {
    title: "Landing pages",
    body: "Focused launch and campaign pages with clear hierarchy, strong CTAs, and motion that supports the story.",
  },
  {
    title: "Portfolio websites",
    body: "Personal or studio portfolios that put your work first — clean layouts, smooth scroll, and memorable detail.",
  },
  {
    title: "Mobile apps",
    body: "React Native / Expo apps from idea to App Store — polished UI, real product flows, and production readiness.",
  },
  {
    title: "Web apps & SaaS",
    body: "Dashboards, tools, and full-stack products — auth, data, and interfaces that stay reliable as you grow.",
  },
  {
    title: "AI-powered products",
    body: "Thoughtful AI features woven into the product — journaling, planning, assistants — not bolted-on demos.",
  },
];

export const techMarquee = [
  { name: "React", file: "react" },
  { name: "TypeScript", file: "typescript" },
  { name: "Next.js", file: "nextjs" },
  { name: "Figma", file: "figma" },
  { name: "Supabase", file: "supabase" },
  { name: "Firebase", file: "firebase" },
  { name: "MongoDB", file: "mongodb" },
  { name: ".NET", file: "dotnet" },
  { name: "Python", file: "python" },
  { name: "Django", file: "django" },
  { name: "PostgreSQL", file: "postgresql" },
  { name: "Expo", file: "expo" },
  { name: "Swift", file: "swift" },
  { name: "OpenAI", file: "openai" },
  { name: "GSAP", file: "gsap" },
  { name: "Mapbox", file: "mapbox" },
  { name: "FastAPI", file: "fastapi" },
  { name: "C#", file: "csharp" },
];

/** Categorized toolkit cards (icons under /public/tech). No duplicates across groups. */
export const techCategories = [
  {
    title: "Frontend",
    description: "Interfaces, motion, responsive systems, and polished user experiences.",
    items: [
      { name: "React", file: "react" },
      { name: "React Native", file: "react" },
      { name: "Next.js", file: "nextjs" },
      { name: "TypeScript", file: "typescript" },
      { name: "JavaScript", file: "javascript" },
      { name: "HTML", file: "html5" },
      { name: "CSS", file: "css" },
      { name: "Tailwind CSS", file: "tailwindcss" },
      { name: "Bootstrap", file: "bootstrap" },
      { name: "Redux", file: "redux" },
      { name: "GSAP", file: "gsap" },
      { name: "Expo", file: "expo" },
      { name: "Swift", file: "swift" },
    ],
  },
  {
    title: "Backend",
    description: "APIs, server logic, authentication flows, and application data handling.",
    items: [
      { name: "Python", file: "python" },
      { name: "Django", file: "django" },
      { name: "FastAPI", file: "fastapi" },
      { name: "NestJS", file: "nestjs" },
      { name: ".NET", file: "dotnet" },
      { name: "C#", file: "csharp" },
      { name: "OpenAI", file: "openai" },
    ],
  },
  {
    title: "Database",
    description: "Structured data, realtime services, and project-ready persistence.",
    items: [
      { name: "PostgreSQL", file: "postgresql" },
      { name: "MongoDB", file: "mongodb" },
      { name: "Supabase", file: "supabase" },
      { name: "Firebase", file: "firebase" },
      { name: "Weaviate", file: "weaviate" },
    ],
  },
  {
    title: "Tools",
    description: "Design handoff, analytics, flags, maps, and shipping tooling.",
    items: [
      { name: "Figma", file: "figma" },
      { name: "VS Code", file: "visualstudiocode" },
      { name: "GitHub", file: "github" },
      { name: "Vercel", file: "vercel" },
      { name: "Mapbox", file: "mapbox" },
      { name: "MapTiler", file: "maptiler" },
      { name: "Mixpanel", file: "mixpanel" },
      { name: "Flagsmith", file: "flagsmith" },
      { name: "RevenueCat", file: "revenuecat" },
    ],
  },
];

export const message = {
  lineOne: "Stir up bold ideas and",
  badge: "shape",
  lineTwo: "visions into real things that make a difference",
  body: "Product thinking, full-stack craft, and AI — built to grow with the people who use them.",
};

export const impact = {
  title: "A snapshot of",
  badge: "The Journey",
  body: "Years of product work across web, mobile, and AI — measured in what actually launched.",
  stats: [
    { label: "Experience", amount: "4 years +" },
    { label: "Products", amount: "8+" },
    { label: "Platforms", amount: "Web · iOS" },
    { label: "Teams & clients", amount: "8+" },
  ],
};

export const testimonials = [
  {
    quote:
      "Working with Fatima on Storia was a true pleasure. Her product sense, polish, and commitment to quality turned ambitious ideas into an experience people love — and that earned App of the Day.",
    name: "Elizabeth Uviebinené",
    role: "Storia",
    tags: ["Mobile", "AI", "Product"],
  },
  {
    quote:
      "Fatima brought clarity and craft to Progress Pad. She ships fast without cutting corners — thoughtful engineering, clean interfaces, and a collaborator you can trust end to end.",
    name: "Kheron Gilpin",
    role: "Progress Pad",
    tags: ["Full Stack", "UI/UX", "Website", "Delivery"],
  },
];
