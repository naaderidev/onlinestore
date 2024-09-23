import React from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  HiOutlineBanknotes,
  HiOutlineNoSymbol,
  HiOutlineShoppingCart,
  HiCursorArrowRays,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

export default function OrderCard({ _id, totalPrice, isAccept, createdAt }) {
  return (
    <Link href={`/profile/order-detail/${_id}`}>
      <div className="user-panel-card">
        <div className="flex items-center gap-2">
          <HiCursorArrowRays className="text-xl text-tint" />
          <div className="badge flex-center gap-1 bg-tint hidden sm:inline-flex">
            <HiOutlineBanknotes className="text-base" />
            <span>{totalPrice.toLocaleString()} $</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-teal text-sm">
          <span className="hidden sm:inline-flex">
            {new Date(createdAt).toLocaleDateString("en-US")}
          </span>
          <span className="hidden lg:inline-flex">
            {new Date(createdAt).toLocaleTimeString("en-US")}
          </span>
          <div className="badge flex-center gap-1 bg-tint">
            <span className="hidden lg:inline-flex">Details</span>
            <HiOutlineShoppingCart className="text-base" />
          </div>
          <div
            className={clsx("badge flex-center gap-1", {
              "bg-teal": isAccept === "accept",
              "bg-amber-600": isAccept === "",
              "bg-red": isAccept === "reject",
            })}
          >
            <span className="hidden lg:inline-flex">
              {isAccept === "accept"
                ? "Approved"
                : isAccept === "reject"
                ? "Rejected"
                : "Processing"}
            </span>
            {isAccept === "accept" ? (
              <HiOutlineCheckCircle className="text-base" />
            ) : isAccept === "reject" ? (
              <HiOutlineNoSymbol className="text-base" />
            ) : (
              <HiOutlineClock className="text-base" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
