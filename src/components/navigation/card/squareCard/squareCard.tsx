import { ICard } from "@/types/types";
import { oswald } from "@/utils/fonts/fonts";
import Link from "next/link";
import Image from "next/image";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
export default function SquareCard({
  title,
  image,
  slug,
  design = "base",
}: ICard) {
  const imgSrc = sanityImageBuilder(image);
  if (!imgSrc) return null;
  const Card = () =>
    design === "base" ? (
      <Link
        href={slug}
        className="aspect-square hover:scale-[101%] duration-200 relative shadow-xl rounded-md"
      >
        <Image
          src={imgSrc}
          priority
          fill
          alt={title}
          className="object-cover rounded-md"
        />
        <div className="px-4 w-full z-10 absolute bottom-8 text-white">
          <div
            className={`font-black truncate uppercase text-2xl first-letter:capitalize ${oswald.className}`}
          >
            {title}
          </div>
        </div>
        <div className="h-3/4 w-full rounded-md absolute bottom-0 bg-gradient-to-t from-djungleBlack"></div>
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
