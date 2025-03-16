/** @format */

import { client } from "@/sanity/client";
import { SEARCH_QUERY } from "@/sanity/queries/queries";
import { SanityDocument } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { query: string } }
) {
  const results = await client.fetch<SanityDocument[]>(
    SEARCH_QUERY,
    { queryString: params.query },
    { cache: "no-store" }
  );
  // Set custom headers to prevent Netlify from caching old responses
  const headers = new Headers({
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control":
      "public, max-age=3600, stale-while-revalidate=604800",
    "Netlify-Cache-ID": `search, ${params.query}`,
    "Cache-Tag": `search, ${params.query}`,
  });

  return new NextResponse(JSON.stringify(results), { headers });
}
