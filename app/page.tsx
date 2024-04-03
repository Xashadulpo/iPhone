import React from "react";
import { Hero, Highlights,Features ,Model } from "../component";

const page = () => {
  return (
    <main className="bg-black">
      <Hero />
      <Highlights />
      <Features/>  
      <Model/>   
    </main>
  );
};

export default page;
