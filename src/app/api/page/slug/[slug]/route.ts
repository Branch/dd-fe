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
    params: { slug: string; type: string };
  }
) {
  const slug = `/${params.slug.split(",").join("/")}`;
  const tplType = params.type;
  const page = await client.fetch<SanityDocument>(
    getQueryByType(tplType),
    {
      slug,
    },
    { next: { revalidate: 30 } }
  );
  if (process.env.NODE_ENV === "development") {
    return new NextResponse(JSON.stringify(page));
  }
  const headers = new Headers({
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control":
      "public, max-age=14400, stale-while-revalidate=604800",
    "Netlify-Cache-ID": `page, ${params.type}, ${slug}`,
    "Cache-Tag": `page, ${params.type}, ${slug}`,
  });

  return new NextResponse(JSON.stringify(page), { headers });
}
