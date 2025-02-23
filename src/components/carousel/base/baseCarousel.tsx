/** @format */

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
interface ICarouselImg {
  url: string;
  alt?: string;
}
interface ICarousel {
  images: ICarouselImg[];
}
export default function BaseCarousel({ images }: ICarousel) {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{
        el: ".custom-pagination",
        clickable: true,
        renderBullet: (index, className) => {
          return `<img src="${images[index].url}" class="${className} custom-bullet" />`;
        },
      }}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <Image
            width={600}
            height={600}
            priority
            quality={100}
            src={img.url}
            alt={""}
          />
        </SwiperSlide>
      ))}
      <div className="custom-pagination"></div>
    </Swiper>
  );
}
