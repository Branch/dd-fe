/** @format */

import { client } from "@/sanity/client";
import { LATEST_CATS_QUERY } from "@/sanity/queries/queries";
import { SanityDocument } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET() {
  const cats = await client.fetch<SanityDocument[]>(
    LATEST_CATS_QUERY,
    {},
    { next: { revalidate: 3600 } }
  );

  const headers = new Headers({
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control":
      "public, max-age=14400, stale-while-revalidate=604800",
    "Netlify-Cache-ID": `latestCategories`,
    "Cache-Tag": `latestCategories`,
  });

  return new NextResponse(JSON.stringify(cats), { headers });
}
