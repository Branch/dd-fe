import BreadcrumbItem from "@/components/navigation/breadcrumbs/breadcrumbItem/breadcrumbItem";

export default function Breadcrumbs({
  items,
}: {
  items: { title: string; fullPath: string }[];
}) {
  return items.length > 1 ? (
    <nav className="mb-4 md:mb-12 mx-break-out border-y border-djungleBlack overflow-x-auto relative">
      <ul className="flex container items-center space-x-3 py-2">
        {items.map((i, index: number) => {
          return (
            <BreadcrumbItem
              key={index}
              name={index === 0 ? "Djurdjungeln" : i?.title}
              includeSeparator={index !== items.length - 1}
              path={
                i?.title === "Index page"
                  ? "/"
                  : index !== items.length - 1
                    ? i?.fullPath
                    : undefined
              }
            />
          );
        })}
      </ul>
    </nav>
  ) : null;
}
