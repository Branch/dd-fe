export const sendGTMEvent = (
  eventName: string,
  eventData: Record<string, any> = {}
) => {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
};

export const sendChatMessageEvent = (message: string) => {
  sendGTMEvent("ai_chat_message_sent", {
    message: message,
  });
};
