/** @format */

import { pageTreeClient } from "@/sanity/pageTreeClient";

export async function getPostMetaDataById(id: string) {
  const data = await pageTreeClient.getPageMetadataById(id);
  return data;
}
export async function getPostMetaDataByPath(path: string) {
  const data = await pageTreeClient.getPageMetadataByPath(path);
  return data;
}
export async function getAllPosts() {
  const data = await pageTreeClient.getAllPageMetadata();
  return data;
}
