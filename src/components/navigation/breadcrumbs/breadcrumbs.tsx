import BreadcrumbItem from "@/components/navigation/breadcrumbs/breadcrumbItem/breadcrumbItem";

export default function Breadcrumbs({
  items,
}: {
  items: { title: string; slug: string }[];
}) {
  return items.length > 1 ? (
    <nav className="mb-12 mx-break-out border-y border-djungleBlack">
      <ul className="flex container items-center  space-x-3 py-2">
        {items.map((i, index: number) => {
          return (
            <BreadcrumbItem
              key={index}
              name={i?.title === "Index page" ? "Djur djungeln" : i?.title}
              includeSeparator={index !== items.length - 1}
              slug={
                i?.title === "Index page"
                  ? "/"
                  : index !== items.length - 1
                    ? i?.slug
                    : undefined
              }
            />
          );
        })}
      </ul>
    </nav>
  ) : null;
}
