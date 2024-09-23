"use client";
import React, { useState } from "react";
import Pagination from "@/components/modules/Pagination";
import { HiMiniSquaresPlus } from "react-icons/hi2";
import { FaCoins, FaRuler, FaPaintbrush } from "react-icons/fa6";
import Image from "next/image";

export default function OrderInfo({ order }) {
  const [shownProducts, setShownProducts] = useState([...order.basket]);
  return (
    <>
      <div className="flex gap-10 m-5">
        {shownProducts?.map((prodcut) => {
          return (
            <figure
              key={prodcut.id}
              className="flex items-center justify-start gap-x-2 border-b-2 border-teal/25 py-2"
            >
              <Image
                className="regular-img"
                src={prodcut.image}
                alt="order-img"
                width={200}
                height={200}
                quality={100}
              />
              <figcaption>
                <div className="flex items-center gap-x-1">
                  <FaPaintbrush className="small-icon" />
                  <span className="subtitle">Color :</span>
                  <span className="subtitle-sm">{prodcut.color}</span>
                </div>
                <div className="flex items-center gap-x-1">
                  <FaRuler className="small-icon" />
                  <span className="subtitle">Size :</span>
                  <span className="subtitle-sm">{prodcut.size}</span>
                </div>
                <div className="flex items-center gap-x-1">
                  <FaCoins className="small-icon" />
                  <span className="subtitle">Price :</span>
                  <span className="subtitle-sm">$ {prodcut.size}</span>
                </div>
                <div className="flex items-center gap-x-1">
                  <HiMiniSquaresPlus className="small-icon" />
                  <span className="subtitle">Count :</span>
                  <span className="subtitle-sm">{prodcut.count}</span>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <Pagination
        items={order.basket}
        setShownItems={setShownProducts}
        count={4}
        type="market"
      />
    </>
  );
}
