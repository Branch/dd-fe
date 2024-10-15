import isExternalUrl from "@/utils/isExternalUrl";
import Link from "next/link";

interface IBaseLink {
  text: string;
  url: string;
  rel?: string;
}
const BaseLink = ({ text, url, rel = "noopener nofollow" }: IBaseLink) => {
  const styles =
    "rounded-md bg-djungleGreen px-4 py-2 text-white hover:bg-djungleGreen/90 duration-200";
  return isExternalUrl(url) ? (
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
