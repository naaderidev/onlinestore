"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import EmptySearch from "./EmptySearch";
import Pagination from "@/components/modules/Pagination";
import ProductCard from "@/components/modules/market/ProductCard";

export default function SearchContainer() {
  const searchParams = useSearchParams();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [shownProducts, setShownProducts] = useState(searchedProducts);

  useEffect(() => {
    const getSearch = async () => {
      const res = await fetch(`/api/products?${searchParams}`);
      if (res.status === 200) {
        const data = await res.json();
        setSearchedProducts(data);
      }
    };
    getSearch();
  }, []);

  return (
    <>
      {searchedProducts.length === 0 ? (
        <EmptySearch />
      ) : (
        <div className="my-10">
          <div className="p-8 flex-center gap-5 flex-wrap">
            {shownProducts.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  _id={product._id}
                  title={product.title}
                  discount={product.discount}
                  variants={product.variants}
                  gridStyle={true}
                  type="card"
                />
              );
            })}
          </div>
          <Pagination
            items={searchedProducts}
            setShownItems={setShownProducts}
            count={6}
            type="market"
          />
        </div>
      )}
    </>
  );
}
