"use client";
import { SwiperSlide } from "swiper/react";

import { ReactNode } from "react";

interface ISliderItem {
  children: ReactNode;
}
export default function Slideritem({ children }: ISliderItem) {
  return <SwiperSlide>{children}</SwiperSlide>;
}
