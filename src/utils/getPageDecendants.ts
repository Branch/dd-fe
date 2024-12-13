import { SanityDocument } from "next-sanity";

export default function getPageDescendants(
  pages: SanityDocument[],
  targetId: string,
  includeType?: string
) {
  const descendants: SanityDocument[] = [];
  function findChildren(parentId: string) {
    pages.map((page) => {
      if (page.parent?._ref === parentId) {
        descendants.push(page);
        findChildren(page._id);
      }
    });
  }
  findChildren(targetId);
  if (includeType) {
    return descendants.filter((page) => page._type === includeType);
  }
  return descendants;
}
