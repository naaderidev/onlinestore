import React from "react";
import { HiMiniPlus } from "react-icons/hi2";

export default function SidebarToggleBtn({ title, setToggle }) {
  return (
    <div
      className="flex items-center justify-between border-b border-tint pb-2 cursor-pointer"
      onClick={() => setToggle((prev) => !prev)}
    >
      <h3 className="subtitle">{title}</h3>
      <HiMiniPlus className="icon" />
    </div>
  );
}
