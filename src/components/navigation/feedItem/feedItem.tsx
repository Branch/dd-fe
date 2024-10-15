import Author from "@/components/navigation/author/author";
import Tag from "@/components/navigation/tag/tag";
import { pageTreeClient } from "@/sanity/pageTreeClient";
import { IAuthor } from "@/types/types";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import Image from "next/image";
import Link from "next/link";

interface IFeedItem {
  title: string;
  image: string;
  description: string;
  tags?: string[];
  slug: string;
  category?: any;
  modifiedAt: string;
  authors?: IAuthor[];
}
export default async function FeedItem({
  title,
  image,
  description,
  category,
  tags,
  slug,
  modifiedAt,
  authors,
}: IFeedItem) {
  const imgSrc = sanityImageBuilder(image);

  return (
    <article className="group border-b block border-djungleBlack-50 last:border-0 py-4 w-full">
      {authors?.map((a: IAuthor, i: number) => {
        return (
          <Author
            key={i}
            slug={a?.slug?.current}
            name={a.fullName}
            headshot={a.headshot}
            categorySlug={category?.slug?.current}
            categoryTitle={category.title}
          />
        );
      })}
      <Link href={slug}>
        <div className="grid grid-flow-col justify-between mt-2 gap-12">
          <div>
            <p className="font-bold text-2xl mb-1">{title}</p>
            <p className="text-djungleBlack-100 text-sm max-w-prose line-clamp-2">
              {description}
            </p>
          </div>
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={""}
              width={150}
              height={50}
              className="rounded-sm"
            />
          ) : null}
        </div>
      </Link>
      <div className="text-djungleBlack-100 capitalize text-sm mt-4">
        {new Intl.DateTimeFormat("sv-SE", {
          dateStyle: "full",
        }).format(new Date(modifiedAt))}
      </div>
    </article>
  );
}
