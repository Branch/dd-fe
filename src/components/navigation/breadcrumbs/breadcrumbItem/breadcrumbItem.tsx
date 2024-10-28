import Link from "next/link";
import { ReactNode } from "react";

export default async function Breadcrumbs({
  path,
  name,
  includeSeparator = true,
}: {
  path?: string;
  includeSeparator?: boolean;
  name: string;
}) {
  const ListItem = ({ children }: { children?: ReactNode }) => {
    return (
      <li className="space-x-3 last:pr-4 text-nowrap first-letter:capitalize group first:ml-0">
        {children}
        {includeSeparator && (
          <span className="text-djungleBlack-100/50">/</span>
        )}
      </li>
    );
  };
  return path ? (
    <ListItem>
      <Link className="hover:text-djungleBlack-100/50 duration-200" href={path}>
        {name}
      </Link>
    </ListItem>
  ) : (
    <ListItem>{name}</ListItem>
  );
}
