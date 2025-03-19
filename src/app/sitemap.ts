/** @format */

import { tryCatchFetch } from "@/utils/tryCatchFetch";
import { MetadataRoute } from "next";
import { SanityDocument } from "next-sanity";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPages = await tryCatchFetch(`${process.env.BASE_URL}/api/pages/all`);
  if (!allPages) {
    return [];
  }
  const pages = await allPages?.json();
  const result = await Promise.all(
    pages.map(async (p: SanityDocument) => {
      const data = await tryCatchFetch(
        `${process.env.BASE_URL}/api/page/metaData/id/${p._id}`
      );
      const pData = await data?.json();
      return {
        url: `${process.env.BASE_URL}${pData?.path}` || "/",
        lastModified: new Date(p._updatedAt),
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
