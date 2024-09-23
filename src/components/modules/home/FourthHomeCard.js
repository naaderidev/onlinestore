import Image from "next/image";
import React from "react";

export default function FourthHomeCard({ image, title }) {
  return (
    <figure className="brands-item d-flex">
      <Image
        src={image}
        alt="brand-logo"
        className="regular-img"
        width={100}
        height={100}
        quality={100}
      />
      <figcaption className="subtitle text-center mt-2 text-black">
        {title}
      </figcaption>
    </figure>
  );
}
