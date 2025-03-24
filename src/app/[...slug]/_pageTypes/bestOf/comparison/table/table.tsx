/** @format */

import Row from "@/app/[...slug]/_pageTypes/bestOf/comparison/table/row";
import { ReactNode } from "react";

interface IComparisonTable {
  children: ReactNode;
}
export default function ComparisonTable({ children }: IComparisonTable) {
  return <table>{children}</table>;
}
