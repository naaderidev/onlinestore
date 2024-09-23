import React from "react";
import HomeTitles from "@/components/modules/home/HomeTitles";
import FirstHomeCard from "@/components/modules/home/FirstHomeCard";

export default function Categories() {
  return (
    <section className="mt-8 xs:hidden">
      <HomeTitles title="Top Catrgories" />
      <div className="flex-container md:flex-nowrap">
        <FirstHomeCard
          title="Sandals"
          image="/images/icons/icons8-sandal-64.png"
        />
        <FirstHomeCard
          title="Slippers"
          image="/images/icons/icons8-slipper-64.png"
        />
        <FirstHomeCard
          title="Sneakers"
          image="/images/icons/icons8-sneaker-64.png"
        />
        <FirstHomeCard
          title="Handbags"
          image="/images/icons/icons8-bag-100.png"
        />
      </div>
    </section>
  );
}
