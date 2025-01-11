import { faqHeading } from "@/constants/constants";
import Collapsible from "@/components/dataDisplay/collapsible/collapsible";
import Author from "@/components/navigation/author/author";
import ShareBar from "@/components/navigation/shareBar/shareBar";
import DesktopToc from "@/components/navigation/toc/desktopToc";
import MobileToc from "@/components/navigation/toc/mobileToc";
import { IAuthor, IBaseDocument } from "@/types/types";
import { getPostDataById } from "@/utils/dataFetcher/getPageData";
import { oswald } from "@/utils/fonts/fonts";
import { PortableText } from "next-sanity";
import Image from "next/image";
import JsonLd from "@/components/dataDisplay/jsonld/jsonld";
import PageComponents from "@/components/dataDisplay/portableText/portableText";

export default function PostType({
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
  faq,
  graph,
}: IBaseDocument) {
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
            src={imgUrl}
            alt={title}
            className="rounded-xl w-full my-4"
            width="1280"
            height="720"
            priority
            quality={100}
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
          {faq && faq.length > 0 ? (
            <>
              <h2
                className={oswald.className}
                id={faqHeading.toLowerCase().replace(/\s/g, "-")}
              >
                {faqHeading}
              </h2>
              {faq.map(
                (faq: { question: string; answer: string }, i: number) => {
                  return (
                    <Collapsible
                      key={i}
                      title={faq.question}
                      styles="bg-djungleGreen-100/50 rounded-md mb-2 px-4"
                    >
                      <p className="!mb-0 mt-2">{faq.answer}</p>
                    </Collapsible>
                  );
                }
              )}
            </>
          ) : null}
        </div>
      </section>
      {tocHeadings?.length > 0 && <DesktopToc headings={tocHeadings} />}
    </article>
  );
}
