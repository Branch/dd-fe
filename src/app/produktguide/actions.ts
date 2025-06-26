"use server";

import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID!;

export async function sendChatMessage(message: string, threadId?: string) {
  try {
    if (!ASSISTANT_ID) {
      throw new Error("Assistant ID not configured");
    }

    // Use existing thread or create a new one
    let thread;
    let isNewThread = false;

    if (threadId) {
      // Try to use existing thread
      try {
        thread = await openai.beta.threads.retrieve(threadId);
      } catch (error) {
        console.error("Thread retrieval error:", error);
        // If thread doesn't exist, create a new one
        try {
          thread = await openai.beta.threads.create();
          isNewThread = true;
        } catch (createError) {
          console.error("Thread creation error:", createError);
          throw new Error("Failed to create thread");
        }
      }
    } else {
      // Create a new thread
      try {
        thread = await openai.beta.threads.create();
        isNewThread = true;
      } catch (error) {
        console.error("Thread creation error:", error);
        throw new Error("Failed to create thread");
      }
    }

    if (!thread || !thread.id) {
      console.error("Thread creation/retrieval failed - no ID:", thread);
      throw new Error("Failed to create/retrieve thread - no ID returned");
    }

    // Add user message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    // Run the assistant
    let run;
    try {
      run = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: ASSISTANT_ID,
      });
    } catch (error) {
      throw new Error("Failed to create run", { cause: error });
    }

    if (!run || !run.id) {
      console.error("Run creation failed - no ID:", run);
      throw new Error("Failed to create run - no ID returned");
    }

    // Log the run object and extract threadId
    const currentThreadId = run.thread_id;

    if (!currentThreadId) {
      console.error("Run object missing thread_id:", run);
      throw new Error("Run object missing thread_id");
    }

    // Poll for completion with correct API signature
    let runStatus = await openai.beta.threads.runs.retrieve(run.id, {
      thread_id: currentThreadId,
    });

    while (
      runStatus.status === "queued" ||
      runStatus.status === "in_progress"
    ) {
      await new Promise((res) => setTimeout(res, 1000));

      runStatus = await openai.beta.threads.runs.retrieve(run.id, {
        thread_id: currentThreadId,
      });
    }

    // Handle failed runs
    if (runStatus.status === "failed") {
      throw new Error(
        `Assistant run failed: ${runStatus.last_error?.message || "Unknown error"}`
      );
    }

    // Get messages with proper content handling
    const messages = await openai.beta.threads.messages.list(currentThreadId);
    const assistantMessage = messages.data.find(
      (msg) => msg.role === "assistant"
    );

    if (!assistantMessage) {
      throw new Error("No assistant response received");
    }

    // Extract text content safely
    const textContent = assistantMessage.content
      .filter((content) => content.type === "text")
      .map((content) => (content as any).text.value)
      .join("\n");

    return {
      reply: textContent || "No text content in response.",
      threadId: thread.id, // Always return the thread ID for future use
      isNewThread, // Indicate if this was a new thread
    };
  } catch (error) {
    console.error("Chatbot server action error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
