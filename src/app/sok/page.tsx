import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import FeedItem from "@/components/navigation/feedItem/feedItem";
import { getPostDataById } from "@/utils/dataFetcher/getPageData";
import { SEARCH_QUERY } from "@/sanity/queries/queries";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryString = searchParams.q;
  const posts =
    (queryString &&
      (await client.fetch<SanityDocument[]>(SEARCH_QUERY, {
        queryString,
      }))) ||
    [];

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
          posts?.map(async (post, i: number) => {
            const t = await getPostDataById(post._id);
            return (
              t?.path && (
                <FeedItem
                  key={i}
                  title={post.title}
                  image={post.image}
                  description={post.description}
                  slug={t.path}
                  category={post.parent}
                  modifiedAt={post.modifiedAt}
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