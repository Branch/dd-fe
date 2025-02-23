/** @format */
"use client";
import { Copy } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
interface IDiscountButton {
  code: string;
}
export default function DiscountButton({ code }: IDiscountButton) {
  const notify = () => {
    navigator.clipboard.writeText(code);
    toast.success("Rabattkod kopierad", {
      position: "bottom-center",
      autoClose: 2000,
      closeOnClick: true,
      draggable: true,
    });
  };
  return (
    <>
      <button
        onClick={notify}
        className="border-2 text-[12px] duration-200 text-djungleBlack border-dashed border-djungleGreen hover:bg-djungleGreen-100/20 !no-underline px-4 py-2 rounded-md mt-4 w-full text-center mx-auto font-bold items-center justify-center gap-2 flex"
      >
        <div>{code}</div> <Copy size={14} />
      </button>
      <p className="text-[11px] italic text-center mt-2 !mb-0">
        Klicka för att kopiera rabattkoden
      </p>
      <ToastContainer />
    </>
  );
}
