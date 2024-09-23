import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

export default function HeaderSearch() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const searchHandler = () => {
    console.log('search');
    if (search.trim()) {
      router.replace(`/search?q=${search}`);
    }
  };
  return (
    <div className="flex items-center gap-x-2 bg-slate-200 px-2 py-1 rounded-md">
      <HiOutlineMagnifyingGlass className="icon" onClick={searchHandler} />
      <input
        className="outline-none border-none bg-transparent placeholder-font"
        type="text"
        placeholder="Search products or brands"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
