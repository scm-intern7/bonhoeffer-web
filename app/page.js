'use client'
import Events from "@/components/sections/events";
import Hero from "@/components/sections/hero";
import Social from "@/components/sections/social";
import Products from "@/components/sections/products";
import BgLayout from "@/components/templates/bgLayout";

export default function Home() {
  return (
    <BgLayout>
      <Hero/>
      <Events/>
      <Social/>
      <Products/>
    </BgLayout>
  );
}
