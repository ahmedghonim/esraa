"use client";
import { EsraLink } from "@/components/ui";
import { HeroSection, Product } from "@/schema";
import Next from "@/svg/next.svg";
import Previous from "@/svg/previous.svg";
import { Link } from "@/utils/navigation";
import parser from "html-react-parser";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
type Props = {
  data: HeroSection;
};

export default function IntroSection({ data }: Props) {
  const t = useTranslations("common");

  const mainProduct = data?.products.find(
    (item: any) => data.mainProduct === item.id
  ) as any;

  const [activeSlide, setActiveSlide] = useState<number>(0);

  const swiperRef = useRef<any>(null);

  const navigationPrevRef = useRef(null);

  const navigationNextRef = useRef(null);

  return (
    <section className="relative z-0">
      <div className="flex max-md:flex-col">
        <div className="relative w-[41%] max-md:ms-0 max-md:w-full">
          <Link
            href={mainProduct?.thumbnail ? `/products/${mainProduct?.id}` : "#"}
          >
            <Image
              src={mainProduct?.thumbnail || "/intro-1.png"}
              width={1200}
              height={555}
              alt="image"
              className="!max-h-[650px] object-cover object-center"
            />
          </Link>
        </div>

        <div className="flex flex-col ms-5 w-[59%] max-md:ms-0 max-md:w-full">
          <div className="flex flex-col max-md:mt-6 w-full">
            <div className="flex gap-5 justify-between w-full font-medium max-md:flex-wrap max-md:max-w-full">
              <div className="text-lg tracking-tight leading-7 text-zinc-800">
                <span className="text-2xl text-zinc-800">
                  {activeSlide + 1 >= 10
                    ? activeSlide + 1
                    : `0${activeSlide + 1 || 0}`}
                </span>
                <span className="text-zinc-800">
                  /0{data?.products?.length}
                </span>
              </div>

              {/* Swiper Buttons */}
              <div className="flex gap-5 justify-between self-start mt-1.5 text-xs capitalize whitespace-nowrap">
                <button
                  className="flex gap-1.5 text-zinc-800"
                  onClick={() => swiperRef.current?.swiper?.slidePrev()}
                  ref={navigationPrevRef}
                >
                  <Previous />
                  <span>{t("previous")}</span>
                </button>
                <button
                  className="flex gap-1.5 px-0.5 text-primary-100"
                  onClick={() => swiperRef.current?.swiper?.slideNext()}
                  ref={navigationNextRef}
                >
                  <span>{t("next")}</span>
                  <Next />
                </button>
              </div>
            </div>

            {/* Swiper Slides */}
            <div className="mt-6 max-md:max-w-full">
              <Swiper
                loop
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                slidesPerView={3}
                breakpoints={{
                  330: {
                    slidesPerView: 3,
                  },
                  700: {
                    slidesPerView: 3,
                  },
                }}
                spaceBetween={20}
                onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
              >
                {/* @ts-ignore */}
                {data?.products?.map((product: Product, index: number): any => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full bg-primary-100">
                      <Link href={`/products/${product?.id}`}>
                        <Image
                          src={product.thumbnail}
                          width={184}
                          height={130}
                          alt="image"
                          className="!w-full !h-full object-contain object-top"
                        />
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <h1 className="mt-4 text-3xl md:text-[52px] font-bold tracking-tight leading-[78px] text-primary-500 max-md:leading-[40px] w-full text-wrap">
              {data?.title}
            </h1>

            <div className="mt-1 md:text-xl text-base leading-8 capitalize text-primary-300 max-md:max-w-full">
              {data?.description && parser(data.description)}
            </div>

            <EsraLink
              href="/products"
              name={t("shop_now")}
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
