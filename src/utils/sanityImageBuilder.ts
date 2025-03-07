/** @format */

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
export default function sanityImageBuilder(
  image: string,
  width = 1280,
  height = 720,
  fit = false
) {
  const postImageUrl = image
    ? fit
      ? urlFor(image)?.width(width).fit("max").url()
      : urlFor(image)?.width(width).height(height).url()
    : `${process.env.BASE_URL}/assets/images/share.webp`;
  return postImageUrl;
}
