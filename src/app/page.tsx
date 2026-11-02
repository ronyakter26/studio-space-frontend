import Image from "next/image";
import Hero from "@/components/Hero";
import FeaturedStudios from "@/components/FeaturedStudios";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";
import HostGuarantee from "@/components/HostGuarantee";



export default function Home() {
  return (
    <div >
      <Hero />
      <FeaturedStudios />
      <Categories />
<HowItWorks />
<HostGuarantee />

    </div>
  );
}
