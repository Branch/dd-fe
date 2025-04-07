/** @format */

"use client";

import { useHeadsObserver } from "@/hooks/hooks";
import { IToc } from "@/types/types";
import { oswald } from "@/utils/fonts/fonts";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DesktopToc({ headings, styles }: IToc) {
  const { activeId } = useHeadsObserver();
  const [boldId, setBoldId] = useState("");
  useEffect(() => {
    setBoldId(activeId);
  }, [activeId]);
  return (
    <aside
      className={`hidden md:block p-4 md:sticky md:top-20 md:mt-[165px] md:self-start md:col-span-2 ${styles}`}
    >
      <nav>
        <header>
          <h2 className={`text-xl font-bold mb-2 ${oswald.className}`}>
            Sidinnehåll
          </h2>
        </header>
        <ul>
          {headings?.map((h, i: number) => {
            const text = h.children[0].text;
            const textFormatted = text?.toLowerCase().replace(/\s/g, "-") || "";
            return (
              <li key={i}>
                <Link
                  className={`${textFormatted === boldId ? "font-bold text-djungleBlack ml-1" : "text-djungleBlack/60 hover:text-djungleBlack hover:font-bold"} duration-200`}
                  href={`#${textFormatted}`}
                  onClick={() => setBoldId(textFormatted)}
                >
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
