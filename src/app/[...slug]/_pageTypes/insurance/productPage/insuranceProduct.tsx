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
import InsuranceTable from "@/app/[...slug]/_pageTypes/insurance/productPage/insuranceTable/insuranceTable";
import RadarChart from "@/app/[...slug]/_pageTypes/insurance/productPage/radarChart/radarChart";
import StarRating from "@/components/dataDisplay/starRating/starRating";
import BaseLink from "@/components/navigation/link/base/baseLink";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import { tryCatchFetch } from "@/utils/tryCatchFetch";
export interface IProductOffer {
  title: string;
  description: string;
  value: string;
}
export interface ISubProduct {
  subProductTitle: string;
  subProductDescription: string;
  subProductOffer: {
    offer: IProductOffer;
  }[];
}
export interface IProductOffering {
  subProduct: ISubProduct;
}
export interface IInsuranceRatingParams {
  priceAndDeductible: number;
  compensationAndCoverage: number;
  limitations: number;
  service: number;
  adaptability: number;
}
interface IInsuranceProduct extends IBaseDocument {
  cta: {
    ctaUrl: string;
    ctaText: string;
  };
  prosCons: {
    pros: string[];
    cons: string[];
  };
  productOffering: IProductOffering[];
  productRating: number;
  ratingMotivation: string;
  ratingParameters: IInsuranceRatingParams;
  petType: "cat" | "dog";
  companyLogo?: string;
}
export default async function InsuranceProduct({
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
  cta,
  prosCons,
  productOffering,
  productRating,
  ratingParameters,
  ratingMotivation,
  petType,
  companyLogo,
}: IInsuranceProduct) {
  const companyImg = companyLogo
    ? sanityImageBuilder(companyLogo, 300, 100, true)
    : undefined;
  tocHeadings = [
    {
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ text: "Vad ingår" }],
    },
    {
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ text: "Omdöme" }],
    },
    {
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ text: "Betyg" }],
    },
    {
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ text: "Vanliga frågor" }],
    },
  ];
  return (
    <article>
      <JsonLd graph={graph} />
      <section className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-24">
        <div>
          {companyImg ? (
            <Image
              src={companyImg}
              alt={""}
              className="mt-2 w-full md:w-2/3"
              width={300}
              height={100}
              quality={100}
              priority
            />
          ) : null}
          <div className="mt-4 mb-8">
            <h1
              className={`font-bold underline mr-1 float-left ${oswald.className}`}
            >
              {title}
            </h1>
            <p className="align-baseline pt-[4px] before:content-['-'] relative before:left-0 before:mr-1">
              {description}
            </p>
          </div>
          <BaseLink
            text={cta.ctaText}
            url={cta.ctaUrl}
            rel="noopener noreferrer nofollow sponsored"
            classNames="w-full block"
          />
          <MobileToc styles="md:!block mt-4 md:!w-min" headings={tocHeadings} />
        </div>
        <div className="relative hidden md:block">
          <svg viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF2AB"
              d="M41.2,-70.2C54,-64,65.5,-54.2,71.6,-41.9C77.8,-29.6,78.6,-14.8,77.5,-0.7C76.4,13.5,73.2,27,66.6,38.4C59.9,49.9,49.8,59.3,38.1,65.1C26.4,70.9,13.2,73.1,-0.7,74.3C-14.6,75.4,-29.1,75.5,-40.4,69.5C-51.7,63.4,-59.7,51.3,-66.9,38.6C-74.2,26,-80.8,13,-83.6,-1.6C-86.4,-16.3,-85.6,-32.6,-78.3,-45.2C-71.1,-57.9,-57.4,-66.9,-43.3,-72.3C-29.2,-77.8,-14.6,-79.8,-0.2,-79.5C14.2,-79.1,28.4,-76.4,41.2,-70.2Z"
              transform="translate(90 90)"
            />
          </svg>
          <Image
            quality={100}
            priority
            className="z-10 absolute left-0 right-0 w-4/5 mx-auto top-4 md:top-12"
            src={
              petType === "cat"
                ? "/assets/images/kattförsäkring.webp"
                : "/assets/images/hundförsäkring.webp"
            }
            alt={""}
            width={400}
            height={400}
          />
        </div>
      </section>
      <section className="mb-20 md:mt-12">
        <h2
          className={`text-3xl mb-4 text-center font-bold ${oswald.className}`}
          id="vad-ingår"
        >
          Vad ingår?
        </h2>
        <div className="relative overflow-auto">
          <InsuranceTable productOffering={productOffering} />
        </div>
        {productOffering.length > 1 ? (
          <div className="text-right md:hidden text-xs mt-1 mb-4 italic">
            Scrolla för att se hela tabellen
          </div>
        ) : null}
        <div className="flex items-center justify-center">
          <BaseLink
            text={cta.ctaText}
            url={cta.ctaUrl}
            rel="noopener noreferrer nofollow sponsored"
            classNames="w-full md:w-[200px]"
          />
        </div>
      </section>
      <section id="content" className="mt-8">
        <h2 id="omdöme" className={`${oswald.className} mt-12`}>
          Omdöme
        </h2>
        {authors?.map(async (a: IAuthor, i: number) => {
          const data = await tryCatchFetch(
            `${process.env.BASE_URL}/api/page/metaData/id/${a._id}`
          );
          const authData = await data?.json();
          return (
            <Author
              styles="mb-4"
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
        {Array.isArray(body) && (
          <PortableText
            value={body}
            components={PageComponents({ updatedAt })}
          />
        )}
        <h2 className={`${oswald.className} mt-12`}>
          För- och nackdelar med {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mb-12">
          <div>
            <h3 className="font-bold mb-2">Fördelar</h3>
            <ul className="ml-4">
              {prosCons?.pros?.map((p, i) => {
                return (
                  <li
                    key={i}
                    className="before:content-['👍'] relative before:absolute before:-left-6"
                  >
                    {p}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Nackdelar</h3>
            <ul className="ml-4">
              {prosCons?.cons?.map((p, i) => {
                return (
                  <li
                    key={i}
                    className="before:content-['👎'] relative before:absolute before:-left-6 before:top-1"
                  >
                    {p}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 md:gap-8 md:mb-12">
          <div>
            <h2 className={`${oswald.className} my-12`} id="betyg">
              Betyg & motivering
            </h2>
            {Array.isArray(ratingMotivation) && (
              <PortableText
                value={ratingMotivation}
                components={PageComponents({ updatedAt })}
              />
            )}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="text-xl font-bold">
                Vårt betyg: {productRating}/5
              </div>
              <StarRating
                rating={productRating}
                maxStars={5}
                styles="text-4xl mb-4"
              />
              <BaseLink
                text={cta.ctaText}
                url={cta.ctaUrl}
                rel="noopener noreferrer nofollow sponsored"
                classNames="w-full block md:inline"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <RadarChart
              labels={[
                "Pris & självrisk",
                `Ersättning`,
                `Undantag`,
                "Kundservice",
                `Tillägg`,
              ]}
              data={[
                ratingParameters.priceAndDeductible,
                ratingParameters.compensationAndCoverage,
                ratingParameters.limitations,
                ratingParameters.service,
                ratingParameters.adaptability,
              ]}
            />
          </div>
        </section>
        {faq && faq.length > 0 ? (
          <>
            <h2
              className={oswald.className}
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
