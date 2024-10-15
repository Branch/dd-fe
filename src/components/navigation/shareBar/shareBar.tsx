"use client";

import { Facebook, Mail, Twitter } from "lucide-react";

export default function ShareBar({ title }: { title: string }) {
  const iconSize = 18;
  const href = typeof window !== "undefined" ? window?.location?.href : "";
  return (
    <div className="flex gap-6 items-center">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(href)}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <Facebook size={iconSize} />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        href={`https://twitter.com/intent/tweet?text=${encodeURI(title)}&url=${encodeURI(href)}`}
      >
        <Twitter size={iconSize} />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        href={`mailto:?subject=${encodeURI(title)}&body=${encodeURI(`Läs mer på ${href}`)}`}
      >
        <Mail size={iconSize} />
      </a>
    </div>
  );
}
