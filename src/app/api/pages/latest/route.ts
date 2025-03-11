/** @format */

import { client } from "@/sanity/client";
import { POSTS_CATS_QUERY } from "@/sanity/queries/queries";
import { SanityDocument } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await client.fetch<SanityDocument[]>(
    POSTS_CATS_QUERY,
    {},
    { next: { revalidate: 3600 } }
  );

  const headers = new Headers({
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control":
      "public, max-age=3600, stale-while-revalidate=604800",
    "Netlify-Cache-ID": `latestPages`,
    "Cache-Tag": `latestPages`,
  });

  return new NextResponse(JSON.stringify(posts), { headers });
}
