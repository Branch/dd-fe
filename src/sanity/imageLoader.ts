interface ISanityLoader {
  src: string;
  width: number;
  quality?: number;
}
export default function sanityLoader({ src, width, quality }: ISanityLoader) {
  const prj = "k37awysv";
  const dataset = "production";
  const url = new URL(`https://cdn.sanity.io/images/${prj}/${dataset}${src}`);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", width.toString());
  if (quality) {
    url.searchParams.set("q", quality.toString());
  }
  return url.href;
}
