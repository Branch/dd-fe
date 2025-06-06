/** @format */

import sanityImageBuilder from "@/utils/sanityImageBuilder";
import Link from "next/link";
import Image from "next/image";

interface IAuthorLink {
  slug?: string;
  name: string;
  headshot: string;
  categorySlug?: string;
  categoryTitle?: string;
  size?: "small" | "medium" | "large";
  date?: string;
  readTime?: string;
  styles?: string;
}

export default function Author({
  slug,
  name,
  headshot,
  categorySlug,
  categoryTitle,
  size = "small",
  date,
  readTime,
  styles,
}: IAuthorLink) {
  const imageWidth = size === "small" ? 20 : 40;
  const srcWidth = size === "small" ? 20 : 80;
  const headshotSrc = sanityImageBuilder(headshot, srcWidth, srcWidth);
  return (
    <div className={`flex gap-1 text-sm items-center ${styles ? styles : ""}`}>
      {headshotSrc ? (
        <Image
          src={headshotSrc}
          alt={name}
          width={imageWidth}
          height={imageWidth}
          priority
          className={`rounded-full self-start ${size !== "small" ? "border-2 border-djungleOrange" : ""}`}
        />
      ) : null}
      {size !== "small" ? (
        <div className="flex flex-col ml-2">
          <div className="flex gap-1 items-center">
            {slug ? (
              <Link
                href={slug}
                className="underline !text-djungleBlack text-md mb-1"
              >
                {name}
              </Link>
            ) : (
              <span className="text-md mb-1">{name}</span>
            )}
            <Image
              className="mb-1"
              src={"/assets/icons/checkbox.svg"}
              alt={""}
              width={15}
              height={15}
            />
          </div>

          <div className="flex flex-col md:flex-row text-xs">
            {categorySlug ? (
              <div>
                <span className="text-djungleBlack-100">Publicerad</span>
                <span className="mx-1 text-djungleBlack-100">i</span>
                <Link href={categorySlug} className="underline">
                  {categoryTitle}
                </Link>
              </div>
            ) : null}
            <div>
              {readTime ? (
                <span className="text-djungleBlack-100">
                  {categorySlug ? (
                    <span className="hidden md:inline mx-2">·</span>
                  ) : null}
                  {readTime}
                </span>
              ) : null}
              {date ? (
                <span className="text-djungleBlack-100">
                  <span className="mx-2">·</span>
                  {new Intl.DateTimeFormat("sv-SE", {
                    dateStyle: "long",
                  }).format(new Date(date))}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      ) : slug ? (
        <Link href={slug} className="underline">
          {name}
        </Link>
      ) : (
        <span>{name}</span>
      )}
      {categoryTitle && size === "small" && categorySlug ? (
        <>
          <span className="text-djungleBlack-100">i</span>
          <Link href={categorySlug} className="underline">
            {categoryTitle}
          </Link>
        </>
      ) : null}
    </div>
  );
}
