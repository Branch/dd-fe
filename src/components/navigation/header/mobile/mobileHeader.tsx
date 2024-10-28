"use client";

import Author from "@/components/navigation/author/author";
import SearchInput from "@/components/navigation/searchInput/searchInput";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  Sheet,
} from "@/components/ui/sheet";
import { IAuthor } from "@/types/types";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Collapsible from "@/components/dataDisplay/collapsible/collapsible";
import { oswald } from "@/utils/fonts/fonts";

export default function MobileHeader({ sections }: { sections: any[] }) {
  const [isHovered, setIsHovered] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="xl:hidden" asChild>
        <button>
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent className="bg-white overflow-y-scroll">
        <SheetHeader className="mt-6">
          <SearchInput onSubmit={() => setIsOpen(false)} />
        </SheetHeader>
        <div className="grid gap-1 py-4">
          {sections?.map((s, i: number) => {
            return s?.links?.length > 0 ? (
              <Collapsible key={i} title={s.title} styles="!py-1">
                <div>
                  <div className="grid mb-6">
                    {s.links.map((l: any, i: number) => {
                      const imgSrc = sanityImageBuilder(l.target.image);
                      return (
                        <Link
                          className="p-4 grid grid-flow-col -ml-4 gap-4 rounded-lg hover:bg-djungleGreen-100/30 duration-200"
                          key={i}
                          href={l.fullPath}
                          onClick={() => setIsOpen(false)}
                        >
                          {imgSrc && (
                            <div className="relative w-[50px] h-[50px]">
                              <Image
                                src={imgSrc}
                                layout={"fill"}
                                objectFit="cover"
                                className="rounded-md aspect-square"
                                alt={""}
                              />
                            </div>
                          )}
                          <div className="flex justify-between flex-col">
                            <div>
                              <div className={`font-bold mb-1`}>
                                {l.target.title}
                              </div>
                              <div className="line-clamp-2 text-sm mb-2">
                                {l.target.description}
                              </div>
                            </div>
                            {l?.target?.authors?.map(
                              (a: IAuthor, i: number) => {
                                return (
                                  <Author
                                    key={i}
                                    name={a.fullName}
                                    headshot={a.headshot}
                                  />
                                );
                              }
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <Link
                  className="mb-4 flex underline hover:text-djungleBlack/60 gap-2 items-center hover:gap-4 duration-200"
                  href={s.fullPath}
                  onClick={() => setIsOpen(false)}
                >
                  Utforska mer inom {s.title.toLowerCase()}
                </Link>
              </Collapsible>
            ) : (
              <Link
                className={`text-xl font-bold ${oswald.className} mb-2`}
                href={s.fullPath}
                onClick={() => setIsOpen(false)}
              >
                {s.title}
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
