/** @format */

import { client } from "@/sanity/client";
import { getQueryByType } from "@/utils/queryByType";
import { SanityDocument } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: { id: string; type: string };
  }
) {
  const page = await client.fetch<SanityDocument>(
    getQueryByType(params.type),
    {
      id: params.id,
    },
    { next: { revalidate: 30 } }
  );
  // Set custom headers to prevent Netlify from caching old responses
  const headers = new Headers({
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control":
      "public, max-age=14400, stale-while-revalidate=604800",
    "Netlify-Cache-ID": `page, ${params.id}`,
    "Cache-Tag": `page, ${params.id}`,
  });

  return new NextResponse(JSON.stringify(page), { headers });
}
