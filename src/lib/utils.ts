import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { setCookie } from "cookies-next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setConsentCloseCookie() {
  setCookie("cookieconsent", true, { maxAge: 60 * 60 * 24 * 365 });
}
