"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [activeImage, setActiveImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // Handle images when component mounts or images prop changes
  useEffect(() => {
    if (images && images.length > 0) {
      // Deduplicate images in case there are any duplicates
      const uniqueImages = Array.from(new Set(images));
      setGalleryImages(uniqueImages);

      // Set active image to the first one if not already set
      if (!activeImage || !uniqueImages.includes(activeImage)) {
        setActiveImage(uniqueImages[0]);
      }
    }
  }, [images, activeImage]);

  // If no images, show placeholder
  if (!galleryImages || galleryImages.length === 0) {
    return (
      <section className="col-span-12 lg:col-span-6 flex justify-center items-center h-[600px]">
        <div className="text-center">
          <p>No product images available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="col-span-12 lg:col-span-6 flex gap-4 max-h-[600px]">
      <div className="h-[600px]">
        <Swiper
          direction="vertical"
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          spaceBetween={15}
          slidesPerView={4}
          className="h-full overflow-y-auto"
        >
          {galleryImages.map((image, index) => (
            <SwiperSlide
              key={`${image}-${index}`}
              onClick={() => setActiveImage(image)}
              className="!h-auto cursor-pointer"
            >
              <Image
                src={image}
                width={110}
                height={110}
                alt={`Product image ${index + 1}`}
                className={`!h-[110px] !w-[110px] object-contain border-2 ${
                  activeImage === image
                    ? "border-primary-100"
                    : "border-transparent"
                }`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex-1">
        {activeImage && (
          <Image
            src={activeImage}
            width={1200}
            height={1200}
            className="w-full h-full object-contain"
            alt="Product main image"
          />
        )}
      </div>
    </section>
  );
}
