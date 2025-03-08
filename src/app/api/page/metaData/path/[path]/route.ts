/** @format */

import { pageTreeClient } from "@/sanity/pageTreeClient";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { path: string } }
) {
  const path = `/${params.path.split(",").join("/")}`;
  const page = await pageTreeClient.getPageMetadataByPath(path);
  if (!page) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  const headers = new Headers({
    "Cache-Control": "no-cache, public, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control":
      "public, max-age=14400, stale-while-revalidate=604800",
    "Netlify-Cache-ID": `page, ${path}`,
    "Cache-Tag": `page, ${path}`,
  });
  return new NextResponse(JSON.stringify(page), { headers });
}
