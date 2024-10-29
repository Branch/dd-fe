import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Image from "next/image";
import BaseLink from "@/components/navigation/link/base/baseLink";
import FeedItem from "@/components/navigation/feedItem/feedItem";
import { Graph } from "schema-dts";
const options = { next: { revalidate: 30 } };
import { getPostDataById } from "@/utils/dataFetcher/getPageData";
import { POSTS_CATS_QUERY, LATEST_CATS_QUERY } from "@/sanity/queries/queries";
import { oswald } from "@/utils/fonts/fonts";
import Slider from "@/components/navigation/slider/slider";
import { websiteData } from "@/utils/jsonld/jsonld";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.SITE_NAME,
  metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
  description: "Allt för dig och dina husdjur",
  applicationName: process.env.SITE_NAME,
  publisher: process.env.SITE_NAME,
  robots:
    !process.env?.NO_INDEX || process.env?.NO_INDEX === "true"
      ? "noindex, nofollow"
      : "index, follow",
  alternates: { canonical: "https://djurdjungeln.se" },
  openGraph: {
    url: "https://djurdjungeln.se",
    images: [{ url: "/assets/images/share.webp", width: 1200, height: 630 }],
    locale: "sv_SE",
    type: "article",
    siteName: process.env.SITE_NAME,
    emails: ["kontakt@djurdjungeln.se"],
    countryName: "Sweden",
  },
};
export default async function IndexPage() {
  const graph: Graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${process.env.BASE_URL}/#page`,
        url: process.env.BASE_URL,
        name: process.env.SITE_NAME,
        inLanguage: "sv-SE",
        mainEntityOfPage: `${process.env.BASE_URL}/#page`,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Thing",
                "@id": process.env.BASE_URL,
                name: process.env.SITE_NAME,
              },
            },
          ],
        },
        isPartOf: websiteData,
      },
    ],
  };

  const posts = await client.fetch<SanityDocument[]>(
    POSTS_CATS_QUERY,
    {},
    options
  );
  const cats = await client.fetch<SanityDocument[]>(
    LATEST_CATS_QUERY,
    {},
    options
  );
  const cardsData = await Promise.all(
    cats.map(async (cat) => {
      const c = await getPostDataById(cat._id);
      return {
        title: cat.title,
        image: cat.image,
        description: cat.description,
        slug: c?.path || "",
      };
    })
  );
  return (
    <main className="min-h-screen mt-6 md:mt-12 overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <div className="grid md:grid-cols-2 gap-2 container">
        <div className="flex flex-col gap-4">
          <h1 className={`text-6xl font-bold ${oswald.className}`}>
            Allt för dig och dina djur.
          </h1>
          <p>
            Djur djungeln är din bästa resurs för allt kring husdjur. Vi
            erbjuder expertrecensioner om foder, leksaker och tillbehör. Vi
            strävar efter att hjälpa djurägare att göra välgrundade val och
            säkerställa det bästa för deras pälsiga följeslagare.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <BaseLink text={"Om oss"} url={"/om-djurdjungeln"} />
          </div>
        </div>
        <div className="hidden relative md:flex">
          <svg
            className="absolute -top-12"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#347928"
              d="M40.3,-67.9C53,-62.4,64.6,-53.2,73.2,-41.3C81.9,-29.3,87.5,-14.7,82.7,-2.8C77.8,9,62.4,18.1,51.7,26.5C41,34.9,35.1,42.7,27.2,50.9C19.4,59.1,9.7,67.8,-3.1,73.2C-15.9,78.6,-31.9,80.7,-45.6,75.9C-59.2,71,-70.6,59.2,-73.8,45.4C-77,31.6,-72,15.8,-70.4,0.9C-68.8,-13.9,-70.6,-27.8,-66.4,-40C-62.3,-52.1,-52.2,-62.5,-40.1,-68.4C-28.1,-74.3,-14,-75.7,-0.1,-75.5C13.8,-75.3,27.6,-73.4,40.3,-67.9Z"
              transform="translate(100 100)"
            />
          </svg>
          <Image
            quality={100}
            priority
            className="z-10 absolute left-0 right-0 mx-auto -top-12"
            src={"/assets/images/hero.webp"}
            alt={""}
            width={400}
            height={400}
          />
        </div>
      </div>
      <section className="bg-djungleOrange-200">
        <div className="container mt-12 md:mt-48 py-12 md:py-24">
          <h2 className={`text-4xl font-bold ${oswald.className}`}>
            Därför kan du lista på oss
          </h2>
          <p className="mt-4">
            Djurdjungeln.se är en av Sveriges ledande sajter inom jämförelse av
            husdjursprodukter. Alla recensioner skrivs av erfarna djurägare där
            vår samlade erfarenhet överskrider 50 år! Våra recensioner baseras
            på egna upplevelser och tester som vi gjort. Vi strävar alltid efter
            att erbjuda våra besökare unika, innehållsrika och opartiska
            jämförelser.
          </p>
          <h3 className={`text-3xl mt-12 mb-4 font-bold ${oswald.className}`}>
            Ett axplock av vårt innehåll
          </h3>
          <div className="-mb-32 md:-mb-60">
            <Slider cards={cardsData} />
          </div>
        </div>
      </section>
      <section className="grid mt-56 container sm:grid-flow-col sm:gap-12 mb-20 relative">
        <h2
          className={`text-4xl font-bold sm:sticky sm:top-4 sm:self-start ${oswald.className}`}
        >
          Senaste nytt
        </h2>
        <div>
          {await Promise.all(
            posts.map(async (post) => {
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
                    modifiedAt={post.modifiedAt}
                    authors={post.authors}
                  />
                )
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}
