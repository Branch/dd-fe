/** @format */

"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SearchInput from "@/components/navigation/searchInput/searchInput";
import { ChevronDown, ChevronUp, MoveRight } from "lucide-react";
import sanityImageBuilder from "@/utils/sanityImageBuilder";
import Author from "@/components/navigation/author/author";
import { IAuthor } from "@/types/types";
import MobileHeader from "@/components/navigation/header/mobile/mobileHeader";

export default function Header({ sections }: { sections: any[] }) {
  const [isHovered, setIsHovered] = useState(-1);
  const [hasScrolled, setHasScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const campaingsDefaultEffect =
    "[background:linear-gradient(45deg,#FEFBE6,#FEFBE6,#FEFBE6)_padding-box,conic-gradient(from_var(--border-angle),#357829,#357829,#357829,#E5F4CC,#357829)_border-box]";
  const campaingsHoverEffect =
    "[background:linear-gradient(45deg,#ffffff,#ffffff,#ffffff)_padding-box,conic-gradient(from_var(--border-angle),#357829,#357829,#357829,#E5F4CC,#357829)_border-box]";

  return (
    <header
      className={`py-3 sticky top-0 z-50 duration-200 bg-background ${isHovered >= 0 ? "bg-white" : ""} ${hasScrolled ? "bg-white shadow-md" : ""}`}
    >
      <nav className="container flex justify-between items-center">
        <Link href={"/"} className="mr-24">
          <Image
            src={"/assets/images/logo.png"}
            alt={"Djurdjungeln"}
            priority
            width={100}
            height={10}
            className="z-10 relative block"
          />
        </Link>
        <div className="flex">
          <ul className="items-center leading-4 text-sm hidden lg:flex">
            {sections?.map((s, i: number) => {
              return (
                <li key={i} className="h-full">
                  <Link
                    className={`flex font-bold h-full gap-2 items-center pr-8 hover:text-djungleGreen duration-200 z-10 ${i === isHovered ? "text-djungleGreen" : "text-djungleBlack"}`}
                    href={s.fullPath}
                    onMouseEnter={() =>
                      setIsHovered(s?.links?.length > 0 ? i : -1)
                    }
                    onMouseLeave={() => setIsHovered(-1)}
                    onClick={() => setIsHovered(-1)}
                  >
                    {s.title}
                    {s?.links?.length > 0 ? (
                      i === isHovered ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )
                    ) : null}
                  </Link>
                  {s?.links?.length > 0 ? (
                    <div
                      onMouseEnter={() => setIsHovered(s.links ? i : -1)}
                      onMouseLeave={() => setIsHovered(-1)}
                      className={`py-6 absolute duration-200 w-full left-0 top-[45px] shadow-md z-50 ${isHovered === i ? "block bg-white" : "hidden"}`}
                    >
                      <div className="grid-cols-2 gap-x-12 grid container mb-6">
                        {s.links.map((l: any, i: number) => {
                          const imgSrc = sanityImageBuilder(l.target.image);
                          return (
                            <Link
                              className="p-4 flex gap-4 rounded-lg hover:bg-djungleGreen-100/30 duration-200"
                              key={i}
                              href={l.fullPath}
                              onClick={() => setIsHovered(-1)}
                            >
                              {imgSrc && (
                                <Image
                                  priority
                                  src={imgSrc}
                                  width={150}
                                  height={50}
                                  className="rounded-md"
                                  alt={""}
                                />
                              )}
                              <div className="flex justify-between flex-col">
                                <div>
                                  <div className={`font-bold mb-1`}>
                                    {l.target.title}
                                  </div>
                                  <div className="line-clamp-2">
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
                      <div className="container">
                        <Link
                          className="flex border-t pt-4 border-djungleBlack-100/40 underline hover:text-djungleBlack/60 gap-2 items-center hover:gap-4 duration-200"
                          href={s.fullPath}
                          onClick={() => setIsHovered(-1)}
                        >
                          Utforska mer inom {s.title.toLowerCase()}
                          <MoveRight />
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <Link
            href="/kampanjer"
            className={`font-bold ${isHovered === -1 ? (hasScrolled ? campaingsHoverEffect : campaingsDefaultEffect) : campaingsHoverEffect} rounded-full border-transparent animate-border py-2 px-4 border-2 shadow-md hover:animate-borderFast`}
          >
            Kampanjer
          </Link>
          <SearchInput styles="hidden lg:block" />
          <div className="flex items-center gap-4 lg:hidden">
            <MobileHeader sections={sections} />
          </div>
        </div>
      </nav>
    </header>
  );
}
