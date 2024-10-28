import { ICard } from "@/types/types";
import { oswald } from "@/utils/fonts/fonts";
import { Waves } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
export default function SquareCard({ title, image, slug }: ICard) {
  const imgSrc = sanityImageBuilder(image);
  return (
    imgSrc && (
      <Link
        href={slug}
        className="bg-white aspect-square hover:scale-[101%] duration-200 relative shadow-xl rounded-md"
      >
        <Image
          src={imgSrc}
          fill
          alt={title}
          className="object-cover rounded-md"
        />
        <div className="px-4 z-10 absolute bottom-8 text-white">
          <div
            className={`font-black uppercase text-2xl first-letter:capitalize ${oswald.className}`}
          >
            {title}
          </div>
        </div>
        <div className="h-2/4 w-full rounded-md absolute bottom-0 bg-gradient-to-t from-djungleBlack"></div>
      </Link>
    )
  );
}
