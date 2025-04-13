/** @format */

import { ReactNode } from "react";
interface IInsuraceProductTable {
  children: ReactNode;
}
export default function Table({ children }: IInsuraceProductTable) {
  return (
    <table className="w-[800px] md:w-[1480px] border-collapse mt-4 table-fixed">
      {children}
    </table>
  );
}
