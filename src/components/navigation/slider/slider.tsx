"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import IndexCard from "@/components/navigation/card/indexCard/indexCard";
import "swiper/css";
import { ICard } from "@/types/types";
interface ISlider {
  cards: ICard[];
}
export default function Slider({ cards }: ISlider) {
  return (
    <Swiper
      style={{ overflow: "visible" }}
      spaceBetween={50}
      slidesPerView={"auto"}
      pagination={{
        clickable: true,
      }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {cards.map((c, i) => {
        return (
          <SwiperSlide key={i} className="!w-auto">
            <IndexCard {...c} key={i} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
