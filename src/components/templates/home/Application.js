import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Application() {
  return (
    <section className="mt-8 mx-4 sm:hidden">
      <div className="flex items-center justify-start">
        <Image
          src="/images/app.jpg"
          alt="app-logo"
          className="w-48 h-48"
          width={200}
          height={200}
          quality={100}
        />
        <div className="flex flex-col">
          <h3 className="subtitle-sm xs:subtitle">
            Discover your favrouite products faster with CORA’L web app.
          </h3>
          <div className="flex items-center gap-x-2 mt-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal"></span>
            </span>
            <Link href="/" className="subtitle-sm xs:subtitle">
              Add Shortcut
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
