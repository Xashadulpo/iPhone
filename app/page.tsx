import React from "react";
import { Navbar, Hero, Highlights,Features } from "../component";

const page = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Features/>    
    </main>
  );
};

export default page;
