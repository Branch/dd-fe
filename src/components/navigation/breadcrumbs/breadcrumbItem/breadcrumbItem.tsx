import { client } from "@/sanity/client";
import { getPostDataByPath } from "@/utils/dataFetcher/getPageData";
import { SanityDocument } from "next-sanity";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Breadcrumbs({
  slug,
  name,
  includeSeparator = true,
}: {
  slug?: string;
  includeSeparator?: boolean;
  name: string;
}) {
  const ListItem = ({ children }: { children?: ReactNode }) => {
    return (
      <li className="space-x-3 first-letter:capitalize group first:ml-0">
        {children}
        {includeSeparator && (
          <span className="text-djungleBlack-100/50">/</span>
        )}
      </li>
    );
  };
  return slug ? (
    <ListItem>
      <Link
        className="hover:text-djungleBlack-100/50 duration-200"
        href={`/${slug}`}
      >
        {name}
      </Link>
    </ListItem>
  ) : (
    <ListItem>{name}</ListItem>
  );
}
