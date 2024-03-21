import React from "react";
import { Navbar, Hero, Highlights } from "@/component";

const page = () => {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
    </main>
  );
};

export default page;
