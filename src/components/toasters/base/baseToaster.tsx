/** @format */

"use client";

import BaseLink from "@/components/navigation/link/base/baseLink";
import { oswald } from "@/utils/fonts/fonts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BaseButton from "@/components/inputs/button/base/baseButton";
import { X } from "lucide-react";

export interface IBaseToaster {
  title: string;
  description?: string;
  buttonText: string;
  externalUrl?: string;
  internalUrl?: string;
}
export default function BaseToaster({
  title,
  description,
  buttonText,
  externalUrl,
  internalUrl,
}: IBaseToaster) {
  const [isVisible, toggleVisibility] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      toggleVisibility(true);
    }, 30000);
  }, []);
  return isVisible ? (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`bg-white z-50 md:rounded-tr-xl md:rounded-tl-xl p-4 border border-djungleBlack-100 fixed bottom-0 left-0 w-screen `}
    >
      <BaseButton
        classNames="absolute top-2 right-0"
        onClick={() => toggleVisibility(false)}
      >
        <X />
      </BaseButton>
      <div className="container flex flex-col gap-4">
        <div className={`text-xl font-bold ${oswald.className}`}>{title}</div>
        <p>{description}</p>
        {externalUrl || internalUrl ? (
          <BaseLink
            text={buttonText}
            url={(externalUrl ? externalUrl : internalUrl) as string}
            classNames="w-[200px] mx-auto"
            rel={externalUrl ? "noopener noreferrer nofollow sponsored" : ""}
          />
        ) : null}
      </div>
    </motion.div>
  ) : null;
}
