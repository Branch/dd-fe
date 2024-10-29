"use client";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { setConsentCloseCookie } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
export default function CookieConsentCmp() {
  const consent = getCookie("cookieconsent");
  const { toast } = useToast();
  useEffect(() => {
    toast({
      title: `🍪 Vi använder cookies`,
      description:
        "Vi använder cookies för att förbättra upplevelsen av sidan. Genom att använda sidan accepterar du cookies. Läs mer om cookies i vår cookie policy.",
      duration: 30000,
      className: "bg-white",
      onSwipeEnd: () => setConsentCloseCookie(),
    });
  }, [toast]);
  return !!consent ? null : <Toaster />;
}
