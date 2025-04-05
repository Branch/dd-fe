/** @format */

import { ReactNode } from "react";

interface IComparisonTable {
  children: ReactNode;
}
export default function ComparisonTable({ children }: IComparisonTable) {
  return <table>{children}</table>;
}
