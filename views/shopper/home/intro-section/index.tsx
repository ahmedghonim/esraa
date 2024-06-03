"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Previous from "@/svg/previous.svg";
import Plus from "@/svg/plus.svg";
import Next from "@/svg/next.svg";
import { EsraLink } from "@/components/ui";
import { SwiperSlide, Swiper } from "swiper/react";
import { useTranslations } from "next-intl";

type Props = {};

export default function IntroSection({}: Props) {
  const t = useTranslations("common");

  const [activeSlide, setActiveSlide] = useState<number>(0);

  const swiperRef = useRef<any>(null);

  const navigationPrevRef = useRef(null);

  const navigationNextRef = useRef(null);

  useEffect(() => {
    const intervalSwipe = setInterval(() => {
      swiperRef.current?.swiper?.slideNext();
    }, 5000);

    return () => clearInterval(intervalSwipe);
  }, []);

  return (
    <section className="relative mt-[84px]">
      <div className="flex max-md:flex-col">
        <div className="relative w-[41%] max-md:ml-0 max-md:w-full">
          <Image
            src={"/intro-1.png"}
            width={1200}
            height={555}
            alt="image"
            className="!max-h-[650px]"
          />
          <button className="absolute top-[17%] translate-y-1/2 right-3 duration-300 hover:scale-90">
            <Plus />
          </button>
        </div>

        <div className="flex flex-col ml-5 w-[59%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col max-md:mt-6 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full font-medium max-md:flex-wrap max-md:max-w-full">
              <div className="text-lg tracking-tight leading-7 text-zinc-800">
                <span className="text-2xl text-zinc-800">
                  0{activeSlide + 1}
                </span>
                <span className="text-zinc-800">/04</span>
              </div>

              {/* Swiper Buttons */}
              <div className="flex gap-5 justify-between self-start mt-1.5 text-xs capitalize whitespace-nowrap">
                <button
                  className="flex gap-1.5 text-zinc-800"
                  onClick={() => swiperRef.current?.swiper?.slidePrev()}
                  ref={navigationPrevRef}
                >
                  <Previous />
                  <span>Previous</span>
                </button>
                <button
                  className="flex gap-1.5 px-0.5 text-primary-100"
                  onClick={() => swiperRef.current?.swiper?.slideNext()}
                  ref={navigationNextRef}
                >
                  <span>Next</span>
                  <Next />
                </button>
              </div>
            </div>

            {/* Swiper Slides */}
            <div className="mt-6 max-md:max-w-full">
              <Swiper
                loop
                ref={swiperRef}
                slidesPerView={3}
                spaceBetween={20}
                onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
              >
                <SwiperSlide>
                  <div className="relative w-[184px] h-[130px]">
                    <Image
                      src={"/intro-2.png"}
                      width={184}
                      height={130}
                      alt="image"
                      className="!w-full !h-full"
                    />

                    <button className="absolute bottom-4 right-3 duration-300 hover:scale-90">
                      <Plus />
                    </button>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative w-[184px] h-[130px]">
                    <Image
                      src={"/intro-3.png"}
                      width={184}
                      height={130}
                      alt="image"
                      className="!w-full !h-full"
                    />
                    <button className="absolute bottom-4 right-3 duration-300 hover:scale-90">
                      <Plus />
                    </button>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative w-[184px] h-[130px]">
                    <Image
                      src={"/intro-4.png"}
                      width={184}
                      height={130}
                      alt="image"
                      className="!w-full !h-full"
                    />
                    <button className="absolute bottom-4 right-3 duration-300 hover:scale-90">
                      <Plus />
                    </button>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="relative w-[184px] h-[130px]">
                    <Image
                      src={"/intro-4.png"}
                      width={184}
                      height={130}
                      alt="image"
                      className="!w-full !h-full"
                    />
                    <button className="absolute bottom-4 right-3 duration-300 hover:scale-90">
                      <Plus />
                    </button>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <h1 className="mt-4 text-3xl md:text-[52px] font-bold tracking-tight leading-[78px] text-primary-500 max-md:leading-[40px]">
              Make Your Style <br /> Looks Perfect All Time
            </h1>

            <p className="mt-1 md:text-xl text-base leading-8 capitalize text-primary-300 max-md:max-w-full">
              Lorem ipsum dolor sit amet consectetur. Eget egestas sapien nec
              arcu velit congue libero. Leo in felis ipsum lorem.Lorem ipsum
              dolor sit amet consectetur.
            </p>

            <EsraLink
              href="/products"
              name={"Shop Now"}
              className="p-2 mt-4 text-base font-bold leading-6 text-white capitalize bg-primary-100 max-md:px-5 w-[154px] h-10"
            />
          </div>
        </div>
      </div>
      <Image
        src={"/logo-pattern.png"}
        width={1200}
        height={1200}
        alt="logo pattern"
        className="max-lg:hidden absolute bottom-0 right-0 !w-[328px] !h-[239px] translate-y-3/4 translate-x-1/2"
      />
    </section>
  );
}
