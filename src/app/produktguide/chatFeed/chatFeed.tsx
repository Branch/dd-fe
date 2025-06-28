/** @format */

"use client";

import { BadgeInfo, Send, ShoppingCart, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Loader from "@/components/dataDisplay/loaders/base/loader";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { sendChatMessage } from "../actions";
import { sendChatMessageEvent } from "@/utils/gtm";

interface IProduct {
  name: string;
  description: string;
  imageUrl: string;
  trackingUrl: string;
  price: string;
  originalPrice: string;
}
interface IBotMsg {
  products: IProduct[];
}

export default function ChatComponent() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showSlowInfo, setShowSlowInfo] = useState(false);
  const slowInfoTimeout = useRef<NodeJS.Timeout | null>(null);
  const [userClosedSlowInfo, setUserClosedSlowInfo] = useState(false);
  const isLoadingRef = useRef(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [showExamples, setShowExamples] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const exampleMessages = [
    "Kosttillskott till hund från FirstVet 💊",
    "Fästinghalsband till katt från Vetapotek 🐱",
    "Hundleksaker från VetZoo 🐶",
  ];

  const handleExampleClick = (exampleMessage: string) => {
    setInput(exampleMessage);
    setShowExamples(false);
    sendMessage(exampleMessage);
  };

  const handleImageError = (imageUrl: string) => {
    setImageErrors((prev) => new Set(prev).add(imageUrl));
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const userMessage = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    isLoadingRef.current = true;
    setInput(""); // Clear input immediately
    setShowExamples(false); // Hide examples when user sends a message
    setUserClosedSlowInfo(false);

    // Send GTM event for message sent
    sendChatMessageEvent(textToSend);

    // Start 5s timer for slow info
    if (slowInfoTimeout.current) {
      clearTimeout(slowInfoTimeout.current);
    }
    slowInfoTimeout.current = setTimeout(() => {
      if (isLoadingRef.current && !userClosedSlowInfo) {
        setShowSlowInfo(true);
      }
    }, 5000);

    try {
      const data = await sendChatMessage(textToSend, threadId || undefined);

      // Store the thread ID for future requests
      if (data.threadId) {
        setThreadId(data.threadId);
      }

      const botMessage = { role: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        role: "bot",
        text: "Tyvärr, något gick fel. Försök igen!",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
      if (slowInfoTimeout.current) clearTimeout(slowInfoTimeout.current);
      slowInfoTimeout.current = null;
      setShowSlowInfo(false);
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (slowInfoTimeout.current) clearTimeout(slowInfoTimeout.current);
    };
  }, []);

  return (
    <>
      <div className="flex justify-end">
        <Popover>
          <PopoverTrigger className="mb-2 flex rounded-full border-purple-500 border bg-purple-100 text-purple-500 px-2 py-1 text-xs items-center gap-2">
            <BadgeInfo className="-mt-[2px]" size={14} />
            <span>BETA</span>
          </PopoverTrigger>
          <PopoverContent className="text-xs">
            AI-assistenten är ny och vi utvärderar den just nu. Allt kanske inte
            fungerar helt perfekt än, men vi jobbar på att förbättra den – tack
            för att du testar!
          </PopoverContent>
        </Popover>
      </div>
      <div
        ref={chatContainerRef}
        className="flex min-h-[calc(100vh-20rem)] bg-white flex-col gap-6 border rounded p-6 w-full relative"
      >
        {showSlowInfo && !userClosedSlowInfo && (
          <div className="absolute top-0 left-0 w-full bg-yellow-100 border-b border-yellow-300 text-yellow-900 px-4 py-3 flex items-center z-20">
            <BadgeInfo size={24} className="mr-4 hidden lg:block" />
            <span className="flex-1 text-sm lg:text-md">
              Just nu är det många som använder verktyget, så det kan ta lite
              längre tid än vanligt att få svar. Tack för ditt tålamod!
            </span>
            <button
              className="ml-4 text-yellow-900 hover:text-yellow-700 font-bold"
              onClick={() => {
                setShowSlowInfo(false);
                setUserClosedSlowInfo(true);
              }}
              aria-label="Stäng informationsmeddelande"
            >
              <X size={24} />
            </button>
          </div>
        )}
        {/* Spacer for info bar if visible */}
        {showSlowInfo && !userClosedSlowInfo && <div className="h-14" />}

        {/* Example messages - only show if no messages yet and examples should be visible */}
        {showExamples && messages.length === 0 && (
          <div className="flex flex-col gap-3 items-end">
            <p className="text-sm text-gray-500">
              Testa något av följande alternativ, eller skriv din egen fråga!
            </p>
            <div className="flex flex-wrap justify-end gap-3 w-full lg:w-2/3">
              {exampleMessages.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-4 py-3 text-left text-sm transition-colors duration-200"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => {
          if (m.role === "bot") {
            const products = JSON.parse(m.text) as IBotMsg;
            if (!products?.products || products?.products.length === 0) {
              return (
                <div className={`flex justify-start`} key={i}>
                  <div
                    className={`w-2/3 rounded-xl text-md bg-white rounded-br-none py-4 px-6 shadow-md`}
                  >
                    Jag hittade inga produkter som matchade dina kriterier.
                    Försök med något annat!
                  </div>
                </div>
              );
            }
            return products?.products?.map((p, i) => {
              const longDescription = p.description.length > 400;
              let retailerImage = ``;
              let buyText = "Köp här";
              if (p.trackingUrl.includes("vetzoo")) {
                retailerImage = `/assets/images/partners/vetzoo.png`;
                buyText = "Köp hos VetZoo";
              } else if (p.trackingUrl.includes("firstvet")) {
                retailerImage = `/assets/images/partners/firstvet.png`;
                buyText = "Köp hos FirstVet";
              } else if (p.trackingUrl.includes("vetapotek")) {
                retailerImage = `/assets/images/partners/vetapotek.png`;
                buyText = "Köp hos Vetapotek";
              }
              const trackingUrl = p?.trackingUrl.replace(
                "&epi",
                "&epi2=ai-chat&epi"
              );
              return (
                <div key={i} className={`flex justify-start`}>
                  <div
                    className={`w-3/4 rounded-lg lg:w-2/3 bg-white shadow-md rounded-bl-none p-4`}
                  >
                    <div className="bot-reply">
                      <div className="relative h-[100px] lg:h-[200px]">
                        {p?.imageUrl && !imageErrors.has(p.imageUrl) ? (
                          <Image
                            quality={100}
                            priority
                            fill
                            objectFit="contain"
                            className="mb-2"
                            src={p.imageUrl}
                            alt={p.name}
                            onError={() => handleImageError(p.imageUrl)}
                          />
                        ) : (
                          <Image
                            quality={100}
                            priority
                            fill
                            objectFit="contain"
                            className="mb-2"
                            src={retailerImage}
                            alt={buyText}
                          />
                        )}
                      </div>
                      <div className="font-bold">{p?.name}</div>
                      <p
                        className={`italic text-sm my-2 ${longDescription ? "h-[100px] overflow-clip relative before:w-full before:h-24 before:absolute before:bottom-0 before:bg-gradient-to-t before:from-white before:via-white/60 before:to-transparent" : ""}`}
                      >
                        {p?.description}
                      </p>
                      {longDescription && (
                        <a
                          href={p?.trackingUrl}
                          target="_blank"
                          rel="nofollow noreferrer sponsored"
                          className="text-djungleBlue not-italic underline -mt-2 z-10 relative block"
                        >
                          Läs mer
                        </a>
                      )}
                      <div>
                        {p?.price !== p?.originalPrice ? (
                          <div>
                            <div className="text-red-600 font-bold">
                              Just nu: {p?.price} kr
                            </div>
                            <div className="text-gray-500 line-through text-sm">
                              {p?.originalPrice} kr
                            </div>
                            <div className="text-green-600 text-sm font-semibold">
                              {Math.round(
                                ((parseFloat(p?.originalPrice || "0") -
                                  parseFloat(p?.price || "0")) /
                                  parseFloat(p?.originalPrice || "1")) *
                                  100
                              )}
                              % rabatt
                            </div>
                          </div>
                        ) : (
                          <div className="font-bold my-2">
                            Pris: {p?.price} kr
                          </div>
                        )}
                      </div>
                      <a
                        href={trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow sponsored"
                        className="border-2 mt-4 flex w-full justify-center lg:w-auto text-center gap-2 items-center !font-bold bg-djungleBlue !text-white text-sm border-djungleBlue !no-underline lg:hover:!text-djungleBlue lg:hover:bg-white px-4 py-2 duration-200 rounded-full"
                      >
                        {buyText} <ShoppingCart size={14} />
                      </a>
                      <a
                        href={trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow sponsored"
                        className="flex w-full justify-center lg:w-auto text-center gap-2 items-center !font-bold !text-djungleBlue text-sm !no-underline px-4 py-2 duration-200"
                      >
                        Läs mer
                      </a>
                    </div>
                  </div>
                </div>
              );
            });
          }
          return (
            <div key={i} className={`flex justify-end`}>
              <div
                className={`w-2/3 rounded-xl text-md bg-djungleBlue-50 rounded-br-none py-4 px-6`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="mb-2 text-left">
            <Loader />
          </div>
        )}
      </div>
      <div className="sticky bottom-0 bg-white z-10">
        <input
          className="border p-4 w-full"
          placeholder="Vilken produkt letar du efter?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={isLoading}
        />
        <button
          className={`${isLoading ? "bg-djungleBlue/20 text-djungleBlue" : "bg-djungleBlue text-white hover:bg-djungleBlue/20 hover:text-djungleBlue"} absolute duration-200  rounded-full p-2 right-4 top-1/2 -translate-y-1/2`}
          onClick={() => sendMessage()}
          disabled={isLoading}
        >
          <Send size={16} />
        </button>
      </div>
    </>
  );
}
