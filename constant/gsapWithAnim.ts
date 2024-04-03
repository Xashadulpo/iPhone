import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

export interface parameterProps {
    opacity?: number,
     y?: number,
     scale?: number,
      ease?: string,
      duration?: number
}

export const gsapWithanime = (target:string, parameter:parameterProps, scrollbehaviour?:any)=> {
  gsap.to(target, {
    ...parameter,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollbehaviour,
    },
  });
};
export const gsapWithVideo =(target:string,videoRef: RefObject<HTMLVideoElement>)=>{
    gsap.to(target, {
        opacity: 2,
        scrollTrigger: {
          trigger: target,
          toggleActions: "play pause reverse restart",
          start: "-10% bottom",
        },
        onComplete: () => {
          videoRef.current?.play();
        },
      });
}