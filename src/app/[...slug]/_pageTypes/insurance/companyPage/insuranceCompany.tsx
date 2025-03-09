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
import RadarChart from "@/app/[...slug]/_pageTypes/insurance/productPage/radarChart/radarChart";
import StarRating from "@/components/dataDisplay/starRating/starRating";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import ProductCard from "@/app/[...slug]/_pageTypes/insurance/companyPage/productCard/productCard";
import { tryCatchFetch } from "@/utils/tryCatchFetch";

export interface IInsuranceCompanyRatingParams {
  customerSatisfaction: number;
  customerSupport: number;
  claimsProcess: number;
  ux: number;
}
interface IInsuranceProduct extends IBaseDocument {
  prosCons: {
    pros: string[];
    cons: string[];
  };
  companyRating: number;
  ratingMotivation: string;
  ratingParameters: IInsuranceCompanyRatingParams;
  companyLogo?: string;
  companyCircleLogo?: string;
  companyAbout: {
    aboutHeadline: string;
    aboutDesc: string;
  };
  contactInfo: {
    phone: string;
    contactEmail: string;
    contactDesc: string;
    openingHours: string;
    orgNr: string;
    address: string;
  };
  companyProducts: {
    title: string;
    description: string;
    productLink: any;
  }[];
}
export default async function InsuranceCompany({
  title,
  contactInfo,
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
  prosCons,
  companyRating,
  ratingParameters,
  ratingMotivation,
  companyLogo,
  companyCircleLogo,
  companyProducts,
  companyAbout,
}: IInsuranceProduct) {
  const companyImg = companyLogo
    ? sanityImageBuilder(companyLogo, 300, 100, true)
    : undefined;
  const companyCircleImg = companyCircleLogo
    ? sanityImageBuilder(companyCircleLogo, 100, 100, true)
    : undefined;
  tocHeadings = [
    {
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ text: "Försäkringar" }],
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
      children: [{ text: `Om företaget` }],
    },
    {
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ text: "Kontaktuppgifter" }],
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
          <div className="mt-4 md:mb-2">
            <h1
              className={`font-bold leading-tight mb-4 text-5xl md:text-[3rem] lg:text-[4rem] ${oswald.className}`}
            >
              {title}
            </h1>
            <p>{description}</p>
          </div>
          <MobileToc
            styles="md:!block mb-4 md:mb-0 md:!w-min"
            headings={tocHeadings}
          />
        </div>
        <div className="relative hidden md:block">
          <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF2AB"
              d="M41.2,-70.2C54,-64,65.5,-54.2,71.6,-41.9C77.8,-29.6,78.6,-14.8,77.5,-0.7C76.4,13.5,73.2,27,66.6,38.4C59.9,49.9,49.8,59.3,38.1,65.1C26.4,70.9,13.2,73.1,-0.7,74.3C-14.6,75.4,-29.1,75.5,-40.4,69.5C-51.7,63.4,-59.7,51.3,-66.9,38.6C-74.2,26,-80.8,13,-83.6,-1.6C-86.4,-16.3,-85.6,-32.6,-78.3,-45.2C-71.1,-57.9,-57.4,-66.9,-43.3,-72.3C-29.2,-77.8,-14.6,-79.8,-0.2,-79.5C14.2,-79.1,28.4,-76.4,41.2,-70.2Z"
              transform="translate(90 90)"
            />
          </svg>
          {companyImg ? (
            <Image
              src={companyImg}
              alt={""}
              className="mt-24 hidden md:block md:w-2/3 mx-auto z-10 absolute left-0 right-0 w-4/5 top-4 lg:top-12"
              width={300}
              height={100}
              quality={100}
              priority
            />
          ) : null}
        </div>
        <div></div>
      </section>
      <section className="mb-20 md:mt-4">
        <h2
          className={`text-3xl mb-8 text-center font-bold ${oswald.className}`}
          id="forsäkringar"
        >
          Försäkringar
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {companyProducts.map(async (p, i) => {
            const data = await tryCatchFetch(
              `${process.env.BASE_URL}/api/page/metaData/id/${p.productLink._id}`
            );
            const pData = await data?.json();
            return (
              <ProductCard
                key={i}
                title={p.title}
                description={p.description}
                pros={p.productLink.prosCons.pros}
                cta={p.productLink.cta}
                readMore={{
                  text: "Läs mer",
                  url: pData?.path || "",
                }}
              />
            );
          })}
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
                Vårt betyg: {companyRating}/5
              </div>
              <StarRating
                rating={companyRating}
                maxStars={5}
                styles="text-4xl mb-4"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <RadarChart
              labels={[
                "Användarvänlighet",
                "Kundnöjdhet",
                "Skadehantering",
                "Support",
              ]}
              data={[
                ratingParameters.ux,
                ratingParameters.customerSatisfaction,
                ratingParameters.claimsProcess,
                ratingParameters.customerSupport,
              ]}
            />
          </div>
        </section>
        <section className="bg-white text-center border-djungleBlue-50 border shadow-sm p-4 rounded-lg">
          <h2 id="om-företaget" className={`text-center ${oswald.className}`}>
            {companyAbout.aboutHeadline}
          </h2>
          {companyCircleImg ? (
            <Image
              src={companyCircleImg}
              alt={""}
              className="w-1/4 sm:w-1/3 md:w-[100px] mx-auto pb-8"
              width={300}
              height={300}
              quality={100}
            />
          ) : null}
          {Array.isArray(companyAbout.aboutDesc) && (
            <PortableText
              value={companyAbout.aboutDesc}
              components={PageComponents({ updatedAt })}
            />
          )}
        </section>
        <section className="mt-12 mb-4">
          <h2 id="kontaktuppgifter">Kontaktuppgifter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold" htmlFor="address">
                Adress
              </label>
              <p id="address">{contactInfo.address}</p>
              <label className="font-bold" htmlFor="orgNr">
                Organisationsnummer
              </label>
              <p id="orgNr">{contactInfo.orgNr}</p>
              <label className="font-bold" htmlFor="email">
                E-post
              </label>
              <p id="email">
                <a
                  className="!text-djungleBlack underline"
                  href={`mailto:${contactInfo.contactEmail}`}
                >
                  {contactInfo.contactEmail}
                </a>
              </p>
              <label className="font-bold" htmlFor="phone">
                Telefon
              </label>
              <p id="phone">
                <a
                  className="!text-djungleBlack underline"
                  href={`tel:${contactInfo.phone}`}
                >
                  {contactInfo.phone}
                </a>
              </p>
            </div>
            <div></div>
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
