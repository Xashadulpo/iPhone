"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { hightlightsSlides } from "@/constant";
import { pauseImg, playImg, replayImg } from "@/utils";
import { VideoType } from "@/types";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const VideoCarousel = () => {
  const [video, setVideo] = useState<VideoType>({
    videoId: 0,
    startPlay: false,
    isPlaying: false,
    isEnd: false,
    isLastVideo: false,
  });
  const [loadedData, setLoadedData] = useState<number[]>([]);

  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLSpanElement | null)[]>([]);
  const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);

  const { videoId, startPlay, isPlaying, isEnd, isLastVideo } = video;

  useEffect(() => {
    // Initialize ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    // slider animation to move the video out of the screen and bring the next video in
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    const setVideoPlay = () => {
      setVideo((prev) => ({
        ...prev,
        isPlaying: true,
        startPlay: true,
      }));
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
    });

    gsap.to("#video", {
      onComplete: setVideoPlay,
    });
    return () => {
      tl.kill(); // Kill the timeline when component unmounts
    };
  }, [isEnd, videoId]);

  // useGSAP(() => {
  //   gsap.to("#video", {
  //     scrollTrigger: {
  //       trigger: "#video",
  //       toggleActions: " restart none none none",
  //     },
  //     onComplete: () => {
  //       setVideo((pre) => ({
  //         ...pre,
  //         isPlaying: true,
  //         startPlay: true,
  //       }));
  //     },
  //   });
  // }, [isEnd, videoId]);

  // when the video switch
  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;
    // for specific video Animation
    if (span[videoId]) {
      // animate the progress of the video
      let anime = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anime.progress() * 100);
          if (progress != currentProgress) {
            currentProgress = progress;
            // set the width for progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth > 760
                  ? "10vw" // mobile
                  : window.innerWidth > 1200
                  ? "9vw" // tablet
                  : "4vw", // leptop
            });
            // set div background color of the progress bar using span
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      {
        videoId != 0 && anime.restart();
      }
      // update the animation bar
      const videoRefCurrent = videoRef.current[videoId];
      const highlightSlide = hightlightsSlides[videoId];
      if (videoRefCurrent && highlightSlide) {
        const animeUpdate = () => {
          anime.progress(
            videoRefCurrent.currentTime / highlightSlide.videoDuration
          )
        };

        if (isPlaying) {
          gsap.ticker.add(animeUpdate);
        } else {
          gsap.ticker.remove(animeUpdate);
        }
      }
    }
  }, [videoId, startPlay]);

  // playing of the video
  useEffect(() => {
    if (loadedData.length > 3) {
      const videoElement = videoRef.current[videoId];
      if (videoElement) {
        if (!isPlaying) {
          videoElement.pause();
        } else {
          startPlay && videoElement.play();
        }
      }
    }
  }, [videoId, startPlay, isPlaying, loadedData]);

  const handleLoadedMetaData = (i: number, e: any) =>
    setLoadedData((pre) => [...pre, e]);

  const handleProcess = (type: string , i?:number) => {
    switch (type) {
      case "video-end":
        setVideo((pre): VideoType => ({ ...pre, isEnd: true ,videoId: i! +1}));
        break;
      case "last-video":
        setVideo((pre): VideoType => ({ ...pre, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo(
          (pre): VideoType => ({ ...pre, videoId: 0, isLastVideo: false })
        );
        break;
      case "play":
        setVideo((pre): VideoType => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      case "pause":
        setVideo((pre): VideoType => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline
                  preload="auto"
                  // className={`${list.id===2 && "translate-x-44"}`}
                  muted
                  src={list.video}
                  ref={(el) => (videoRef.current[i] = el!)}
                  onPlay={() =>
                    setVideo((preVideo) => ({ ...preVideo, isPlaying: true }))
                  }
                  onEnded = {()=>{
                    i!==3 ?  handleProcess("video-end",i) :handleProcess("last-video") 
                  }} 
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                />
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((texts) => (
                  <p key={texts} className="md:text-2xl text-xl font-medium">
                    {texts}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el!)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el!)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <Image
            fill
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={
              isLastVideo ? "replayImg" : !isPlaying ? "playImg" : "pauseImg"
            }
            onClick={() => {
              isLastVideo
                ? handleProcess("video-reset")
                : !isPlaying
                ? handleProcess("play")
                : handleProcess("pause");
            }}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
