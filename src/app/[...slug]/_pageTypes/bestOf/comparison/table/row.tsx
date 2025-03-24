/** @format */

import { ReactNode } from "react";

/** @format */
interface IComparisonTableRow {
  children: ReactNode;
}
export default function ComparisonTableRow({ children }: IComparisonTableRow) {
  return <tr>{children}</tr>;
}
