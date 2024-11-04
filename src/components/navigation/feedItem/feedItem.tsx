import Author from "@/components/navigation/author/author";
import { IAuthor } from "@/types/types";
import { getPostDataById } from "@/utils/dataFetcher/getPageData";
import { oswald } from "@/utils/fonts/fonts";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import Image from "next/image";
import Link from "next/link";

interface IFeedItem {
  title: string;
  image: string;
  description: string;
  slug: string;
  categoryTitle?: any;
  categorySlug?: any;
  modifiedAt: string;
  authors?: IAuthor[];
}
export default async function FeedItem({
  title,
  image,
  description,
  categoryTitle,
  categorySlug,
  slug,
  modifiedAt,
  authors,
}: IFeedItem) {
  const imgSrc = sanityImageBuilder(image);

  return (
    <article className="group border-b block border-djungleBlack-50 last:border-0 py-4 w-full">
      {authors?.map(async (a: IAuthor, i: number) => {
        const aData = await getPostDataById(a._id);
        return aData ? (
          <Author
            key={i}
            slug={aData.path}
            name={a.fullName}
            headshot={a.headshot}
            categorySlug={categorySlug}
            categoryTitle={categoryTitle}
          />
        ) : null;
      })}
      <Link href={slug}>
        <div className="grid grid-cols-3 md:grid-cols-none md:grid-flow-col justify-between mt-2 gap-12">
          <div className="col-span-2">
            <p className={`font-bold text-2xl mb-1 ${oswald.className}`}>
              {title}
            </p>
            <p className="text-djungleBlack-100 text-sm max-w-prose line-clamp-2">
              {description}
            </p>
          </div>
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={title}
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
