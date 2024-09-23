import React from "react";

export default function SidebarFilterBtn({ title, filterHandler }) {
  return (
    <>
      <button
        className="w-full py-1 px-2 mb-8 bg-tint subtitle text-white rounded-md hover:bg-teal transition-all"
        onClick={() => filterHandler()}
      >
        {title}
      </button>
    </>
  );
}
