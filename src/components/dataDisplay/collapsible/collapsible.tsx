"use client";
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
    <div className={`py-4 cursor-pointer ${styles}`}>
      <h2
        className="text-xl font-bold mb-2 flex justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </h2>
      <div className={isOpen ? "h-auto" : "h-0 overflow-hidden"}>
        {children}
      </div>
    </div>
  );
}
