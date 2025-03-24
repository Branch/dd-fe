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
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import { tryCatchFetch } from "@/utils/tryCatchFetch";
import BaseLink from "@/components/navigation/link/base/baseLink";
import Link from "next/link";
import MonthAndYear from "@/utils/monthAndYear";
import ShareBar from "@/components/navigation/shareBar/shareBar";
import InsuranceComparison from "@/app/[...slug]/_pageTypes/bestOf/comparison/insurance/insurance";
import { IProductOffering } from "@/app/[...slug]/_pageTypes/insurance/productPage/insuranceProduct";
interface IBestOf extends IBaseDocument {
  bestProducts: {
    title: string;
    reference: {
      productOffering: IProductOffering[];
      _id: string;
    };
  }[];
}
export default async function BestOf({
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
}: IBestOf) {
  tocHeadings = [
    {
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ text: `${title} ${MonthAndYear()}` }],
    },
    {
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ text: "" }],
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
  const type = "insuranceCompanyProductPage";
  return (
    <article>
      <JsonLd graph={graph} />
      <section className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-24">
        <div>
          <h1 className={`text-5xl font-bold ${oswald.className}`}>{title}</h1>
          <p className="mt-4">{description}</p>
          <Collapsible
            styles="pb-0"
            title={`${title}: Topplista ${MonthAndYear()}`}
          >
            <ol className="list-decimal list-inside pl-4 pt-4">
              <li>
                <Link className="text-djungleBlue" href={"/"}>
                  Lassie
                </Link>
              </li>
              <li>
                <Link className="text-djungleBlue" href={"/"}>
                  Hedvig
                </Link>
              </li>
              <li>
                <Link className="text-djungleBlue" href={"/"}>
                  Petson
                </Link>
              </li>
            </ol>
          </Collapsible>
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
          <h2 className={`text-3xl font-bold ${oswald.className} text-center`}>
            Vilken är den bästa kattförsäkringen för {MonthAndYear()}?
          </h2>
          <p className="text-center text-sm my-4">
            Loream lreaom dwa lwasd dwa Loream lreaom dwa lwasd dwaLoream lreaom
            dwa lwasd dwaLoream lreaom dwa lwasd dwa
          </p>
          <ul className="grid grid-cols-2">
            <li className="before:content-['👍'] before:pr-4 text-sm">
              Bra på detta
            </li>
            <li className="before:content-['👍'] before:pr-4 text-sm">
              Loream lreaom dwa lwas Loream lreaom dwa lwas
            </li>
            <li className="before:content-['👍'] before:pr-4 text-sm">Kanon</li>
          </ul>
          <div className="flex mt-8 items-center flex-col gap-4">
            <BaseLink
              text={"Se ditt pris"}
              url={"https://google.com"}
              classNames="w-full"
            />
            <BaseLink
              text={"Läs mer"}
              url={"https://google.com"}
              design="secondary"
              classNames="w-full"
            />
          </div>
        </div>
      </section>
      <section>
        {type === "insuranceCompanyProductPage" && bestProducts ? (
          <InsuranceComparison bestProducts={bestProducts} />
        ) : null}
      </section>
    </article>
  );
}
