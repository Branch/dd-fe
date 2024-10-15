import { useEffect, useState, useRef } from "react";

export function useHeadsObserver() {
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleObsever = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };
    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "-30% 0% -45% 0px",
    });
    const elements = document.querySelectorAll("h2");
    elements.forEach((elem) => observer.current?.observe(elem));
    return () => observer.current?.disconnect();
  }, []);

  return { activeId };
}
