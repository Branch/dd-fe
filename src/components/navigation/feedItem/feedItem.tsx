import Tag from "@/components/navigation/tag/tag";
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
const FeedItem = ({
  title,
  image,
  description,
  category,
  tags,
  slug,
  modifiedAt,
  authors,
}: IFeedItem) => {
  const imgSrc = sanityImageBuilder(image);
  const modifiedDate = new Date(modifiedAt);
  return (
    <article className="group border-b block border-djungleBlack-50 last:border-0 py-4">
      {authors?.map((a: IAuthor, i: number) => {
        const headshotSrc = sanityImageBuilder(a.headshot, 20, 20);
        return (
          <div key={i} className="flex gap-1 text-sm">
            {headshotSrc ? (
              <Image
                src={headshotSrc}
                alt={""}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : null}
            <Link href={category?.slug} className="hover:underline">
              {a.fullName}
            </Link>
            {category ? (
              <>
                <span className="text-djungleBlack-100">i</span>
                <Link href={category?.slug} className="hover:underline">
                  {category?.title}
                </Link>
              </>
            ) : null}
          </div>
        );
      })}
      <Link href={slug}>
        <div className="grid grid-flow-col mt-2 gap-12">
          <div>
            <p className="font-bold text-2xl mb-1">{title}</p>
            <p className="text-djungleBlack-100 text-sm">
              ACF Pro or Advanced Custom Field Pro is a WordPress plugin that
              creates additional meta fields or any custom fields for WordPress.
            </p>
          </div>
          {imgSrc ? (
            <Image src={imgSrc} alt={""} width={150} height={50} />
          ) : null}
        </div>
      </Link>
      <div>
        <Tag name={"Tips"} url={"/katt/leksaker/tips"} />
      </div>
      <div className="text-djungleBlack-100 capitalize text-sm mt-4">
        {new Intl.DateTimeFormat("sv-SE", {
          dateStyle: "full",
        }).format(modifiedDate)}
      </div>
    </article>
  );
};
export default FeedItem;
