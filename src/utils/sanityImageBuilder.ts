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
  width = 550,
  height = 310
) {
  const postImageUrl = image
    ? urlFor(image)?.width(width).height(height).url()
    : null;
  return postImageUrl;
}
