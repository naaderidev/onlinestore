import React from "react";
import HomeTitles from "@/components/modules/home/HomeTitles";
import SecondHomeCard from "@/components/modules/home/SecondHomeCard";

export default function QuickAccess() {
  return (
    <section className="my-8">
      <HomeTitles title="New Arrivals" />
      <div className="flex-container md:flex-nowrap">
        <SecondHomeCard title="View All Shoes" image="/images/hero6.jpg" />
        <SecondHomeCard
          title="View On-Sale Products"
          image="/images/hero8.jpg"
        />
        <SecondHomeCard title="View All Bags" image="/images/hero5.jpg" />
      </div>
    </section>
  );
}
