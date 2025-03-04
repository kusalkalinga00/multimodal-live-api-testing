"use client";

import React from "react";
import { useState, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CameraPreview from "@/components/chat-view/CameraPreview";

const HumanMessage = ({ text }: { text: string }) => (
  <div className="flex gap-3 items-start">
    <Avatar className="h-8 w-8">
      <AvatarImage src="/avatars/human.png" alt="Human" />
      <AvatarFallback>H</AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-2">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-zinc-900">You</p>
      </div>
      <div className="rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-800">
        {text}
      </div>
    </div>
  </div>
);

const GeminiMessage = ({ text }: { text: string }) => (
  <div className="flex gap-3 items-start">
    <Avatar className="h-8 w-8 bg-blue-600">
      <AvatarImage src="/avatars/gemini.png" alt="Gemini" />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
    <div className="flex-1 space-y-2">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-zinc-900">Gemini</p>
      </div>
      <div className="rounded-lg bg-white border border-zinc-200 px-3 py-2 text-sm text-zinc-800">
        {text}
      </div>
    </div>
  </div>
);

const Main = () => {
  const [messages, setMessages] = useState<
    { type: "human" | "gemini"; text: string }[]
  >([]);

  const handleTranscription = useCallback((transcription: string) => {
    setMessages((prev) => [...prev, { type: "gemini", text: transcription }]);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-zinc-50 justify-between">
      <div className="flex space-y-2 flex-col items-center">
        <div className="text-4xl font-bold text-zinc-800 p-8 pb-0 justify-center ">
          Multimodal Live Chat
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[350px]">
            <ScrollArea className="h-[540px]">
              <div className="space-y-6">
                <GeminiMessage text="Hi! I'm Gemini. I can see and hear you. Let's chat!" />
                {messages.map((message, index) =>
                  message.type === "human" ? (
                    <HumanMessage key={`msg-${index}`} text={message.text} />
                  ) : (
                    <GeminiMessage key={`msg-${index}`} text={message.text} />
                  )
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      <div className="pb-10 flex justify-center items-center">
        <CameraPreview onTranscription={handleTranscription} />
      </div>
    </div>
  );
};

export default Main;
