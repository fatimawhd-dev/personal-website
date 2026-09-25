"use client";

import { SmoothScroll } from "./SmoothScroll";
import { PageLoader } from "./PageLoader";
import { LiveSilk } from "./LiveSilk";
import { Navigation } from "./Navigation";
import { Hero } from "./Hero";
import { About } from "./About";
import { Services } from "./Services";
// import { Experience } from "./Experience";
import { JourneyTimeline } from "./JourneyTimeline";
import { Toolkit } from "./Toolkit";
import { Process } from "./Process";
import { Work } from "./Work";
import { Help } from "./Help";
import { Testimonials } from "./Testimonials";
import { Message } from "./Message";
import { Impact } from "./Impact";
import { Contact } from "./Contact";

export function Portfolio() {
  return (
    <>
      <PageLoader />
      <LiveSilk />
      <SmoothScroll>
        <div className="relative z-1">
          <Navigation />
          <main>
            <Hero />
            <About />
            <Services />
            {/* <Experience /> */}
            <JourneyTimeline />
            <Toolkit />
            <Process />
            <Work />
            <Help />
            <Message />
            <Impact />
            <Testimonials />
            <Contact />
          </main>
        </div>
      </SmoothScroll>
    </>
  );
}
