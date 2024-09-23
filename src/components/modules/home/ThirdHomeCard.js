import Image from "next/image";
import React from "react";

export default function ThirdHomeCard({ image, title }) {
  return (
    <figure className="relative hover:shadow-2xl">
      <Image
        src={image}
        alt="hand-picked-img"
        className="primary-card-img"
        width={300}
        height={300}
        quality={100}
      />
      <figcaption className="subtitle font-bold text-center absolute bottom-2 left-0 right-0 cursor-pointer">
        {title}
      </figcaption>
    </figure>
  );
}
