// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { cn } from "@/lib/utils";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Carousal = ({
  slides = [],
  className,
  component,
}: {
  slides: any[];
  className?: string;
  component: (slide: any) => React.ReactNode;
}) => {
  return (
    <Swiper
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation={true}
      pagination={{
        clickable: true,
        type: "bullets",
      }}
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      breakpoints={{
        320: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      className={cn("h-full w-full", className)}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="flex !h-auto">
          {component(slide)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousal;
