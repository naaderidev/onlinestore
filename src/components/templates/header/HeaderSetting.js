import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HiUser, HiShoppingBag } from "react-icons/hi2";
import { FaCircle } from "react-icons/fa";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

export default function HeaderSetting({ isLogin }) {
  const [userCart, setUserCart] = useState([]);
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setUserCart(localCart);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <Link href={isLogin ? "/profile" : "/login-register"}>
        {isLogin ? (
          <HiUser className="icon" />
        ) : (
          <HiArrowLeftOnRectangle className="icon" />
        )}
      </Link>
      <Link href={isLogin ? "/cart" : "/login-register"} className="relative">
        <HiShoppingBag className="icon" />
        <FaCircle
          className={
            userCart.length
              ? "text-xxs text-rose-700 absolute hrefp-0 right-0 bottom-3"
              : "hidden"
          }
        />
      </Link>
    </div>
  );
}
