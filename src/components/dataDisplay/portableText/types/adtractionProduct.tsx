/** @format */
"use client";
import formatPrice from "@/utils/formatPrice";
import { CheckCircle, CircleX, ShoppingCart, Truck } from "lucide-react";
import Image from "next/image";
export default function AdtractionProduct({ value }: { value: any }) {
  return (
    <div className="bg-white rounded-md border pr-4 py-4 grid grid-cols-3 my-4 gap-4 pl-4 lg:pl-0">
      <div className="col-span-1 relative h-full w-full">
        <Image
          src={value.imageUrl}
          alt={value.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="col-span-2">
        <div className="!text-md font-bold">{value.name}</div>
        {value.price !== value.originalPrice ? (
          <div className="mb-2">
            <div className="font-bold text-md">
              <span>{formatPrice(value.price)}</span>
              <span className="text-[#FF0000] ml-2 text-xs">
                -
                {Math.round(
                  ((value.originalPrice - value.price) / value.originalPrice) *
                    100
                )}
                % rabatt
              </span>
            </div>
          </div>
        ) : (
          <div className="text-xl font-bold my-2">
            {formatPrice(value.price)}
          </div>
        )}
        <div className="text-sm flex flex-col gap-2 justify-center mb-2 text-djungleBlack">
          <div className="flex gap-2 items-center">
            {value.inStock ? (
              <div className="flex gap-2 items-center">
                <CheckCircle className="text-green-500 mb-[2px]" size={14} />
                <div>I lager</div>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <CircleX className="text-red-500 mb-[2px]" size={14} />
                <div> Ej i lager</div>
              </div>
            )}
          </div>
          {value.price > 499 && (
            <div className="text-sm font-bold text-djungleBlack flex gap-2 items-center">
              <Truck size={14} className="mb-[2px]" />
              <div>Gratis frakt</div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <a
            href={value.trackingUrl ? value.trackingUrl : value.productUrl}
            target="_blank"
            rel="noopener noreferrer nofollow sponsored"
            className="border-2 flex w-full justify-center lg:w-auto text-center gap-2 items-center !font-bold lg:hover:bg-djungleBlue lg:hover:!text-white text-sm border-djungleBlue !no-underline text-djungleBlue px-4 py-2 rounded-full"
          >
            Köp hos VetZoo <ShoppingCart size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
