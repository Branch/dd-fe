import Author from "@/components/navigation/author/author";
import ShareBar from "@/components/navigation/shareBar/shareBar";
import DesktopToc from "@/components/navigation/toc/desktopToc";
import MobileToc from "@/components/navigation/toc/mobileToc";
import { IAuthor, IBaseDocument } from "@/types/types";
import { getPostDataById } from "@/utils/dataFetcher/getPageData";
import { oswald } from "@/utils/fonts/fonts";
import { PortableText } from "next-sanity";
import Image from "next/image";
import FeedItem from "@/components/navigation/feedItem/feedItem";
import JsonLd from "@/components/dataDisplay/jsonld/jsonld";
import PageComponents from "@/components/dataDisplay/portableText/portableText";

interface IAuthorPage extends IBaseDocument {
  authorPages: any[];
}

export default async function AuthorType({
  title,
  description,
  imgUrl,
  authors,
  categoryPath,
  parentTitle,
  readingTime,
  updatedAt,
  tocHeadings,
  body,
  authorPages,
  graph,
}: IAuthorPage) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-7 gap-4">
      <JsonLd graph={graph} />
      <section className="md:col-span-5">
        <h1 className={`text-4xl font-bold ${oswald.className}`}>{title}</h1>
        <p className="my-4 md:my-8">{description}</p>
        <div
          className={`flex justify-between items-end ${!imgUrl ? "border-b border-djungleBlack-100/50 pb-6 mb-6" : ""}`}
        >
          {authors?.map(async (a: IAuthor, i: number) => {
            const authData = await getPostDataById(a._id);
            return (
              <Author
                key={i}
                slug={`${process.env.BASE_URL}${authData?.path}`}
                name={a.fullName}
                headshot={a.headshot}
                {...(categoryPath
                  ? {
                      categorySlug: `/${categoryPath}`,
                    }
                  : { categorySlug: undefined })}
                categoryTitle={parentTitle}
                readTime={`${readingTime} min lästid`}
                date={updatedAt}
                size="medium"
              />
            );
          })}
          <ShareBar title={title} />
        </div>
        {imgUrl && (
          <Image
            priority
            src={imgUrl}
            alt={title}
            className="aspect-video rounded-xl w-full my-4"
            width="550"
            height="310"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
        {tocHeadings?.length > 0 && <MobileToc headings={tocHeadings} />}
        <div id="content" className="prose">
          {Array.isArray(body) && (
            <PortableText
              value={body}
              components={PageComponents({ updatedAt })}
            />
          )}
        </div>
        <h2 className={`text-4xl font-bold mt-12 ${oswald.className}`}>
          Senaste nytt från {title}
        </h2>
        {await Promise.all(
          authorPages.map(async (post) => {
            const t = await getPostDataById(post._id);
            const parent = await getPostDataById(post._id);
            return (
              t?.path && (
                <FeedItem
                  title={post.title}
                  image={post.image}
                  description={post.description}
                  slug={t.path}
                  categoryTitle={post.parent.title}
                  categorySlug={
                    post.parent.title === "Index page"
                      ? undefined
                      : parent?.path
                  }
                  _updatedAt={post._updatedAt}
                  authors={post.authors}
                />
              )
            );
          })
        )}
      </section>
      {tocHeadings?.length > 0 && <DesktopToc headings={tocHeadings} />}
    </article>
  );
}
