/** @format */

import sanityImageBuilder from "@/utils/sanityImageBuilder";

import { IAuthor } from "@/types/types";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/navigation/breadcrumbs/breadcrumbs";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  aboutGraph,
  authorGraph,
  baseGraph,
  insuranceProductGraph,
  productGraph,
} from "@/utils/jsonld/jsonld";
const PostType = dynamic(() => import("@/app/[...slug]/_pageTypes/post/post"));
import { faqHeading } from "@/constants/constants";
import CategoryType from "@/app/[...slug]/_pageTypes/category/category";
import AuthorType from "@/app/[...slug]/_pageTypes/author/author";
import ProductCategoryType from "@/app/[...slug]/_pageTypes/productCategory/productCategory";
import DogYearCalculatorType from "@/app/[...slug]/_pageTypes/tools/dogYearCalculator/dogYearCalculator";
import ProductType from "@/app/[...slug]/_pageTypes/product/product";
import PromotedProductsFeed from "@/app/[...slug]/_pageTypes/promotedProductsFeed/promotedProductsFeed";
import InsuranceProduct from "@/app/[...slug]/_pageTypes/insurance/productPage/insuranceProduct";
import InsuranceCompany from "@/app/[...slug]/_pageTypes/insurance/companyPage/insuranceCompany";
import { tryCatchFetch } from "@/utils/tryCatchFetch";
import BaseToaster from "@/components/toasters/base/baseToaster";
import DiscountPage from "@/app/[...slug]/_pageTypes/discountPage/discountPage";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const pageMeta = await tryCatchFetch(
    `${process.env.BASE_URL}/api/page/metaData/path/${params.slug}`
  );
  if (!pageMeta) {
    return notFound();
  }
  const pageMetaData = await pageMeta?.json();
  const p = await tryCatchFetch(
    `${process.env.BASE_URL}/api/page/id/${pageMetaData?._id}/${pageMetaData?._type}`
  );
  if (!p) {
    return notFound();
  }
  const page = await p.json();
  const pagePath = `${process.env.BASE_URL}${pageMetaData?.path}`;
  const src = sanityImageBuilder(page.image, 1200, 630);
  return {
    metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.description,
    applicationName: process.env.SITENAME,
    authors: page.authors?.map((a: IAuthor) => a.fullName),
    creator: page.authors?.map((a: IAuthor) => a.fullName),
    publisher: process.env.SITENAME,
    robots:
      !process.env?.NO_INDEX || process.env?.NO_INDEX === "true"
        ? "noindex, nofollow"
        : "index, follow",
    alternates: { canonical: pagePath },
    openGraph: {
      url: pagePath,
      images: [{ url: src as string, width: 1200, height: 630 }],
      locale: "sv_SE",
      type: "article",
      siteName: process.env.SITENAME,
      emails: ["kontakt@djurdjungeln.se"],
      countryName: "Sweden",
    },
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const pageMeta = await tryCatchFetch(
    `${process.env.BASE_URL}/api/page/metaData/path/${params.slug}`
  );
  if (!pageMeta) {
    return notFound();
  }
  const pageMetaData = await pageMeta.json();
  return <PageHandler pageMetadata={pageMetaData} />;
}
export async function generateStaticParams() {
  return [];
}
interface IPageHandler {
  pageMetadata: {
    _id: string;
    _type: string;
    path?: string;
  };
}
export const revalidate = 3600;

