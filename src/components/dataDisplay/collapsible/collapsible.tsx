"use client";
import { oswald } from "@/utils/fonts/fonts";
import { ChevronUp, ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

interface ICollapsible {
  children: ReactNode;
  title: string;
  styles?: string;
}
export default function Collapsible({ children, title, styles }: ICollapsible) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`py-4 ${styles}`}>
      <div
        className="text-xl cursor-pointer font-bold flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={oswald.className}>{title}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      <div className={isOpen ? "h-auto" : "h-0 overflow-hidden"}>
        {children}
      </div>
    </div>
  );
}
