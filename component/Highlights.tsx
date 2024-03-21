"use client";

import { rightImg, watchImg } from "@/utils";
import { useGSAP } from "@gsap/react";
import { VideoCarousel } from ".";
import Image from "next/image";
import gsap from "gsap";


const Highlights = () => {
  useGSAP(() => {
    gsap.to(".title", { opacity: 1, duration: 1, y: 0 });
    gsap.to(".link", { opacity: 1, duration: 1, y: 0, stagger: 0.25 });
  }, []);
  return (
    <section id="highlights" className="w-screen h-full overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-center justify-between common-padding">
          <h1 className="title section-heading">Get the highlights</h1>
          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <Image
                src={watchImg}
                width={18}
                height={16}
                alt="watchImg"
                className="ml-2"
              />
            </p>
            <p className="link">
              Watch the event
              <Image
                src={rightImg}
                width={10}
                height={16}
                alt="rightImg"
                className="ml-2"
              />
            </p>
          </div>
        </div>
        <VideoCarousel/>
      </div>
    </section>
  );
};

export default Highlights;
