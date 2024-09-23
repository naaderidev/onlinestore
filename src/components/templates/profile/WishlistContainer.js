"use client";
import React, { useState, useEffect } from "react";
import EmptyContainer from "@/components/modules/profile/EmptyContainer";
import ProductCard from "@/components/modules/market/ProductCard";
import Pagination from "@/components/modules/Pagination";

export default function WishlistContainer({ wishlist }) {
  const count = 3; // Define count for how many items to show per page
  const [shownItems, setShownItems] = useState([]);

  return (
    <div className="container">
      {wishlist.length === 0 ? (
        <EmptyContainer message="You haven't liked any product yet! Take a look at the store!" />
      ) : (
        <>
          <div className="flex-center gap-10">
            {shownItems.map((item) => {
              if (!item.productId) {  
                return null; // or handle as needed  
              } 
              return (
                <ProductCard
                  key={item._id}
                  _id={item.productId._id}
                  title={item.productId.title}
                  discount={item.productId.discount}
                  variants={item.productId.variants}
                  gridStyle={true}
                  type="wish"
                />
              );
            })}
          </div>
          <Pagination
            items={wishlist}
            setShownItems={setShownItems}
            count={count}
            type="cms"
          />
        </>
      )}
    </div>
  );
}
