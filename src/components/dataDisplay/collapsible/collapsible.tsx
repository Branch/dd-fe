/** @format */

"use client";
import { oswald } from "@/utils/fonts/fonts";
import { ChevronUp, ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

interface ICollapsible {
  children: ReactNode;
  title: string;
  styles?: string;
  wrapperStyles?: string;
  defaultOpen?: boolean;
  headerItem?: ReactNode;
  isTitleHeading?: boolean;
}
export default function Collapsible({
  children,
  title,
  styles,
  defaultOpen = false,
  wrapperStyles,
  headerItem,
  isTitleHeading,
}: ICollapsible) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`py-4 ${styles}`}>
      <div
        className="text-xl cursor-pointer font-bold flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {headerItem ? (
          <div className="flex items-center gap-2">
            {isTitleHeading ? (
              <h2 className={oswald.className}>{title}</h2>
            ) : (
              <span className={oswald.className}>{title}</span>
            )}
            <span>{headerItem}</span>
          </div>
        ) : isTitleHeading ? (
          <h2 className={oswald.className}>{title}</h2>
        ) : (
          <span className={oswald.className}>{title}</span>
        )}

        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      <div
        className={`${isOpen ? "h-auto" : "h-0 overflow-hidden"} ${wrapperStyles}`}
      >
        {children}
      </div>
    </div>
  );
}
