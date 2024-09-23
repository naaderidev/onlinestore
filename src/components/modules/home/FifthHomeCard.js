import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function FifthHomeCard({ image, title, subtitle }) {
  return (
    <figure className="relative" data-aos="fade-up">
      <Image
        src={image}
        alt="offer-img"
        className="w-[475px] h-[300px]"
        width={300}
        height={300}
        quality={100}
      />
      <figcaption className="flex flex-col absolute left-4 bottom-1/2">
        <h4 className="title text-white mb-4">{title}</h4>
        <p className="subtitle text-white mb-2">{subtitle}</p>
        <Link
          href="/"
          className="subtitle bg-white w-fit px-2 rounded-md hover:bg-teal hover:text-white transition-all"
        >
          See more
        </Link>
      </figcaption>
    </figure>
  );
}
