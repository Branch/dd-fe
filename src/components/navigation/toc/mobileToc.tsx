import Collapsible from "@/components/dataDisplay/collapsible/collapsible";
import Link from "next/link";

export default function MobileToc({ post }: { post: any }) {
  return (
    <Collapsible title={"Sidinnehåll"} styles="md:hidden">
      <ul>
        {post?.headings?.map(
          (h: { children: { text: string }[] }, i: number) => {
            const text = h.children[0].text;
            const textFormatted = text.toLowerCase().replace(/\s/g, "-");
            return (
              <li key={i} className="list-disc ml-8">
                <Link
                  className={"text-djungleBlack"}
                  href={`#${textFormatted}`}
                >
                  {text}
                </Link>
              </li>
            );
          }
        )}
      </ul>
    </Collapsible>
  );
}
