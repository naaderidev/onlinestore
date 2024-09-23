import Image from "next/image";
import React from "react";

export default function FirstHomeCard({ image, title }) {
  return (
    <figure>
      <Image
        src={image}
        alt={`${title}-icon`}
        className="thumbnail-img"
        width={100}
        height={100}
        quality={100}
      />
      <figcaption className="subtitle-sm">{title}</figcaption>
    </figure>
  );
}
