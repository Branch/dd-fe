import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import {
  getPostDataById,
  getPostDataByPath,
} from "@/utils/dataFetcher/getPageData";

import { IAuthor } from "@/types/types";
import { notFound } from "next/navigation";
import { PageMetadata } from "@q42/sanity-plugin-page-tree/next";
import Breadcrumbs from "@/components/navigation/breadcrumbs/breadcrumbs";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { CAT_QUERY, POST_QUERY, AUTHOR_QUERY } from "@/sanity/queries/queries";
import { aboutGraph, authorGraph, baseGraph } from "@/utils/jsonld/jsonld";
const PostType = dynamic(() => import("@/app/[...slug]/_pageTypes/post/post"));
import { faqHeading } from "@/constants/constants";
import CategoryType from "@/app/[...slug]/_pageTypes/category/category";
import AuthorType from "@/app/[...slug]/_pageTypes/author/author";
const options = { next: { revalidate: 30 } };

const getQueryByType = (type: string) => {
  return type === "post"
    ? POST_QUERY
    : type === "category"
      ? CAT_QUERY
      : type === "author"
        ? AUTHOR_QUERY
        : POST_QUERY;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const path = params.slug ? "/" + params.slug?.join("/") : "/";
  const pageMeta = await getPostDataByPath(path);
  if (!pageMeta) {
    return notFound();
  }
  const query = getQueryByType(pageMeta.type);
  const page = await client.fetch<SanityDocument>(
    query,
    { id: pageMeta?._id },
    options
  );
  const pagePath = `${process.env.BASE_URL}${pageMeta?.path}`;
  const src = sanityImageBuilder(page.image, 1200, 630);
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.description,
    applicationName: process.env.SITE_NAME,
    authors: page.authors?.map((a: IAuthor) => a.fullName),
    creator: page.authors?.map((a: IAuthor) => a.fullName),
    publisher: process.env.SITE_NAME,
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
      siteName: process.env.SITE_NAME,
      emails: ["kontakt@djurdjungeln.se"],
      countryName: "Sweden",
    },
  };
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const path = params.slug ? "/" + params.slug?.join("/") : "/";
  const pageMeta = await getPostDataByPath(path);
  if (!pageMeta) {
    return notFound();
  }
  return <PageHandler pageMetadata={pageMeta} />;
}

interface IPageHandler {
  pageMetadata: PageMetadata;
}

export async function PageHandler({ pageMetadata }: IPageHandler) {
  const query = getQueryByType(pageMetadata.type);
  const page = await client.fetch<SanityDocument>(
    query,
    { id: pageMetadata._id },
    options
  );

  // Add FAQ heading to TOC
  if (page.faq) {
    page.headings = page.headings
      ? [...page.headings, { children: [{ text: faqHeading }] }]
      : [];
  }

  const postImageUrl = page?.image ? sanityImageBuilder(page.image) : "";
  const currPath = `${process.env.BASE_URL}${pageMetadata.path}`;
  const breadcrumbs = await Promise.all(
    page.breadcrumb.items
      .filter((i: any) => i !== null)
      .map(async (b: any) => {
        const bData = await getPostDataById(b._id);
        return {
          ...b,
          fullPath: `${process.env.BASE_URL}${bData?.path}` || "",
        };
      })
  );

  const authorsMeta = await Promise.all(
    page?.authors?.map(async (a: IAuthor) => {
      const authData = await getPostDataById(a._id);
      return {
        name: a.fullName,
        url: `${process.env.BASE_URL}${authData?.path}` || "/",
        worksFor: `${process.env.BASE_URL}/#organization`,
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
    postImageUrl,
    page?.parent?.title,
    breadcrumbs
  );
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      {page.pageType === "post" ? (
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
      ) : page.pageType === "category" ? (
        <CategoryType
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
          popular={page.popular}
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
            page.metaTitle || page.title,
            authorsMeta,
            postImageUrl,
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
            postImageUrl,
            page?.parent?.title,
            breadcrumbs
          )}
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