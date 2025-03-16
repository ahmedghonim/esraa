"use client";
import Image from "next/image";
import { useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  console.log("🚀 ~ ProductGallery ~ images:", images);
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <section className="col-span-12 lg:col-span-6 flex gap-4 max-h-[600px]">
      <div className="h-[600px]">
        <Swiper
          direction="vertical"
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          spaceBetween={15}
          slidesPerView={4}
          className="h-full overflow-y-auto"
        >
          {images?.map((image) => (
            <SwiperSlide
              key={image}
              onClick={() => setActiveImage(image)}
              className="!h-auto"
            >
              <Image
                src={image}
                width={110}
                height={110}
                alt="product image"
                className="!h-[110px] !w-[110px] cursor-pointer object-contain"
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
          className="w-full h-full object-contain"
          alt="product image"
        />
      </div>
    </section>
  );
}