async function PageHandler({ pageMetadata }: IPageHandler) {
  const p = await tryCatchFetch(
    `${process.env.BASE_URL}/api/page/id/${pageMetadata?._id}/${pageMetadata?._type}`
  );

  const page = await p?.json();
  // Add FAQ heading to TOC
  if (page.faq) {
    page.headings = page.headings
      ? [...page.headings, { children: [{ text: faqHeading }] }]
      : [];
  }
  // Add product "Buy now" heading to TOC
  if (page.buyHeadline) {
    page.headings = page.headings
      ? [{ children: [{ text: "Köp nu" }] }, ...page.headings]
      : [];
  }
  const jsonLdImageFormats = [
    {
      w: 320,
      h: 180,
    },
    {
      w: 280,
      h: 210,
    },
    {
      w: 225,
      h: 225,
    },
  ];
  // Set article metadata images for serp
  const jsonLdImages = jsonLdImageFormats.map((f) => {
    return {
      url:
        sanityImageBuilder(page.image, f.w, f.h) ||
        `${process.env.BASE_URL}/assets/images/share.webp`,
      width: f.w,
      height: f.h,
    };
  });
  const postImageUrl = page?.image ? sanityImageBuilder(page.image) : "";
  const currPath = `${process.env.BASE_URL}${pageMetadata.path}`;
  const breadcrumbs = await Promise.all(
    page.breadcrumb.items
      .filter((i: any) => i !== null)
      .map(async (b: any) => {
        const bcData = await tryCatchFetch(
          `${process.env.BASE_URL}/api/page/metaData/id/${b._id}`
        );
        const bData = await bcData?.json();
        return {
          ...b,
          fullPath: `${process.env.BASE_URL}${bData?.path}` || "",
        };
      })
  );

  const authorsMeta = await Promise.all(
    page?.authors?.map(async (a: IAuthor) => {
      const aData = await tryCatchFetch(
        `${process.env.BASE_URL}/api/page/metaData/id/${a._id}`
      );
      const authData = await aData?.json();
      return {
        name: a.fullName,
        url: `${process.env.BASE_URL}${authData?.path}` || "/",
        worksFor: `${process.env.BASE_URL}#organization`,
      };
    })
  );

  // Define graph for base pages
  const graph = baseGraph(
    currPath,
    page._createdAt,
    page._updatedAt,
    page.metaTitle || page.title,
    page.metaDescription || page.description,
    page.faq,
    authorsMeta,
    jsonLdImages,
    page?.parent?.title,
    breadcrumbs
  );
  let internalToasterPath = undefined;
  if (page?.toaster?.internalUrl) {
    const data = await tryCatchFetch(
      `${process.env.BASE_URL}/api/page/metaData/id/${page.toaster.internalUrl}`
    );
    const internalData = await data?.json();
    internalToasterPath = internalData.path;
  }

  return (
    <>
      {page?.toaster?.internalUrl || page?.toaster?.externalUrl ? (
        <BaseToaster
          title={page?.toaster?.title}
          buttonText={page?.toaster?.buttonText}
          description={page?.toaster?.description}
          internalUrl={internalToasterPath}
          externalUrl={page?.toaster?.externalUrl}
        />
      ) : null}
      <Breadcrumbs items={breadcrumbs} />
      {page.pageType === "post" ? (
        <PostType
          title={page.title}
          shortTitle={page.shortTitle}
          description={page.description}
          authors={page.authors}
          parentTitle={page?.parent?.slug?.current}
          readingTime={page.estimatedReadingTime}
          updatedAt={page._updatedAt}
          tocHeadings={page.headings}
          body={page.body}
          faq={page.faq}
          imgUrl={postImageUrl}
          graph={graph}
        />
      ) : page.pageType === "discountPage" ? (
        <DiscountPage
          title={page.title}
          shortTitle={page.shortTitle}
          description={page.description}
          authors={page.authors}
          parentTitle={page?.parent?.slug?.current}
          readingTime={page.estimatedReadingTime}
          updatedAt={page._updatedAt}
          tocHeadings={page.headings}
          body={page.body}
          faq={page.faq}
          imgUrl={postImageUrl}
          graph={graph}
          table={page?.discountTable}
        />
      ) : page.pageType === "category" ? (
        <CategoryType
          title={page.title}
          shortTitle={page.shortTitle}
          description={page.description}
          authors={page.authors}
          parentTitle={page?.parent?.slug?.current}
          readingTime={page.estimatedReadingTime}
          updatedAt={page._updatedAt}
          tocHeadings={page.headings}
          body={page.body}
          faq={page.faq}
          imgUrl={postImageUrl}
          popular={page.popular}
          graph={graph}
        />
      ) : page.pageType === "productCategory" ? (
        <ProductCategoryType
          pageId={pageMetadata._id}
          title={page.title}
          description={page.description}
          authors={page.authors}
          parentTitle={page?.parent?.slug?.current}
          readingTime={page.estimatedReadingTime}
          updatedAt={page._updatedAt}
          tocHeadings={page.headings}
          body={page.body}
          faq={page.faq}
          imgUrl={postImageUrl}
          popular={page.popularProducts}
          graph={graph}
        />
      ) : page.pageType === "promotedProducts" ? (
        <PromotedProductsFeed
          pageId={pageMetadata._id}
          title={page.title}
          description={page.description}
          authors={page.authors}
          parentTitle={page?.parent?.slug?.current}
          readingTime={page.estimatedReadingTime}
          updatedAt={page._updatedAt}
          tocHeadings={page.headings}
          body={page.body}
          faq={page.faq}
          imgUrl={postImageUrl}
          popular={page.popularProducts}
          graph={graph}
        />
      ) : page.pageType === "author" ? (
        <AuthorType
          title={page.title}
          description={page.description}
          authors={page.authors}
          parentTitle={page?.parent?.slug?.current}
          readingTime={page.estimatedReadingTime}
          updatedAt={page._updatedAt}
          tocHeadings={page.headings}
          body={page.body}
          faq={page.faq}
          imgUrl={postImageUrl}
          authorPages={page.posts}
          graph={authorGraph(
            currPath,
            page.title,
            authorsMeta,
            jsonLdImages,
            breadcrumbs
          )}
        />
      ) : page.pageType === "about" ? (
        <PostType
          title={page.title}
          description={page.description}
          authors={page.authors}
          parentTitle={page?.parent?.slug?.current}
          readingTime={page.estimatedReadingTime}
          updatedAt={page._updatedAt}
          tocHeadings={page.headings}
          body={page.body}
          faq={page.faq}
          imgUrl={postImageUrl}
          graph={aboutGraph(
            currPath,
            page._createdAt,
            page._updatedAt,
            page.metaTitle || page.title,
            page.metaDescription || page.description,
            page.faq,
            authorsMeta,
            jsonLdImages,
            page?.parent?.title,
            breadcrumbs
          )}
        />
      ) : page.pageType === "dogYearCalculator" ? (
        <DogYearCalculatorType
          title={page.title}
          description={page.description}
          authors={page.authors}
          parentTitle={page?.parent?.slug?.current}
          readingTime={page.estimatedReadingTime}
          updatedAt={page._updatedAt}
          tocHeadings={page.headings}
          body={page.body}
          faq={page.faq}
          imgUrl={postImageUrl}
          graph={graph}
        />
      ) : page.pageType === "insuranceCompanyProductPage" ? (
        <InsuranceProduct
          title={page.title}
          description={page.description}
          authors={page.authors}
          parentTitle={page?.parent?.slug?.current}
          readingTime={page.estimatedReadingTime}
          updatedAt={page._updatedAt}
          tocHeadings={page.headings}
          body={page.body}
          faq={page.faq}
          imgUrl={postImageUrl}
          petType={page.petType}
          cta={page.cta}
          prosCons={page.prosCons}
          productOffering={page.productOffering}
          productRating={page.productRating}
          ratingMotivation={page.productRatingMotivation}
          ratingParameters={page.ratingParameters}
          companyLogo={page?.companyLogo}
          graph={insuranceProductGraph(
            currPath,
            page._createdAt,
            page._updatedAt,
            page.metaTitle || page.title,
            page.metaDescription || page.description,
            page.faq,
            page.prosCons.pros,
            page.prosCons.cons,
            jsonLdImages,
            page.body,
            page.productRating,
            authorsMeta,
            breadcrumbs
          )}
        />
      ) : page.pageType === "insuranceCompanyPage" ? (
        <InsuranceCompany
          title={page.title}
          description={page.description}
          authors={page.authors}
          parentTitle={page?.parent?.slug?.current}
          readingTime={page.estimatedReadingTime}
          updatedAt={page._updatedAt}
          tocHeadings={page.headings}
          body={page.body}
          faq={page.faq}
          imgUrl={postImageUrl}
          prosCons={page.prosCons}
          companyRating={page.companyRating}
          ratingMotivation={page.ratingMotivation}
          ratingParameters={page.ratingParameters}
          companyLogo={page?.companyLogo}
          companyCircleLogo={page?.companyCircleLogo}
          graph={insuranceProductGraph(
            currPath,
            page._createdAt,
            page._updatedAt,
            page.metaTitle || page.title,
            page.metaDescription || page.description,
            page.faq,
            page.prosCons.pros,
            page.prosCons.cons,
            jsonLdImages,
            page.body,
            page.productRating,
            authorsMeta,
            breadcrumbs
          )}
          companyAbout={page.companyAbout}
          contactInfo={page.contactInfo}
          companyProducts={page.companyProducts}
        />
      ) : page.pageType === "product" ? (
        <ProductType
          title={page.title}
          brand={page.brand}
          discountText={page.discountText}
          description={page.description}
          authors={page.authors}
          parentTitle={page?.parent?.slug?.current}
          readingTime={page.estimatedReadingTime}
          updatedAt={page._updatedAt}
          tocHeadings={page.headings}
          body={page.body}
          faq={page.faq}
          imgUrl={postImageUrl}
          graph={productGraph(
            currPath,
            page._createdAt,
            page._updatedAt,
            page.title,
            page.metaTitle || page.title,
            page.metaDescription || page.description,
            page.faq,
            authorsMeta,
            jsonLdImages,
            page.brand,
            page?.parent?.title,
            page.price,
            Boolean(page.inStock),
            page.rating,
            breadcrumbs
          )}
          ctaUrl={page.ctaUrl}
          ctaButtonText={page.ctaButtonText}
          price={page.price}
          discountPrice={page?.discountedPrice}
          discountCode={page?.discountCode}
          productImages={page.productImages}
        />
      ) : (
        <PostType
          title={page.title}
          description={page.description}
          authors={page.authors}
          parentTitle={page?.parent?.slug?.current}
          readingTime={page.estimatedReadingTime}
          updatedAt={page._updatedAt}
          tocHeadings={page.headings}
          body={page.body}
          faq={page.faq}
          imgUrl={postImageUrl}
          graph={graph}
        />
      )}
    </>
  );
}
