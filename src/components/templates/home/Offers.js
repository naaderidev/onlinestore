import React from "react";
import HomeTitles from "@/components/modules/home/HomeTitles";
import FifthHomeCard from "@/components/modules/home/FifthHomeCard";

export default function Offers() {
  return (
    <section className="my-8">
      <HomeTitles title="Don't Miss Offers" />
      <div className="flex-container md:flex-nowrap">
        <FifthHomeCard
          title="Autumn Occasion"
          subtitle="Style & comfort come first"
          image="/images/hero7.avif"
        />
        <FifthHomeCard
          title="Summer discounts"
          subtitle="Walk in our shoes and never look back"
          image="/images/hero10.avif"
        />
      </div>
    </section>
  );
}
