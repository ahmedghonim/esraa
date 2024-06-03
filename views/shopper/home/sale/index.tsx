"use client";
import React, { useRef } from "react";
import LeftArrow from "@/svg/short-left-arrow.svg";
import RightArrow from "@/svg/right-arrow.svg";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";

type Props = {};

export default function Sale({}: Props) {
  const swiperRef = useRef<any>(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <section className="relative mt-[45px]">
      <Swiper className="relative w-full" ref={swiperRef}>
        {[...Array(3)].map((_slide, index) => (
          <SwiperSlide className="!flex max-md:flex-col-reverse" key={index}>
            <div className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
              <div className="flex grow gap-5 justify-center px-10 md:ps-[66px] max-md:py-[60px] w-full bg-primary-100">
                <div className="flex flex-col grow shrink-0 my-auto text-white basis-0 w-fit">
                  <div className="self-center md:text-[28px] text-center capitalize font-Heebo">
                    end of season
                  </div>
                  <div className="self-center mt-5 mb-2 text-5xl font-bold max-md:text-3xl">
                    SALE
                  </div>
                  <div className="md:text-[42px] text-2xl text-center font-Heebo">
                    Up to 70% off
                  </div>
                  <div className="mt-3 text-sm leading-5 text-center font-Heebo">
                    Vivamus sit amet interdum elit. Proin erat ac velit tempus
                    auctor.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[66%] max-md:w-full">
              <div className="flex overflow-hidden relative flex-col grow justify-center items-end md:min-h-[487px] max-md:max-w-full">
                <Image
                  src={"/sale-poster.png"}
                  width={1200}
                  height={1200}
                  alt="sale poster"
                  className="w-full h-full"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button
          className="flex absolute top-0 left-0 justify-center items-center px-3 py-20 bg-primary-200 w-[35px] md:w-[58px] h-full z-[1]"
          ref={navigationPrevRef}
          onClick={() => swiperRef.current?.swiper?.slidePrev()}
        >
          <LeftArrow />
        </button>

        <button
          className="flex absolute top-0 right-0 justify-center items-center px-3 py-20 bg-primary-200 w-[35px] md:w-[58px] h-full z-[1]"
          ref={navigationNextRef}
          onClick={() => swiperRef.current?.swiper?.slideNext()}
        >
          <RightArrow />
        </button>
      </Swiper>

      <Image
        src={"/logo-pattern-1.png"}
        width={137}
        height={239}
        alt="logo pattern"
        className="absolute bottom-0 left-0 -translate-x-full"
      />
    </section>
  );
}
