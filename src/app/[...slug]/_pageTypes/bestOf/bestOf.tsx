/** @format */

import { faqHeading } from "@/constants/constants";
import Collapsible from "@/components/dataDisplay/collapsible/collapsible";
import Author from "@/components/navigation/author/author";
import MobileToc from "@/components/navigation/toc/mobileToc";
import { IAuthor, IBaseDocument } from "@/types/types";
import { oswald } from "@/utils/fonts/fonts";
import { PortableText } from "next-sanity";
import Image from "next/image";
import JsonLd from "@/components/dataDisplay/jsonld/jsonld";
import PageComponents from "@/components/dataDisplay/portableText/portableText";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import { tryCatchFetch } from "@/utils/tryCatchFetch";
import BaseLink from "@/components/navigation/link/base/baseLink";
import Link from "next/link";
import ShareBar from "@/components/navigation/shareBar/shareBar";
import InsuranceComparison from "@/app/[...slug]/_pageTypes/bestOf/comparison/insurance/insurance";
import StarRating from "@/components/dataDisplay/starRating/starRating";
export interface ITableValue {
  tableValueRating: number;
  tableValue: string;
}
export interface IBestProduct {
  title: string;
  intro: string;
  text: string;
  tableValues: ITableValue[];
  pros: string[];
  reference: {
    _id: string;
    image: string;
    companyLogo?: string;
    price?: number;
    discountedPrice?: number;
  };
  ctaUrl: {
    url: string;
    text: string;
  };
}
export interface ITableHeader {
  title: string;
  description: string;
}
interface IBestOf extends IBaseDocument {
  promotedRefImage: string;
  promotedRefTitle: string;
  promotedPrice?: number;
  promotedDiscountedPrice?: number;
  promotedRefId: string;
  promotedPros: string[];
  promotedText: string;
  promotedTitle: string;
  promotedCtaUrl: {
    url: string;
    text: string;
  };
  bestProducts: IBestProduct[];
  tableHeaders: ITableHeader[];
  comparisonHeadline: string;
  comparisonTableHeadline: string;
}
export default async function BestOf({
  promotedPrice,
  promotedDiscountedPrice,
  promotedRefImage,
  promotedRefId,
  promotedPros,
  promotedCtaUrl,
  promotedText,
  promotedTitle,
  title,
  description,
  authors,
  categoryPath,
  parentTitle,
  readingTime,
  updatedAt,
  tocHeadings,
  body,
  faq,
  graph,
  bestProducts,
  tableHeaders,
  promotedRefTitle,
  comparisonHeadline,
  comparisonTableHeadline,
}: IBestOf) {
  tocHeadings = [
    {
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ text: `${promotedTitle} ${new Date().getFullYear()}?` }],
    },
    {
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ text: `Topplista: ${title} ${new Date().getFullYear()}` }],
    },
    {
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ text: comparisonHeadline }],
    },
    ...tocHeadings,
  ];
  const promotedImg = sanityImageBuilder(promotedRefImage, 1200, 630);
  const promotedData = await tryCatchFetch(
    `${process.env.BASE_URL}/api/page/metaData/id/${promotedRefId}`
  );
  const promoted = await promotedData?.json();
  return (
    <article>
      <JsonLd graph={graph} />
      <section className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-24">
        <div>
          <h1 className={`text-5xl font-bold ${oswald.className}`}>{title}</h1>
          <p className="mt-4">{description}</p>

          {tocHeadings?.length > 0 && (
            <MobileToc styles="pt-4 md:!block" headings={tocHeadings} />
          )}
          <div className={`flex my-2 justify-between relative items-end`}>
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
        </div>
        <div className="bg-white p-6 lg:py-8 lg:px-12 rounded-xl shadow-lg">
          <h2
            id={promotedTitle.toLowerCase().replace(/\s/g, "-")}
            className={`text-3xl font-bold ${oswald.className} text-center`}
          >
            {promotedTitle} {new Date().getFullYear()}?
          </h2>
          {promotedImg && (
            <Image
              src={promotedImg}
              alt={""}
              width={300}
              height={200}
              quality={100}
              priority
              className="rounded-lg my-4 w-full"
            />
          )}
          <Link href={promoted.path}>
            <h3 className="text-center text-djungleBlue hover:text-djungleBlue/80 duration-200 underline text-2xl font-bold mb-2">
              {promotedRefTitle}
            </h3>
          </Link>
          <p className="text-center text-sm">{promotedText}</p>
          <ul className="flex flex-col my-4 gap-4 pr-8">
            {promotedPros.map((pro, i) => {
              return (
                <li
                  key={i}
                  className="before:content-['👍'] before:pr-4 text-sm flex"
                >
                  {pro}
                </li>
              );
            })}
          </ul>
          <BaseLink
            text={promotedCtaUrl.text}
            url={promotedCtaUrl.url}
            classNames="w-full block"
          />
          <div className="mt-4">
            {promotedPrice &&
            promotedDiscountedPrice &&
            promotedDiscountedPrice > 0 ? (
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {promotedDiscountedPrice} kr
                </div>
                <div className="font-bold text-sm">
                  <span className="line-through">{promotedPrice} kr</span>
                  <span className="text-[#FF0000] ml-2">
                    -
                    {Math.round(
                      ((promotedPrice - promotedDiscountedPrice) /
                        promotedPrice) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>
            ) : promotedPrice ? (
              <>
                <div className="text-3xl font-bold">{promotedPrice} kr</div>
              </>
            ) : null}
          </div>
        </div>
      </section>
      <section>
        <h2
          id={`Topplista: ${title} ${new Date().getFullYear()}`
            .toLowerCase()
            .replace(/\s/g, "-")}
          className={`text-4xl font-bold text-center mt-12 mb-4 ${oswald.className}`}
        >{`Topplista: ${title} ${new Date().getFullYear()}`}</h2>
        <ul>
          {bestProducts.map(
            async (
              { title, ctaUrl, reference, text, tableValues, pros },
              i
            ) => {
              const prodData = await tryCatchFetch(
                `${process.env.BASE_URL}/api/page/metaData/id/${reference._id}`
              );
              const prod = await prodData?.json();
              const rating =
                tableValues.reduce(
                  (sum, value) => sum + value.tableValueRating,
                  0
                ) / tableValues.length;
              return (
                <li key={i} className="mb-4">
                  <div className="bg-white rounded-lg gap-x-8 shadow-md p-8 grid grid-cols-1 lg:grid-cols-3">
                    <div>
                      <div className="flex flex-col items-center">
                        <Image
                          src={
                            sanityImageBuilder(
                              reference.companyLogo
                                ? reference.companyLogo
                                : reference.image,
                              1200,
                              630,
                              Boolean(reference.companyLogo)
                            ) || ""
                          }
                          alt={""}
                          width={300}
                          height={200}
                          quality={100}
                          priority
                          className="rounded-lg mb-4"
                        />
                        <StarRating
                          maxStars={5}
                          rating={rating}
                          styles="text-xl mb-4"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{title}</h3>
                      <div className="mt-2">
                        {reference?.price &&
                        reference?.discountedPrice &&
                        reference?.discountedPrice > 0 ? (
                          <div>
                            <div className="text-3xl font-bold">
                              {reference?.discountedPrice} kr
                            </div>
                            <div className="font-bold text-sm">
                              <span className="line-through">
                                {reference?.price} kr
                              </span>
                              <span className="text-[#FF0000] ml-2">
                                -
                                {Math.round(
                                  ((reference?.price -
                                    reference?.discountedPrice) /
                                    reference?.price) *
                                    100
                                )}
                                %
                              </span>
                            </div>
                          </div>
                        ) : reference?.price ? (
                          <>
                            <div className="text-3xl font-bold">
                              {reference?.price} kr
                            </div>
                          </>
                        ) : null}
                      </div>
                      <p className="mt-4">{text}</p>
                    </div>
                    <div>
                      <ul className="my-6 flex flex-col gap-4 pr-8">
                        {pros.map((p, y) => {
                          return (
                            <li
                              key={y}
                              className="before:content-['👍'] before:pr-4 text-sm flex"
                            >
                              {p}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="border-djungleBlack-100/20 lg:col-span-3 lg:mt-4 flex flex-col lg:flex-row items-center justify-center lg:pt-4 lg:border-t gap-4">
                      <BaseLink
                        text={ctaUrl.text}
                        design="primary"
                        url={ctaUrl.url}
                        classNames="w-full block lg:w-auto lg:px-12"
                      />
                      <BaseLink
                        text={"Läs mer"}
                        url={prod.path}
                        design="secondary"
                        classNames="w-full block lg:w-auto lg:px-12"
                      />
                    </div>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </section>
      <section>
        <h2
          id={comparisonHeadline.toLowerCase().replace(/\s/g, "-")}
          className={`text-4xl font-bold text-center mt-12 mb-4 ${oswald.className}`}
        >
          {comparisonHeadline}
        </h2>
        <div className="relative overflow-auto">
          <InsuranceComparison
            bestProducts={bestProducts}
            headers={tableHeaders}
            comparisonTableHeadline={comparisonTableHeadline}
          />
        </div>
      </section>
      <i className="text-xs text-right lg:hidden block mt-1">
        Scrolla för att se hela tabellen
      </i>
      <section id="content" className="prose mt-8">
        {Array.isArray(body) && (
          <PortableText
            value={body}
            components={PageComponents({ updatedAt })}
          />
        )}
      </section>
      <section>
        {faq && faq.length > 0 ? (
          <>
            <h2
              className={`text-3xl font-bold mb-4 ${oswald.className}`}
              id={faqHeading.toLowerCase().replace(/\s/g, "-")}
            >
              {faqHeading}
            </h2>
            {faq.map((faq: { question: string; answer: string }, i: number) => {
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
            })}
          </>
        ) : null}
      </section>
    </article>
  );
}
