import { ReactNode } from "react";

interface IFooterList {
  children: ReactNode;
  title: string;
}
const FooterList = ({ children, title }: IFooterList) => {
  return (
    <ul className="flex flex-col gap-2">
      <li className="border-b border-white pb-1 font-bold mb-1">{title}</li>
      {children}
    </ul>
  );
};
export default FooterList;
