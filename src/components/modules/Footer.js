"use client";
import React from "react";
import Link from "next/link";
import {
  HiOutlineMapPin,
  HiOutlineBuildingStorefront,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUser,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FiYoutube, FiFacebook } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full relative">
      <div className="grid grid-cols-1 md:grid-cols-2 py-6 px-4 w-full  bg-teal text-wheat">
        <div className="flex flex-col items-start gap-y-4 md:flex-row md:justify-center md:gap-x-8">
          <div className="flex flex-col items-start gap-y-2 mb-4">
            <h4 className="subtitle text-tint">Quick Access</h4>
            <Link href="/market" className="subtitle-sm text-wheat">
              Market
            </Link>
            <Link href="/contact" className="subtitle-sm text-wheat">
              Contact Us
            </Link>
            <Link href="/login-register" className="subtitle-sm text-wheat">
              Login
            </Link>
          </div>
          <div className="flex flex-col items-start gap-y-2 mb-4">
            <h4 className="subtitle text-tint">About</h4>
            <div className="flex items-start gap-x-3 gap-y-2 md:flex-col">
              <Link href="/" className="subtitle-sm text-wheat">
                About us
              </Link>
              <Link href="/" className="subtitle-sm text-wheat">
                Contact us
              </Link>
              <Link href="/" className="subtitle-sm text-wheat">
                Careers
              </Link>
              <Link href="/" className="subtitle-sm text-wheat">
                Press
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start gap-y-2 mb-4">
            <h4 className="subtitle text-tint">Policy</h4>
            <div className="flex items-start gap-x-3 gap-y-2 md:flex-col">
              <Link href="/" className="subtitle-sm text-wheat">
                Return policy
              </Link>
              <Link href="/" className="subtitle-sm text-wheat">
                Terms of use
              </Link>
              <Link href="/" className="subtitle-sm text-wheat">
                Security
              </Link>
              <Link href="/" className="subtitle-sm text-wheat">
                Privacy
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-wheat md:border-none pt-4 md:pt-0">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="bg-tint p-2 rounded-full border border-tint hover:bg-teal"
            >
              <BsInstagram className="small-icon text-wheat" />
            </Link>
            <Link
              href="/"
              className="bg-tint p-2 rounded-full border border-tint hover:bg-teal"
            >
              <BsTwitterX className="small-icon text-wheat" />
            </Link>
            <Link
              href="/"
              className="bg-tint p-2 rounded-full border border-tint hover:bg-teal"
            >
              <FiFacebook className="small-icon text-wheat" />
            </Link>
            <Link
              href="/"
              className="bg-tint p-2 rounded-full border border-tint hover:bg-teal"
            >
              <FiYoutube className="small-icon text-wheat" />
            </Link>
          </div>
          <div className="flex items-center pt-4 text-base tracking-tight font-light">
            <HiOutlineMapPin />
            <span>United States</span>
          </div>
          <div className="pt-4 text-base tracking-tight font-light">
            © 2024 | All Rights Reserved
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:hidden py-2 px-4 border-t-2 fixed bottom-0 left-0 right-0 z-50 bg-white">
        <Link href="/market" className="footer-navlink">
          <HiOutlineBuildingStorefront className="icon" />
          <span className="subtitle-sm">Market</span>
        </Link>
        <Link href="/profile" className="footer-navlink">
          <HiOutlineUser className="icon" />
          <span className="subtitle-sm">Profile</span>
        </Link>
        <Link href="/cart" className="footer-navlink">
          <HiOutlineShoppingCart className="icon" />
          <span className="subtitle-sm">Cart</span>
        </Link>
        <Link href="/contact" className="footer-navlink">
          <HiOutlineChatBubbleLeftRight className="icon" />
          <span className="subtitle-sm">Contact</span>
        </Link>
      </div>
    </footer>
  );
}
