/** @format */
"use client";
import formatPrice from "@/utils/formatPrice";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
export default function AdtractionProduct({ value }: { value: any }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  return (
    <div className="bg-white rounded-md border pr-4 py-4 grid grid-cols-3 my-4">
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
        <div
          className={`text-xs relative block overflow-y-clip text-djungleBlack ${showFullDescription ? "h-auto mb-2" : "h-[30px]"}`}
        >
          {value.description}
          {!showFullDescription && (
            <div className="h-[50px] w-full absolute bottom-0 left-0 bg-gradient-to-t from-white to-transparent"></div>
          )}
        </div>
        {!showFullDescription && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="underline text-xs"
          >
            Läs mer
          </button>
        )}
        {value.price !== value.originalPrice ? (
          <div className="mb-2">
            <div className="font-bold text-md mt-1">
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
          <div className="text-xl font-bold mt-1 md:mt-4">
            {formatPrice(value.price)}
          </div>
        )}
        <a
          href={value.trackingUrl ? value.trackingUrl : value.productUrl}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="border-2 inline-flex gap-2 items-center !font-bold hover:bg-djungleBlue hover:!text-white text-sm border-djungleBlue !no-underline text-djungleBlue px-4 py-2 rounded-full"
        >
          Köp hos VetZoo <ShoppingCart size={14} className="mb-1" />
        </a>
      </div>
    </div>
  );
}
