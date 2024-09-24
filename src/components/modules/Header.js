"use client";
import React, { useState } from "react";
import Link from "next/link";
import HeaderMobile from "../templates/header/HeaderMobile";
import HeaderSetting from "../templates/header/HeaderSetting";
import HeaderSearch from "../templates/header/HeaderSearch";

export default function Header({ isLogin }) {
  const [isHomeMenuVisible, setIsHomeMenuVisible] = useState(false);

  return (
    <div className="relative px-4 mx-2 my-8">
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center relative gap-x-4">
          <Link href="/" className="title">
            CORA'L
          </Link>
          <div className="flex items-center gap-x-4 subtitle">
            <Link href="/market">Market</Link>
            <Link href="/contact">Contact Us</Link>
            <div className="flex-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tint opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal"></span>
              </span>
              <Link href="/about-site">About Site</Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <HeaderSearch />
          <HeaderSetting isLogin={isLogin} />
        </div>
      </div>
      <HeaderMobile
        visible={isHomeMenuVisible}
        setVisible={setIsHomeMenuVisible}
        isLogin={isLogin}
      />
    </div>
  );
}
