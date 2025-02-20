/** @format */

import StarRating from "@/components/dataDisplay/starRating/starRating";
import { ICard } from "@/types/types";
import { oswald } from "@/utils/fonts/fonts";
import formatPrice from "@/utils/formatPrice";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  title,
  image,
  slug,
  price,
  discountPrice,
  rating,
  brand,
}: ICard) {
  const imgSrc = sanityImageBuilder(image);
  if (!imgSrc) return null;
  return (
    <Link
      href={slug}
      className="block hover:scale-[101%] duration-200 relative"
    >
      <Image
        src={imgSrc}
        width={250}
        height={250}
        alt={title}
        className="object-contain aspect-square bg-white mx-auto w-full"
      />
      <div className="">
        <div
          className={`first-letter:capitalize font-normal text-sm mt-1 ${oswald.className}`}
        >
          <div>{brand}</div>
          <div>{title}</div>
          {discountPrice && discountPrice > 0 ? (
            <>
              <div className="font-bold">
                {formatPrice(discountPrice as number)}
              </div>
              <div className="line-through">{formatPrice(price as number)}</div>
            </>
          ) : (
            <div className="font-bold">{formatPrice(price as number)}</div>
          )}
          <div className="flex gap-2 items-center">
            <StarRating maxStars={5} rating={rating as number} />
          </div>
        </div>
      </div>
    </Link>
  );
}
