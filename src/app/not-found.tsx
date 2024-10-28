import BaseLink from "@/components/navigation/link/base/baseLink";
import { oswald } from "@/utils/fonts/fonts";

export default function NotFound() {
  return (
    <main className="min-h-screen container mt-12">
      <h1 className={`text-4xl font-bold ${oswald.className}`}>
        404: Sidan kunde inte hittas
      </h1>
      <p className="pt-4 pb-8">
        Sidan hittades inte. Den har antingen tagits bort eller flyttats.
      </p>
      <BaseLink text={"Hem"} url={"/"} />
    </main>
  );
}
