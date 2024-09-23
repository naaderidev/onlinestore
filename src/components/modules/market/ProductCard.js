import React from "react";
import Link from "next/link";
import apiRequest from "@/libs/axios/configs";
import { HiShoppingBag, HiTrash } from "react-icons/hi2";
import Image from "next/image";

export default function ProductCard({
  _id,
  title,
  discount,
  variants,
  gridStyle,
  type,
}) {
  const prices = variants.map((variant) => variant.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const isOutOfStock = () => {
    return variants.every((variant) => variant.quantity === 0);
  };
  const removeWishItem = async (productId) => {
    await apiRequest.delete(`/wishlist/${productId}`);
    location.reload();
  };
  return (
    <figure
      className={
        gridStyle
          ? "relative max-w-60"
          : "relative flex gap-x-4 border-b-2 border-teal/30 w-full"
      }
    >
      <Image
        src={variants[0].image}
        alt="product-img"
        className={gridStyle ? "primary-card-img" : "secondary-card-img mb-4"}
        width={500}
        height={500}
        quality={100}
      />
      <div
        className={
          isOutOfStock()
            ? "absolute top-4 left-4 subtitle-sm bg-slate-200 px-3 py-1.5 rounded-md"
            : "hidden"
        }
      >
        Non-Stock
      </div>
      <div
        className={
          discount
            ? "absolute top-4 left-4 bg-slate-200 text-red font-semibold px-3 py-1.5 rounded-md"
            : "hidden"
        }
      >
        {discount}% <span className="text-teal">OFF</span>
      </div>
      <Link href={`/product/${_id}`}>
        <figcaption className={gridStyle ? "mt-4" : "mt-4 w-full sm:w-1/5"}>
          <div className="flex items-center justify-between">
            <h4 className="subtitle font-semibold">{title}</h4>
            {type === "card" ? (
              <button>
                <HiShoppingBag className="icon" />
              </button>
            ) : (
              <button onClick={() => removeWishItem(_id)}>
                <HiTrash className="icon hover:text-red" />
              </button>
            )}
          </div>
          <div>
            <h6 className="subtitle-sm my-2">
              Price: $ {minPrice} - $ {maxPrice}
            </h6>
          </div>
          <div className="flex items-center gap-x-1 mt-4">
            {variants.map((item) => {
              return (
                <div
                  key={item._id}
                  className="rounded-full p-2.5 border border-teal"
                  style={{ backgroundColor: item.color }}
                ></div>
              );
            })}
          </div>
        </figcaption>
      </Link>
    </figure>
  );
}
