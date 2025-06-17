/** @format */
"use client";

declare global {
  interface Window {
    ml: (command: string, ...args: any[]) => void;
  }
}

import { useEffect } from "react";
import { oswald } from "@/utils/fonts/fonts";

const PreFooter = () => {
  useEffect(() => {
    // Initialize MailerLite after script is loaded
    if (typeof window !== "undefined" && window.ml) {
      window.ml("account", "1598897");
    }
  }, []);

  return (
    <section className="container mt-10">
      <div className="bg-djungleBlue p-6 lg:p-12 rounded-tl-[2rem] lg:rounded-tl-[3rem] rounded-br-[2rem] lg:rounded-br-[3rem] text-white">
        <h2 className={`text-2xl font-bold mb-4 ${oswald.className}`}>
          Vill du ha rabattkoder från VetZoo, FirstVet och fler?
        </h2>
        <p>
          <strong>Gå med i vårt nyhetsbrev!</strong> Varje vecka skickar vi ut
          de senaste rabatterna, kampanjerna och smarta tipsen - perfekt för dig
          som vill spara pengar och samtidigt ge ditt husdjur det bästa.
        </p>
        <p className="mt-4">
          <strong>Anmäl dig nu och börja ta del av erbjudandena direkt!</strong>{" "}
          Din plånbok (och ditt husdjur) kommer tacka dig.
        </p>
        <div className="mt-8">
          <div
            className="ml-embedded [&_.embedForm]:!max-w-full [&_.ml-form-embedBody]:!p-0 [&_.row-success]:!p-0 [&_.horozintalForm]:!p-0"
            data-form="136Yw1"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default PreFooter;
