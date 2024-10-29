import Collapsible from "@/components/dataDisplay/collapsible/collapsible";
import { IToc } from "@/types/types";

import Link from "next/link";

export default function MobileToc({ headings }: IToc) {
  return (
    <Collapsible title={"Sidinnehåll"} styles="md:hidden">
      <ul className="mt-2">
        {headings?.map((h: any, i: number) => {
          const text = h.children[0].text;
          const textFormatted = text.toLowerCase().replace(/\s/g, "-");
          return (
            <li key={i} className="list-disc ml-8">
              <Link
                className={"text-djungleBlack underline"}
                href={`#${textFormatted}`}
              >
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </Collapsible>
  );
}
