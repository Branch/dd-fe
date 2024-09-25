import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Image from "next/image";
import BaseLink from "@/components/navigation/link/base/baseLink";
import FeedItem from "@/components/navigation/feedItem/feedItem";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(modifiedAt desc)[0...10]{_id, title, slug, modifiedAt, image, category->, authors[]->}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  return (
    <main className="min-h-screen  container mt-12">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-6xl font-bold">Allt för dig och dina djur.</h1>
          <p>
            Djur djungeln är din bästa resurs för allt kring husdjur. Vi
            erbjuder expertrecensioner om foder, leksaker och tillbehör. Vi
            strävar efter att hjälpa djurägare att göra välgrundade val och
            säkerställa det bästa för deras pälsiga följeslagare.
          </p>
          <BaseLink text={"Se kampanjer"} url={"/kampanjer"} />
        </div>
        <div className="flex relative">
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
      <section className="grid grid-flow-col gap-12 my-48 relative">
        <h2 className="text-4xl font-bold sticky top-4 self-start">
          Senaste nytt
        </h2>
        <div>
          {posts.map((post) => {
            return (
              <FeedItem
                title={post.title}
                image={post.image}
                description={""}
                slug={post.slug.current}
                category={post.category}
                modifiedAt={post.modifiedAt}
                authors={post.authors}
              />
            );
          })}
          {posts.map((post) => {
            return (
              <FeedItem
                title={post.title}
                image={post.image}
                description={""}
                slug={post.slug.current}
                category={post.category}
                modifiedAt={post.modifiedAt}
                authors={post.authors}
              />
            );
          })}
          {posts.map((post) => {
            return (
              <FeedItem
                title={post.title}
                image={post.image}
                description={""}
                slug={post.slug.current}
                category={post.category}
                modifiedAt={post.modifiedAt}
                authors={post.authors}
              />
            );
          })}
          {posts.map((post) => {
            return (
              <FeedItem
                title={post.title}
                image={post.image}
                description={""}
                slug={post.slug.current}
                category={post.category}
                modifiedAt={post.modifiedAt}
                authors={post.authors}
              />
            );
          })}
          {posts.map((post) => {
            return (
              <FeedItem
                title={post.title}
                image={post.image}
                description={""}
                slug={post.slug.current}
                category={post.category}
                modifiedAt={post.modifiedAt}
                authors={post.authors}
              />
            );
          })}
          {posts.map((post) => {
            return (
              <FeedItem
                title={post.title}
                image={post.image}
                description={""}
                slug={post.slug.current}
                category={post.category}
                modifiedAt={post.modifiedAt}
                authors={post.authors}
              />
            );
          })}
          {posts.map((post) => {
            return (
              <FeedItem
                title={post.title}
                image={post.image}
                description={""}
                slug={post.slug.current}
                category={post.category}
                modifiedAt={post.modifiedAt}
                authors={post.authors}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
