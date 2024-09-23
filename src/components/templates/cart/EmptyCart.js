import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center gap-2 p-12 sm:py-36 m-auto">
      <Image
        src="./images/empty.svg"
        alt="empty-cart"
        width={100}
        height={100}
        quality={100}
      />
      <h3 className="title my-4">Basket is Empty!</h3>
      <Link href="/market" className="text-sm text-teal hover:text-tint">
        Back to Market
      </Link>
    </div>
  );
}
