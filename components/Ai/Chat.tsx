"use client";
import React, { useState, useRef, useEffect } from "react";
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, Sparkles, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";

import { useFetchContent } from "@/hooks/useFetchContent";
import MovieCard from "@/components/Movie/MovieCard";
import TVCard from "@/components/TvShow/TvCard";
import { MovieType, TvWithExtras } from "@/types/types";
import { useMemo } from "react";

export function Chat() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const { messages, sendMessage, isLoading, stop } = useChat({
    connection: fetchServerSentEvents("/api/chat"),
  });
  console.log(messages);

  // Parse recommendations from messages
  const recommendations = useMemo(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== "assistant") return [];

    const lastPart = lastMessage.parts.find((part) => part.type === "text");
    if (!lastPart) return [];

    // Attempt to find JSON block at the end
    const content = lastPart.content;
    const jsonMatch =
      content.match(/```json\s*(\{[\s\S]*"recommendations"[\s\S]*\})\s*```/) ||
      content.match(/(\{[\s\S]*"recommendations"[\s\S]*\})/);

    if (!jsonMatch) return [];
    let jsonString = jsonMatch[1] || jsonMatch[0];

    if (jsonMatch) {
      try {
        const data = JSON.parse(jsonString);
        return data.recommendations || [];
      } catch (e) {
        console.error("Failed to parse recommendations JSON", e);
        return [];
      }
    }
    return [];
  }, [messages]);

  const { data: recommendedContent } = useFetchContent(recommendations);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, recommendedContent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput("");
    }
  };

  // Helper to strip JSON from display text
  const cleanContent = (content: string) => {
    return content
      .replace(/```json\s*\{[\s\S]*"recommendations"[\s\S]*\}\s*```/, "")
      .replace(/\{[\s\S]*"recommendations"[\s\S]*\}/, "")
      .trim();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-5xl mx-auto w-full bg-background/50 backdrop-blur-sm rounded-3xl border border-border shadow-2xl overflow-hidden mt-4">
      {/* Header */}
      <div className="p-4 border-b bg-muted/30 flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-xl">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-lg">AI Assistant</h2>
          <p className="text-xs text-muted-foreground">
            Powered by Gemini 2.5 Flash
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"
        ref={scrollRef}
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground opacity-50">
            <Bot className="w-16 h-16 mb-4" />
            <p className="text-lg font-medium">How can I help you today?</p>
            <p className="text-sm">
              Ask me about movies, tv shows, or analytics.
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                  message.role === "assistant"
                    ? "bg-card border border-border text-card-foreground rounded-tl-none"
                    : "bg-primary text-primary-foreground rounded-tr-none"
                }`}
              >
                {message.parts.map((part, idx) => {
                  if (part.type === "thinking") {
                    return (
                      <div
                        key={idx}
                        className="text-xs italic opacity-70 mb-2 border-l-2 border-primary/30 pl-2"
                      >
                        Thinking: {part.content}
                      </div>
                    );
                  }
                  if (part.type === "text") {
                    const displayText =
                      message.role === "assistant"
                        ? cleanContent(part.content)
                        : part.content;
                    return (
                      <div
                        key={idx}
                        className="whitespace-pre-wrap leading-relaxed"
                      >
                        {displayText}
                      </div>
                    );
                  }
                  return null;
                })}

                {/* Render Recommendations if this is the latest assistant message */}
                {message.role === "assistant" &&
                  message === messages[messages.length - 1] &&
                  recommendedContent &&
                  recommendedContent.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {recommendedContent.map((item) => (
                        <div key={item.id} className="w-full">
                          {item.type === "movie" ? (
                            <MovieCard movie={item as MovieType} />
                          ) : (
                            <TVCard show={item as TvWithExtras} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1">
                  <Image
                    src={user?.imageUrl!}
                    alt="User"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-start gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-primary animate-pulse" />
            </div>
            <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-background/50 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="relative flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="pr-12 py-6 text-base rounded-2xl border-muted-foreground/20 focus-visible:ring-primary/20 bg-background/50 shadow-inner"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1.5 flex gap-2">
            {isLoading ? (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => stop()}
                className="h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <StopCircle className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                className="h-9 w-9 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
