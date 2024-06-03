"use client";
import React, { useRef } from "react";
import LeftArrow from "@/svg/short-left-arrow.svg";
import RightArrow from "@/svg/right-arrow.svg";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";

type Props = {};

export default function Testimonials({}: Props) {
  const swiperRef = useRef<any>(null);

  const navigationPrevRef = useRef(null);

  const navigationNextRef = useRef(null);

  return (
    <section className="grid grid-cols-12 items-center mt-[118px] mb-[180px]">
      <div className="col-span-12 lg:col-span-7">
        <Swiper ref={swiperRef} className="relative">
          {[...Array(3)].map((feedback, index) => (
            <SwiperSlide
              key={index}
              className="!flex max-lg:flex-col-reverse gap-5"
            >
              <div className="flex flex-col mt-5 max-md:mt-10 max-md:max-w-full">
                <h1 className="self-center text-3xl leading-10 text-black">
                  Mariam Mohamed
                </h1>
                <p className="mt-3 text-xl leading-8 text-center text-[#515151] font-Heebo">
                  Lorem ipsum dolor sit amet consectetur. Quis velit dictum quam
                  adipiscing interdum ultricies.Lorem ipsum dolor sit amet
                  consectetur. Quis velit dictum quam adipiscing interdum
                  ultricies.
                </p>
                <button
                  className="grid place-items-center mt-10 bg-primary-100 h-[50px] w-[84px]"
                  ref={navigationPrevRef}
                  onClick={() => swiperRef.current?.swiper?.slidePrev()}
                >
                  <LeftArrow />
                </button>
              </div>

              <div className="relative">
                <Image
                  src={"/testimonials.png"}
                  width={1200}
                  height={1200}
                  alt="image"
                  className="h-full"
                />

                <button
                  className="absolute bottom-0 right-0 grid place-items-center bg-primary-100 h-[50px] w-[84px]"
                  ref={navigationNextRef}
                  onClick={() => swiperRef.current?.swiper?.slideNext()}
                >
                  <RightArrow />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="lg:col-span-5 col-span-12 flex justify-end">
        <div className="relative h-[89px] w-[289px] bg-primary-100 rotate-90 px-8">
          <span className="text-2xl absolute top-[70%]">
            What They Say <br /> about us ?
          </span>
        </div>
      </div>
    </section>
  );
}
