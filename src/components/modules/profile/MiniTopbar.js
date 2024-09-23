import React from "react";
import Link from "next/link";

export default function MiniTopbar({ title, btn, icon, link }) {
  return (
    <div className="flex items-center w-[95%] text-teal">
      <div className="subtitle w-28">{title}</div>
      <span className="block w-full h-1 bg-gradient-to-r from-tint to-teal my-6"></span>
      <Link href={link}>
        <button className="btn-teal flex-center gap-2 w-fit text-sm">
          <span className="hidden sm:flex">{btn}</span>
          {icon}
        </button>
      </Link>
    </div>
  );
}
