"use client";
import React, { useState } from "react";
import ProductCard from "@/components/modules/market/ProductCard";
import SidebarFilterBtn from "./SidebarFilterBtn";
import SidebarToggleBtn from "./SidebarToggleBtn";
import {
  HiMiniSquares2X2,
  HiMiniQueueList,
  HiMiniFunnel,
} from "react-icons/hi2";
import {
  getMainBrand,
  getMainCategory,
} from "@/libs/axios/requests/productsRequests";
import Pagination from "@/components/modules/Pagination";

export default function MarketContainer({ products, brands, categories }) {
  const [allProducts, setAllProducts] = useState([...products]);
  const [shownItems, setShownItems] = useState([]);

  const [gridStyle, setGridStyle] = useState(true);
  const [isMobileFilterVisible, setIsMobileFilterVisible] = useState(false);

  const [brandToggle, setBrandToggle] = useState(true);
  const [categoryToggle, setCategoryToggle] = useState(true);
  const [mainBrandID, setmainBrandID] = useState("");
  const [mainCategoryID, setmainCategoryID] = useState("");

  const filterBrandHandler = async (id) => {
    if (id) {
      const res = await getMainBrand(id);
      setAllProducts(res.data);
    }
  };

  const filterCategoryHandler = async (id) => {
    if (id) {
      const res = await getMainCategory(id);
      setAllProducts(res.data);
    }
  };

  const filterProductsHandler = (filter) => {
    if (filter === "new") {
      setAllProducts([...products].reverse());
    } else if (filter === "sale") {
      const onSale = [...products].filter(
        (product) => product.isOnSale === true
      );
      setAllProducts(onSale);
    } else if (filter === "stock") {
      const stock = [...products].filter((product) =>
        product.variants.every((variant) => variant.quantity !== 0)
      );
      setAllProducts(stock);
    } else {
      setAllProducts(products);
    }
  };

  return (
    <>
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
              filterHandler={() => filterBrandHandler(mainBrandID)}
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
              filterHandler={() => filterCategoryHandler(mainCategoryID)}
            />
          </div>
        </div>
      </div>
      <div className="w-full p-2">
        {/*container header in desktop mode*/}
        <div className="hidden sm:flex flex-col gap-2 md:flex-row lg:gap-10">
          <div className="flex items-center gap-1">
            <HiMiniSquares2X2
              className={gridStyle ? "icon active" : "icon"}
              onClick={() => setGridStyle(true)}
            />
            <HiMiniQueueList
              className={gridStyle ? "icon" : "icon active"}
              onClick={() => setGridStyle(false)}
            />
          </div>
          <div className="flex items-center gap-x-2 subtitle">
            <label htmlFor="category-sort-filter">Sort by</label>
            <select
              className="subtitle-sm py-1 px-3 rounded-md border border-teal"
              name="Filter"
              id="category-sort-filter"
              defaultValue="all"
              onChange={(e) => filterProductsHandler(e.target.value)}
            >
              <option value="all">All</option>
              <option value="stock">Full-Stock</option>
              <option value="new">New Arrivals</option>
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
        <div className="flex-center md:justify-start gap-x-6 gap-y-8 flex-wrap my-8">
          {shownItems?.map((product) => {
            return (
              <ProductCard
                key={product._id}
                _id={product._id}
                title={product.title}
                discount={product.discount}
                variants={product.variants}
                gridStyle={gridStyle}
                type="card"
              />
            );
          })}
        </div>
        <Pagination
          items={allProducts}
          setShownItems={setShownItems}
          count={8}
          type="market"
        />
      </div>

      <div
        className={
          isMobileFilterVisible
            ? "fixed bottom-0 left-0 right-0 bg-gray-200 z-99 rounded-t-3xl pb-16 sm:pb-0 md:hidden"
            : "hidden"
        }
      >
        <div className="py-4 px-6">
          <h5 className="subtitle mb-2">Sort by</h5>
          <ul className="category-filter-mobile-list">
            <li className="subtitle-sm flex gap-x-2">
              <input
                type="radio"
                name="category"
                value="all"
                onChange={(e) => filterProductsHandler(e.target.value)}
              />
              All
            </li>
            <li className="subtitle-sm flex gap-x-2">
              <input
                type="radio"
                name="category"
                value="new"
                onChange={(e) => filterProductsHandler(e.target.value)}
              />
              New Arrivals
            </li>
            <li className="subtitle-sm flex gap-x-2">
              <input
                type="radio"
                name="category"
                value="sale"
                onChange={(e) => filterProductsHandler(e.target.value)}
              />
              On-Sale
            </li>
            <li className="subtitle-sm flex gap-x-2">
              <input
                type="radio"
                name="category"
                value="stock"
                onChange={(e) => filterProductsHandler(e.target.value)}
              />
              Full-Stock
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
