/** @format */

import { faqHeading } from "@/constants/constants";
import Collapsible from "@/components/dataDisplay/collapsible/collapsible";
import Author from "@/components/navigation/author/author";
import MobileToc from "@/components/navigation/toc/mobileToc";
import { IAuthor, IBaseDocument } from "@/types/types";
import { oswald } from "@/utils/fonts/fonts";
import { PortableText } from "next-sanity";
import JsonLd from "@/components/dataDisplay/jsonld/jsonld";
import PageComponents from "@/components/dataDisplay/portableText/portableText";
import BaseLink from "@/components/navigation/link/base/baseLink";
import { tryCatchFetch } from "@/utils/tryCatchFetch";
import ShareBar from "@/components/navigation/shareBar/shareBar";
import DesktopToc from "@/components/navigation/toc/desktopToc";
interface ITable {
  columns: {
    title: string;
  }[];
  rows: {
    cells: {
      text?: string;
      url?: string;
    }[];
  }[];
}
interface IDiscountPage extends IBaseDocument {
  table: ITable;
}
export default async function DiscountPage({
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
  table,
}: IDiscountPage) {
  tocHeadings = [
    {
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ text: "Rabattkoder" }],
    },
    ...tocHeadings,
  ];
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
            const data = await tryCatchFetch(
              `${process.env.BASE_URL}/api/page/metaData/id/${a._id}`
            );
            const authData = await data?.json();
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
        {tocHeadings?.length > 0 && <MobileToc headings={tocHeadings} />}
        <div id="content" className="prose">
          {table ? (
            <section>
              <h2 id="rabattkoder">Rabattkoder</h2>
              <div className="relative overflow-auto">
                <table className="!w-[800px] md:!w-full border-collapse table-fixed">
                  <thead>
                    <tr>
                      {table.columns.map((column, i) => (
                        <th
                          scope="col"
                          className="first:sticky first:bg-djungleBeige border border-djungleBlack-50 first:w-[20%] first:left-0 !p-4"
                          key={i}
                        >
                          {column.title}
                        </th>
                      ))}
                      <th
                        scope="col"
                        className="border border-djungleBlack-50"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, i) => (
                      <tr key={i}>
                        {row.cells.map((cell, j) => (
                          <td
                            className={`${j === 0 ? "sticky left-0 border" : ""} !p-4 border border-djungleBlack-50 bg-djungleGreen-50`}
                            key={j}
                          >
                            {cell.url ? (
                              <BaseLink
                                rel="nofollow noreferrer noopener sponsored"
                                text={"Till butiken"}
                                url={cell.url}
                                classNames="block"
                              />
                            ) : (
                              cell.text
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden text-xs italic text-right">
                Scrolla för att se hela tabellen
              </div>
            </section>
          ) : null}
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
                      isTitleHeading
                      titleHeadingLevel="h3"
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
