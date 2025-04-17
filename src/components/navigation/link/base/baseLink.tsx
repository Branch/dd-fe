/** @format */

import isExternalUrl from "@/utils/isExternalUrl";
import Link from "next/link";

interface IBaseLink {
  text: string;
  url: string;
  rel?: string;
  design?: "primary" | "secondary";
  classNames?: string;
  forceExternal?: boolean;
}
const BaseLink = ({
  design = "primary",
  text,
  url,
  rel = "noopener nofollow",
  classNames,
  forceExternal = false,
}: IBaseLink) => {
  const colors =
    design === "primary"
      ? "bg-djungleGreen hover:bg-djungleGreen/90 !text-white !no-underline"
      : " border border-djungleGreen text-djungleGreen";
  const styles = `rounded-md ${colors} px-4 py-2 duration-200 text-center ${classNames ? classNames : ""}`;
  return forceExternal || isExternalUrl(url) ? (
    <a className={styles} rel={rel} target="_blank" href={url}>
      {text}
    </a>
  ) : (
    <Link className={styles} href={url}>
      {text}
    </Link>
  );
};
export default BaseLink;
