"use client";
import React from "react";
import ProductCard from "./market/ProductCard";
//----------Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

export default function ProductSlider({ products }) {
  return (
    <div className="px-8 my-8 z-10">
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          720: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
        }}
        freeMode={true}
        pagination={false}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
        style={{
          "--swiper-pagination-color": "#356169",
          "--swiper-pagination-bullet-inactive-color": "#356169",
          "--swiper-pagination-bullet-size": "20px",
        }}
      >
        {products?.map((product) => {
          return (
            <SwiperSlide key={product._id} className="flex-center pb-16">
              <ProductCard
                key={product._id}
                _id={product._id}
                title={product.title}
                discount={product.discount}
                variants={product.variants}
                gridStyle={true}
                type="card"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
