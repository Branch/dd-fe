/** @format */

import { client } from "@/sanity/client";
import { NAV_QUERY } from "@/sanity/queries/queries";
import { SanityDocument } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET() {
  const nav = await client.fetch<SanityDocument>(
    NAV_QUERY,
    {},
    { next: { revalidate: 3600 } }
  );

  const headers = new Headers({
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control":
      "public, max-age=14400, stale-while-revalidate=604800",
    "Netlify-Cache-ID": `headerNav`,
    "Cache-Tag": `headerNav`,
  });

  return new NextResponse(JSON.stringify(nav), { headers });
}
