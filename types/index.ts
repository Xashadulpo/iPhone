import THREE from 'three';


export interface VideoType {
    videoId: number,
    startPlay: boolean,
    isPlaying: boolean,
    isEnd: boolean,
    isLastVideo: boolean,
} 

export interface ModelViewProps {
    index: number;
    size: string;
    controlRef: React.RefObject<any>;
    setRotationState: React.Dispatch<React.SetStateAction<number>>; 
    gsaptype: string;
    groupRef: React.MutableRefObject<THREE.Group>; 
    item: {
      title: string;
      color: string[];
      img: string; 
    };
  }
  