/** @format */

import { ReactNode } from "react";

/** @format */
interface IComparisonTableCell {
  children: ReactNode;
}
export default function ComparisonTableCell({
  children,
}: IComparisonTableCell) {
  return <td>{children}</td>;
}
