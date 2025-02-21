/** @format */

"use client";
import { useRouter } from "next/navigation";

interface ISearchInput {
  styles?: string;
  onSubmit?: () => void;
}
export default function SearchInput({ styles, onSubmit }: ISearchInput) {
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }
    e.preventDefault();
    if (onSubmit) {
      onSubmit(); // Custom close function for mobile
    }
    router.push(`/sok?q=${encodeURI(e.currentTarget.value)}`);
  };
  return (
    <div className={`z-50 ${styles}`}>
      <input
        className="pl-4 pr-4 w-full outline-none py-2 text-sm bg-djungleGreen-100/40 border border-djungleGreen rounded-md placeholder:text-djungleGreen"
        onKeyDown={handleKeyDown}
        placeholder="Sök bland innehållet..."
      />
    </div>
  );
}
