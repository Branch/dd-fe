/** @format */

import { client } from "@/sanity/client";
import { ALL_PRODUCT_PAGES_QUERY } from "@/sanity/queries/queries";
import { SanityDocument } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await client.fetch<SanityDocument[]>(
    ALL_PRODUCT_PAGES_QUERY,
    {},
    { cache: "no-store" }
  );
  const headers = new Headers({
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control":
      "public, max-age=3600, stale-while-revalidate=604800",
    "Netlify-Cache-ID": `allProductPages`,
    "Cache-Tag": `allProductPages`,
  });
  return new NextResponse(JSON.stringify(posts), { headers });
}
