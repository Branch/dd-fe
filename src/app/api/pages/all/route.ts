/** @format */

import { client } from "@/sanity/client";
import { PAGES_QUERY } from "@/sanity/queries/queries";
import { SanityDocument } from "next-sanity";
import { NextResponse } from "next/server";

// Used for sitemap, shouldnt be cached
export async function GET() {
  const allPages = await client.fetch<SanityDocument[]>(
    PAGES_QUERY,
    {},
    { cache: "no-store" }
  );
  return new NextResponse(JSON.stringify(allPages), {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}
