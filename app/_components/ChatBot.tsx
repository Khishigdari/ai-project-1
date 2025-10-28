"use client";
import React, { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export const ChatBot = () => {
  const [chat, setChat] = useState<string>("");
  const [chatResponse, setChatResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const chatBotAssistant = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setChatResponse("");

    try {
      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat }),
      });
      const data = await response.json();
      if (data.text) {
        setChatResponse(data.text);
      } else {
        alert("Failed to generate chat assistant");
      }
    } finally {
      setLoading(false);
      // setChat("");
    }
  };

  const handleKeyboardEvent = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      chatBotAssistant();
    }
  };
  return (
    <div className="absolute right-9 bottom-9">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className="rounded-full bg-primary p-4"
            onClick={() => setOpen(!open)}
          >
            <MessageCircle className="text-primary-foreground h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 mr-9">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Chat Assistant</h4>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X />
            </Button>
          </div>
          <DropdownMenuSeparator />
          <div className="py-4 px-6 flex flex-col gap-2">
            {/* space-y-2 */}
            {chat && (
              <div className="bg-secondary rounded-xl py-2 px-4 text-sm text-black">
                {chat}
              </div>
            )}
            {chatResponse && (
              <div className="bg-primary text-white rounded-xl py-2 px-4 text-sm">
                {chatResponse}
              </div>
            )}
          </div>
          <DropdownMenuSeparator />
          <div className="flex gap-2 mt-3">
            {loading ? (
              <Input disabled placeholder="Type your message..." value={chat} />
            ) : (
              <Input
                placeholder="Type your message..."
                value={chat}
                onKeyDown={handleKeyboardEvent}
                onChange={(e) => setChat(e.target.value)}
              />
            )}
            <Button
              disabled={loading || !chat}
              type="submit"
              className="rounded-full px-4"
              onClick={chatBotAssistant}
            >
              {loading ? "..." : <Send className="text-white" />}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
