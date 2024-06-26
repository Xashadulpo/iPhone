"use client";

import { chipImg, frameImg, frameVideo } from "@/utils";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { gsapWithanime, gsapWithVideo } from "@/constant/gsapWithAnim";

const Model = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsapWithanime(".g_chip", {
      opacity: 2,
      scale: 1,
      duration: 1,
      ease: "power2.inOut",
    });
    gsapWithVideo(".video", videoRef);
    gsapWithanime(".g_fadeIn", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <section className="relative w-full h-full common-padding bg-black">
      <div className="screen-max-width">
        {/* pro chip  */}
        <div className="w-full flex-center my-20">
          <Image
            src={chipImg}
            alt="chopImg"
            width={300}
            height={300}
            className="opacity-0 scale-150 g_chip"
          />
        </div>
        {/* text  */}
        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            A17 Pro chip.
            <br /> A monster win for gaming.
          </h2>

          <p className="hiw-subtitle">
            It's here. The biggest redesign in the history of Apple GPUs.
          </p>
        </div>
        {/* video container */}
        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className=" absolute w-full top-[-16px] md:top-[-22px] h-full">
              {/* Image (frame) */}
              <img
                src={frameImg}
                alt="frame"
                className="bg-transparent object-contain z-10 pointer-events-none"
              />
            </div>
            <div className="hiw-video ">
              {/* Video */}
              <video
                className="pointer-events-none video"
                src={frameVideo}
                playsInline
                preload="none"
                muted
                ref={videoRef}
                autoPlay
              />
            </div>
          </div>
          <p className="text-gray font-semibold text-center mt-6">
            Honkai: Star Rail
          </p>
        </div>

        <div className="hiw-text-container">
          <div className="flex flex-1 justify-center flex-col">
            <p className="hiw-text g_fadeIn">
              A17 Pro is an entirely new class of iPhone chip that delivers our{" "}
              <span className="text-white">
                best graphic performance by far
              </span>
              .
            </p>

            <p className="hiw-text g_fadeIn">
              Mobile{" "}
              <span className="text-white">
                games will look and feel so immersive
              </span>
              , with incredibly detailed environments and characters.
            </p>
          </div>

          <div className="flex-1 flex justify-center flex-col g_fadeIn">
            <p className="hiw-text">New</p>
            <p className="hiw-bigtext">Pro-class GPU</p>
            <p className="hiw-text">with 6 cores</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
