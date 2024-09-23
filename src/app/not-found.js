import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex-center flex-col gap-2 h-screen w-screen">
      <h1 className="title">404 Not Found</h1>
      <h5 className="subtitle">Sorry! we can't find that page.</h5>
      <Image
        className="my-8"
        src="/images/404.svg"
        alt="not-found img"
        width={100}
        height={100}
        quality={100}
      />
      <Link
        href="/"
        className="subtitle px-2 py-1.5 rounded-md transition-all hover:bg-gray-100"
      >
        Back to Home
      </Link>
    </div>
  );
}
