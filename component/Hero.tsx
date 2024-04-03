"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

import { heroVideo, smallHeroVideo } from "../utils";

const Hero = () => {
  const [vdoSrc, setvdoSrc] = useState<string>(
    window.innerWidth > 760 ? heroVideo : smallHeroVideo
  );
  useEffect(() => {
    const updateVideoSource = () => {
      setvdoSrc(window.innerWidth > 760 ? heroVideo : smallHeroVideo);
    };
    window.addEventListener("resize", updateVideoSource);
    return () => {
      window.removeEventListener("resize", updateVideoSource);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#hero-title", { opacity: 1, delay: 2 });
    gsap.to("#cta", { opacity: 1, delay: 2, y: -50 });
  });

  return (
    <section className="w-full nav-height relative ">
      <div className="w-full h-full flex-center flex-col ">
        <p
          id="hero-title"
          className="text-gray-100 text-3xl font-semibold max-md:mb-10 opacity-0"
        >
          iPhone 15 Pro
        </p>
        <div className="max-sm:w-9/12 md:w-5/6 phone:w-[60%]">
          <video
            className="pointer-events-none"
            muted
            autoPlay
            playsInline={true}
            key={vdoSrc}
          >
            <source src={vdoSrc} type="video/mp4" />
          </video>
        </div>
        <div
          id="cta"
          className="mt-4 md:mt-12 flex flex-col flex-center opacity-0 translate-y-5"
        >
          <a href="#highlights" className="btn">
            buy
          </a>
          <p className="font-normal text-xl">From $199/month or $999</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;