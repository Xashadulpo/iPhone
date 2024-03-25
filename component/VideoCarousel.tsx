"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { hightlightsSlides } from "@/constant";
import { pauseImg, playImg, replayImg } from "@/utils";
import { VideoType } from "@/types";
import { useGSAP } from "@gsap/react";

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

  useGSAP(() => {
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: " restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          isPlaying: true,
          startPlay: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  // when the video switch
  useEffect(() => {
    const correntProgress = 0;
    const span = videoSpanRef.current;
    // for specific video Animation
    if (span[videoId]) {
      // animate the progress of the video
      let anime = gsap.to(span[videoId], {
        onUpdate: () => {},
        onComplete: () => {},
      });
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

const handleLoadedMetaData = (i:number,e:any) => setLoadedData((pre)=>([...pre, e ])) 

  const handleProcess = (type: string) => {
    switch (type) {
      case "video-end":
        setVideo((pre): VideoType => ({ ...pre, isEnd: true }));
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
          <div key={list.id} className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el!)}
                  onPlay={() =>
                    setVideo((preVideo) => ({ ...preVideo, isPlaying: true }))
                  }
                  onLoadedMetadata={(e)=>handleLoadedMetaData(i,e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
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
          {hightlightsSlides.map((_, i) => (
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
