/** @format */

import { type SanityDocument } from "next-sanity";
import FeedItem from "@/components/navigation/feedItem/feedItem";
import { Metadata } from "next";
import { tryCatchFetch } from "@/utils/tryCatchFetch";
export const metadata: Metadata = {
  title: "Djurdjungeln | Sök",
  metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
  description: "Djurdjungeln - Sök bland innehållet på hemsidan här.",
  applicationName: process.env.SITENAME,
  publisher: process.env.SITENAME,
  robots:
    !process.env?.NO_INDEX || process.env?.NO_INDEX === "true"
      ? "noindex, nofollow"
      : "index, follow",
  alternates: { canonical: "https://djurdjungeln.se/sok" },
  openGraph: {
    url: "https://djurdjungeln.se/sok",
    images: [{ url: "/assets/images/share.webp", width: 1200, height: 630 }],
    locale: "sv_SE",
    type: "article",
    siteName: process.env.SITENAME,
    emails: ["kontakt@djurdjungeln.se"],
    countryName: "Sweden",
  },
};
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryString = searchParams.q;
  const res = await tryCatchFetch(
    `${process.env.BASE_URL}/api/search/${queryString}`
  );
  const posts = await res?.json();

  const resultText = !queryString
    ? "Ange en sökterm och försök igen."
    : posts.length > 0
      ? `Resultat för`
      : `Inga resultat för`;

  return (
    <section className="container min-h-screen">
      <h1 className="text-5xl font-bold py-12">
        <span className="text-djungleBlack-100/70">{resultText}</span>{" "}
        {queryString && queryString}
      </h1>
      <div>
        {await Promise.all(
          posts?.map(async (post: SanityDocument, i: number) => {
            const data = await tryCatchFetch(
              `${process.env.BASE_URL}/api/page/metaData/id/${post._id}`
            );
            const t = await data?.json();
            const d = await tryCatchFetch(
              `${process.env.BASE_URL}/api/page/metaData/id/${post.parent._id}`
            );
            const parent = await d?.json();
            return (
              t?.path && (
                <FeedItem
                  key={i}
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
                  _updatedAt={post._updatedAt}
                  authors={post.authors}
                />
              )
            );
          })
        )}
      </div>
    </section>
  );
}
