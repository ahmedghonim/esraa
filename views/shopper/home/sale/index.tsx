"use client";
import React, { useRef } from "react";
import LeftArrow from "@/svg/short-left-arrow.svg";
import RightArrow from "@/svg/right-arrow.svg";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import { SaleSlider } from "@/schema";
import parser from "html-react-parser";
type Props = {
  data: SaleSlider[];
};

export default function Sale({ data }: Props) {
  const swiperRef = useRef<any>(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <section className="relative mt-[45px]">
      <Swiper className="relative w-full" ref={swiperRef}>
        {data.map((slide, index) => (
          <SwiperSlide className="!flex max-md:flex-col-reverse" key={index}>
            <div className="flex flex-col w-[34%] max-md:ms-0 max-md:w-full">
              <div className="h-full flex flex-col justify-center px-10 md:ps-[66px] max-md:py-[60px] w-full bg-primary-100 text-white text-wrap">
                {parser(slide.description)}
              </div>
            </div>
            <div className="flex flex-col w-[66%] max-md:w-full">
              <div className="flex overflow-hidden relative flex-col grow justify-center items-end w-full ms-auto  max-h-[487px]">
                <Image
                  src={slide.image}
                  width={1200}
                  height={1200}
                  alt="sale poster"
                  className="w-full h-full object-cover object-bottom max-h-[487px]"
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
