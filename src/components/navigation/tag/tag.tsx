import Link from "next/link";
interface ITag {
  name: string;
  url: string;
}
const Tag = ({ name, url }: ITag) => {
  return (
    <Link
      href={url}
      className="bg-djunglePurple-100 border border-djunglePurple text-djunglePurple text-xs px-2 py-1 rounded-full"
    >
      {name}
    </Link>
  );
};
export default Tag;
