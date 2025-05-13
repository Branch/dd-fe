/** @format */

import { ICard } from "@/types/types";
import { oswald } from "@/utils/fonts/fonts";
import Link from "next/link";
import Image from "next/image";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import Author from "@/components/navigation/author/author";
export default function SquareCard({
  title,
  image,
  slug,
  design = "base",
  authors,
}: ICard) {
  const imgSrc = sanityImageBuilder(image);
  if (!imgSrc) return null;
  const Card = () =>
    design === "base" ? (
      <Link
        href={slug}
        className="hover:scale-[101%] duration-200 rounded-md flex flex-col gap-2"
      >
        <Image
          src={imgSrc}
          priority
          alt={title}
          width={200}
          height={100}
          className="rounded-md w-full object-contain"
        />
        <div
          className={`font-black text-2xl first-letter:capitalize ${oswald.className}`}
        >
          {title}
        </div>
        <div className="flex flex-col gap-2">
          {authors?.map((author, i) => (
            <Author key={i} name={author.fullName} headshot={author.headshot} />
          ))}
        </div>
      </Link>
    ) : (
      <Link href={slug} className="hover:underline duration-200 relative">
        <Image
          src={imgSrc}
          width={100}
          height={100}
          alt={title}
          className="h-[100px] w-[100px] object-cover rounded-full mx-auto"
        />
        <div
          className={`text-black mt-2 font-bold text-center first-letter:capitalize`}
        >
          {title}
        </div>
      </Link>
    );
  return <Card />;
}
