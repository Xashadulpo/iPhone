"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { explore1Img, exploreVideo, explore2Img } from "@/utils";
import Image from "next/image";

const Features = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to("#features-title", {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: "#features-title",
        toggleActions: "restart reverse restart reverse",
        start: "top 85%",
        scrub: true,
      },
    });
    gsap.to("#exploreVideo", {
      opacity:2,
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        videoRef.current?.play();
      },
    });
    gsap.to(".g-video", {
      opacity: 1.6,
      scale: 1,
      scrollTrigger: {
        trigger: ".g-video",
        start: "top 85%",
        scrub: 5.5,
      },
      ease: "power1",
    });
    gsap.to(".g-text", {
      opacity: 2,
      y: 0,
      ease: "power2.inOut",
      duration: 1,
      scrollTrigger: {
        trigger: ".g-text",
        toggleActions: "restart reverse restart reverse",
        start: "top 95%",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="w-screen overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="features-title" className="title section-heading">
            Explore the full story.
          </h1>
        </div>
        <div className="flex flex-col item-center justify-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">
              Forged in titanium.
            </h2>
          </div>
          <div className="flex-center flex-col sm:px-10 ">
            {/* play video  */}
            <div className="relative h-[50vh] w-full flex items-center">
              <video
                src={exploreVideo}
                id="exploreVideo"
                playsInline
                muted
                className="object-cover w-full"
                autoPlay
                ref={videoRef}
              />
            </div>
            {/* image video  */}
            <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 md:mt-16">
              <div className="relative overflow-hidden w-full h-0 pb-[100%]">
                <Image
                  src={explore1Img}
                  alt="explore1Img"
                  layout="fill"
                  className="feature-video g-video"
                />
              </div>
              <div className="relative overflow-hidden w-full h-0 pb-[100%]">
                <Image
                  src={explore2Img}
                  alt="explore2Img"
                  layout="fill"
                  className="feature-video g-video"
                />
              </div>
            </div>
            {/* text  */}
            <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 md:mt-16 ">
              <p className="feature-text g-text">
                iPhone 15 Pro is {" "}
                <span className="text-white">
                  the first iPhone to feature an aerospace-grade titanium design
                </span>
                , using the same alloy that spacecrafts use for missions to
                Mars.
              </p>

              <p className="feature-text g-text">
                Titanium has one of the best strength-to-weight ratios of any
                metal, making these our{" "}
                <span className="text-white">lightest Pro models ever.</span>
                You'll notice the difference the moment you pick one up.
              </p>
            </div>
          </div>
        </div>
        <br/>
        <br/>

        <br/>

        <br/>

        <br/>

        <br/>

        <br/>        <br/>

<br/>

<br/>

<br/>

<br/>


        <br/>

        <br/>


      </div>
    </section>
  );
};

export default Features;
