/** @format */

import { pageTreeClient } from "@/sanity/pageTreeClient";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const page = await pageTreeClient.getPageMetadataById(params.id);
  // Set custom headers to prevent Netlify from caching old responses
  const headers = new Headers({
    "Cache-Control": "no-cache, public, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control":
      "public, max-age=14400, stale-while-revalidate=604800",
    "Netlify-Cache-ID": `page, ${params.id}`,
    "Cache-Tag": `page, ${params.id}`,
  });

  return new NextResponse(JSON.stringify(page), { headers });
}
