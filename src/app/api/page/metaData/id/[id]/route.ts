/** @format */

import { client } from "@/sanity/client";
import { PAGE_META_BY_ID } from "@/sanity/queries/queries";
import { SanityDocument } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const page = await client.fetch<SanityDocument>(
    PAGE_META_BY_ID,
    {
      id: params.id,
    },
    { cache: "no-store" }
  );

  if (process.env.NODE_ENV === "development") {
    return new NextResponse(JSON.stringify(page));
  }
  const headers = new Headers({
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control":
      "public, max-age=14400, stale-while-revalidate=604800",
    "Netlify-Cache-ID": `page, ${params.id}`,
    "Cache-Tag": `page, ${params.id}`,
  });

  return new NextResponse(JSON.stringify(page), { headers });
}
