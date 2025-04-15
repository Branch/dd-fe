/** @format */

import Collapsible from "@/components/dataDisplay/collapsible/collapsible";

/** @format */
interface IBaseTh {
  title: string;
  description: string;
  isSticky?: boolean;
}
export default function BaseTh({
  title,
  description,
  isSticky = false,
}: IBaseTh) {
  return (
    <th
      scope="row"
      className={`border bg-djungleBeige border-djungleBlack-50 px-4 text-left ${isSticky ? "md:sticky md:left-0" : ""}`}
    >
      <Collapsible
        title={title}
        useBoldFont={false}
        styles="max-md:[&_div:first-child>span]:text-sm max-md:[&_div>span]:text-xs"
        wrapperStyles="[&>span]:!block [&>span]:mt-2 [&>span]:font-normal"
      >
        <span>{description}</span>
      </Collapsible>
    </th>
  );
}
