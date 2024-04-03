import dynamic from "next/dynamic";
import Highlights from "@/component/Highlights";
import Model from "@/component/Model";
import Features from "@/component/Features";

const DynamicHero = dynamic(() => import("../component/Hero"), {
  ssr: false,
}) as React.FC; // Use React.FC directly

const Page: React.FC = () => {
  return (
    <main className="bg-black">
      <DynamicHero />
      <Highlights />
      <Features />
      <Model />
    </main>
  );
};

export default Page;
