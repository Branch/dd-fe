import { faqHeading } from "@/constants/constants";
import Collapsible from "@/components/dataDisplay/collapsible/collapsible";
import Author from "@/components/navigation/author/author";
import ShareBar from "@/components/navigation/shareBar/shareBar";
import DesktopToc from "@/components/navigation/toc/desktopToc";
import MobileToc from "@/components/navigation/toc/mobileToc";
import { IAuthor, IBaseDocument, ICard } from "@/types/types";
import { getPostDataById } from "@/utils/dataFetcher/getPageData";
import { oswald } from "@/utils/fonts/fonts";
import { PortableText, SanityDocument } from "next-sanity";
import Image from "next/image";
import SquareCard from "@/components/navigation/card/squareCard/squareCard";
import JsonLd from "@/components/dataDisplay/jsonld/jsonld";
import PageComponents from "@/components/dataDisplay/portableText/portableText";
import { client } from "@/sanity/client";
import { ALL_PRODUCT_PAGES_QUERY } from "@/sanity/queries/queries";
import getPageDescendants from "@/utils/getPageDecendants";
import ProductCard from "@/components/navigation/card/productCard/productCard";

interface ICategory extends IBaseDocument {
  popular: ICard[];
}

const getNestedPages = async (pageId: string) => {
  const posts = await client.fetch<SanityDocument[]>(ALL_PRODUCT_PAGES_QUERY);
  // Get nested products
  const nestedPages = getPageDescendants(posts, pageId, "product");
  return nestedPages;
};

export default async function ProductCategoryType({
  pageId,
  title,
  shortTitle,
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
  popular,
  graph,
}: ICategory) {
  const productsWithinCategory = await getNestedPages(pageId as string);
  return (
    <div>
      <JsonLd graph={graph} />
      <h1 className={`text-4xl font-bold ${oswald.className}`}>{title}</h1>
      <p className="my-4 md:my-8">{description}</p>
      <div
        className={`flex justify-between relative items-end ${!imgUrl ? "border-b border-djungleBlack-100/50 pb-6 mb-6" : ""}`}
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
      {popular?.length > 0 ? (
        <div className="bg-djungleOrange-200 mx-break-out mt-12">
          <div className="container py-12">
            <h2 className={`${oswald.className} font-bold text-3xl`}>
              Populärt inom {shortTitle || title}
            </h2>
            <section className="grid grid-cols-2 lg:grid-cols-5 py-4 gap-4">
              {Promise.all(
                popular?.map(async (p, i) => {
                  const pData = await getPostDataById(p?._id || "");
                  return pData?.path ? (
                    <SquareCard
                      key={i}
                      title={p.shortTitle || p.title}
                      image={p.image}
                      slug={pData.path}
                      description={p.description}
                      design="circular"
                    />
                  ) : null;
                })
              )}
            </section>
          </div>
        </div>
      ) : null}
      {productsWithinCategory?.length > 0 ? (
        <div className="my-12">
          <h2 className={`text-2xl font-bold ${oswald.className}`}>
            Produkter inom {title}
            <div className="grid grid-cols-2 md:grid-cols-4 pt-4 gap-4">
              {productsWithinCategory?.map(async (p, i) => {
                const pData = await getPostDataById(p?._id || "");
                return pData?.path ? (
                  <ProductCard
                    key={i}
                    title={p.title}
                    image={p.image}
                    slug={pData.path}
                    price={p.price}
                    rating={p.rating}
                    brand={p.brand}
                    design="circular"
                  />
                ) : null;
              })}
            </div>
          </h2>
          <div className="h-1 bg-djungleBlack rounded-full mt-28 mb-24 relative">
            <span className="bg-djungleBeige absolute mx-auto left-0 right-0 bottom-[-10px] text-center w-24">
              Läs mer
            </span>
          </div>
        </div>
      ) : null}
      <article className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <section className="md:col-span-5">
          {imgUrl && (
            <Image
              src={imgUrl}
              alt={title}
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="aspect-video rounded-xl col-span-2 w-full"
              width="550"
              height="310"
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
        <DesktopToc headings={tocHeadings} styles="!mt-0" />
      </article>
    </div>
  );
}