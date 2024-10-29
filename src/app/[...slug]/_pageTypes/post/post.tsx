import { faqHeading } from "@/constants/constants";
import Collapsible from "@/components/dataDisplay/collapsible/collapsible";
import Author from "@/components/navigation/author/author";
import ShareBar from "@/components/navigation/shareBar/shareBar";
import DesktopToc from "@/components/navigation/toc/desktopToc";
import MobileToc from "@/components/navigation/toc/mobileToc";
import { IAuthor, IBaseDocument } from "@/types/types";
import { getPostDataById } from "@/utils/dataFetcher/getPageData";
import { oswald } from "@/utils/fonts/fonts";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import { PawPrint } from "lucide-react";
import { PortableText, PortableTextComponents } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/dataDisplay/jsonld/jsonld";

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
  const PageComponents: PortableTextComponents = {
    // https://kittygiraudel.com/2022/05/19/table-of-contents-with-sanity-portable-text/
    listItem: {
      // Define the LI element
      bullet: ({ children }: any) => (
        <li className="flex items-center gap-2">
          <PawPrint size={14} />
          {children}
        </li>
      ),
    },
    block: {
      blockquote: ({ children }) => (
        <figure>
          <blockquote className="my-20 relative text-xl rounded-xl shadow-xl bg-white py-16 pb-12 md:py-24 px-8 md:px-14 font-serif italic">
            <div className="bg-djungleGreen-100 flex items-center justify-center absolute md:left-12 -top-8 md:-top-12 h-16 w-16 md:h-24 md:w-24 rounded-full">
              <Image
                src={"/assets/icons/quote.svg"}
                alt={""}
                width={40}
                height={40}
                className="w-[25px] md:w-[40px]"
              />
            </div>
            {children}
          </blockquote>
        </figure>
      ),
      h2: ({ children }) => (
        <h2
          className={oswald.className}
          id={children?.toString().toLowerCase().replace(/\s/g, "-")}
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => <h3 className={oswald.className}>{children}</h3>,
      h4: ({ children }) => <h4 className={oswald.className}>{children}</h4>,
    },
    types: {
      image: ({ value }) => {
        const image = value.asset;
        const src = sanityImageBuilder(image);
        return src ? (
          <figure className="mb-4">
            <Image
              src={src}
              alt={value.alt}
              className=" rounded-md"
              width={767}
              height={433}
            />
            {value.caption && (
              <figcaption className="text-sm italic mt-1 text-djungleBlack/80">
                {value.caption}
              </figcaption>
            )}
          </figure>
        ) : null;
      },
      table: ({ value }) => {
        return (
          <table className="w-full mb-4">
            <tbody>
              {value.rows.map((row: { cells: string[] }, i: number) => {
                return (
                  <tr key={i} className={" odd:bg-djungleGreen-50"}>
                    {row.cells.map((cell, j: number) => {
                      return i === 0 ? (
                        <th className="p-2" key={j}>
                          {cell}
                        </th>
                      ) : (
                        <td className="p-2" key={j}>
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      },
    },
    marks: {
      externalLink: ({ value, children }) => {
        return (
          <a
            href={value.href}
            target={value.openInNewTab ? "_blank" : "_self"}
            rel={
              value.sponsored
                ? "sponsored noopener noreferrer nofollow"
                : "noopener noreferrer nofollow"
            }
          >
            {children}
          </a>
        );
      },
      internalLink: ({ value, children }) => (
        <Link href={value.href}>{children}</Link>
      ),
    },
  };

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
            quality={100}
            src={imgUrl}
            alt={title}
            className="aspect-video rounded-xl w-full my-4"
            width="550"
            height="310"
            priority
          />
        )}
        {tocHeadings?.length > 0 && <MobileToc headings={tocHeadings} />}
        <div id="content" className="prose">
          {Array.isArray(body) && (
            <PortableText value={body} components={PageComponents} />
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
