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
  titleHeadingLevel?: "h2" | "h3";
  useBoldFont?: boolean;
}
export default function Collapsible({
  children,
  title,
  styles,
  defaultOpen = false,
  wrapperStyles,
  headerItem,
  isTitleHeading,
  titleHeadingLevel = "h2",
  useBoldFont = true,
}: ICollapsible) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const DynamicHeading = ({
    as: Tag = "h2",
    children,
    className,
  }: {
    as: "h2" | "h3";
    children: ReactNode;
    className?: string;
  }) => {
    return <Tag className={`${className} !m-0 !p-0 !text-lg`}>{children}</Tag>;
  };
  return (
    <div className={`py-4 ${styles}`}>
      <div
        className="text-xl cursor-pointer font-bold flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {headerItem ? (
          <div className="flex items-center gap-2">
            {isTitleHeading ? (
              <DynamicHeading
                as={titleHeadingLevel}
                className={useBoldFont ? oswald.className : ""}
              >
                {title}
              </DynamicHeading>
            ) : (
              <span className={useBoldFont ? oswald.className : ""}>
                {title}
              </span>
            )}
            <span>{headerItem}</span>
          </div>
        ) : isTitleHeading ? (
          <DynamicHeading
            as={titleHeadingLevel}
            className={useBoldFont ? oswald.className : ""}
          >
            {title}
          </DynamicHeading>
        ) : (
          <span className={useBoldFont ? oswald.className : ""}>{title}</span>
        )}

        <div>{isOpen ? <ChevronUp /> : <ChevronDown />}</div>
      </div>
      <div
        className={`${isOpen ? "h-auto" : "h-0 overflow-hidden"} ${wrapperStyles}`}
      >
        {children}
      </div>
    </div>
  );
}
