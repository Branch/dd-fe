import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface IAuthor {
  fullName: string;
  headshot: string;
  slug?: {
    current: string;
  };
}
export interface ILink {
  text: string;
  url: string;
}
