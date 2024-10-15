import {
  PortableText,
  PortableTextComponents,
  type SanityDocument,
} from "next-sanity";
import { client } from "@/sanity/client";
import Link from "next/link";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import { getPostDataByPath } from "@/utils/dataFetcher/getPageData";
import Author from "@/components/navigation/author/author";
import { IAuthor } from "@/types/types";
import Image from "next/image";
import DesktopToc from "@/components/navigation/toc/desktopToc";
import MobileToc from "@/components/navigation/toc/mobileToc";
import { PawPrint } from "lucide-react";
import ShareBar from "@/components/navigation/shareBar/shareBar";
import { notFound } from "next/navigation";
import { PageMetadata } from "@q42/sanity-plugin-page-tree/next";
import Breadcrumbs from "@/components/navigation/breadcrumbs/breadcrumbs";
import { ResolvingMetadata, Metadata } from "next";
import { Props } from "next/script";

const POST_QUERY = `*[_id == $id][0]{
     "breadcrumb": {
      "items": [
        select(defined(parent->parent->parent->parent->) => {
          "_type": parent->parent->_type,
          "title": parent->parent->title,
          "slug": parent->parent->slug.current
        }),
        select(defined(parent->parent->parent->) => {
          "_type": parent->parent->_type,
          "title": parent->parent->title,
          "slug": parent->parent->slug.current
        }),
        select(defined(parent->parent->) => {
          "_type": parent->parent->_type,
          "title": parent->parent->title,
          "slug": parent->parent->slug.current
        }),
        select(defined(parent) => {
          "_type": parent->_type,
          "title": parent->title,
          "slug": parent->slug.current
        }),
        {
          _type,
          title,
          "slug": slug.current
        },
      ],
    },
    title, image, body[]{
    ...,
    markDefs[]{ 
        ..., 
        _type == "internalLink" => { "href": "/"+ @.reference-> slug.current },
        },
  },description, metaTitle, metaDescription, parent->, _updatedAt, authors[]->, "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200 ), "headings": body[length(style) == 2 && string::startsWith(style, "h2")]}`;
// Reading time estimate: https://www.sanity.io/schemas/word-count-and-reading-time-estimation-for-groq-and-portable-text-7470eab7

const options = { next: { revalidate: 30 } };

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const path = params.slug ? "/" + params.slug?.join("/") : "/";
  const pageMeta = await getPostDataByPath(path);
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { id: pageMeta?._id },
    options
  );
  const pagePath = `${process.env.BASE_URL}${pageMeta?.path}`;
  const src = sanityImageBuilder(post.image, 1200, 630);
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
    applicationName: "Djur djungeln",
    authors: post.authors?.map((a: IAuthor) => a.fullName),
    creator: post.authors?.map((a: IAuthor) => a.fullName),
    publisher: "Djur djungeln",
    robots: "index, follow",
    alternates: { canonical: pagePath },
    openGraph: {
      url: pagePath,
      images: [{ url: src as string, width: 1200, height: 630 }],
      locale: "sv_SE",
      type: "article",
      siteName: "Djur djungeln",
      emails: ["kontakt@djurdjungeln.se"],
      countryName: "Sweden",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string[] };
}) {
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
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { id: pageMetadata._id },
    options
  );
  const components: PortableTextComponents = {
    // https://kittygiraudel.com/2022/05/19/table-of-contents-with-sanity-portable-text/
    listItem: {
      // Define the LI element
      bullet: ({ children }: any) => (
        <li className="flex items-center gap-2">
          <PawPrint size={14} />
          {children}
        </li>
      ),
    },
    block: {
      blockquote: ({ children }) => (
        <figure>
          <blockquote className="my-20 relative text-xl rounded-xl shadow-xl bg-white py-16 pb-12 md:py-24 px-8 md:px-14 font-serif italic">
            <div className="bg-djungleGreen-100 flex items-center justify-center absolute md:left-12 -top-8 md:-top-12 h-16 w-16 md:h-24 md:w-24 rounded-full">
              <Image
                src={"/assets/icons/quote.svg"}
                alt={""}
                width={40}
                height={40}
                className="w-[25px] md:w-[40px]"
              />
            </div>
            {children}
          </blockquote>
        </figure>
      ),
      h2: ({ children }) => (
        <h2 id={children?.toString().toLowerCase().replace(/\s/g, "-")}>
          {children}
        </h2>
      ),
    },
    types: {
      image: ({ value }) => {
        const image = value.asset;
        const src = sanityImageBuilder(image);
        return src ? (
          <figure className="mb-4">
            <Image
              src={src}
              alt={value.alt}
              className=" rounded-md"
              width={767}
              height={433}
            />
            {value.caption && (
              <figcaption className="text-sm italic mt-1 text-djungleBlack/80">
                {value.caption}
              </figcaption>
            )}
          </figure>
        ) : null;
      },
      table: ({ value }) => {
        return (
          <table className="w-full mb-4">
            <tbody>
              {value.rows.map((row: { cells: string[] }, i: number) => {
                return (
                  <tr key={i} className={" odd:bg-djungleGreen-50"}>
                    {row.cells.map((cell, j: number) => {
                      return i === 0 ? (
                        <th className="p-2" key={j}>
                          {cell}
                        </th>
                      ) : (
                        <td className="p-2" key={j}>
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      },
    },
    marks: {
      externalLink: ({ value, children }) => {
        return (
          <a
            href={value.href}
            target={value.openInNewTab ? "_blank" : "_self"}
            rel={
              value.sponsored
                ? "sponsored noopener noreferrer nofollow"
                : "noopener noreferrer nofollow"
            }
          >
            {children}
          </a>
        );
      },
      internalLink: ({ value, children }) => (
        <Link href={value.href}>{children}</Link>
      ),
    },
  };

  const postImageUrl = sanityImageBuilder(post.image);

  return (
    <>
      <Breadcrumbs
        items={post.breadcrumb.items.filter((i: any) => i !== null)}
      />
      <article className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <section className="md:col-span-5">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <p className="my-8">{post.description}</p>
          <div
            className={`flex justify-between items-end ${!postImageUrl ? "border-b border-djungleBlack-100/50 pb-6 mb-6" : ""}`}
          >
            {post.authors?.map((a: IAuthor, i: number) => {
              return (
                <Author
                  key={i}
                  slug={`/${a?.slug?.current}`}
                  name={a.fullName}
                  headshot={a.headshot}
                  {...(post?.parent?.slug?.current
                    ? {
                        categorySlug: post?.parent?.slug?.current,
                      }
                    : { categorySlug: undefined })}
                  categoryTitle={post?.parent?.title}
                  readTime={`${post.estimatedReadingTime} min lästid`}
                  date={post._updatedAt}
                  size="medium"
                />
              );
            })}
            <ShareBar title={post.title} />
          </div>
          {postImageUrl && (
            <img
              src={postImageUrl}
              alt={post.title}
              className="aspect-video rounded-xl w-full my-4"
              width="550"
              height="310"
            />
          )}
          {post?.headings?.length > 0 && <MobileToc post={post} />}
          <div id="content" className="prose">
            {Array.isArray(post.body) && (
              <PortableText value={post.body} components={components} />
            )}
          </div>
        </section>
        {post?.headings?.length > 0 && <DesktopToc post={post} />}
      </article>
    </>
  );
}
