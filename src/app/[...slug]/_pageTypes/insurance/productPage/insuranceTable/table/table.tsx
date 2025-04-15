/** @format */

import { ReactNode } from "react";
interface IInsuraceProductTable {
  children: ReactNode;
  noOfColumns?: number;
}
export default function Table({
  children,
  noOfColumns,
}: IInsuraceProductTable) {
  const calculatedWidth = noOfColumns
    ? `${(noOfColumns + 1) * 300}px`
    : "800px";
  const style = {
    width: calculatedWidth,
  };
  return (
    <table style={style} className={`border-collapse mt-4 table-fixed`}>
      {children}
    </table>
  );
}
