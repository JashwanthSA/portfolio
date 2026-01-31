"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChatbotEngine } from "./ChatbotEngine";

type Message = {
  role: "user" | "bot";
  text: string;
};

export function ChatPanel() {
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState("");
  const [engine, setEngine] = useState<ChatbotEngine | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const init = async () => {
      const instance = new ChatbotEngine();
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
      await instance.loadKnowledgeBase(`${basePath}/knowledge_base.json`);
      setEngine(instance);
    };
    init();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 backdrop-blur-xl">
      {!started && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[240px] flex-col items-center justify-center gap-4 text-center"
        >
          <p className="text-2xl font-semibold text-[color:var(--foreground)]">
            How can I help you?
          </p>
          <p className="text-sm text-[color:var(--muted)]">
            Ask about projects, skills, or anything you want to explore.
          </p>
        </motion.div>
      )}

      {started && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex max-h-[260px] min-h-[240px] flex-col gap-4 overflow-y-auto pr-1"
        >
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={
                message.role === "user"
                  ? "self-end rounded-2xl bg-gradient-to-r from-violet-500/50 to-cyan-500/50 px-4 py-3 text-sm"
                  : "self-start rounded-2xl bg-[color:var(--card)] px-4 py-3 text-sm"
              }
            >
              {message.text}
            </div>
          ))}
          <div ref={endRef} />
        </motion.div>
      )}

      <form
        className="mt-6 flex items-center gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          const value = input.trim();
          if (!value) return;
          setStarted(true);
          const answer = engine
            ? engine.findBestMatch(value).answer
            : "Let me load my knowledge base. Try again in a moment.";
          setMessages((prev) => [
            ...prev,
            { role: "user", text: value },
            { role: "bot", text: answer },
          ]);
          setInput("");
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type your question..."
          className="w-full rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--muted)] focus:outline-none focus:ring-2 focus:ring-violet-500/40"
        />
        <button
          type="submit"
          className="rounded-full bg-[color:var(--foreground)] px-4 py-3 text-xs font-semibold text-[color:var(--background)] transition hover:opacity-90"
        >
          Send
        </button>
      </form>
    </div>
  );
}

