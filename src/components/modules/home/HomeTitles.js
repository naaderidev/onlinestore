import React from "react";
import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";

export default function HomeTitles({ title }) {
  return (
    <div className="flex items-center justify-between mb-8 mx-8">
      <h3 className="title">{title}</h3>
      <Link href="/market" className="subtitle flex items-center">
        View All <HiChevronRight className="small-icon" />
      </Link>
    </div>
  );
}
