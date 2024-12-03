import { ICard } from "@/types/types";
import { oswald } from "@/utils/fonts/fonts";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import { Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function IndexCard({ title, image, slug, description }: ICard) {
  const imgSrc = sanityImageBuilder(image);
  return (
    imgSrc && (
      <Link
        href={slug}
        className="bg-white block hover:scale-[101%] duration-200 relative h-[400px] w-[250px] shadow-xl rounded-md"
      >
        <Image
          src={imgSrc}
          fill
          alt={title}
          className="object-cover rounded-md"
        />
        <div className="px-4 z-10  w-full absolute bottom-16 text-white">
          <Waves />
          <p className="line-clamp-2 my-2">{description}</p>
          <div
            className={`font-black uppercase truncate text-4xl first-letter:capitalize ${oswald.className}`}
          >
            {title}
          </div>
        </div>
        <div className="h-3/4 w-full rounded-md absolute bottom-0 bg-gradient-to-t from-djungleBlack"></div>
      </Link>
    )
  );
}
