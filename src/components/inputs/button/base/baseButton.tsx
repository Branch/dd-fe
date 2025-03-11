/** @format */

import { ReactNode } from "react";

/** @format */
interface IBaseButton {
  children?: ReactNode;
  text?: string;
  onClick: () => void;
  classNames?: string;
}
export default function BaseButton({
  children,
  text,
  onClick,
  classNames,
}: IBaseButton) {
  return (
    <button
      onClick={onClick}
      className={`${classNames ? classNames : ""} duration-200 text-djungleBlack hover:bg-djungleGreen-100/20 !no-underline px-4 py-2 rounded-mdw-full text-center mx-auto font-bold items-center justify-center gap-2 flex`}
    >
      {text}
      {children}
    </button>
  );
}
