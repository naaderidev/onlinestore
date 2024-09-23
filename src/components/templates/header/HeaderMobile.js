import React from "react";
import Link from "next/link";
import { HiBars3 } from "react-icons/hi2";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { HiMiniBuildingStorefront, HiMiniEnvelope } from "react-icons/hi2";
import HeaderSetting from "./HeaderSetting";
import { logoutHandler } from "@/utils/helpers/helperFcns";

export default function HeaderMobile({ visible, setVisible, isLogin }) {
  return (
    <div className="flex items-center justify-between md:hidden">
      <div className="flex items-center gap-x-4 relative">
        <div className="flex items-center gap-x-1 subtitle">
          <HiBars3
            className="icon"
            onClick={() => setVisible((prev) => !prev)}
          />
          <Link href="/">HOME</Link>
        </div>
        <div className={visible ? "visible z-50" : "hidden"}>
          <div className="absolute top-10 left-0 p-4 bg-slate-200/80 w-52 rounded-md z-50">
            <nav className="flex flex-col gap-y-2 text-teal">
              <Link
                href="/market"
                className="flex items-center gap-x-2 text-md"
              >
                <HiMiniBuildingStorefront />
                <span>Market</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-x-2 text-md"
              >
                <HiMiniEnvelope />
                <span>Contact Us</span>
              </Link>
              <button
                onClick={() => logoutHandler()}
                className="flex items-center gap-x-2 text-md"
              >
                <FaArrowRightFromBracket />
                <span>Exit</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
      <HeaderSetting isLogin={isLogin} />
    </div>
  );
}
