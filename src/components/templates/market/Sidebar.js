"use client";
import React, { useState } from "react";
import SidebarToggleBtn from "./SidebarToggleBtn";
import SidebarFilterBtn from "./SidebarFilterBtn";

export default function Sidebar({ brands, categories }) {
  const [brandToggle, setBrandToggle] = useState(true);
  const [categoryToggle, setCategoryToggle] = useState(false);
  const [mainBrandID, setmainBrandID] = useState("");
  const [mainCategoryID, setmainCategoryID] = useState("");
  return (
    <div className="hidden lg:block max-w-60 p-2 w-full">
      <div className="min-w-60">
        <div className="w-full mb-4" id="sidebar-category">
          <SidebarToggleBtn title="Brand" setToggle={setBrandToggle} />
          <div
            className={
              brandToggle
                ? "flex flex-col items-start gap-2 py-4 pl-2"
                : "hidden"
            }
          >
            {brands.map((brand) => {
              return (
                <div
                  key={brand._id}
                  className="flex items-center justify-start gap-x-2 subtitle"
                >
                  <input
                    type="radio"
                    name="brand"
                    className="accent-teal"
                    value={brand._id}
                    onChange={(e) => setmainBrandID(e.target.value)}
                  />
                  <label htmlFor={brand._id}>{brand.title}</label>
                </div>
              );
            })}
          </div>
          <SidebarFilterBtn
            title="Filter Brand"
            filterHandler={() => console.log(mainBrandID)}
          />
          <SidebarToggleBtn title="Category" setToggle={setCategoryToggle} />
          <div
            className={
              categoryToggle
                ? "flex flex-col items-start gap-2 py-4 pl-2"
                : "hidden"
            }
          >
            {categories.map((category) => {
              return (
                <div
                  key={category._id}
                  className="flex items-center justify-start gap-x-2 subtitle"
                >
                  <input
                    type="radio"
                    name="category"
                    className="accent-teal"
                    value={category._id}
                    onChange={(e) => setmainCategoryID(e.target.value)}
                  />
                  <label htmlFor={category._id}>{category.title}</label>
                </div>
              );
            })}
          </div>
          <SidebarFilterBtn
            title="Filter Category"
            filterHandler={() => console.log(mainCategoryID)}
          />
        </div>
      </div>
    </div>
  );
}
