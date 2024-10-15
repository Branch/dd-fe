import { pageTreeClient } from "@/sanity/pageTreeClient";

export async function getPostDataById(id: string) {
  const data = await pageTreeClient.getPageMetadataById(id);
  return data;
}
export async function getPostDataByPath(path: string) {
  const data = await pageTreeClient.getPageMetadataByPath(path);
  return data;
}
export async function getAllPosts() {
  const data = await pageTreeClient.getAllPageMetadata();
  return data;
}
