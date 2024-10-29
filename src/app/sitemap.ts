import { client } from "@/sanity/client";
import { MetadataRoute } from "next";
import { SanityDocument } from "next-sanity";
import { getPostDataById } from "@/utils/dataFetcher/getPageData";

const PAGES_QUERY = `*[defined(slug.current)
]|order(modifiedAt desc){_id,modifiedAt}`;
const options = { next: { revalidate: 30 } };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await client.fetch<SanityDocument[]>(PAGES_QUERY, {}, options);

  const result = await Promise.all(
    pages.map(async (p) => {
      const pData = await getPostDataById(p._id);
      return {
        url: `${process.env.BASE_URL}${pData?.path}` || "/",
        lastModified: new Date(p.modifiedAt),
        changeFrequency: "daily" as const, // eslint-disable-line
        priority: 1,
      };
    })
  );

  // Static pages not created in the CMS TODO:FIx
  const staticPages = [
    {
      url: process.env.BASE_URL as string,
      lastModified: new Date(),
      changeFrequency: "daily" as "daily", // eslint-disable-line
      priority: 1,
    },
    {
      url: `${process.env.BASE_URL}/sok`,
      lastModified: new Date(),
      changeFrequency: "daily" as "daily", // eslint-disable-line
      priority: 1,
    },
  ];

  return [...staticPages, ...result];
}
