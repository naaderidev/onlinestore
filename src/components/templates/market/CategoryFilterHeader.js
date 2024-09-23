import React, { useContext } from "react";
// import { ProductsContext } from "../../contexts/ProductsContext";

import {
  HiMiniSquares2X2,
  HiMiniQueueList,
  HiMiniFunnel,
} from "react-icons/hi2";

export default function CategoryFilterHeader({
  gridStyle,
  setGridStyle,
  selectFilter,
  setSelectFilter,
  shownItemsPerPage,
  setShownItemsPerPage,
  setIsMobileFilterVisible,
}) {
  // const { products } = useContext(ProductsContext);
  return (
    <>
      {/*container header in desktop mode*/}
      <div className="hidden sm:flex flex-col gap-2 md:flex-row lg:justify-between">
        <div className="flex items-center gap-1">
          <HiMiniSquares2X2
            className={gridStyle ? "icon active" : "icon"}
            onClick={() => setGridStyle(true)}
          />
          <HiMiniQueueList
            className={gridStyle ? "icon" : "icon active"}
            onClick={() => setGridStyle(false)}
          />
          <p className="subtitle">
            Showing{" "}
            <span>
              {/* {shownItemsPerPage} of {products.length} */}20
            </span>
            Items{" "}
          </p>
        </div>
        <div className="subtitle">
          <label htmlFor="category-shown-count">to show:</label>
          <input
            className="px-2 outline-none"
            type="text"
            id="category-shown-count"
            value={shownItemsPerPage}
            onChange={(e) => setShownItemsPerPage(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-x-2 subtitle lg:hidden">
          <label htmlFor="category-sort-filter">Sort by</label>
          <select
            className="subtitle-sm py-1 px-3 rounded-md"
            name="Filter"
            id="category-sort-filter"
            value={selectFilter}
            onChange={(e) => setSelectFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="stock">In-Stock</option>
            <option value="new">New Arrivals</option>
            <option value="expensive">Most Expensive</option>
            <option value="cheap">Cheapest</option>
            <option value="sale">On-Sale</option>
          </select>
        </div>
      </div>
      {/*container header in mobile mode*/}
      <div className="flex-center gap-x-4 mb-4 sm:hidden">
        <div className="flex items-center gap-x-2 bg-slate-300/50 px-4 py-2 rounded-md">
          <HiMiniSquares2X2 className="icon active" />
          <HiMiniQueueList className="icon" />
        </div>
        <div
          className="flex items-center gap-x-2 bg-slate-300/50 px-4 py-2 rounded-md cursor-pointer"
          onClick={() => setIsMobileFilterVisible((prev) => !prev)}
        >
          <HiMiniFunnel className="icon" />
          <span className="subtitle">Filter</span>
        </div>
      </div>
    </>
  );
}
