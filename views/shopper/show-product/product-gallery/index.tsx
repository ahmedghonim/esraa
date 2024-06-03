"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <section className="col-span-12 lg:col-span-6 flex gap-4 max-h-[600px]">
      <div>
        <Swiper
          direction="vertical"
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          spaceBetween={15}
          className="h-full overflow-hidden"
        >
          {images?.map((image) => (
            <SwiperSlide
              key={image}
              onClick={() => setActiveImage(image)}
              className="!h-full"
            >
              <Image
                src={image}
                width={110}
                height={110}
                alt="product image"
                className="!h-[110px] !w-[110px] cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex-1">
        <Image
          src={activeImage}
          width={1200}
          height={1200}
          className="w-full h-full"
          alt="product image"
        />
      </div>
    </section>
  );
}
