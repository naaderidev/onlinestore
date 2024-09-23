"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiChevronRight,
  HiOutlineUser,
  HiOutlineTicket,
  HiOutlineHeart,
  HiOutlineClipboardDocumentList,
  HiOutlineArrowRightStartOnRectangle,
} from "react-icons/hi2";
import { logoutHandler } from "@/utils/helpers/helperFcns";

export default function ProfileSidebar() {
  const pathname = usePathname();
  return (
    <div className="ml-5 min-w-[68px] bg-slate-200 py-3 px-1.5 rounded-md h-full">
      <h2 className="title text-tint m-2">Profile</h2>
      <ul>
        <li
          className={`flex items-center justify-between sidebar-link ${
            pathname === "/profile" ? "active" : ""
          }`}
        >
          <Link className="flex-center gap-2" href="/profile">
            <HiOutlineClipboardDocumentList className="icon" />
            <span className="hidden lg:inline-flex">Orders</span>
          </Link>
          <HiChevronRight className="hidden lg:inline-block" />
        </li>
        <li
          className={`flex items-center justify-between sidebar-link ${
            pathname === "/profile/tickets" ? "active" : ""
          }`}
        >
          <Link className="flex-center gap-2" href="/profile/tickets">
            <HiOutlineTicket className="icon" />
            <span className="hidden lg:inline-flex">Tickets</span>
          </Link>
          <HiChevronRight className="hidden lg:inline-block" />
        </li>
        <li
          className={`flex items-center justify-between sidebar-link ${
            pathname === "/profile/wishlist" ? "active" : ""
          }`}
        >
          <Link className="flex-center gap-2" href="/profile/wishlist">
            <HiOutlineHeart className="icon" />
            <span className="hidden lg:inline-flex">Wishlist</span>
          </Link>
          <HiChevronRight className="hidden lg:inline-block" />
        </li>
        <li
          className={`flex items-center justify-between sidebar-link ${
            pathname === "/profile/account" ? "active" : ""
          }`}
        >
          <Link className="flex-center gap-2" href="/profile/account">
            <HiOutlineUser className="icon" />
            <span className="hidden lg:inline-flex">Account</span>
          </Link>
          <HiChevronRight className="hidden lg:inline-block" />
        </li>
        <li className="flex items-center justify-between sidebar-link">
          <button onClick={() => logoutHandler()} className="flex-center gap-2">
            <HiOutlineArrowRightStartOnRectangle className="icon" />
            <span className="hidden lg:inline-flex">Logout</span>
          </button>
          <HiChevronRight className="hidden lg:inline-block" />
        </li>
      </ul>
    </div>
  );
}
