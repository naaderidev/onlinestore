"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import apiRequest from "@/libs/axios/configs";
import {
  HiChevronRight,
  HiChevronLeft,
  HiOutlineStar,
  HiStar,
  HiHeart,
  HiMiniShoppingBag,
  HiMiniShieldCheck,
  HiMiniTruck,
  HiMiniArrowPathRoundedSquare,
} from "react-icons/hi2";
import { FaSquarePlus, FaSquareMinus } from "react-icons/fa6";
import Image from "next/image";

export default function ProductInfo({ product }) {
  const [user, setUser] = useState(null);
  //   const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainQty, setMainQty] = useState(1);
  const [mainSize, setMainSize] = useState("");
  const sizes = product.variants[0].size[0]; // This should give you the string '[XL]'
  const sizeArray = sizes
    .replace(/[\[\]']/g, "")
    .split(",")
    .map((size) => size.trim());

  useEffect(() => {
    const userAuthentication = async () => {
      const res = await fetch("/api/auth/me");
      if (res.status === 200) {
        const data = await res.json();
        setUser(data);
      }
    };
    userAuthentication();
  }, []);

  const handleColorClick = (variant) => {
    // setSelectedVariant(variant);
    setCurrentIndex(product.variants.indexOf(variant));
    setMainQty(1);
  };

  const handleThumbnailClick = (variant) => {
    setCurrentIndex(product.variants.indexOf(variant));
    setMainQty(1);
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) =>
        prevIndex < product.variants.length - 1 ? prevIndex + 1 : 0 // Loop back to start
    );
  };
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : product.variants.length - 1 // Loop to the end
    );
  };

  const handleIncrease = () => {
    if (mainQty < product.variants[currentIndex].quantity) {
      setMainQty(mainQty + 1);
    }
  };
  const handleDecrease = () => {
    if (mainQty > 1) {
      setMainQty(mainQty - 1);
    }
  };

  const discountCalc = (price, discount) => {
    return (price - Math.floor((price * discount) / 100)).toFixed(2);
  };
  const priceCalc = (price, qty) => {
    if (product.discount) {
      const onePro = discountCalc(price, product.discount);
      return onePro * qty;
    } else {
      return price * qty;
    }
  };

  const addToCart = () => {
    if (mainSize === "") {
      toast.error(<p className="toast">Please select size</p>);
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItem = {
      id: product.variants[currentIndex]._id,
      title: product.title,
      image: product.variants[currentIndex].image,
      color: product.variants[currentIndex].color,
      price: priceCalc(product.variants[currentIndex].price, mainQty),
      count: mainQty,
      size: mainSize,
    };
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(
      <p className="toast">Product added to basket successfully</p>
    );
    console.log("product added");
  };

  const insertItemToCart = () => {
    if (!user?._id) {
      return toast.error(
        <p className="toast">You Should first login to your account!</p>
      );
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length) {
      const isItemInCart = cart.some(
        (item) =>
          item.id === product.variants[currentIndex]._id &&
          item.size === mainSize
      );
      if (isItemInCart) {
        const target = cart.find(
          (item) => item.id === product.variants[currentIndex]._id
        );
        if (target.count < product.variants[currentIndex].quantity) {
          cart.forEach((item) => {
            if (item.id === product.variants[currentIndex]._id) {
              item.count = item.count + mainQty;
            }
          });
          localStorage.setItem("cart", JSON.stringify(cart));
          toast.success(
            <p className="toast">Quantity of product increased successfully</p>
          );
        } else {
          toast.warning(
            <p className="toast">This product is out of stock right now</p>
          );
        }
      } else {
        addToCart();
      }
    } else {
      addToCart();
    }
  };

  const insertItemToWishlist = async () => {
    if (!user?._id) {
      return toast.error(
        <p className="toast">You Should first login to your account!</p>
      );
    }
    const wishItem = {
      userId: user._id,
      productId: product._id,
    };
    await apiRequest.post("/wishlist", wishItem);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-8 my-4 mx-8 max-w-[1280px]">
      <div className="md:col-span-3 xl:col-span-5 flex gap-4 mb-8 h-[480px]  w-full min-w-[400px]">
        <div className="relative h-fit">
          <div className="shadow-custom">
            <Image
              src={product.variants[currentIndex].image}
              alt={product.variants[currentIndex].color}
              className="w-96 h-[480px] rounded-md"
              width={500}
              height={500}
              quality={100}
            />
            <div className="absolute top-4 left-4 subtitle">
              {currentIndex + 1} / {product.variants.length}
            </div>
          </div>
          <div className="hidden sm:block absolute top-[50%] right-0 -mt-8 p-4 rounded-s-md hover:bg-slate-400/45">
            <HiChevronRight onClick={handleNext} className="icon text-4xl" />
          </div>
          <div className="hidden sm:block absolute top-[50%] -mt-8 p-4 rounded-e-md hover:bg-slate-400/45">
            <HiChevronLeft onClick={handlePrev} className="icon text-4xl" />
          </div>
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto scroll-smooth">
          {product.variants.map((item) => {
            return (
              <Image
                key={item._id}
                src={item.image}
                alt="thumbnail-img"
                width={100}
                height={100}
                quality={100}
                className="regular-img cursor-pointer"
                onClick={() => handleThumbnailClick(item)}
              />
            );
          })}
        </div>
      </div>
      <div className="xl:col-span-3 flex flex-col min-w-80">
        <div className="py-4 px-1 mb-2 border-b border-teal/50">
          <h3 className="title mb-2">{product.title}</h3>
          <div className="flex items-center justify-start gap-x-1">
            <HiStar className="icon-small text-orange" />
            <HiStar className="icon-small text-orange" />
            <HiStar className="icon-small text-orange" />
            <HiOutlineStar className="icon-small text-teal" />
            <HiOutlineStar className="icon-small text-teal" />
            <span className="subtitle-sm">55 Rating</span>
          </div>
          <h2 className="title mt-2">
            {product.discount ? (
              <>
                <span className="mr-2">
                  ${" "}
                  {discountCalc(
                    product.variants[currentIndex].price,
                    product.discount
                  )}
                </span>
                <s className="text-base text-gray-500 mr-2">
                  $ {product.variants[currentIndex].price}
                </s>
                <span className="text-lg text-red">
                  {product.discount}% OFF
                </span>
              </>
            ) : (
              <span className="mr-2">
                $ {product.variants[currentIndex].price}
              </span>
            )}
          </h2>
        </div>
        <div className="py-4 px-1 mb-2 flex flex-col gap-3">
          <h5 className="subtitle font-semibold">Quantity:</h5>
          <div className="flex items-center justify-start gap-4">
            <FaSquarePlus
              onClick={handleIncrease}
              className="icon hover:text-tint"
            />
            <span className="subtitle">
              {!product.variants[currentIndex].quantity ? 0 : mainQty}
            </span>
            <FaSquareMinus
              onClick={handleDecrease}
              className="icon hover:text-tint"
            />
          </div>
        </div>
        <div className="py-4 px-1 mb-2 flex flex-col gap-3">
          <h5 className="subtitle font-semibold">Colors:</h5>
          <div className="flex items-center justify-start gap-1">
            {product.variants.map((item) => {
              return (
                <div
                  key={item._id}
                  className="p-3 rounded-full border border-tint cursor-pointer hover:border-teal"
                  style={{ backgroundColor: item.color }}
                  onClick={() => handleColorClick(item)}
                ></div>
              );
            })}
          </div>
          <h5 className="subtitle font-semibold">Size:</h5>
          <div className="flex items-center justify-start gap-1">
            {sizeArray.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setMainSize(item)}
                  className={`subtitle py-1 px-2 rounded-full border border-tint cursor-pointer ${
                    item === mainSize ? "bg-slate-200" : ""
                  }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="xl:col-span-4 flex flex-col min-w-[380px]">
        <div className="py-4 px-1 mb-2 border-b border-teal/50 flex flex-col">
          <div className="mb-4">
            <div className="flex items-start gap-2">
              <HiMiniTruck className="icon" />
              <h5 className="subtitle mb-2">Shipping</h5>
            </div>
            <p className="subtitle-sm">
              Every payment you make on Alibaba.com is secured with strict SSL
              encryption and PCI DSS data protection protocols
            </p>
          </div>
          <div className="mb-4">
            <div className="flex items-start gap-2">
              <HiMiniShieldCheck className="icon" />
              <h5 className="subtitle mb-2">Secure Payments</h5>
            </div>
            <p className="subtitle-sm">
              Claim a refund if your order is missing or arrives with product
              issues, plus free local returns for defects on qualifying
              purchases
            </p>
          </div>
          <div className="mb-4">
            <div className="flex items-start gap-2">
              <HiMiniArrowPathRoundedSquare className="icon" />
              <h5 className="subtitle mb-2">Easy Return & Refund</h5>
            </div>
            <p className="subtitle-sm">
              Shipping solutions for the selected quantity are currently
              unavailable
            </p>
          </div>
        </div>
        <div className="flex-center gap-4 border border-teal my-4 px-4 py-2 rounded-md w-[380px]">
          <div className="subtitle">
            <h6 className="mb-2 text-darkslategray">
              Get upto 30% Off on order value above $100
            </h6>
            <Link href="#" className="subtitle-sm hover:font-medium">
              Terms & Conditions
            </Link>
          </div>
          <div className="bg-slate-200 py-2 px-3 rounded-md flex-center flex-col">
            <h6 className="subtitle-sm">Use Code</h6>
            <h5 className="subtitle text-darkslategray">ORDER50</h5>
          </div>
        </div>
        <div className="py-2 flex items-center gap-4">
          <button
            onClick={insertItemToCart}
            className="subtitle flex-center gap-4 px-4 py-1 rounded-md border border-teal w-[182px] transition-all hover:shadow-md hover:bg-slate-100"
          >
            <HiMiniShoppingBag className="icon" /> Add to bag
          </button>
          <button
            onClick={insertItemToWishlist}
            className="subtitle flex-center gap-4 px-4 py-1 rounded-md border border-teal w-[182px] transition-all hover:shadow-md hover:bg-slate-100"
          >
            <HiHeart className="icon text-red" /> Add to wishlist
          </button>
        </div>
      </div>
    </section>
  );
}
