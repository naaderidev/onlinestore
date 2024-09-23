"use client";
import React from "react";
import HomeTitles from "@/components/modules/home/HomeTitles";
import ThirdHomeCard from "@/components/modules/home/ThirdHomeCard";
//----------Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";

export default function HandPicked({ handpicks }) {
  return (
    <section className="my-8">
      <HomeTitles title="Handpicked Collection" />
      <div className="bg-teal py-4">
        <div className="px-8 my-8 z-10">
          <Swiper
            loop={true}
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
            autoplay={{
              delay: 3000, // delay in ms (3 seconds)
              disableOnInteraction: false, // allow autoplay to continue after user interactions
            }}
            freeMode={true}
            pagination={false}
            modules={[FreeMode, Pagination, Autoplay]}
            className="mySwiper"
            style={{
              "--swiper-pagination-color": "#356169",
              "--swiper-pagination-bullet-inactive-color": "#356169",
              "--swiper-pagination-bullet-size": "20px",
            }}
          >
            {handpicks.map((product) => {
              return (
                <SwiperSlide className="flex-center" key={product._id}>
                  <ThirdHomeCard title={product.title} image={product.image} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
