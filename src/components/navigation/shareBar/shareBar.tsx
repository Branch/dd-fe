"use client";
import { Facebook, Mail, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
export default function ShareBar({ title }: { title: string }) {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);
  const iconSize = 18;

  return (
    <div className="flex gap-6 items-center">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(currentUrl)}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="Dela via Facebook"
      >
        <Facebook size={iconSize} />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        href={`https://twitter.com/intent/tweet?text=${encodeURI(title)}&url=${encodeURI(currentUrl)}`}
        aria-label="Dela via X"
      >
        <Twitter size={iconSize} />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        href={`mailto:?subject=${encodeURI(title)}&body=${encodeURI(`Läs mer på ${currentUrl}`)}`}
        aria-label="Dela via mail"
      >
        <Mail size={iconSize} />
      </a>
    </div>
  );
}
