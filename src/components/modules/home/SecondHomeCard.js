import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function SecondHomeCard({ image, title }) {
  return (
    <figure
      className="hover:shadow-custom hover:rounded-b-xl"
      data-aos="fade-up"
    >
      <Image
        src={image}
        alt="new-arrival-img"
        className="card-img"
        width={300}
        height={300}
        quality={100}
      />
      <figcaption className="subtitle text-center my-4 hover:text-tint">
        <Link href="/">{title}</Link>
      </figcaption>
    </figure>
  );
}
