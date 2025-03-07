/** @format */

import { ReactNode } from "react";

/** @format */
interface IBaseTd {
  children: ReactNode;
}
export default function BaseTd({ children }: IBaseTd) {
  return (
    <td
      className={`py-6 border border-djungleBlack-50 text-center px-8 ${children === "✕" ? "text-red-500" : children === "✔" ? "text-green-500" : ""}`}
    >
      {children}
    </td>
  );
}
