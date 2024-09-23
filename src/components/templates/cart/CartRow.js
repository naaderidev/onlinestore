import React from "react";
import Link from "next/link";
import apiRequest from "@/libs/axios/configs";
import { HiHeart, HiArchiveBoxXMark } from "react-icons/hi2";
import Image from "next/image";

export default function CartRow({
  id,
  image,
  title,
  color,
  size,
  count,
  price,
  userId,
}) {
  const removeItemFromCart = (id, size) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.size === size)
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    location.reload();
  };

  const moveItemToWishlist = async (id, size) => {
    const wishItem = {
      userId,
      productId: id,
    };
    await apiRequest.post("/wishlist", wishItem);
    removeItemFromCart(id, size);
  };
  return (
    <tr>
      <td className="hidden sm:block">
        <Link href={`/product/${id}`}>
          <Image
            src={image}
            alt={image}
            width={100}
            height={100}
            quality={100}
            className="thumbnail-img"
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/500x300")
            }
          />
        </Link>
      </td>
      <td>{title}</td>
      <td>{color}</td>
      <td>{size}</td>
      <td>{count}</td>
      <td>{price}</td>
      <td>{price * count}</td>
      <td>
        <div className="flex-center gap-1">
          <button
            className="hover:bg-teal hover:text-white"
            onClick={() => moveItemToWishlist(id, size)}
          >
            <span className="hidden md:block text-xs">Move to Wishlist</span>
            <HiHeart className="md:hidden" />
          </button>
          <button
            className="hover:bg-red hover:text-white"
            onClick={() => removeItemFromCart(id, size)}
          >
            <span className="hidden md:block text-xs">remove</span>
            <HiArchiveBoxXMark className="md:hidden" />
          </button>
        </div>
      </td>
    </tr>
  );
}
