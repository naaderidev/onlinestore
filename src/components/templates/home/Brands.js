import React from "react";
import HomeTitles from "@/components/modules/home/HomeTitles";
import FourthHomeCard from "@/components/modules/home/FourthHomeCard";

export default function Brands() {
  return (
    <section className="my-8">
      <HomeTitles title="Shop By Brands" />
      <div className="flex-container mx-8">
        <FourthHomeCard
          title="Louis Vuitton"
          image="/images/icons/Louis_Vuitton_logo.png"
        />
        <FourthHomeCard title="Gucci" image="/images/icons/gucci_logo.png" />
        <FourthHomeCard title="Vans" image="/images/icons/Vans_logo.png" />
        <FourthHomeCard title="Nike" image="/images/icons/Nike_Logo.png" />
        <FourthHomeCard title="Puma" image="/images/icons/Puma_Logo.png" />
        <FourthHomeCard title="Adids" image="/images/icons/Adidas_Logo.png" />
      </div>
    </section>
  );
}
