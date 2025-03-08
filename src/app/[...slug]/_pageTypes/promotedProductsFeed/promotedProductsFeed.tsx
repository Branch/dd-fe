/** @format */
import Author from "@/components/navigation/author/author";
import ShareBar from "@/components/navigation/shareBar/shareBar";
import { IAuthor, IBaseDocument, ICard } from "@/types/types";
import { oswald } from "@/utils/fonts/fonts";
import { SanityDocument } from "next-sanity";
import SquareCard from "@/components/navigation/card/squareCard/squareCard";
import JsonLd from "@/components/dataDisplay/jsonld/jsonld";
import ProductCard from "@/components/navigation/card/productCard/productCard";
import { tryCatchFetch } from "@/utils/tryCatchFetch";

interface ICategory extends IBaseDocument {
  popular: ICard[];
}

export default async function PromotedProductsFeed({
  title,
  description,
  imgUrl,
  authors,
  categoryPath,
  parentTitle,
  updatedAt,
  popular,
  graph,
}: ICategory) {
  const pData = await tryCatchFetch(
    `${process.env.BASE_URL}/api/pages/products/promoted/all`
  );
  const products = await pData?.json();
  return (
    <div>
      <JsonLd graph={graph} />
      <h1 className={`text-4xl font-bold ${oswald.className}`}>{title}</h1>
      <p className="my-4 md:my-8">{description}</p>
      <div
        className={`flex justify-between relative items-end ${!imgUrl ? "border-b border-djungleBlack-100/50 pb-6 mb-6" : ""}`}
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
              readTime={`1 min lästid`}
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
              Kategorier
            </h2>
            <section className="grid grid-cols-2 lg:grid-cols-5 py-4 gap-4">
              {Promise.all(
                popular?.map(async (p, i) => {
                  const data = await tryCatchFetch(
                    `${process.env.BASE_URL}/api/page/metaData/id/${p._id}`
                  );
                  const pData = await data?.json();
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
      {products?.length > 0 ? (
        <div className="mt-2">
          <div className="grid grid-cols-2 md:grid-cols-4 pt-4 gap-4">
            {products?.map(async (p: SanityDocument, i: number) => {
              const data = await tryCatchFetch(
                `${process.env.BASE_URL}/api/page/metaData/id/${p._id}`
              );
              const pData = await data?.json();
              return pData?.path ? (
                <ProductCard
                  key={i}
                  title={p.title}
                  image={p.image}
                  slug={pData.path}
                  price={p.price}
                  discountPrice={p.discountedPrice}
                  rating={p.rating}
                  brand={p.brand}
                  design="circular"
                />
              ) : null;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
