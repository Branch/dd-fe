"use client";
import BreadcrumbItem from "@/components/navigation/breadcrumbs/breadcrumbItem/breadcrumbItem";
import { useEffect, useRef, useState } from "react";

export default function Breadcrumbs({
  items,
}: {
  items: { title: string; shortTitle?: string; fullPath: string }[];
}) {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [showGradient, setShowGradient] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } =
          scrollContainerRef.current;
        setIsScrollable(scrollWidth > clientWidth);
        setShowGradient(scrollLeft + clientWidth < scrollWidth);
      }
    };

    if (scrollContainerRef.current) {
      checkScroll();
      scrollContainerRef.current.addEventListener("scroll", checkScroll);
    }

    return () => {
      scrollContainerRef.current?.removeEventListener("scroll", checkScroll);
    };
  }, []);
  return items.length > 1 ? (
    <nav className="mb-4 md:mb-12 mx-break-out border-y border-djungleBlack relative">
      <ul
        ref={scrollContainerRef}
        className="flex container items-center space-x-3 py-2 overflow-x-auto scrollbar-hide"
      >
        {items.map((i, index: number) => {
          return (
            <BreadcrumbItem
              key={index}
              name={index === 0 ? "Djurdjungeln" : i?.shortTitle || i?.title}
              includeSeparator={index !== items.length - 1}
              path={
                i?.title === "Index page"
                  ? "/"
                  : index !== items.length - 1
                    ? i?.fullPath
                    : undefined
              }
            />
          );
        })}
      </ul>
      {isScrollable && showGradient && (
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-djungleBeige pointer-events-none"></div>
      )}
    </nav>
  ) : null;
}
