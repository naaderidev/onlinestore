import Image from "next/image";
import React from "react";

export default function EmptySearch() {
  return (
    <div className="flex items-center justify-center gap-x-2 my-24">
      <Image
        className="regular-img"
        src="/images/search.png"
        alt="empty-img"
        width={100}
        height={100}
        quality={100}
      />
      <div className="flex flex-col">
        <h3 className="subtitle mb-2">Whoops!</h3>
        <p className="subtitle-sm">
          We coudn’t find what you’re looking for. Try something else.
        </p>
      </div>
    </div>
  );
}
