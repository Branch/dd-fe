import { client } from "@/sanity/client";
import { pageTreeConfig } from "@/cfg/page-tree-config";
import { createNextPageTreeClient } from "@q42/sanity-plugin-page-tree/next";

export const pageTreeClient = createNextPageTreeClient({
  config: pageTreeConfig,
  client: client,
});
