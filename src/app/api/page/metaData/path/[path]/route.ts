/** @format */

import { client } from "@/sanity/client";
import { PAGE_META_BY_PATH } from "@/sanity/queries/queries";
import { SanityDocument } from "next-sanity";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { path: string } }
) {
  const path = `/${params.path.split(",").join("/")}`;
  const page = await client.fetch<SanityDocument>(
    PAGE_META_BY_PATH,
    {
      path: path,
    },
    { cache: "no-store" }
  );

  if (!page) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  if (process.env.NODE_ENV === "development") {
    return new NextResponse(JSON.stringify(page));
  }
  const headers = new Headers({
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control":
      "public, max-age=14400, stale-while-revalidate=604800",
    "Netlify-Cache-ID": `page, ${path}`,
    "Cache-Tag": `page, ${path}`,
  });
  return new NextResponse(JSON.stringify(page), { headers });
}
